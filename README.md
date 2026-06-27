# 🎬 Professional YouTube Thumbnail Generator

Automated AI-powered YouTube thumbnail generation system using Nano Banana 2 model. Create professional, integrated thumbnails with minimal inputs.

## Features

✨ **Professional Design**
- Minimalist, modern aesthetic based on custom brand colors
- Seamlessly integrated design elements (no overlays)
- Creative positioning and composition

🎨 **AI-Powered Generation**
- Nano Banana 2 model for professional image synthesis
- Automatic hook title generation from video context
- Color-adaptive design matching brand palette

📸 **Image Library**
- Pre-curated professional portrait collection
- Google Drive hosted, publicly accessible
- Easy dropdown selection in form

🚀 **Modern Web Interface**
- Clean, professional form design
- Real-time progress tracking
- Instant preview of generated thumbnails
- One-click URL copy and download

## System Architecture

```
thumbnail-generator/
├── index.html          # Modern web form (frontend)
├── server.js           # Express API backend
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
└── README.md          # This file
```

## Setup Instructions

### 1. Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- Nano Banana 2 API key (provided)
- Google Drive folder for uploads (optional)

### 2. Installation

```bash
# Clone or download the repository
cd thumbnail-generator

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Update .env with your API key
# Edit .env and add:
# NANO_BANANA_API_KEY=your_api_key_here
```

### 3. Configuration

**Essential:**
```env
NANO_BANANA_API_KEY=297d71aa27179935e1799360cd574bad
GOOGLE_DRIVE_FOLDER_ID=1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw
PORT=3000
```

**Optional (for direct Google Drive upload):**
- Set up Google OAuth2 credentials
- Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URL`

### 4. Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start at: `http://localhost:3000`

## Usage Guide

### 1. Open Web Form
Navigate to `http://localhost:3000` in your browser

### 2. Fill Form Fields

**Content Type:**
- **Specific Title**: Use exact text for thumbnail
  - Input: "Thin Profiles"
- **Video Context**: Provide description for AI-generated hook
  - Input: "Learn how to build and fund thin client profiles fast for your business"
  - AI generates: Hook title based on pain points

**Video Information:**
- Subtitle/Keywords: "Young, Foreign, Repair"
- Keywords/Topic: Used for context-based generation

**Image & Design:**
- Select base image from 10 professional portraits
- Customize primary/secondary brand colors (defaults: green + white)

### 3. Generate Thumbnail
- Click "Generate Thumbnail" button
- Progress bar tracks generation (typically 20-60 seconds)
- Result displays automatically upon completion

### 4. Download/Share
- Copy image URL to clipboard
- Download thumbnail to your device
- Image automatically saved to tracking log

## API Endpoints

### POST `/api/generate-thumbnail`

Generate a new thumbnail.

**Request:**
```json
{
  "contentType": "title",
  "title": "Thin Profiles",
  "subtitle": "Young, Foreign, Repair",
  "keywords": "Funding, Building",
  "baseImage": "1yb6_S9NYKdPH4f1ITn2hOq124XvUzrrS",
  "primaryColor": "#75BF80",
  "secondaryColor": "#FFFFFF"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://example.com/thumbnail.png",
  "title": "Thin Profiles",
  "subtitle": "Young, Foreign, Repair",
  "generatedAt": "2024-06-27T15:30:45.123Z"
}
```

### GET `/api/images`

Get list of available base images.

**Response:**
```json
{
  "success": true,
  "images": [
    {
      "id": "1yb6_S9NYKdPH4f1ITn2hOq124XvUzrrS",
      "name": "Professional Portrait 01",
      "url": "https://drive.google.com/uc?id=..."
    },
    ...
  ]
}
```

## Design Rules (Applied Automatically)

### Text Placement
- ✓ Readable in free/safe spaces
- ✓ Can be positioned behind head naturally
- ✓ Never directly obscuring eyes with solid text
- ✓ High contrast with background

### Visual Integration
- ✓ Design elements blended, not overlaid
- ✓ Color transitions and atmospheric effects
- ✓ One cohesive natural image
- ✓ Professional, minimalist aesthetic

### Positioning Flexibility
- ✓ Person can be positioned anywhere: left, center, right, top, bottom
- ✓ Background can be modified/removed if needed
- ✓ Creative, non-rigid layouts
- ✓ Professional creativity over templates

### Brand Colors
- Primary: #75BF80 (Green)
- Secondary: #FFFFFF (White)
- Tertiary: #101828 (Dark)
- Accents: #FF6B6B, #FFB84D, #4A90E2

## Image Library

10 professionally curated portrait images stored on Google Drive:

1. **Professional Portrait 01** - Serious, centered, dark background
2. **Professional Portrait 02** - Neutral expression variant
3. **Professional Portrait 03** - Clear face, business setting
4. **Professional Portrait 04** - Good lighting, focused
5. **Professional Portrait 05** - Professional appearance
6. **Professional Portrait 06** - Clear facial features
7. **Professional Portrait 07** - Strong presence
8. **Professional Portrait 08** - Clean background
9. **Professional Portrait 09** - Confident look
10. **Professional Portrait 10** - Direct gaze

All images hosted on Google Drive for easy access and updates.

## Troubleshooting

### "API Error: File type not supported"
- Ensure image URL is correctly formatted
- Check that the baseImage ID exists in the library
- Verify file is accessible (JPEG/PNG)

### "Task generation timeout"
- Nano Banana 2 is taking longer than expected
- Try again - generation typically takes 20-60 seconds
- Check internet connection and API rate limits

### "Failed to upload to Google Drive"
- For now, image URL is saved to local tracking log
- To enable direct Drive uploads, set up OAuth2 credentials
- Contact admin for OAuth2 configuration

### Progress bar stuck
- Check browser console for errors
- Verify backend is running (`npm start`)
- Try generating again

## Future Enhancements

- [ ] Direct Google Drive upload with OAuth2
- [ ] Batch thumbnail generation
- [ ] Custom image upload
- [ ] Advanced color customization UI
- [ ] Generation history and analytics
- [ ] Webhook notifications for completed tasks
- [ ] Multiple language support
- [ ] Export templates for variations

## Contributing

To add new features:

1. Update `index.html` for frontend changes
2. Update `server.js` for API changes
3. Test locally (`npm run dev`)
4. Commit changes to GitHub

## Support

For issues or feature requests:
- Check troubleshooting section above
- Review console logs for error messages
- Contact: support@veonservices.com

## License

MIT License - VEON Services

---

**Version:** 1.0.0  
**Last Updated:** June 27, 2024  
**Status:** Production Ready ✓
