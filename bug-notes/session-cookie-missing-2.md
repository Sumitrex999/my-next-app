# Session cookie missing after login 2

## Bug
After a successful login the browser showed no application cookie (no `session` cookie under `http://localhost:3000`). The UI appeared to authenticate but DevTools had no httpOnly cookie saved.

## Root cause
- The server-side cookie helper was using the `cookies()` API incorrectly (was not awaiting the cookie store and used the wrong `set`/`delete` call shapes).
- The login path did not call a server helper to write the cookie on successful authentication.

## What I changed (fix)
- Implemented proper server-side cookie helpers in `app/_lib/session.ts`:
  - `setSession(user)` now awaits `cookies()` and calls `cookieStore.set({...})` with the correct options.
  - `getSession()` returns parsed user data from the cookie.
  - `deleteSession()` calls `cookieStore.delete("session")` correctly.
- Updated the login API to validate payloads and to call `setSession(...)` after successful authentication so the httpOnly cookie is written server-side: [app/api/login/route.ts](app/api/login/route.ts)
- Fixed a typo and imports in the server action so code calls `setSession` correctly.

## Files changed
- [app/_lib/session.ts](app/_lib/session.ts)
- [app/api/login/route.ts](app/api/login/route.ts)
- [app/actions/auth.ts](app/actions/auth.ts) (import fixes / optional)

## Consolidation
- Removed the duplicate server action `app/actions/auth.ts` to avoid two separate login implementations. The single source of truth is now `app/api/login/route.ts`, which proxies to the external backend and requires `npm run server` to be running.

## Steps to reproduce (after fix)
1. Start the app:

```bash
npm run dev
```

2. (Optional) Start `json-server` only if you need the separate backend used elsewhere:

```bash
npm run server
```

3. Open `http://localhost:3000/login` and submit these credentials:

- Email: `user1@gmail.com`
- Password: `123456`

4. In DevTools → Application → Cookies → select `http://localhost:3000` and verify a `session` cookie exists. Note: cookie is httpOnly so it will not show in `document.cookie`.

5. Run a typecheck to ensure no compile-time issues:

```bash
npx tsc --noEmit
```

## If this happens again
1. Check server logs for `setSession failed` (the login route logs failures when setting cookies).
2. Confirm the POST to `/api/login` returned 200 and the server executed `setSession` (add temporary logging in route if needed).
3. Ensure code that writes cookies runs on the server (server actions / API routes) — `next/headers` only works server-side.
4. Confirm `cookies()` is awaited and `cookieStore.set()` is called with an object: `{ name, value, httpOnly, path, maxAge, secure }`.

## Notes
- I ran `npx tsc --noEmit` to verify types after edits.
- The fix keeps cookie handling minimal (stores serialized user object). For production, prefer a signed JWT or server-side session id instead of raw user info.

## Do I need to run the external server to check session cookies?

Short answer: It depends.

- If your login route proxies to an external backend (the code uses `API_URL` pointing to `http://localhost:3001`), then yes — start that backend with `npm run server` before testing, otherwise the route may fail before it calls `setSession` and no cookie will be written.
- If the login route validates directly against local data (for example reading `app/_data/db.json` on the server), you do NOT need the external `json-server` and the cookie will be set by Next itself.

Quick commands:

```bash
# Start Next dev server
npm run dev

# Start json-server only if the route depends on it
npm run server
```

Troubleshooting tips:

- If you submit the login form and still don't see the cookie, open the Network tab and inspect the POST to `/api/login` — verify it returns 200 and a JSON body with `ok: true`.
- Check the Next server terminal for `setSession failed` logs (the route logs cookie errors).
- Remember httpOnly cookies don't appear in `document.cookie` but will be visible in DevTools → Application → Cookies.
