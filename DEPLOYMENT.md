# 🚀 Deployment Guide

Deploy the Thumbnail Generator to GitHub and cloud platforms.

## GitHub Setup

### 1. Initialize Git Repository

```bash
# Navigate to project directory
cd thumbnail-generator

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Thumbnail Generator v1.0"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/thumbnail-generator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. GitHub Secrets (for CI/CD)

Add these secrets in GitHub Settings → Secrets and variables → Actions:

```
NANO_BANANA_API_KEY: 297d71aa27179935e1799360cd574bad
GOOGLE_DRIVE_FOLDER_ID: 1h781_9DkWsmnZLkpUEqOHjuNgIdA47dw
```

## Local Development

### Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your API keys
nano .env

# Start development server with auto-reload
npm run dev

# Server runs at http://localhost:3000
```

## Production Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create new app
heroku create your-thumbnail-generator

# Add environment variables
heroku config:set NANO_BANANA_API_KEY=your_api_key
heroku config:set GOOGLE_DRIVE_FOLDER_ID=your_folder_id

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Vercel (Recommended for Frontend)

Note: Vercel is primarily for frontend. Use Heroku for full-stack.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Option 3: AWS EC2

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance.com

# Clone repository
git clone https://github.com/your-username/thumbnail-generator.git
cd thumbnail-generator

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install

# Create .env file
nano .env
# Add: NANO_BANANA_API_KEY, GOOGLE_DRIVE_FOLDER_ID, etc.

# Install PM2 for process management
sudo npm install -g pm2

# Start server
pm2 start server.js --name "thumbnail-generator"
pm2 save
pm2 startup

# Setup Nginx reverse proxy (optional)
# ... additional nginx configuration
```

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t thumbnail-generator:latest .

# Run container
docker run -p 3000:3000 \
  -e NANO_BANANA_API_KEY=your_api_key \
  -e GOOGLE_DRIVE_FOLDER_ID=your_folder_id \
  thumbnail-generator:latest
```

## GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-thumbnail-generator"
          heroku_email: "your-email@example.com"
```

## Environment Variables

Required for production:

```env
# Essential
NANO_BANANA_API_KEY=your_api_key_here
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here

# Server
PORT=3000
NODE_ENV=production

# Optional: Google OAuth2
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URL=https://your-domain.com/auth/google/callback
```

## Monitoring & Maintenance

### Health Check

```bash
# Test API endpoint
curl http://localhost:3000/api/health
```

### Logs

```bash
# View PM2 logs
pm2 logs thumbnail-generator

# View Heroku logs
heroku logs --tail

# View Docker logs
docker logs container_id
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm update

# Restart server
npm restart
```

## Custom Domain Setup

### Heroku

```bash
heroku domains:add your-domain.com
```

Then update DNS records to point to Heroku's servers.

### AWS Route 53 / Other DNS

Add A record pointing to your server IP or load balancer.

## SSL/TLS Certificate

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renew
sudo systemctl enable certbot.timer
```

## Scaling Considerations

For high traffic:

1. **Load Balancing**: Use Heroku Dynos or AWS ALB
2. **Caching**: Implement Redis for session/cache
3. **Database**: Add MongoDB for generation history
4. **Queue**: Use Bull/RabbitMQ for async processing
5. **CDN**: Use Cloudflare for static assets

## Troubleshooting

### Port Already in Use

```bash
# On macOS/Linux
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Key Issues

- Verify API key is correct in `.env`
- Check API key hasn't expired
- Ensure environment variable is set: `echo $NANO_BANANA_API_KEY`

### Memory Issues

```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

## Security Checklist

- [ ] Environment variables not committed to git
- [ ] HTTPS enabled on production
- [ ] API key rotated regularly
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Error messages don't expose sensitive info
- [ ] Rate limiting enabled
- [ ] Logging configured for monitoring

---

For questions or issues, check GitHub Issues or contact support@veonservices.com
