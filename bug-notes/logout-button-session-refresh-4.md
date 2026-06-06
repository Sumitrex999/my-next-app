# Logout button session refresh 4

## Bug (beginner-friendly)
The logout button did not show in the navigation bar after login, or it stayed visible when it should disappear after logout. This happened because the navbar reads the session cookie, and the page needed a refresh after login/logout so the cookie state could be re-checked.

## What was wrong
- The navbar shows `Logout` only when a session cookie exists.
- After login or logout, the page did not always refresh the server component state, so the navbar could show the old auth state.
- In some cases, the cookie existed but the UI did not re-read it immediately.

## Handling (what I changed)
- Kept the navbar session-based:
  - show `Logout` when `getSession()` returns a user
  - show `Login` and `Register` when there is no session
- Updated login/logout navigation to refresh the route after the auth change so the navbar reads the new cookie state.
- Logout now deletes the session cookie first, then redirects to `/login`.

## Steps to run again and check again
1. Start the app:

```bash
npm run dev
```

2. If your login route still depends on the separate backend, start it too:

```bash
npm run server
```

3. Open `http://localhost:3000/login` and log in with a valid user.
4. After login, confirm the navbar changes to show `Logout`.
5. Click `Logout` and confirm the session cookie is deleted and the navbar switches back to `Login` / `Register`.
6. If it does not update, hard refresh the page and check whether the cookie is present in DevTools → Application → Cookies.

## How to verify the bug is fixed
- After successful login, `Logout` should appear in the navbar.
- After logout, the `session` cookie should be gone and the navbar should no longer show `Logout`.
- The login page should show `Login` / `Register` again.

## If this happens again
1. Check whether the session cookie exists in DevTools.
2. Check whether the navbar code is calling `getSession()` on the server.
3. Confirm login/logout use a refresh or re-render after the cookie changes.
4. Make sure the logout action deletes the cookie before redirecting.

## Future care
- Keep navbar auth logic simple: session exists means show `Logout`, session missing means show `Login` / `Register`.
- Always refresh the page or server component state after login/logout so the navbar does not stay stale.
- When changing auth code later, re-check cookie behavior first, then the navbar UI.
- Add small tests or a manual checklist for login/logout state so this issue is easy to spot.

## Files involved
- [app/_components/Navbar.tsx](../app/_components/Navbar.tsx)
- [app/_components/LoginForm.tsx](../app/_components/LoginForm.tsx)
- [app/_components/LogoutButton.tsx](../app/_components/LogoutButton.tsx)
- [app/_lib/session.ts](../app/_lib/session.ts)
