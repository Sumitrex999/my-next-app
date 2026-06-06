# Local JSON Data Flow — Contacts reflect local edits 1

## Bug
App previously relied on an external backend (http://localhost:3001) so contacts looked broken when that service wasn't running.

## What was wrong
- Contact helpers called the external API, so the UI failed with `Failed to fetch` when the separate server was down.
- That made it look like the app's contact UI was broken even though the Next app was fine.

## What changed / how it works now
- The contact APIs were switched to read/write `app/_data/db.json` directly inside the Next server.
- Login also uses the local JSON file for the test user. The Next app (npm run dev) now reads/writes the JSON file, so UI changes come from the same process.

## How to run (beginner)
1. Start the Next dev server:

```bash
npm run dev
```

2. Open the app in your browser at the URL shown (usually http://localhost:3000).

(You do NOT need to run a separate `npm run server` unless you deliberately switch the code back to the external backend.)

## How to check (quick)
- Log in at `/login` with test user: `user1@gmail.com` / `123456`.
- Open `/contact` and verify:
  - If there are no contacts, you should see the message: "Add a contact here to your contacts list" and a link to add.
  - Add a contact via the form and refresh `/contact` — the new contact should appear.
- You can also edit `app/_data/db.json` manually; refresh the page to see changes.

## Bug handling summary
- Root cause: dependency on an external JSON server.
- Fix: contact routes now use the local JSON file; login route uses local users.
- Short-term: this removes the runtime dependency and makes the app work out-of-the-box for development.

## Future care (if this happens again)
- Check whether API helpers call `http://localhost:3001` — if yes, either start that server or switch helpers to the local JSON file.
- First debugging steps: 1) `npm run dev` is running, 2) POST `/api/login` returns `ok: true` (check Network tab), 3) `session` cookie exists (DevTools → Application → Cookies), 4) `/contact` shows contacts or empty-state message.

## Files to check
- [app/api/contacts.ts](app/api/contacts.ts#L1-L200)
- [app/api/login/route.ts](app/api/login/route.ts#L1-L200)
- [app/_data/db.json](app/_data/db.json)
- [app/contact/page.tsx](app/contact/page.tsx#L1-L200)


If you want, I can add a brief `README-dev.md` with these exact steps so new contributors don't need to read bug notes.