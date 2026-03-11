# Deployment Guide

## Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- Git
- npm or yarn

---

## Deployment Options

### 1. Heroku (Backend)

#### Step 1: Create Heroku Account

- Visit [heroku.com](https://www.heroku.com) and sign up
- Install Heroku CLI

#### Step 2: Create and Deploy

```bash
# Login to Heroku
heroku login

# From backend directory
cd backend

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
heroku config:set NODE_ENV=production
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Procfile (Create in backend directory)

```
web: node server.js
```

---

### 2. Vercel (Frontend)

#### Step 1: Create Vercel Account

- Visit [vercel.com](https://vercel.com) and sign up
- Connect your GitHub account

#### Step 2: Import Project

```bash
# From frontend directory
cd frontend

# Deploy using CLI
npm i -g vercel
vercel
```

#### Step 3: Set Environment Variables

In Vercel Dashboard:

- Go to Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api`

---

### 3. MongoDB Atlas (Database)

#### Step 1: Create Cluster

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a project
4. Create a cluster

#### Step 2: Get Connection String

1. Click Connect
2. Create MongoDB user (username & password)
3. Add IP whitelist (0.0.0.0/0 for development)
4. Copy connection string

#### Step 3: Use in Backend

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

### 4. Docker Deployment

#### Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Docker Compose (Run both services)

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: ecommerce_mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    ports:
      - '27017:27017'
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    container_name: ecommerce_backend
    environment:
      MONGODB_URI: mongodb://admin:password@mongodb:27017/ecommerce?authSource=admin
      JWT_SECRET: your_secret_key
      NODE_ENV: production
      PORT: 5000
    ports:
      - '5000:5000'
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: ecommerce_frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000/api
    ports:
      - '3000:3000'
    depends_on:
      - backend

volumes:
  mongodb_data:
```

#### Build and Run

```bash
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

### 5. AWS Deployment

#### EC2 Instance Setup

```bash
# Connect to EC2 instance
ssh -i "key.pem" ubuntu@instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb

# Clone repository
git clone https://github.com/yourname/ecommerce.git
cd ecommerce/backend

# Install dependencies
npm install

# Create .env file
nano .env

# Run with PM2 for persistence
npm install -g pm2
pm2 start server.js --name "ecommerce-api"
pm2 startup
pm2 save

# Setup Nginx as reverse proxy
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/default
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Enable SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

### 6. DigitalOcean App Platform

#### Step 1: Create App

1. Visit
   [digitalocean.com/products/app-platform](https://www.digitalocean.com/products/app-platform)
2. Click "Create App"
3. Connect GitHub repository

#### Step 2: Configure Services

- Backend: Node.js service pointing to `backend` directory
- Frontend: Static site pointing to `frontend/out` directory
- Database: Managed MongoDB

#### Step 3: Set Environment Variables

In DO Dashboard:

- Add all environment variables from `.env` files

---

### 7. Railway Deployment

#### Backend Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to GitHub repo
railway link

# Deploy
railway up
```

#### Add Environment Variables

```bash
railway variables:set JWT_SECRET=your_secret
railway variables:set MONGODB_URI=your_mongodb_uri
railway variables:set FRONTEND_URL=https://your-frontend.railway.app
```

---

## Database Backup & Restore

### MongoDB Atlas Backup

```bash
# Automatic backups are enabled by default
# To restore: Atlas Dashboard → Backup → Restore from backup
```

### Manual Backup

```bash
# Export data
mongoexport --uri "mongodb+srv://user:pass@cluster.mongodb.net/ecommerce" \
  --collection products \
  --out products.json

# Import data
mongoimport --uri "mongodb+srv://user:pass@cluster.mongodb.net/ecommerce" \
  --collection products \
  --file products.json
```

---

## Performance Optimization

### Backend

```javascript
// Compression
const compression = require('compression');
app.use(compression());

// Caching
const redis = require('redis');
const client = redis.createClient();

// Lazy loading
app.use((req, res, next) => {
  // Load only required modules
});
```

### Frontend

```javascript
// Image optimization
import Image from 'next/image';

// Dynamic imports
const Component = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
});

// Next.js build optimization
// next.config.js
module.exports = {
  swcMinify: true,
  compress: true,
};
```

---

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
# Install
npm install @sentry/nextjs @sentry/express

# Initialize
sentry init --integration nextjs
```

### Datadog (Monitoring)

```bash
# Install APM
npm install dd-trace

# Initialize
const initializeDatadog = require('dd-trace').init()
```

### PM2 (Process Management)

```bash
# Install
npm install -g pm2

# Start app
pm2 start server.js

# Monitor
pm2 monit

# Logs
pm2 logs
```

---

## Security Checklist

- ✅ Use HTTPS/SSL everywhere
- ✅ Set secure environment variables
- ✅ Enable CORS properly
- ✅ Use security headers (Helmet)
- ✅ Validate all inputs
- ✅ Hash passwords with bcrypt
- ✅ Implement rate limiting
- ✅ Use JWT with expiration
- ✅ Regular security audits
- ✅ Keep dependencies updated

---

## Post-Deployment Verification

```bash
# Test API health
curl https://your-backend.herokuapp.com/api/health

# Test Frontend
curl https://your-frontend.vercel.app

# Check SSL
curl -I https://your-backend.herokuapp.com

# Monitor uptime
# Use tools like UptimeRobot or Pingdom
```

---

## Troubleshooting

### Common Issues

#### Backend won't start

```bash
# Check logs
heroku logs --tail

# Verify MongoDB connection
echo $DATABASE_URL

# Test locally first
npm run dev
```

#### Frontend not loading

```bash
# Check build logs in Vercel dashboard
# Verify environment variables
# Clear cache: vercel --prod --skip-build

# Test locally
npm run build && npm run start
```

#### Database connection timeout

```bash
# Check IP whitelist in MongoDB Atlas
# Verify connection string
# Test connection locally:
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/ecommerce"
```

---

## Maintenance

### Regular Updates

```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Major version update
npm upgrade package-name@latest
```

### Database Maintenance

```bash
# Compact collections
db.collection.reIndex()

# Monitor size
db.collection.stats()

# Clean up old records
db.orders.deleteMany({ createdAt: { $lt: new Date("2023-01-01") } })
```

---

**Last Updated**: January 2024 **Version**: 1.0.0
