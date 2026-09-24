# Product Admin Dashboard

Next.js + React + Tailwind CSS + Axios implementation of the Frontend Assignment.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Login:
- Username: `emilys`
- Password: `emilyspass`

## Finished

- Login/logout and protected product pages
- Shared Axios instance with auth token interceptor and centralized 401 handling
- Product table on desktop and cards on mobile
- Pagination with 10/20/50 page sizes
- Debounced search
- Request cancellation so stale search responses do not overwrite newer results
- Category filter and sorting
- Product details, reviews and not-found handling
- Add/edit/delete with validation and delete confirmation
- Loading, empty and retry/error states
- Page/search/filter/sort values stored in the URL
- No React Query, SWR, or table/pagination library

## API limitations and choices

### Search + category
DummyJSON search and category endpoints are separate. The app performs API search first and applies the selected category filter to the returned search results on the client. This keeps search responsive while still allowing the user to combine the controls.

### Add/edit/delete
DummyJSON simulates mutations and does not permanently persist them. After a successful mutation request, this app stores the change in `localStorage` and merges those local changes into product results, so changes remain visible in the current browser.

### Invalid URL values
Page values are parsed and normalized. Invalid/non-positive pages become page 1; unsupported page sizes become 10.

### Double submissions
Login and save buttons are disabled while their request is running.

## One problem faced

Fast search typing can create overlapping requests. The solution uses a 450 ms debounce plus `AbortController`, so an older request is cancelled before a newer search is processed.

## AI usage note

AI was used to help scaffold and review the implementation. The developer should understand each file and be able to explain the Axios interceptor, URL-state handling, debounce/cancellation, and local mutation persistence before submitting.

## GitHub commits

Use regular commits, for example:

```bash
git init
git add .
git commit -m "chore: initialize Next.js dashboard"
git add .
git commit -m "feat: add authentication"
git add .
git commit -m "feat: add product listing and pagination"
git add .
git commit -m "feat: add search filters and sorting"
git add .
git commit -m "feat: add product details and CRUD"
git add .
git commit -m "docs: add README"
```

Then push the repository to GitHub and deploy it to Vercel or Netlify.
