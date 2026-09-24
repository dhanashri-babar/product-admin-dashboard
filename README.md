# Product Admin Dashboard

A responsive Product Admin Dashboard built with **Next.js, React, Tailwind CSS, and Axios** using the free **DummyJSON API**.

## Live Demo

Add your Vercel or Netlify link here after deployment:

`http://localhost:3001`

## GitHub Repository

`https://github.com/dhanashri-babar/product-admin-dashboard`

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3001`.

### Login Credentials

* **Username:** `emilys`
* **Password:** `emilyspass`

## Features Completed

* Login/logout with protected product pages
* Authentication using DummyJSON `/auth/login`
* Shared Axios instance with authentication token interceptor
* Centralized handling of authentication errors
* Product table on desktop
* Responsive product cards on mobile
* Pagination using API `limit` and `skip`
* Page size options: 10, 20 and 50
* Previous/Next buttons and page numbers
* Search using DummyJSON product search API
* Debounced search to avoid unnecessary API requests
* Request cancellation to prevent stale search results
* Category filtering
* Sorting by price, rating and title
* Product details page with images, description, price and reviews
* Not-found handling for invalid product IDs
* Add product with form validation
* Edit product with form validation
* Delete product with confirmation popup
* Loading, empty and error states
* Retry button when an API request fails
* Page, search, filter and sort values stored in the URL
* Invalid URL values handled safely
* Login and Save buttons disabled while requests are running
* No React Query, SWR, or ready-made table/pagination libraries

## API Limitations and Design Choices

### Search + Category Filter

DummyJSON provides separate endpoints for product search and category filtering. The API does not directly support combining both operations in one request.

The application therefore performs the search through the search endpoint and applies the selected category filter to the returned results on the client side. This allows both controls to work together while respecting the API limitations.

### Add, Edit and Delete

DummyJSON simulates product mutations, so added, edited, and deleted products are not permanently stored on the server.

After a successful mutation request, the application stores the local changes in `localStorage` and merges them with the API product data. This allows the changes to remain visible in the current browser.

### Invalid URL Values

URL parameters are validated before being used.

* Invalid or non-positive page numbers are converted to page 1.
* Unsupported page sizes are converted to 10.
* Invalid product IDs display the not-found state instead of breaking the application.

### Multiple Submissions

Login and Save buttons are disabled while their requests are running. This prevents multiple rapid clicks from sending duplicate requests.

## Problem Faced and Solution

### Problem: Fast Search Requests

When a user types quickly, multiple search requests can overlap. A slower response from an older search could potentially arrive after the newer search response and display outdated results.

### Solution

The application uses:

* A **450 ms debounce** to wait until the user stops typing.
* **AbortController/request cancellation** to cancel the previous request when a new search is started.

This prevents stale search responses from replacing newer results.

## Project Structure

```text
product-admin-dashboard/
├── app/
│   ├── login/
│   ├── products/
│   └── page.js
├── components/
├── lib/
├── public/
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── .gitignore
```

## Technologies Used

* Next.js
* React
* Tailwind CSS
* Axios
* JavaScript
* DummyJSON API
* localStorage

## AI Usage Note

AI was used to help scaffold and review parts of the implementation.

I reviewed the generated code and understand the implementation, including the Axios interceptor, URL-state handling, search debounce and request cancellation, API integration, and localStorage-based mutation persistence.

## GitHub Commit History

The project is maintained using regular commits to keep development changes organized.

The commit history includes stages such as:

* Initial project setup
* Authentication
* Product listing and pagination
* Search, filtering and sorting
* Product details and CRUD functionality
* Documentation

## Submission

* **GitHub Repository:** `https://github.com/dhanashri-babar/product-admin-dashboard`
* **Live Demo:**  http://localhost:3001.
