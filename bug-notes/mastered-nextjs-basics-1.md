# Mastered Next.js Basics - Contact Manager 1

## What was finished
I built a small Contact Manager app with Next.js using:
- Add, view, edit, and delete contacts
- Shared `ContactForm` component for both create and update
- Server Actions for create/update/delete mutations
- Local JSON data source in `app/_data/db.json`
- Client-side state handling with success and error messages
- `useEffect` to refresh and move the user after successful save

## What was wrong before
- The app depended on page-local forms, so create and edit were duplicated.
- Missing fields like name or email were not shown clearly as errors.
- The form did not give a clear success state or refresh flow.
- Some contact logic still looked like it needed a separate backend server.

## How it works now
- `/contact/new` uses the shared `ContactForm` with `createContactAction`.
- `/contact/edit/[id]` loads the contact by id and uses the same `ContactForm` with `updateContactAction`.
- Server Actions handle validation and data mutation.
- The shared form shows field errors, a top message, and uses `useEffect` to refresh and navigate after success.
- Delete still removes the contact from the local JSON store and refreshes the UI.

## How to run again
1. Start the app:

```bash
npm run dev
```

2. Open the app in the browser.
3. Log in with the test user:
- Email: `user1@gmail.com`
- Password: `123456`
4. Go to `/contact/new` and try adding a contact.
5. Go to `/contact/edit/[id]` from the contact list and update a contact.
6. Use Delete from the contact list to remove a contact.

## How to check again
- On add or edit, leave `Name` or `Email` empty and confirm the form shows the correct validation error.
- After a successful save, confirm the app refreshes and redirects back to `/contact`.
- After delete, confirm the contact disappears from the list.
- If something looks stale, refresh the page and check that `app/_data/db.json` has the expected data.

## Bug handling summary
- Root cause: duplicated page-local form logic and weak feedback for validation/success.
- Fix: moved create/update logic into server actions and made one reusable client `ContactForm`.
- Error handling: missing fields now show inline messages, and successful saves trigger refresh/navigation.

## Future care
- If validation stops showing, check the state object returned by the server action first.
- If the UI does not update after save, check the `useEffect` in `app/_components/ContactForm.tsx`.
- If a contact does not save, confirm the JSON file write in `app/api/contacts.ts`.
- Keep form state and server mutation logic separate: form component for UI, server actions for data changes.

## What I learned / interview note
This part showed the basics of a real Next.js app:
- Server Actions for mutations
- Shared components for reuse
- Client state for UX feedback
- Simple CRUD data flow backed by a local JSON file
- Updating UI after a successful server mutation

This is a good example to mention in an interview as: "I built a Next.js Contact Manager using shared components, Server Actions, and client-side state for validation and success handling."

## Files that matter
- [app/_components/ContactForm.tsx](../app/_components/ContactForm.tsx)
- [app/actions/contacts.ts](../app/actions/contacts.ts)
- [app/contact/new/page.tsx](../app/contact/new/page.tsx)
- [app/contact/edit/[id]/page.tsx](../app/contact/edit/[id]/page.tsx)
- [app/api/contacts.ts](../app/api/contacts.ts)
- [app/_data/db.json](../app/_data/db.json)
