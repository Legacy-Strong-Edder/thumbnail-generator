# Quick Start Guide

Get up and running in 5 minutes.

## 🎯 For Users (Team Members)

### Using the App
1. **Go to:** https://thumbnail-generator-wfdm134.vercel.app/
2. **Select** a base image from dropdown (preview loads on right)
3. **Fill out form:**
   - Title: What's your video about? (e.g., "How to Build Fast")
   - Subtitle: Secondary message (e.g., "The Ultimate Guide")
   - Keywords: Tags (e.g., "building,startup")
   - Primary Color: Pick a color (default: #75bf80)
4. **Click** "Generate Thumbnail"
5. **Wait** 5-10 minutes (progress bar shows status)
6. **Download** when ready

### Tips
- ✅ Use high-contrast titles for readability
- ✅ Keep text short (20-30 characters)
- ✅ Test preview image before generating
- ✅ Generate multiple versions to compare

---

## 👨‍💻 For Developers (Setup)

### Prerequisites
- Node.js 18+ (Download: https://nodejs.org/)
- Git (Download: https://git-scm.com/)

### Setup (2 minutes)
```bash
# 1. Clone
git clone https://github.com/legacy-strong-edder/thumbnail-generator.git
cd thumbnail-generator

# 2. Install
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with your API keys

# 4. Start
npm run dev

# 5. Open browser
open http://localhost:3000
```

### Common Commands
```bash
npm run dev    # Start dev server (auto-reload)
npm start      # Start production server
npm test       # Run tests
```

### File Locations
- **Frontend:** `index.html`
- **Backend:** `server.js`
- **Config:** `vercel.json`, `.env`
- **Images:** `baseImages/`

---

## 🚀 For DevOps (Deployment)

### Deploy to Vercel
```bash
# Option 1: Auto (already configured)
git push origin main  # Vercel auto-deploys in 2-3 min

# Option 2: Manual
vercel deploy --prod
```

### Check Status
```bash
# View deployment logs
vercel logs --tail

# View deployments
vercel ls
```

### Set Environment Variables
```bash
# Via Vercel CLI
vercel env add NANO_BANANA_API_KEY
vercel env add GOOGLE_DRIVE_FOLDER_ID

# Or via Vercel web dashboard:
# https://vercel.com/dashboard → Project → Settings → Environment Variables
```

---

## 🆘 Troubleshooting

### Images not loading?
```bash
# 1. Clear browser cache: Ctrl+Shift+Del
# 2. Hard refresh: Ctrl+Shift+R
# 3. Check console: F12 → Console tab
```

### Thumbnail generation fails?
```bash
# 1. Check API key in Vercel dashboard
# 2. Verify env variable is UPPERCASE: NANO_BANANA_API_KEY
# 3. Check logs: vercel logs --tail
```

### Form won't submit?
```bash
# 1. Open DevTools: F12
# 2. Check Console for errors
# 3. Verify all form fields are filled
```

### Deployment stuck?
```bash
# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push origin main
```

---

## 📚 Full Documentation

See **DOCUMENTATION.md** for complete setup, architecture, and API details.

---

## 📞 Need Help?

- **Bug:** Open GitHub issue
- **Question:** Slack #dev-support
- **Deployment Issue:** Slack #devops
