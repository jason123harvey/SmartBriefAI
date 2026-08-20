# 🚀 SmartBrief AI - Render Deployment Guide

## Complete Guide to Deploying on Render.com

This guide walks you through deploying **SmartBrief AI** to Render.com with production-ready setup.

---

## 📋 Prerequisites

Before starting, you need:

1. **Render.com Account** - Sign up at [render.com](https://render.com)
2. **GitHub Account** - Repository with your code pushed to GitHub
3. **Google Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. **Git installed** - For pushing code to GitHub

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
cd pexpo
git init
git add .
git commit -m "Initial commit: SmartBrief AI full stack app"
```

### 1.2 Push to GitHub

```bash
# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/smartbrief-ai.git

# Push code
git branch -M main
git push -u origin main
```

### 1.3 Verify Repository Structure

Your repository should have:
```
smartbrief-ai/
├── backend/
├── frontend/
├── package.json (root)
├── Procfile
├── render.yaml
└── README.md
```

---

## 🎯 Step 2: Deploy to Render

### Method 1: Using Render Dashboard (Recommended for Beginners)

#### 2.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect Repository"**
4. Select your `smartbrief-ai` repository
5. Click **"Connect"**

#### 2.2 Configure Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `smartbrief-ai-backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free (or Paid if needed) |

#### 2.3 Set Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `GEMINI_API_KEY` | `YOUR_ACTUAL_API_KEY` |
| `PORT` | `10000` |

**To add GEMINI_API_KEY:**
1. Click **"Add Environment Variable"**
2. Key: `GEMINI_API_KEY`
3. Value: Paste your Gemini API key (from Google AI Studio)
4. Do NOT check "Sync with GitHub"

#### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (2-5 minutes)
3. Once deployed, Render provides a URL like: `https://smartbrief-ai-backend.onrender.com`

---

### Method 2: Using render.yaml (Advanced)

#### 2.1 Verify render.yaml

Your `render.yaml` file should exist in the root directory with:

```yaml
services:
  - type: web
    name: smartbrief-ai-backend
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: GEMINI_API_KEY
        sync: false
```

#### 2.2 Deploy via Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render auto-detects `render.yaml`
5. Add environment variables and deploy

---

## 🔑 Step 3: Set Up Environment Variables on Render

### Critical: Add Gemini API Key

After deployment starts, go to **Service Settings** → **Environment**:

1. Click **"Add Environment Variable"**
2. **Key**: `GEMINI_API_KEY`
3. **Value**: Your actual Gemini API key
4. Click **"Save"**

The service will automatically redeploy with the new variable.

### Optional: FRONTEND_URL

If using a custom domain, add:
- **Key**: `FRONTEND_URL`
- **Value**: Your custom domain URL

---

## 📱 Step 4: Access Your Deployed App

Once deployment is complete:

1. Go to your Render service dashboard
2. You'll see a URL like: `https://smartbrief-ai-backend.onrender.com`
3. Click the URL to open your app in browser

**The URL format:**
```
https://your-service-name.onrender.com/
```

---

## ✅ Testing After Deployment

### 1. Check Backend Health

Visit: `https://your-service-name.onrender.com/api/health`

Expected response:
```json
{
  "status": "Backend is running",
  "environment": "production",
  "timestamp": "2024-08-20T10:30:45.123Z"
}
```

### 2. Test the Application

1. Go to `https://your-service-name.onrender.com/`
2. Paste a test article
3. Click "Summarize Article"
4. Verify results appear

### 3. Check Logs

In Render dashboard:
1. Go to your service
2. Click **"Logs"** tab
3. Monitor real-time logs
4. Look for errors if something fails

---

## 🚨 Troubleshooting Deployment

### Issue: Build Failed

**Error**: `Build failed`

**Solutions**:
1. Check **"Logs"** tab for specific error
2. Verify all files are in repository
3. Ensure `package.json` files have correct syntax
4. Try redeploying: Click **"Manual Deploy"** → **"Latest"**

### Issue: Application Crashes

**Error**: Service stops after deployment

**Solutions**:
1. Check **"Logs"** for crash messages
2. Verify `GEMINI_API_KEY` is set in Environment
3. Ensure Node version is compatible (18.x recommended)
4. Check for typos in `.env` variables

### Issue: 502 Bad Gateway

**Error**: `Error 502: Bad Gateway`

**Solutions**:
1. Service might still be starting (wait 2-3 minutes)
2. Check if backend port is correct
3. Verify the service is running: Check logs
4. Restart service: Click **"Restart Service"**

### Issue: API requests fail (404 or 500)

**Error**: "Cannot connect to API"

**Solutions**:
1. Verify `NODE_ENV=production` is set
2. Check API endpoints are correctly configured
3. Look at **"Logs"** tab for API errors
4. Ensure GEMINI_API_KEY is valid and set

### Issue: "API key invalid" error

**Error**: Summarization fails with API key error

**Solutions**:
1. Verify key is from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check key doesn't have extra spaces (copy carefully)
3. Ensure API key is enabled in Google Cloud
4. Try regenerating key in Google AI Studio

---

## 📊 Monitoring & Logs

### View Live Logs

1. Render Dashboard → Your Service
2. Click **"Logs"** tab
3. See real-time application output

### Common Log Messages

**Healthy**:
```
🚀 SmartBrief AI Backend running on port 10000
```

**Error**:
```
Error: GEMINI_API_KEY is not set
```

**Restart**:
```
Server gracefully restarted
```

---

## 🔄 Redeploying After Changes

### If you update your code:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main
```

Render automatically redeploys when you push to main branch (if auto-deploy is enabled).

### Manual Redeploy:

1. Render Dashboard → Your Service
2. Click **"Reconnect"** or **"Manual Deploy"** → **"Latest"**
3. Wait for deployment

---

## 💰 Render Pricing

### Free Plan
- ✅ Perfect for testing and development
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ ~50-second startup time when accessed

### Paid Plans
- **Starter**: $7/month - Always on
- **Standard**: $12/month - Higher performance
- Upgrade anytime in Service Settings

---

## 🎯 Environment Variables Reference

### Required Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `GEMINI_API_KEY` | Google Gemini API authentication | `AIzaSyD-xxxxx...` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Render assigns) | `10000` |

### Optional Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `FRONTEND_URL` | Frontend origin for CORS | Auto-detected |

---

## 📚 File Structure on Render

After deployment, Render creates this structure:

```
/opt/render/project/src/
├── backend/
│   ├── node_modules/
│   ├── services/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── dist/  (built frontend)
│   ├── src/
│   ├── node_modules/
│   └── package.json
└── Procfile
```

Backend serves frontend's `dist/` folder in production.

---

## 🔒 Security Checklist

- ✅ API key stored in Render environment (not in code)
- ✅ `.env` file in `.gitignore`
- ✅ CORS configured for production
- ✅ `NODE_ENV=production` set
- ✅ No sensitive data in logs
- ✅ Repository is private (if containing API key anywhere)

---

## 📞 Additional Resources

- **Render Docs**: https://render.com/docs
- **Node.js on Render**: https://render.com/docs/deploy-node
- **Environment Variables**: https://render.com/docs/environment-variables
- **Troubleshooting**: https://render.com/docs/troubleshooting

---

## ✨ Deployment Success Checklist

- [ ] GitHub repository created and code pushed
- [ ] Render account created
- [ ] Web Service connected to repository
- [ ] Build command set: `npm install && npm run build`
- [ ] Start command set: `npm start`
- [ ] `GEMINI_API_KEY` environment variable added
- [ ] `NODE_ENV` set to `production`
- [ ] Deployment completed successfully
- [ ] Health check endpoint responds
- [ ] Frontend loads without errors
- [ ] Summarization works end-to-end
- [ ] Logs show no errors

---

**Congratulations! Your SmartBrief AI app is now live on Render! 🎉**

Share your deployed URL: `https://your-service-name.onrender.com/`
