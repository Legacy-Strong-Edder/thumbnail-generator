# YouTube Thumbnail Generator - Complete Documentation

**Project Owner:** VEON Services  
**Current Deployment:** https://thumbnail-generator-wfdm134.vercel.app/  
**Repository:** github.com/legacy-strong-edder/thumbnail-generator  
**Last Updated:** 2026-06-29

---

## 🎯 Project Overview

The **YouTube Thumbnail Generator** is a full-stack application that generates professional, AI-powered YouTube thumbnails. It combines a modern web interface with backend AI processing to create custom thumbnails with dynamic text, colors, and base image selection.

### Key Features
- ✅ 25+ base image library with live preview
- ✅ Real-time image preview selector
- ✅ AI-powered thumbnail generation using Nano Banana 2
- ✅ Customizable title, subtitle, keywords, and colors
- ✅ Professional YouTube business aesthetic (1280x720px, 2K resolution)
- ✅ Generation history tracking (uploads.json)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Browser)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ index.html                                           │   │
│  │ • Form: Title, Subtitle, Keywords, Colors          │   │
│  │ • Image Selector (25 base images)                   │   │
│  │ • Live Preview Container                            │   │
│  │ • Status/Progress Display                           │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │ JSON (POST/GET)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js/Express)                 │
│                   server.js (Vercel Serverless)             │
│                                                              │
│  ┌─────────────┐  ┌────────────────┐  ┌──────────────────┐ │
│  │ API Routes  │  │ Static Files   │  │ Middleware       │ │
│  ├─────────────┤  ├────────────────┤  ├──────────────────┤ │
│  │ /api/       │  │ /baseImages/*  │  │ CORS             │ │
│  │ generate-   │  │ /index.html    │  │ JSON Parser      │ │
│  │ thumbnail   │  │ CSS/JS         │  │ URL Encoded      │ │
│  │             │  │                │  │                  │ │
│  │ /api/image- │  │                │  │                  │ │
│  │ proxy       │  │                │  │                  │ │
│  └─────────────┘  └────────────────┘  └──────────────────┘ │
│        │                                                     │
│        └──────────────────┬──────────────────────────────────│
└───────────────────────────┼──────────────────────────────────┘
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
    ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
    │ Nano Banana │  │ Google Drive  │  │ Local Files  │
    │ 2 AI API    │  │ Images (IDs)  │  │ baseImages/* │
    │ (Generation)│  │              │  │              │
    └─────────────┘  └──────────────┘  └──────────────┘
```

---

## 📦 Technology Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **HTML5** | Structure & Markup | Standard |
| **CSS3** | Styling & Animations | Flexbox, Grid, Gradients |
| **Vanilla JavaScript** | Client-side Logic | ES6+ |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime | 18+ |
| **Express.js** | Web Framework | 4.18.2 |
| **CORS** | Cross-Origin Requests | 2.8.5 |
| **dotenv** | Environment Variables | 16.3.1 |
| **node-fetch** | HTTP Client | 2.7.0 |
| **googleapis** | Google Drive API | 118.0.0 |

### External Services
| Service | Purpose | Auth |
|---------|---------|------|
| **Nano Banana 2 API** | AI Thumbnail Generation | API Key |
| **Google Drive** | Image Storage & Metadata | Folder ID |

### Deployment
| Platform | Purpose |
|----------|---------|
| **Vercel** | Production Hosting (Serverless Node.js) |
| **GitHub** | Source Control & GitHub Pages (fallback) |

---

## 🚀 Deployment Guide

### Current Deployment
- **URL:** https://thumbnail-generator-wfdm134.vercel.app/
- **Platform:** Vercel (Serverless Function)
- **Region:** Auto (Vercel Edge Network)

### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

**Why Vercel?**
- ✅ Supports Node.js/Express backend
- ✅ Automatic HTTPS
- ✅ Serverless = No server management
- ✅ Environment variables support
- ✅ Auto-redeploy on GitHub push

**Why NOT GitHub Pages?**
- ❌ Static-only (no backend)
- ❌ Cannot handle POST requests to `/api/*`
- ❌ No Node.js runtime

### Step-by-Step Deployment

#### 1. **Local Setup**
```bash
# Clone repository
git clone https://github.com/legacy-strong-edder/thumbnail-generator.git
cd thumbnail-generator

# Install dependencies
npm install

# Copy .env file (create if not exists)
cp .env.example .env  # Or provide manually
```

#### 2. **Environment Variables Setup**
```bash
# .env (at project root)
NANO_BANANA_API_KEY=297d71aa27179935e1799360cd574bad
GOOGLE_DRIVE_FOLDER_ID=1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw
PORT=3000
NODE_ENV=production  # Set when deploying
```

⚠️ **IMPORTANT:** Variable names are **case-sensitive**
- ✅ Correct: `NANO_BANANA_API_KEY` (all caps)
- ❌ Wrong: `nano_banana_api_key` (lowercase) — causes 401 auth failure

#### 3. **Deploy to Vercel**
```bash
# Option A: Automatic (GitHub Integration)
# Just push to main branch — Vercel auto-deploys

# Option B: Manual (Vercel CLI)
npm i -g vercel
vercel deploy --prod

# Option C: Vercel Web UI
# https://vercel.com/dashboard
# → Select project → Deployments → Re-deploy
```

#### 4. **Verify Deployment**
```bash
# Test API endpoint
curl https://thumbnail-generator-wfdm134.vercel.app/api/health

# Check logs
vercel logs --tail
```

### Rollback (If Issues)
```bash
# Revert last commit
git revert HEAD
git push origin main

# Vercel will auto-redeploy with previous version
```

---

## 📁 Project Structure

```
thumbnail-generator/
├── index.html                    # Main UI (frontend)
├── server.js                     # Express backend server
├── package.json                  # Dependencies & scripts
├── package-lock.json            # Dependency lock file
├── .env                          # Environment variables
├── .env.example                  # Template for .env
├── vercel.json                   # Vercel deployment config
├── uploads.json                  # Generation history (auto-created)
│
├── baseImages/                   # 25+ Base image library
│   ├── IMG_0008.JPG
│   ├── IMG_0009.JPG
│   ├── ... (23 more images)
│   └── wiseBlackShirt.JPG
│
├── node_modules/                # Dependencies (gitignored)
├── .git/                         # Git repository
└── .claude/
    └── settings.local.json       # Claude Code settings
```

---

## 🔧 Setup Instructions

### Development Environment

#### Prerequisites
- Node.js 18+ (Download: https://nodejs.org/)
- npm 9+ (comes with Node.js)
- Git (Download: https://git-scm.com/)

#### Local Development
```bash
# 1. Clone the project
git clone https://github.com/legacy-strong-edder/thumbnail-generator.git
cd thumbnail-generator

# 2. Install dependencies
npm install

# 3. Create .env file with API keys
echo "NANO_BANANA_API_KEY=your_key_here" > .env
echo "GOOGLE_DRIVE_FOLDER_ID=your_folder_id" >> .env
echo "PORT=3000" >> .env

# 4. Start development server
npm run dev
# Server runs at http://localhost:3000

# 5. Start production build (for testing)
npm start
```

#### Available Scripts
```bash
npm run dev   # Start with auto-reload (nodemon)
npm start     # Start production server
npm test      # Run tests (currently: no tests)
```

### Production Environment (Vercel)
- **No local installation needed** — Vercel handles it automatically
- Push to `main` branch → Auto-deploy within 2 minutes
- Check deployment status: https://vercel.com/dashboard

---

## 🔑 API Endpoints

### 1. Generate Thumbnail
**Endpoint:** `POST /api/generate-thumbnail`

**Request Body:**
```json
{
  "title": "How to Build Fast",
  "subtitle": "The Ultimate Guide",
  "keywords": "building,startup,growth",
  "context": "Business/entrepreneurship tutorial",
  "baseImage": "baseImages/IMG_0009.JPG",
  "contentType": "educational",
  "primaryColor": "#75bf80",
  "secondaryColor": "#101828"
}
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "thumbnailUrl": "https://cdn.nanobannana.ai/output.png",
  "message": "Thumbnail generated successfully"
}
```

**Response (Error - 400/500):**
```json
{
  "status": "error",
  "message": "Failed to generate thumbnail",
  "details": "API Key expired or invalid"
}
```

**Timeout:** 5-10 minutes for generation (polling every 2 seconds)

---

### 2. Image Proxy
**Endpoint:** `GET /api/image-proxy?url=<image_url>`

**Purpose:** Serve Google Drive images with CORS headers

**Request:**
```bash
GET /api/image-proxy?url=https://drive.google.com/uc?id=1yb6_S9NYKdPH4f1ITn2hOq124XvUzrrS
```

**Response:** Image file with CORS headers

---

### 3. Health Check
**Endpoint:** `GET /` or `GET /index.html`

**Response:** HTML index page (200 OK)

---

## 🎨 UI/UX Flow

### User Journey
```
1. USER LANDS ON SITE
   ↓
2. SELECT BASE IMAGE → PREVIEW LOADS (top-right)
   ↓
3. FILL FORM
   • Title: Main message (50 chars max recommended)
   • Subtitle: Secondary text (60 chars max)
   • Keywords: Search tags (for AI context)
   • Context: Video topic/category
   • Colors: Primary (#75bf80) & Secondary (#101828)
   ↓
4. CLICK "Generate Thumbnail"
   ↓
5. PROGRESS BAR SHOWS (5-10 min)
   ↓
6. THUMBNAIL DISPLAYS
   ↓
7. DOWNLOAD OR GENERATE ANOTHER
```

### Form Validation
- ✅ All fields required (except Context)
- ✅ Color picker: Hex values only (#RRGGBB)
- ✅ Image selection: 25 images available
- ✅ No file upload needed (uses pre-loaded images)

---

## 💾 Data Storage

### Local Storage
- **uploads.json** - Generation history (JSON)
  - Format: Array of metadata objects
  - Fields: `filename`, `description`, `imageUrl`, `uploadedAt`, `folderId`
  - Purpose: Audit trail & statistics

### Google Drive
- **Folder ID:** `1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw`
- **Content:** Generated thumbnails (metadata logged)
- **Access:** Read-only for API (no direct upload yet)

### Image Library
- **Location:** `/baseImages/` directory (25 images)
- **Format:** JPG (compressed photos/portraits)
- **Size:** ~5-10 MB total
- **Mapping:** `LOCAL_TO_DRIVE_MAP` in server.js (local paths → Google Drive IDs)

---

## 🔐 Environment Variables

### Required Variables
| Variable | Value | Purpose |
|----------|-------|---------|
| `NANO_BANANA_API_KEY` | `297d71aa27179935e1799360cd574bad` | AI API Authentication |
| `GOOGLE_DRIVE_FOLDER_ID` | `1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw` | Output folder ID |
| `PORT` | `3000` | Server port (dev only) |

### Optional Variables
| Variable | Default | Purpose |
|----------|---------|---------|
| `NODE_ENV` | `development` | Environment mode |

### Where to Set
1. **Local Dev:** Create `.env` file at root
2. **Vercel:** Settings → Environment Variables
3. **GitHub Actions:** Settings → Secrets

### ⚠️ Security Notes
- **Never commit `.env` to Git** — Add to `.gitignore`
- **Rotate API keys** every 3-6 months
- **Use Vercel secrets** for production (not in code)
- **Keep API key private** — Share only with authorized team members

---

## 🐛 Troubleshooting

### Issue 1: "Failed to generate thumbnail: Error 400"
**Cause:** Malformed request or missing required fields

**Solution:**
```javascript
// Verify in browser console:
console.log(requestData);
// Check that all fields are strings, not null/undefined
```

---

### Issue 2: Preview Images Not Loading
**Cause:** Relative path issues or CORS blocking

**Solution:**
```bash
# 1. Clear browser cache (Ctrl+Shift+Del)
# 2. Check Network tab (F12) for 404 errors
# 3. Verify baseImages folder exists locally
# 4. Reload with Ctrl+F5 (hard refresh)
```

---

### Issue 3: "401 Unauthorized" from Nano Banana API
**Cause:** Invalid or expired API key

**Solution:**
```bash
# 1. Verify key in Vercel dashboard:
#    Settings → Environment Variables
# 2. Ensure variable name is UPPERCASE: NANO_BANANA_API_KEY
# 3. Regenerate key at https://api.kie.ai/
# 4. Redeploy after updating
```

---

### Issue 4: Vercel 404 on Deployment
**Cause:** Missing `vercel.json` or routes misconfigured

**Solution:**
```bash
# 1. Verify vercel.json exists at root
# 2. Check routes point to server.js
# 3. Trigger redeploy:
git commit --allow-empty -m "Force redeploy"
git push origin main
```

---

### Issue 5: "Cannot GET /api/generate-thumbnail" on GitHub Pages
**This is expected** — GitHub Pages is static-only.

**Solution:** Use Vercel instead (already configured).

---

### Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `SyntaxError: duplicate identifier 'data'` | Variable name collision | Check line 616 in index.html |
| `fetch CORS error` | Cross-origin image request | Use `/api/image-proxy` endpoint |
| `Task generation timeout` | Nano Banana slow or unreachable | Increase timeout or check API status |
| `ENOENT: uploads.json` | File doesn't exist yet | First generation creates it automatically |

---

## 📊 Performance Optimization

### Frontend
- ✅ Lazy image loading (base images)
- ✅ Debounced preview updates
- ✅ Minimal external dependencies
- ✅ CSS-in-HTML (no separate stylesheet)

### Backend
- ✅ Serverless (Vercel) = Auto-scaling
- ✅ Polling with 2-second intervals (Nano Banana)
- ✅ Static file caching headers
- ✅ CORS allowed (for cross-origin images)

### Optimization Tips
1. **Reduce image sizes** in baseImages folder (current: 5-10 MB)
2. **Add CDN** for base images (currently: served from Vercel)
3. **Implement request caching** for identical generations
4. **Add image compression** post-generation

---

## 🔄 Maintenance Schedule

### Daily
- [ ] Monitor Vercel logs for errors
- [ ] Check API response times

### Weekly
- [ ] Review uploads.json for generation stats
- [ ] Test thumbnail generation manually
- [ ] Check GitHub for new issues

### Monthly
- [ ] Audit Nano Banana API usage
- [ ] Review and rotate API keys
- [ ] Update dependencies: `npm update`
- [ ] Performance review (Vercel analytics)

### Quarterly
- [ ] Update Node.js/dependencies: `npm audit fix`
- [ ] Review Google Drive folder for cleanup
- [ ] A/B test prompt engineering improvements

---

## 👥 Team Roles & Responsibilities

| Role | Tasks | Permissions |
|------|-------|-----------|
| **Developer** | Code changes, local testing, feature PRs | Repo write access |
| **DevOps** | Deployment, env vars, Vercel settings | Vercel admin access |
| **Product** | Feature requests, prompt iteration | GitHub issues/PRs |
| **QA** | Testing, bug reports, performance | Repo read access, Vercel view |

---

## 📝 Common Tasks

### Add New Base Image
```bash
# 1. Add image to baseImages/ folder
# 2. Update IMAGE_LIBRARY in server.js (line ~28)
# 3. Add to index.html select dropdown (line ~441)
# 4. Map to Google Drive ID in LOCAL_TO_DRIVE_MAP (line ~78)
# 5. Test locally: npm run dev
# 6. Push to main (auto-deploys)
```

### Update Nano Banana Prompt
```javascript
// Edit createNanoBananaTask() in server.js (line ~106)
// Modify prompt variable to change generation behavior
// Example: Change "professional" to "vibrant" style
```

### Extend Form Fields
```html
<!-- 1. Add input in index.html form -->
<input type="text" id="newField" placeholder="...">

<!-- 2. Add to requestData in form submission (line ~590) -->
newField: document.getElementById('newField').value,

<!-- 3. Use in server.js endpoint -->
app.post('/api/generate-thumbnail', async (req, res) => {
  const { newField } = req.body;
  // Use newField...
})
```

---

## 🎓 Learning Resources

- **Express.js Docs:** https://expressjs.com/
- **Nano Banana AI API:** https://api.kie.ai/docs
- **Google Drive API:** https://developers.google.com/drive
- **Vercel Deployment:** https://vercel.com/docs
- **HTTP/REST:** https://developer.mozilla.org/en-US/docs/Web/HTTP

---

## 📞 Support & Contact

| Issue Type | Contact | Channel |
|-----------|---------|---------|
| **Bug Report** | Dev Team | GitHub Issues |
| **Deployment Issue** | DevOps | Slack #devops |
| **Feature Request** | Product | GitHub Discussions |
| **API Question** | Dev Lead | Email or Slack |

---

## 📄 License & Attribution

- **License:** MIT
- **Author:** VEON Services
- **Built with:** Nano Banana 2 AI, Google Drive, Vercel

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-29 | Initial deployment to Vercel |
| 1.0.0 | 2026-06-28 | Fixed variable naming conflict (data → requestData) |
| 1.0.0 | 2026-06-27 | Fixed static file serving for baseImages |
| 1.0.0 | 2026-06-27 | Changed form submission to JSON format |

---

**Last Updated:** 2026-06-29  
**Next Review:** 2026-07-29  
**Status:** ✅ Production Ready
