# Login Fetch Failure 1

## Bug
The login form posted to `/api/login`, but that route tried to fetch users from `http://localhost:3001`. When the separate backend was not running, the submit failed with `Failed to fetch`.

## Handling
I changed `/api/login` to read users from the local `app/_data/db.json` file instead of calling the external backend.
The route now checks the email and password locally and returns a normal JSON error when credentials are missing or wrong.
The client form already shows the returned message instead of crashing.

## Steps to deal with it
1. Check whether the form submit is failing in the client or inside the API route.
2. Verify whether the route depends on another service like `json-server`.
3. If the backend is optional, replace the external fetch with local data or a direct server-side check.
4. If the backend is required, start the backend before testing the form.
5. Return a clear JSON error from the route so the UI can show a message instead of a hard fetch failure.

## If this happens again
1. Check the submit route first, not just the browser console.
2. Confirm every backend dependency is running.
3. If the route calls an external service, keep a fallback or a clear error message in place.
4. Add a new numbered bug note in this folder using the same format.

## Files that matter
- [app/_components/LoginForm.tsx](../app/_components/LoginForm.tsx)
- [app/api/login/route.ts](../app/api/login/route.ts)
- [app/_data/db.json](../app/_data/db.json)

## How to run & verify
1. Start the Next dev server:

```bash
npm run dev
```

2. If `app/api/login/route.ts` proxies to `http://localhost:3001`, start the JSON backend:

```bash
npm run server
```

3. Open `http://localhost:3000/login`, submit credentials (example: `user1@gmail.com` / `123456`).
4. Check Network tab -> POST `/api/login` for a 200 response and JSON body.
5. If using cookie sessions, check DevTools -> Application -> Cookies for `http://localhost:3000`.

## Bug handling summary
- Root cause: API route depended on an external process (`json-server`) causing `Failed to fetch` when that service was down.
- Immediate fix applied: route reads local JSON data to validate credentials (removes runtime dependency), and returns structured JSON errors.
- Alternative approach: keep proxy behavior but ensure developer setup instructs running `npm run server` in README and dev scripts.

## Future checks & prevention
- Add startup checks in dev docs and/or npm `postinstall` scripts that warn when `json-server` is required.
- Add health-check endpoint that validates downstream services and surfaces a clear status for developers.
- Add unit tests for `app/api/login/route.ts` to confirm valid/invalid credentials handling.
- Prefer server-side session issuance (httpOnly cookie or JWT) and avoid sending raw passwords in requests or responses.

If you want, I can convert the route back to require the backend (so developers must run `npm run server`) or keep it local — tell me which policy you prefer and I will update the note and code accordingly.