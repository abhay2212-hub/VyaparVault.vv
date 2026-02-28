# 🚀 VyaparVault - Aqua Host Deployment Guide

This guide explains how to host your site on **Aqua Host** (or any cPanel-based Node.js hosting).

## 🏢 Strategy 1: Shared Hosting (Recommended)
Host the frontend as static files in `public_html` and the backend as a separate Node.js app.

### 1. Frontend Prep
1.  In `frontend/next.config.js`, ensure `output: 'export'` is present (it already is).
2.  Update `frontend/.env.local`:
    ```env
    NEXT_PUBLIC_API_URL=https://your-api-domain.com
    ```
3.  Run the build:
    ```bash
    cd frontend
    npm run build
    ```
4.  Upload the content of the `frontend/out` folder to the `public_html` directory of your cPanel.
5.  Upload the `.htaccess` file (already created in `frontend/`) to `public_html`.

### 2. Backend Prep
1.  Go to cPanel -> **Setup Node.js App**.
2.  Create a new application:
    - **Node.js version**: 18.x or 20.x
    - **Application mode**: Production
    - **Application root**: `backend` (or upload files there)
    - **Application startup file**: `index.js`
3.  Add **Environment Variables**:
    - `SUPABASE_URL`: Your Supabase URL
    - `SUPABASE_KEY`: Your Supabase Key
    - `CLOUDINARY_...`: Your Cloudinary credentials
    - `RAZORPAY_...`: Your Razorpay credentials
    - `PRODUCTION_CORS`: `https://yourdomain.com`
4.  Run **npm install** from the cPanel Node.js interface.

---

## 🏗️ Strategy 2: Single Domain (All-in-One)
Run the backend and let it serve the frontend files.

1.  Build the frontend: `npm run build`.
2.  Copy `frontend/out` folder into `backend/public`.
3.  In `backend/.env` (on the server), set:
    ```env
    SERVE_FRONTEND=true
    ```
4.  Host only the `backend` folder through the cPanel Node.js Selector.

---

## 🛠️ Verification
- **API Health**: Visit `https://your-api-domain.com/` (Should see "VyaparVault API is Running...")
- **CORS**: Ensure `PRODUCTION_CORS` matches your main site domain.

---
> [!TIP]
> **HTTPS**: Aqua Host provides free Let's Encrypt SSL. Ensure it's active for both your frontend and api domains to avoid 'Mixed Content' errors.
