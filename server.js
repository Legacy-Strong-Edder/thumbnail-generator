require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Constants
const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY;
const NANO_BANANA_API_URL = 'https://api.kie.ai/api/v1/jobs';
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw';

// Image library
const IMAGE_LIBRARY = {
    'baseImages/IMG_0008.JPG': 'Portrait 01 - IMG_0008',
    'baseImages/IMG_0009.JPG': 'Portrait 02 - IMG_0009',
    'baseImages/IMG_0010.JPG': 'Portrait 03 - IMG_0010',
    'baseImages/IMG_0011.JPG': 'Portrait 04 - IMG_0011',
    'baseImages/IMG_0012.JPG': 'Portrait 05 - IMG_0012',
    'baseImages/IMG_0013.JPG': 'Portrait 06 - IMG_0013',
    'baseImages/IMG_0014.JPG': 'Portrait 07 - IMG_0014',
    'baseImages/IMG_0016.JPG': 'Portrait 08 - IMG_0016',
    'baseImages/IMG_0017.JPG': 'Portrait 09 - IMG_0017',
    'baseImages/IMG_0018.JPG': 'Portrait 10 - IMG_0018',
    'baseImages/IMG_0019.JPG': 'Portrait 11 - IMG_0019',
    'baseImages/IMG_0021.JPG': 'Portrait 12 - IMG_0021',
    'baseImages/challengingBlackShirt.JPG': 'Challenging Black Shirt',
    'baseImages/confirmingBlackShirt.jpg': 'Confirming Black Shirt',
    'baseImages/poadcastScenarioSerious.jpg': 'Podcast Scenario Serious',
    'baseImages/pointingAffirmative.JPG': 'Pointing Affirmative',
    'baseImages/questioning.JPG': 'Questioning',
    'baseImages/regular1.JPG': 'Regular 1',
    'baseImages/regularBlackShirt.JPG': 'Regular Black Shirt',
    'baseImages/regularPosture.JPG': 'Regular Posture',
    'baseImages/serious.JPG': 'Serious',
    'baseImages/seriousBlackShirt.JPG': 'Serious Black Shirt',
    'baseImages/smilyBlackShirt.JPG': 'Smily Black Shirt',
    'baseImages/smilyBlackShirt1.JPG': 'Smily Black Shirt 1',
    'baseImages/wiseBlackShirt.JPG': 'Wise Black Shirt',
};

// Utility Functions
async function generateHookTitle(context, keywords) {
    // Simple hook generation based on context and keywords
    // In production, you might want to use Claude API for better hooks
    const painPoints = {
        'funding': 'How to Secure Fast Funding',
        'building': 'How to Build in Record Time',
        'repair': 'How to Fix Like a Pro',
        'scaling': 'How to Scale Rapidly',
        'strategy': 'The Strategy Nobody Talks About',
    };

    for (const [key, hook] of Object.entries(painPoints)) {
        if (keywords.toLowerCase().includes(key)) {
            return hook;
        }
    }

    return `The ${keywords} Framework Nobody Knows About`;
}

// Mapping of local image paths to Google Drive IDs for Nano Banana
const LOCAL_TO_DRIVE_MAP = {
    'baseImages/IMG_0008.JPG': '1yb6_S9NYKdPH4f1ITn2hOq124XvUzrrS',
    'baseImages/IMG_0009.JPG': '10HTWMVsULV7MqX2LU1FdD3NZ4vtMy280',
    'baseImages/IMG_0010.JPG': '1TG6RNveJF0jB0wDO0YNQqWlnQpHQCQB-',
    'baseImages/IMG_0011.JPG': '1Tze7ZHNJDzBPI4cCOqwEpnAdWgHFAmyq',
    'baseImages/IMG_0012.JPG': '1m45LRucK5gOmNtfRj_zaEj1obOsAKOJw',
    'baseImages/IMG_0013.JPG': '1MSuATwcK22elJ1ZE3uMZd6xnXFRgsDlB',
    'baseImages/IMG_0014.JPG': '1bZZ0VyMnWxtXyBY-weeLdfTIiF-kBgTv',
    'baseImages/IMG_0016.JPG': '1Tfm_ChJorSkPvUhNArnRZcNKGSYG48cr',
    'baseImages/IMG_0017.JPG': '1YLD81LE2HsGVPq4Ut_rsNDnou7wFjLy5',
    'baseImages/IMG_0018.JPG': '1pFN1qpCqc7xQy-Ffyc4P7tV4eUT8DoCB',
    'baseImages/IMG_0019.JPG': '1pdrX3kRL8bvKF84_zcnjr_3s1sZTdfAu',
    'baseImages/IMG_0021.JPG': '1FWPeRlJvW8z1272uZiVAPjIWiAgJkhnr',
    'baseImages/challengingBlackShirt.JPG': '13eWwqIzQCQ7G7yjKeiPu8fGodXlTorIw',
    'baseImages/confirmingBlackShirt.jpg': '182rlLZZ7anJFnsqMrW3lXWox2ursngl2',
    'baseImages/poadcastScenarioSerious.jpg': '1KggHzqU0UPZ-Weg9qS2mS_gVN-sC4AS6',
    'baseImages/pointingAffirmative.JPG': '1YTKDCUUkAkRhk00yBtB-nFkyjBrR696C',
    'baseImages/questioning.JPG': '1Bjy9ztJ8Q297Bwb7Yh86T9kpI3Ypo_l-',
    'baseImages/regular1.JPG': '1nhMkGgapbDAaLKLrsKdaX3lr_zfwWClY',
    'baseImages/regularBlackShirt.JPG': '1vcJ63wnrfWDidb9mg_4SZ-sxl3O_IrO4',
    'baseImages/regularPosture.JPG': '1Q7yz6z0jY50m-Qcnp4wIigPIYK4jJEDA',
    'baseImages/serious.JPG': '1WW_dzeS4oS0mO1G55LdiSu7EbJcVhYlK',
    'baseImages/seriousBlackShirt.JPG': '14YQij2Bz5rflzsUtmXERkq627k_n6Ql-',
    'baseImages/smilyBlackShirt.JPG': '1jr3OYSrrzH4KmQXIX4y6sVvKBEKUe5Uf',
    'baseImages/smilyBlackShirt1.JPG': '1UUe8AXRZo4ujH27ZgTpeMfptzP-cZBSh',
    'baseImages/wiseBlackShirt.JPG': '13ZwHTTMIh29K8rqfLH5Bb2wRBnAxk64h',
};

async function createNanoBananaTask(imagePath, title, subtitle, primaryColor, secondaryColor) {
    const prompt = `
Create a professional YouTube thumbnail (1280x720px) with CREATIVE professional positioning.

VIDEO TITLE: "${title}"
SUBTITLE: "${subtitle}"

PROFESSIONAL CREATIVE DIRECTION:
- Position person strategically: can be left, center, right, top, bottom, or diagonal
- Text placement: Position title BEHIND person's head/shoulders naturally if it improves composition
- Use professional creativity in layout — not rigid, not template-based
- Everything should feel like ONE cohesive natural image

TEXT TO INCLUDE:
- MAIN TITLE: "${title}" in PRIMARY COLOR (${primaryColor})
  * Position creatively (can be behind head, sides, top, bottom)
  * Make it readable, integrated into design, not floating
- SUBTITLE: "${subtitle}" in WHITE (#FFFFFF)
  * Position where it complements composition

DESIGN ELEMENTS (Integrated, NOT overlaid):
- Primary color (${primaryColor}) accent elements: arrow, checkmark, geometric shapes
- Integrate through color transitions, gradients, lighting
- White (#FFFFFF) and Dark (#101828) for contrast
- Minimalist but creatively executed

COMPOSITION:
- Blend design with person (no hard overlays)
- Use color grading, atmospheric effects
- One cohesive, natural-looking image
- Professional YouTube business aesthetic

DIMENSIONS: 1280x720px PNG, 2K resolution
`;

    // Convert local path to Google Drive URL for Nano Banana
    let imageUrl = imagePath;
    if (imagePath.startsWith('baseImages/') || imagePath.startsWith('/baseImages/')) {
        const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        const driveId = LOCAL_TO_DRIVE_MAP[cleanPath];
        if (!driveId) {
            throw new Error(`No Google Drive ID mapping found for ${cleanPath}`);
        }
        imageUrl = `https://drive.google.com/uc?id=${driveId}`;
    }

    const payload = {
        model: 'nano-banana-2',
        input: {
            prompt: prompt,
            image_input: [imageUrl],
            aspect_ratio: '16:9',
            resolution: '2K',
            output_format: 'png'
        }
    };

    const response = await fetch(`${NANO_BANANA_API_URL}/createTask`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NANO_BANANA_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Nano Banana API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.code !== 200) {
        throw new Error(`API Error: ${data.msg}`);
    }

    return data.data.taskId;
}

async function pollNanoBananaTask(taskId, maxAttempts = 120) {
    let attempts = 0;

    while (attempts < maxAttempts) {
        const response = await fetch(`${NANO_BANANA_API_URL}/recordInfo?taskId=${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${NANO_BANANA_API_KEY}`
            }
        });

        const data = await response.json();

        if (data.data.state === 'success') {
            const resultJson = JSON.parse(data.data.resultJson);
            return resultJson.resultUrls[0];
        } else if (data.data.state === 'fail') {
            throw new Error(`Task failed: ${data.data.failMsg}`);
        }

        attempts++;
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    }

    throw new Error('Task generation timeout');
}

async function uploadToDrive(imageUrl, filename, description) {
    // Simplified approach: Save to local storage with metadata
    // For production, implement OAuth2 flow to Google Drive

    const timestamp = new Date().toISOString();
    const metadata = {
        filename,
        description,
        imageUrl,
        uploadedAt: timestamp,
        folderId: GOOGLE_DRIVE_FOLDER_ID
    };

    // Save metadata to a local JSON file (in production, this would be the Drive upload)
    const uploadLog = path.join(__dirname, 'uploads.json');

    try {
        let uploads = [];
        try {
            const data = await fs.readFile(uploadLog, 'utf-8');
            uploads = JSON.parse(data);
        } catch (e) {
            uploads = [];
        }

        uploads.push(metadata);
        await fs.writeFile(uploadLog, JSON.stringify(uploads, null, 2));

        console.log(`✓ Upload metadata saved: ${filename}`);

        return {
            success: true,
            message: 'Image URL saved. For full Google Drive integration, set up OAuth2 credentials.',
            imageUrl,
            metadata
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: true,
            message: 'Image generated successfully (automatic Drive upload requires OAuth2 setup)',
            imageUrl,
            metadata
        };
    }
}

// Routes
app.post('/api/generate-thumbnail', async (req, res) => {
    try {
        const {
            title,
            context,
            subtitle,
            keywords,
            baseImage,
            contentType,
            primaryColor,
            secondaryColor
        } = req.body;

        // Validate inputs
        if (!baseImage || !IMAGE_LIBRARY[baseImage]) {
            return res.status(400).json({ success: false, message: 'Invalid base image selected' });
        }

        if (!subtitle) {
            return res.status(400).json({ success: false, message: 'Subtitle is required' });
        }

        // Generate title if context provided
        let finalTitle = title;
        if (contentType === 'context') {
            if (!context) {
                return res.status(400).json({ success: false, message: 'Video context is required' });
            }
            finalTitle = await generateHookTitle(context, keywords);
        }

        console.log(`\n🎬 Generating thumbnail:`);
        console.log(`   Title: ${finalTitle}`);
        console.log(`   Subtitle: ${subtitle}`);
        console.log(`   Image: ${IMAGE_LIBRARY[baseImage]}`);

        // Create Nano Banana task
        console.log(`\n📡 Creating Nano Banana task...`);
        const taskId = await createNanoBananaTask(
            baseImage,
            finalTitle,
            subtitle,
            primaryColor || '#75BF80',
            secondaryColor || '#FFFFFF'
        );

        console.log(`✓ Task ID: ${taskId}`);
        console.log(`⏳ Polling for results...`);

        // Poll for result
        const resultUrl = await pollNanoBananaTask(taskId);

        console.log(`✓ Generation complete!`);
        console.log(`📥 Image URL: ${resultUrl}`);

        // Upload to Drive (metadata only for now)
        const uploadedAt = new Date().toISOString();
        const filename = `thumbnail_${Date.now()}.png`;

        await uploadToDrive(resultUrl, filename, `Title: ${finalTitle} | Subtitle: ${subtitle}`);

        // Return success
        res.json({
            success: true,
            message: 'Thumbnail generated successfully',
            imageUrl: resultUrl,
            title: finalTitle,
            subtitle: subtitle,
            generatedAt: uploadedAt
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate thumbnail'
        });
    }
});

app.get('/api/images', (req, res) => {
    res.json({
        success: true,
        images: Object.entries(IMAGE_LIBRARY).map(([id, name]) => ({
            id,
            name,
            url: `/api/image-proxy?id=${id}`
        }))
    });
});

app.get('/api/image-proxy', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id || !IMAGE_LIBRARY[id]) {
            return res.status(400).json({ success: false, message: 'Invalid image ID' });
        }

        const imageUrl = `https://drive.google.com/uc?id=${id}`;
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: 'Failed to fetch image' });
        }

        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');

        response.body.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ success: false, message: 'Failed to proxy image' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Thumbnail Generator Server`);
    console.log(`📍 Running on http://localhost:${PORT}`);
    console.log(`\n✓ API Key configured: ${NANO_BANANA_API_KEY ? 'Yes' : 'No'}`);
    console.log(`✓ Google Drive Folder: ${GOOGLE_DRIVE_FOLDER_ID}`);
    console.log(`\n📂 Open http://localhost:${PORT} in your browser to start generating thumbnails\n`);
});

module.exports = app;
