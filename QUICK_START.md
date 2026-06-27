# ⚡ Quick Start Guide

Get the Thumbnail Generator running in 5 minutes.

## Prerequisites

- Node.js 14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Already have: Nano Banana 2 API key `297d71aa27179935e1799360cd574bad`

## 1. Install Dependencies (2 minutes)

```bash
cd /Users/edderflores/Downloads/thumbNails_LLS
npm install
```

## 2. Configure Environment (1 minute)

```bash
# Copy template
cp .env.example .env

# No changes needed - API key is already in .env.example
# But you can customize if needed
```

## 3. Start Server (30 seconds)

```bash
npm start
```

You should see:
```
🚀 Thumbnail Generator Server
📍 Running on http://localhost:3000
```

## 4. Open in Browser (30 seconds)

Go to: **http://localhost:3000**

You'll see the form with:
- Video information fields
- Image selector (10 professional portraits)
- Color customization
- Generate button

## 5. Generate Your First Thumbnail!

1. **Fill the form:**
   - Content Type: Choose "Specific Title" or "Video Context"
   - Title: "Thin Profiles"
   - Subtitle: "Young, Foreign, Repair"
   - Select base image: "Professional Portrait 01"
   - Click "Generate Thumbnail"

2. **Wait for generation** (20-60 seconds)
   - Progress bar shows status
   - Image appears when ready

3. **Download or copy URL**
   - See the generated thumbnail
   - Copy URL to clipboard
   - Download to your device

## Development Mode (with auto-reload)

```bash
npm run dev
```

Changes to `server.js` automatically restart the server.

## Forms Fields Explained

### Content Type
- **Specific Title**: Use exact text for thumbnail
- **Video Context**: Provide description, AI generates hook

### Title/Context
- **Title**: Exact text to display (if Specific Title)
- **Context**: Video description (if Video Context)

### Subtitle/Keywords
- Comma-separated keywords/secondary text
- Example: "Young, Foreign, Repair"

### Base Image
- Select from 10 professional portraits
- All on Google Drive, instant preview

### Colors
- **Primary**: Main brand color (default: #75BF80 green)
- **Secondary**: Contrast color (default: #FFFFFF white)

## API (For Developers)

### Generate Thumbnail

```bash
curl -X POST http://localhost:3000/api/generate-thumbnail \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "contentType=title&title=Thin Profiles&subtitle=Young, Foreign, Repair&baseImage=1yb6_S9NYKdPH4f1ITn2hOq124XvUzrrS"
```

Response:
```json
{
  "success": true,
  "imageUrl": "https://...",
  "title": "Thin Profiles",
  "subtitle": "Young, Foreign, Repair",
  "generatedAt": "2024-06-27T15:30:45.123Z"
}
```

### Get Image Library

```bash
curl http://localhost:3000/api/images
```

## Files Structure

```
.
├── index.html           ← Web form (open in browser)
├── server.js            ← Backend API
├── package.json         ← Dependencies
├── .env                 ← API keys (don't commit)
├── .env.example         ← Template
├── .gitignore           ← Git ignore rules
├── README.md            ← Full documentation
├── DEPLOYMENT.md        ← Deploy to production
└── QUICK_START.md       ← This file
```

## Common Issues

### "Cannot find module 'express'"
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Change port in .env
PORT=3001
```

### "API Error: Unauthorized"
- Check API key in `.env`
- Should be: `297d71aa27179935e1799360cd574bad`

### "Image not loading"
- Check internet connection
- Try a different base image
- Refresh the page

## Next Steps

1. ✅ Server running? Great!
2. 📝 Generate your first thumbnail
3. 📤 Copy/download the result
4. 🚀 Deploy to GitHub (see DEPLOYMENT.md)
5. 🌐 Deploy to production (Heroku, AWS, etc.)

## Production Deployment

When ready to go live:

```bash
# See DEPLOYMENT.md for detailed instructions
# Quick option: Deploy to Heroku in 5 minutes
```

## Support

- 📖 Full docs: See `README.md`
- 🚀 Deploy guide: See `DEPLOYMENT.md`
- 🐛 Issues: Check console for error messages
- 💬 Help: Contact support@veonservices.com

---

**You're all set!** 🎉

Open http://localhost:3000 and start generating thumbnails.
