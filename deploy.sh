#!/bin/bash
# Deployment script for searchmyself.online
# Run this on your DigitalOcean Droplet (159.65.241.135)
# Usage: bash deploy.sh

set -e

APP_NAME="searchmyself"
APP_DIR="/var/www/searchmyself"
REPO_URL="https://github.com/shahzaib-dotcom/searchmyself.git"
DOMAIN="searchmyself.online"
PORT=3001  # Different port from y2buddy

echo "=== Deploying $DOMAIN ==="

# 1. Install Node.js 20 if not present
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 2. Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# 3. Clone or update the repo
if [ -d "$APP_DIR" ]; then
    echo "Updating existing code..."
    cd "$APP_DIR"
    git pull origin main
else
    echo "Cloning repository..."
    sudo mkdir -p "$APP_DIR"
    sudo chown $USER:$USER "$APP_DIR"
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Create data directory for SQLite
mkdir -p data

# 5. Install dependencies
echo "Installing dependencies..."
npm install

# 6. Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local - YOU MUST EDIT THIS!"
    cat > .env.local << 'ENVEOF'
# Google Gemini API
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Admin dashboard password
ADMIN_SECRET=CHANGE_THIS_TO_A_STRONG_PASSWORD

# Site URL
NEXT_PUBLIC_SITE_URL=https://searchmyself.online

# Google AdSense (add after approval)
NEXT_PUBLIC_ADSENSE_CLIENT=

# Rate Limits
DAILY_PER_IP_LIMIT=5
DAILY_GLOBAL_LIMIT=40
ENVEOF
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your actual API keys!"
    echo "   nano $APP_DIR/.env.local"
    echo ""
fi

# 7. Build the app
echo "Building Next.js app..."
npm run build

# 8. Start/restart with PM2
echo "Starting app with PM2..."
pm2 delete "$APP_NAME" 2>/dev/null || true
PORT=$PORT pm2 start npm --name "$APP_NAME" -- start
pm2 save

# 9. Set up PM2 startup (auto-restart on reboot)
pm2 startup systemd -u $USER --hp /home/$USER 2>/dev/null || true

echo ""
echo "=== App running on port $PORT ==="
echo ""
echo "Next steps:"
echo "1. Edit .env.local: nano $APP_DIR/.env.local"
echo "2. Set up Nginx: sudo nano /etc/nginx/sites-available/$DOMAIN"
echo "3. Enable site: sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo "4. Test nginx: sudo nginx -t"
echo "5. Reload nginx: sudo systemctl reload nginx"
echo "6. Get SSL: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
