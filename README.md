# BookNook

BookNook is a small online library where users can browse books, add their own, borrow a book for a few days and return it.

**Live site:** https://b14-a8-cat-ron-client-sage.vercel.app
**Server API:** https://b14-a8-cat-ron-server-olive.vercel.app

## Features

- Browse all books and see the newest arrivals on the home page, with a hero slider
- Register and log in with email and password or with Google (BetterAuth), with strong-password checks
- Add a book with a cover image upload (imgbb) and a total copies count
- Edit and delete your own books, with a confirmation modal before deleting
- Borrow a book through a modal, see it in My Borrows and return it. Copies update automatically, and a book with 0 copies shows "Not Available"
- Double borrowing of the same book is blocked
- Protected routes keep you on the page after a reload, and the server verifies a JWT on every protected request
- Toast notifications, loading spinners, a custom 404 page and a title for each page
- Light and dark theme

## Tech Stack

- **Client:** Next.js, TypeScript, Tailwind CSS, daisyUI, BetterAuth
- **Server:** Node.js, Express, MongoDB (Atlas), jose (JWT verification)
- **Hosting:** Vercel

