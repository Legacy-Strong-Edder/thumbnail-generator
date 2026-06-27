#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎬 Thumbnail Generator - Setup Script${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js ${NC}$(node --version)"
echo -e "${GREEN}✓ npm${NC} $(npm --version)\n"

# Check if npm packages are installed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}\n"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${BLUE}⚙️  Setting up environment variables...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}\n"
else
    echo -e "${GREEN}✓ .env file already exists${NC}\n"
fi

# Display setup summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}\n"

echo -e "${YELLOW}Next steps:${NC}"
echo "1. Start the server:"
echo -e "   ${GREEN}npm start${NC}"
echo ""
echo "2. Open in your browser:"
echo -e "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo "3. For development with auto-reload:"
echo -e "   ${GREEN}npm run dev${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "For more information, see:"
echo "  • QUICK_START.md - Quick setup guide"
echo "  • README.md - Full documentation"
echo "  • DEPLOYMENT.md - Production deployment\n"
