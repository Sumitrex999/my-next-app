# Login and Logout Work Without Running the Separate Server 1

## Bug
The login and logout flow looked broken at first because it seemed like the app needed a separate backend server running. In reality, the app can log in and log out with the Next dev server only.

## What was wrong
- The login page used to depend on an external backend, so it could fail with `Failed to fetch` when that server was not running.
- The session cookie and navbar state could also look stale if the page was not refreshed after auth changes.
- For a beginner, this made it look like the whole auth system was broken when it was mostly a setup and routing issue.

## Handling
- I changed the login flow to read users from the local `app/_data/db.json` file instead of depending on a second server.
- The login API now sets the session cookie on the Next server.
- Logout clears that session cookie and returns the user to the login page.
- The navbar re-reads the session state after auth changes, so it shows the correct button.

## How to run again
1. Start the app:

```bash
npm run dev
```

2. Open the login page:

```text
http://localhost:3000/login
```

3. Sign in with the test user:
- Email: `user1@gmail.com`
- Password: `123456`

4. After login, open the contacts page or any page with the navbar and confirm `Logout` appears.
5. Click `Logout` and confirm you return to the login page.

## How to check again
1. If login fails, open DevTools and check the Network tab for `POST /api/login`.
2. Make sure the response is `200 OK` and returns JSON with `ok: true`.
3. Check DevTools → Application → Cookies and confirm a `session` cookie exists after login.
4. After logout, confirm the `session` cookie is removed.
5. If the navbar still looks wrong, refresh the page once so the server component reads the new cookie state.

## Future care
- If this happens again, check the login route before assuming the browser is the problem.
- First confirm whether the app is trying to call an external backend that is not running.
- Keep auth logic simple: login should create the session, logout should delete it, and the navbar should read the session from the server.
- For beginner debugging, always check these three things first: server running, API response, and session cookie.

## Files that matter
- [app/api/login/route.ts](../app/api/login/route.ts)
- [app/_lib/session.ts](../app/_lib/session.ts)
- [app/_components/LoginForm.tsx](../app/_components/LoginForm.tsx)
- [app/_components/LogoutButton.tsx](../app/_components/LogoutButton.tsx)
- [app/_components/Navbar.tsx](../app/_components/Navbar.tsx)
