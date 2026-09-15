# Portfolio

A dynamic, responsive, and themeable developer portfolio built with Next.js (App Router), Tailwind CSS, Framer Motion, and MongoDB. Features an interactive 3D skill orbit, full MongoDB integration for projects and contact messages, and a secure password-protected admin dashboard.

---

## Features

* **Dynamic Project Showcase:** Fetch projects directly from MongoDB with live demo URLs and GitHub links.
* **Protected Admin Portal (`/admin`):** Add/delete live projects and view contact messages in real time.
* **Multi-Theme Engine:** Switch seamlessly between Cyber Emerald, Neon Violet, and Light Slate themes.
* **Interactive 3D Tech Orbit:** Interactive 3D CSS skill cloud with hover/rotation physics.
* **Direct Contact System:** Persists messages directly to a MongoDB database.
* **Resume Integration:** In-browser preview and one-click professional PDF download.

---

## Tech Stack

* **Frontend:** Next.js 15+ (App Router), React, Tailwind CSS, Framer Motion, Lucide Icons
* **Backend:** Next.js API Route Handlers, Mongoose
* **Database:** MongoDB Atlas

---

## Local Setup & Installation

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/Hritik2611/portfolio.git](https://github.com/Hritik2611/portfolio.git)
cd portfolio
```

### Install Dependencies
* ** npm install

### Environment Variables

* **Create a .env.local file in the root directory:

** MONGODB_URI=your_mongodb_atlas_connection_string
** ADMIN_PASSWORD=your_secure_admin_password

### Run the Project
* **npm run dev

Open http://localhost:3000 in your browser.

** Admin Dashboard

Access the admin panel at:

http://localhost:3000/admin

Use the ADMIN_PASSWORD defined in .env.local to log in and manage projects and contact messages.

## Link: https://hritik-s-dev-portfolio.vercel.app/

