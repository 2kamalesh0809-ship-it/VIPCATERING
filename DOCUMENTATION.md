# 📖 VIP Catering Website — Full Project Documentation

> **Project Name:** VIP Catering Chennai  
> **Version:** 0.0.0  
> **Last Updated:** March 2026  
> **Purpose:** Premium catering services website with admin panel, event management, menu quotation system, and full Firebase backend integration.

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Getting Started (Setup Guide)](#4-getting-started-setup-guide)
5. [Firebase Configuration](#5-firebase-configuration)
6. [Design System & Styling](#6-design-system--styling)
7. [App Entry Point](#7-app-entry-point)
8. [Pages (Routes)](#8-pages-routes)
9. [Components (Reusable UI)](#9-components-reusable-ui)
10. [Sections (Homepage Building Blocks)](#10-sections-homepage-building-blocks)
11. [Firebase Cloud Functions (Backend)](#11-firebase-cloud-functions-backend)
12. [Email Integration (EmailJS)](#12-email-integration-emailjs)
13. [Public Assets](#13-public-assets)
14. [Admin Panel Guide](#14-admin-panel-guide)
15. [Customer Flow (User Journey)](#15-customer-flow-user-journey)
16. [Routing Map](#16-routing-map)
17. [Key Dependencies](#17-key-dependencies)
18. [Environment Variables & Secrets](#18-environment-variables--secrets)
19. [Deployment (Firebase Hosting)](#19-deployment-firebase-hosting)
20. [Known Quirks & Developer Notes](#20-known-quirks--developer-notes)

---

## 1. Project Overview

**VIP Catering** is a full-stack premium catering website designed for VIP Catering Chennai. It allows:

- Customers to browse services, menus, events, and gallery.
- Customers to **submit a Contact Enquiry** or **generate a Menu Quotation**.
- Admins to **log in to a secure dashboard** and **create/edit/delete catering events** posted on the website.
- All enquiries and quotations are **saved to Firebase Firestore** and **email notifications** are sent to the business automatically via EmailJS.

### Business Info
| Field | Value |
|---|---|
| Company | VIP Catering Chennai |
| Phone | +91 81241 42113 (WhatsApp), +91 93452 10538 |
| Email | vipcateringservice1@gmail.com |
| Address | First Floor, Second Block, PC 1C, Mogappair West, Ambattur Industrial Estate, Chennai - 600037 |
| Instagram | @vipcateringchennai |
| Facebook | jaffer.vip.catering |
| YouTube | @vipcateringchennai |

---

## 2. Technology Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 7 |
| **Language** | JavaScript (JSX) |
| **CSS Framework** | Tailwind CSS v3 |
| **Animation Library** | Framer Motion |
| **Carousel / Slider** | Swiper.js |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v7 |
| **Backend / Database** | Firebase (Firestore) |
| **Authentication** | Firebase Auth (Email/Password) |
| **File Storage** | Firebase Storage |
| **Email Notifications** | EmailJS (client-side) |
| **Cloud Functions** | Firebase Functions (Node.js, nodemailer) |
| **Fonts** | Nunito (titles), Poppins (body) — via Google Fonts |
| **PWA Support** | vite-plugin-pwa |
| **Utilities** | clsx, tailwind-merge |

---

## 3. Project Folder Structure

```
VIP/
├── public/                   # Static assets served as-is
│   ├── logo.png              # VIP Catering official logo
│   ├── banner.mp4            # Hero video used on gallery page
│   ├── video1.mp4 / video2.mp4  # Quick clips for gallery scroll strip
│   ├── get.mp4 / get (1).mp4   # Reel videos
│   ├── *.jpg                 # Past event / gallery photos
│   └── vip catering chennai 2.pdf   # Company brochure PDF
│
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Root component: Router, Navbar, Routes
│   ├── firebase.js           # Firebase SDK initialization & exports
│   ├── index.css             # Global styles, utility classes, design tokens
│   │
│   ├── components/           # Layout / Global reusable components
│   │   ├── Navbar.jsx        # Top navigation bar
│   │   ├── Footer.jsx        # Site footer
│   │   ├── MobileBottomNav.jsx  # Mobile-only bottom navigation bar
│   │   └── IntroAnimation.jsx   # Cinematic intro splash animation
│   │
│   ├── pages/                # Full pages (one per route)
│   │   ├── HomePage.jsx      # Home (aggregates sections)
│   │   ├── ServicesPage.jsx  # Services page
│   │   ├── MenuPage.jsx      # Menu page with item selection
│   │   ├── EventsPage.jsx    # Events listing page
│   │   ├── GalleryPage.jsx   # Gallery: reels, masonry, video strip
│   │   ├── ContactPage.jsx   # Contact form + direct contact info
│   │   ├── QuotationPage.jsx # Menu quotation request form
│   │   ├── SubmissionSuccess.jsx   # Success screen after form submit
│   │   ├── AdminLogin.jsx    # Admin login page
│   │   └── AdminDashboard.jsx   # Admin dashboard: manage events
│   │
│   └── sections/             # Homepage sub-sections (used in HomePage.jsx)
│       ├── Hero.jsx          # Full-screen hero banner
│       ├── Services.jsx      # Services overview section
│       ├── UpcomingEvents.jsx   # Swiper carousel of events from Firestore
│       ├── FeaturedEvents.jsx   # Static featured events section
│       ├── Gallery.jsx       # Homepage gallery teaser
│       ├── TrustSection.jsx  # Trust indicators / stats
│       └── CTASection.jsx    # Call-to-action section
│
├── functions/                # Firebase Cloud Functions (Node.js backend)
│   ├── index.js              # sendQuotationEmail + sendEnquiryEmail
│   ├── package.json          # Backend dependencies (nodemailer, firebase-functions)
│   └── .env                  # GMAIL_EMAIL, GMAIL_PASSWORD (secret — do NOT commit)
│
├── index.html                # HTML shell (meta tags, fonts, PWA config)
├── tailwind.config.js        # Tailwind theme: colors, fonts, shadows, animations
├── vite.config.js            # Vite bundler config (PWA plugin, React plugin)
├── firebase.json             # Firebase hosting + functions config
├── .firebaserc               # Firebase project alias
├── storage.cors.json         # Firebase Storage CORS rules
├── package.json              # All npm dependencies and scripts
└── DOCUMENTATION.md          # This file
```

---

## 4. Getting Started (Setup Guide)

### Prerequisites
- Node.js v18+
- npm v9+
- Firebase CLI (`npm install -g firebase-tools`)

### Step 1 — Install Dependencies
```bash
cd VIP
npm install
```

### Step 2 — Run Development Server
```bash
npm run dev
```
> Opens at: `http://localhost:5173`

### Step 3 — Build for Production
```bash
npm run build
```
> Output goes to `/dist` folder.

### Step 4 — Preview Production Build
```bash
npm run preview
```

---

## 5. Firebase Configuration

**File:** `src/firebase.js`

This file initializes the Firebase app and exports three services used throughout the project:

```js
export const auth    // Firebase Authentication
export const db      // Firestore Database
export const storage // Firebase Storage (for event images)
```

### Firebase Project Details
| Setting | Value |
|---|---|
| Project ID | `vip-catering-401d0` |
| Auth Domain | `vip-catering-401d0.firebaseapp.com` |
| Storage Bucket | `vip-catering-401d0.firebasestorage.app` |

### Firestore Collections Used

| Collection | Purpose |
|---|---|
| `events` | Admin-created catering events displayed on the homepage and Events page |
| `enquiries` | Contact form submissions from customers |
| `quotations` | Menu quotation requests from the Menu page |

### Firebase Storage
- Used to upload event images from the Admin Dashboard.
- Images are stored at path: `events/{timestamp}_{filename}`
- Max file size: **5 MB**

### CORS for Firebase Storage
If image uploads fail, apply the CORS rules:
```bash
gsutil cors set storage.cors.json gs://vip-catering-401d0.firebasestorage.app
```
(See `storage.cors.json` for the configuration.)

---

## 6. Design System & Styling

### Fonts
| Role | Font | Usage |
|---|---|---|
| Titles (H1, H2, H3) | **Nunito** | Section headings, hero titles |
| Body / Subtitles (all other) | **Poppins** | Paragraphs, nav links, buttons, forms |

Fonts are loaded via Google Fonts in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
```

### Color Palette (`tailwind.config.js`)
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#C9A227` (Gold) | Accents, icons, borders, CTAs |
| `primary.light` | `#D4B34B` | Hover gold |
| `primary.dark` | `#A6861F` | Pressed gold |
| `background` | `#0F0F0F` | Page background |
| `background.soft` | `#111111` | Slightly lighter dark background |
| `accent.dark` | `#F5F5F5` | Near-white text |
| `accent.gold` | `#C9A227` | Same as primary |

### Key CSS Utilities (`src/index.css`)
| Class | Description |
|---|---|
| `.text-luxury-shimmer` | Animated gold shimmer gradient on text |
| `.btn-luxury-shimmer` | Full gold shimmer animated button |
| `.btn-luxury-outline` | Gold outline button |
| `.card-luxury` | Dark card with gold border and hover shadow |
| `.glass` | Glassmorphism panel with dark + gold border |
| `.bg-luxury-blobs` | Radial gold ambient blob background |
| `.noise-overlay` | Subtle noise texture overlay |

### Tailwind Custom Utilities
| Class | Value |
|---|---|
| `bg-gold-gradient` | `linear-gradient(135deg, #C9A227 0%, #A6861F 100%)` |
| `bg-luxury-gold` | Shimmering 4-stop gold gradient (for animation) |
| `shadow-luxury-glow` | Gold glow box shadow |
| `shadow-luxury-card` | Deep dark shadow + subtle gold ambient |
| `animate-shimmer` | Infinite shimmer animation on background |

---

## 7. App Entry Point

### `src/main.jsx`
Bootstraps React and mounts the `<App />` component into the DOM.

### `src/App.jsx`
The root of the application. Responsibilities:

1. **`<ParallaxBackground />`** — A fixed, full-screen cinematic background with:
   - A dark restaurant image from Unsplash (blurred, darkened)
   - Gold ambient radial gradient overlay
   - Cinematic vignette
   - Smooth parallax scroll effect (via `framer-motion`'s `useScroll` + `useTransform`)

2. **`<IntroAnimation />`** — Plays a 3.5-second cinematic splash screen on first load.

3. **`<Navbar />`** and **`<Footer />`** — Persistent layout components.

4. **`<MobileBottomNav />`** — Mobile bottom tab bar (hidden on desktop).

5. **`<Routes />`** — All page routes (see Routing Map below).

6. **`<ScrollToTop />`** — Scrolls to top of page on every route change.

---

## 8. Pages (Routes)

### `/` — Home Page
**File:** `src/pages/HomePage.jsx`  
Aggregates all homepage sections in order:
- Hero → Services → Upcoming Events (live from Firestore) → Featured Events → Gallery → Trust Section → CTA

---

### `/services` — Services Page
**File:** `src/pages/ServicesPage.jsx`  
Displays the full list of catering services offered (Weddings, Corporate, Private, Gala Dinners, Live Counters, etc.) with pricing and feature highlights.

---

### `/menu` — Menu Page
**File:** `src/pages/MenuPage.jsx`  
An interactive menu selector where customers can:
- Browse all dishes organized by category (Beverages, Starters, Main Course, Desserts, Live Counters, Serving).
- Add / remove items using a checkbox-style selection.
- Selected items are saved to **localStorage**.
- A floating summary bar shows selected count and a "Get Quotation" button.
- Clicking "Get Quotation" navigates to `/quotation`.

---

### `/events` — Events Page
**File:** `src/pages/EventsPage.jsx`  
Displays a full listing of all events from Firestore in a grid layout with category filters and search functionality.

---

### `/gallery` — Gallery Page
**File:** `src/pages/GalleryPage.jsx`  
A rich media gallery with four sections:
1. **Hero Video Section** — Full-screen `banner.mp4` auto-playing in the background.
2. **Experience Reels** — 3 vertical `9:16` video cards (from `/public` folder) that auto-play when scrolled into view using IntersectionObserver.
3. **Masonry Image Gallery** — 9 actual event photos in a Pinterest-style masonry grid with hover zoom effects.
4. **Quick Clips Strip** — An infinite CSS scroll animation strip of 6 looping video thumbnails. Click any clip to open it in a **full-screen modal overlay**.

---

### `/contact` — Contact Page
**File:** `src/pages/ContactPage.jsx`  
Features:
- **Left column:** Contact form with fields: Name, Phone, Email, Event Type, Event Date, Message.
- **Right column:** Direct contact info (Phone, Email, Location) + an interactive embedded Google Maps preview.
- **Quick action buttons:** "Call Now" and "WhatsApp Us".
- On submit: saves to Firestore `enquiries` collection + sends email via EmailJS.
- On success: navigates to `/submission-success`.

---

### `/quotation` — Quotation Page
**File:** `src/pages/QuotationPage.jsx`  
This page is accessed **only from the Menu Page** (requires items to be selected in localStorage).
- Left column: event details form (Full Name, Phone, Email, Address, Date, Guest Count, Event Type).
- Right column: Read-only review of the selected menu items grouped by category.
- On submit: saves to Firestore `quotations` collection + sends email via EmailJS.
- If localStorage is empty (no items selected), redirects back to `/menu`.

---

### `/submission-success` — Success Page
**File:** `src/pages/SubmissionSuccess.jsx`  
Shown after a successful Contact Form submission. Displays a animated thank-you screen with the submitted details and navigation buttons.

---

### `/admin` — Admin Login
**File:** `src/pages/AdminLogin.jsx`  
A clean login form with Email + Password fields.
- Uses Firebase Authentication (`signInWithEmailAndPassword`).
- **First-time setup:** If the admin user doesn't exist, it auto-creates them (`createUserWithEmailAndPassword`). This is a one-time bootstrap behavior.
- On success: navigates to `/admin/dashboard`.

---

### `/admin/dashboard` — Admin Dashboard
**File:** `src/pages/AdminDashboard.jsx`  
The main admin panel. Features:
- **Live event list** — pulled from Firestore in real-time with `onSnapshot`.
- **Create new event** — form with: Title, Date, Category, Price, Location, Description, Image Upload.
- **Edit event** — pre-fills the form with existing data.
- **Delete event** — with confirmation dialog.
- **Image upload** — uses Firebase Storage with a progress bar and 30s timeout. Handles CORS errors explicitly.
- **Toast notifications** — animated success/error banners via `AnimatePresence`.
- **Logout** — signs out of Firebase Auth.

**Event Fields stored in Firestore:**
| Field | Type | Required |
|---|---|---|
| `title` | String | ✅ |
| `date` | String (YYYY-MM-DD) | ✅ |
| `category` | String (enum) | ✅ |
| `price` | String (e.g. "1,500/plate") | ❌ |
| `location` | String | ✅ |
| `desc` | String | ✅ |
| `imageUrl` | String (Firebase Storage URL) | ❌ |
| `createdAt` | Firestore Timestamp | Auto |
| `updatedAt` | Firestore Timestamp | Auto |

**Event Categories available:**
- Wedding
- Corporate
- Private Event
- Product Launch
- Gala Dinner

---

## 9. Components (Reusable UI)

### `Navbar.jsx`
- Fixed at top (`z-50`).
- **Scroll behavior:** transparent on homepage → dark `#141414/90` with gold border after scrolling 50px.
- **Non-home pages:** always dark background.
- **Logo:** `/logo.png` + text "VIP CATERING" with shimmer effect.
- **Desktop:** navigation links + animated "Book Now" CTA button.
- **Mobile:** Only logo (mobile navigation is handled by the bottom nav bar separately).

**Navigation Links:** Home, Services, Menu, Events, Gallery, Contact

---

### `Footer.jsx`
Four-column layout:
1. **Brand:** Logo + tagline + social media icons (Instagram, Facebook, YouTube).
2. **Quick Links:** Same nav links.
3. **Our Services:** Listed service types.
4. **Contact Us:** Address, phone numbers, email.

Bottom bar: copyright + Privacy Policy / Terms of Service links.

---

### `MobileBottomNav.jsx`
- **Visible only on mobile** (hidden on `md:`+).
- Fixed at bottom with glassmorphism styling.
- 5 tabs: Home, Events, **Book** (special raised gold button), Menu, Services.
- Active state highlighted with gold color + spring animation.

---

### `IntroAnimation.jsx`
- Cinematic intro splash that plays once on page load.
- Lasts ~3.5 seconds before fading out and revealing the main app.
- The main app fades in with a `delay: 3.5` via `framer-motion`.

---

## 10. Sections (Homepage Building Blocks)

These are sub-components used only inside `HomePage.jsx`:

| Section File | Description |
|---|---|
| `Hero.jsx` | Full-screen background image hero with animated headline, subtext, two CTA buttons ("Book Your Event", "View Events"), and a bouncing scroll indicator. |
| `Services.jsx` | Cards showcasing the different service types (Wedding, Corporate, etc.). |
| `UpcomingEvents.jsx` | Swiper carousel that shows events live from Firestore. Falls back to hardcoded demo events if Firestore is empty. Shows date, title, location, price. "Book Event" hover button. Custom prev/next arrows. |
| `FeaturedEvents.jsx` | A static section with highlighted featured events. |
| `Gallery.jsx` | A gallery teaser section on the homepage (previews a few images). |
| `TrustSection.jsx` | Trust indicators such as years of experience, events served, etc. |
| `CTASection.jsx` | Final call-to-action urging users to contact or book. |

### `UpcomingEvents.jsx` — Live Data Details
- Listens to Firestore `events` collection with `onSnapshot` (real-time).
- Formats `YYYY-MM-DD` date strings into display format `"15 MAR"`.
- Sorts newest events first.
- Falls back to 5 hardcoded events if Firestore is empty.

---

## 11. Firebase Cloud Functions (Backend)

**Location:** `functions/index.js`  
**Runtime:** Node.js (Firebase Functions v1)

Two functions are deployed:

### `sendQuotationEmail`
- **Trigger:** `firestore.document("quotations/{quotationId}").onCreate`
- **What it does:** When a new quotation is saved to Firestore, it sends an HTML email to `vipcateringservice1@gmail.com` with a CC to the customer's email.
- **Email content:** Customer details table + selected menu items grouped by category.
- **Updates Firestore:** Sets `status: "email_sent"` or `status: "email_error"`.

### `sendEnquiryEmail`
- **Trigger:** `firestore.document("enquiries/{enquiryId}").onCreate`
- **What it does:** When a new enquiry is saved, it sends an HTML email with the enquiry details.
- **Email content:** Customer name, phone, email, event type, date, and their message.
- **Updates Firestore:** Sets `status: "email_sent"` or `status: "email_error"`.

> **Note:** Both Cloud Functions run server-side as a fallback/redundant email system. The primary email trigger is done **client-side via EmailJS** (see below) for speed.

---

## 12. Email Integration (EmailJS)

**Library:** `@emailjs/browser`  
**Service ID:** `service_skz1j45`  
**Public Key:** `Jr3WN8l0RSvHVY8tV`

Two email templates:

| Form | Template ID | Sent From |
|---|---|---|
| Contact Page | `template_is30vuj` | ContactPage.jsx |
| Quotation Page | `template_a88e5om` | QuotationPage.jsx |

**Both send to:** `vipcateringservice1@gmail.com`

### Contact Form Email Parameters
```js
{
  name, email, phone,
  event_type, event_date, message,
  to_email: 'vipcateringservice1@gmail.com'
}
```

### Quotation Form Email Parameters
```js
{
  name, email, phone,
  event_type, event_date, guest_count,
  address,
  message,  // Contains the formatted menu item list
  to_email: 'vipcateringservice1@gmail.com'
}
```

---

## 13. Public Assets

All media files are in the `/public` folder and referenced by paths like `/logo.png`, `/banner.mp4`, etc.

| File | Used In |
|---|---|
| `logo.png` | Navbar, Footer |
| `banner.mp4` | Gallery page hero background |
| `video1.mp4` | Gallery quick clips strip |
| `video2.mp4` | Gallery (not currently in strip, available) |
| `get.mp4` | Gallery reels + quick clips |
| `get (1).mp4` | Gallery reels + quick clips |
| `AQMCWHdcJ_...mp4` | Gallery quick clips strip |
| `🎉✨ Your Dream Event...mp4` | Gallery quick clips strip |
| `Reception Flower stage...mp4` | Gallery reels (Wedding Decor) |
| `1) We provide delicious food...mp4` | Available (not currently active) |
| `*.jpg` images | Gallery masonry section |
| `pwa-192x192.png` / `pwa-512x512.png` | PWA icons |
| `vip catering chennai 2.pdf` | Company brochure (not yet linked in UI) |

---

## 14. Admin Panel Guide

> **For the business owner or manager only.**

### How to Access
1. Go to `[your-website-url]/admin`
2. Enter your admin **Email** and **Password**.
3. Click **"Secure Login"**.

### First Time Login
If this is your very first login:
- Use any email and a password (minimum 6 characters).
- The system will **auto-create** your admin account.
- On next login, use the same credentials.

### Managing Events
Once logged in to `/admin/dashboard`:

**Create a New Event:**
1. Click **"New Event"** (gold button).
2. Fill in: Title, Date, Category, Price, Location, Description.
3. Optionally upload an image (max 5MB).
4. Click **"Publish to Website"** — the event immediately appears live on the website.

**Edit an Event:**
1. Hover over any event card — edit (pencil) icon appears.
2. Click it to load the event into the form.
3. Make changes and click **"Commit Changes"**.

**Delete an Event:**
1. Hover over any event card — red trash icon appears.
2. Click it → confirm the deletion.

---

## 15. Customer Flow (User Journey)

### Journey 1 — Direct Enquiry
```
Homepage → Contact Page → Fill Form → Submit → 
  → Saved to Firestore "enquiries" 
  → Email sent to vipcateringservice1@gmail.com (via EmailJS) 
  → Customer redirected to /submission-success
```

### Journey 2 — Menu Quotation
```
Homepage → Menu Page → Select dishes → Click "Get Quotation" →
  → Quotation Page → Fill event details → Submit →
  → Saved to Firestore "quotations"
  → Email with menu selection sent to vipcateringservice1@gmail.com (via EmailJS)
  → Customer sees success screen → Auto-redirect to Homepage after 5s
```

### Journey 3 — Browse Events
```
Homepage → Upcoming Events carousel (live from Firestore) → 
  → Click "View All Events" → Events Page (full listing)
  → Click event card for more detail
```

---

## 16. Routing Map

| URL | Component | Public? |
|---|---|---|
| `/` | `HomePage.jsx` | ✅ |
| `/services` | `ServicesPage.jsx` | ✅ |
| `/menu` | `MenuPage.jsx` | ✅ |
| `/events` | `EventsPage.jsx` | ✅ |
| `/gallery` | `GalleryPage.jsx` | ✅ |
| `/contact` | `ContactPage.jsx` | ✅ |
| `/quotation` | `QuotationPage.jsx` | ✅ (needs menu items in localStorage) |
| `/submission-success` | `SubmissionSuccess.jsx` | ✅ |
| `/admin` | `AdminLogin.jsx` | ✅ (login page) |
| `/admin/dashboard` | `AdminDashboard.jsx` | 🔒 (admin only) |

> **Note:** The admin dashboard does not currently enforce a route guard — any user who manually types `/admin/dashboard` could access it. Future improvement: add an `<AuthGuard />` wrapper that checks Firebase Auth state before rendering.

---

## 17. Key Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.1",
  "firebase": "^12.10.0",
  "framer-motion": "^12.34.4",
  "swiper": "^12.1.2",
  "lucide-react": "^0.576.0",
  "@emailjs/browser": "^4.4.1",
  "tailwindcss": "^3.4.17",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0",
  "vite-plugin-pwa": "^1.2.0"
}
```

---

## 18. Environment Variables & Secrets

### Frontend (no `.env` file — keys are hardcoded in `src/firebase.js`)
> ⚠️ The Firebase API key is exposed client-side — this is **normal and expected** for Firebase web apps. Security is enforced by **Firebase Security Rules**, not by hiding the key.

### Backend — `functions/.env`
| Variable | Purpose |
|---|---|
| `GMAIL_EMAIL` | Gmail address used by nodemailer to send emails |
| `GMAIL_PASSWORD` | Gmail **App Password** (not regular password) |

> ⚠️ Never commit `functions/.env` to Git. It is listed in `.gitignore`.

---

## 19. Deployment (Firebase Hosting)

The site is hosted on Firebase Hosting. Config in `firebase.json`.

### Deploy the Website
```bash
npm run build
firebase deploy --only hosting
```

### Deploy Cloud Functions
```bash
firebase deploy --only functions
```

### Deploy Everything
```bash
npm run build
firebase deploy
```

### Firebase Project
```bash
firebase use vip-catering-401d0
```

---

## 20. Known Quirks & Developer Notes

### 1. Admin Route Has No Auth Guard
`/admin/dashboard` can be accessed without logging in if you know the URL. To fix this, create an `<AuthGuard />` component that uses `onAuthStateChanged` from Firebase and redirects to `/admin` if not authenticated.

### 2. Image Upload CORS
Firebase Storage requires CORS rules to be applied via `gsutil`. If uploads fail with a CORS error, apply the rules from `storage.cors.json`:
```bash
gsutil cors set storage.cors.json gs://vip-catering-401d0.firebasestorage.app
```

### 3. Intro Animation Always Plays
`IntroAnimation.jsx` plays every time the page is hard-refreshed. To show it only once per session, save a flag in `sessionStorage`.

### 4. Mobile Menu Navigation
The mobile hamburger menu (`isMobileMenuOpen`) state is tracked in `Navbar.jsx` but the mobile menu UI is not rendered in the current version of `Navbar.jsx` — it was simplified to only show the logo on mobile. All mobile navigation is now handled by `MobileBottomNav.jsx` (the bottom tab bar).

### 5. Gallery Videos with Special Characters
Some video filenames in `/public` contain emojis and special characters (e.g., `🎉✨ Your Dream Event...mp4`). These work as long as the web server (Firebase Hosting) correctly URL-encodes the file paths. Avoid renaming them unless you update all references.

### 6. QuotationPage Redirects If Empty
The `QuotationPage.jsx` checks `localStorage.getItem('selectedMenuItems')` on mount. If the array is empty (the user went directly to `/quotation` without selecting menu items), it immediately redirects to `/menu`. This is intentional.

### 7. Fonts Loaded Twice
Poppins and Nunito are loaded in both `index.html` (via `<link>` for Playfair Display — outdated leftover) and in `src/index.css` (the actual fonts in use). The `<link>` in `index.html` for Playfair Display can be removed as it's no longer used.

---

*Documentation generated for VIP Catering Chennai — March 2026*
