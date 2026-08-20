# 📋 SmartBrief AI - Render Deployment Quick Reference

## Quick Setup (5 Steps)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "SmartBrief AI"
git remote add origin https://github.com/YOUR_USERNAME/smartbrief-ai.git
git push -u origin main
```

### 2. Create Render Web Service
- Go to [render.com](https://render.com)
- Click **New** → **Web Service**
- Connect your GitHub repository

### 3. Configure Build & Start
| Field | Value |
|-------|-------|
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Node Version** | 18.x |

### 4. Add Environment Variables
```
GEMINI_API_KEY = [Your API Key from Google AI Studio]
NODE_ENV = production
PORT = 10000
```

### 5. Deploy
Click **"Create Web Service"** and wait 2-5 minutes.

---

## 🔧 Build & Start Commands for Render

### Build Command
```bash
npm install && npm run build
```

This command:
- ✅ Installs backend dependencies
- ✅ Installs frontend dependencies
- ✅ Builds frontend (creates `/frontend/dist`)
- ✅ Ready for production

### Start Command
```bash
npm start
```

This command:
- ✅ Starts backend server
- ✅ Serves built frontend from `/backend/../frontend/dist`
- ✅ Listens on PORT environment variable
- ✅ Handles all API requests

---

## 🌍 Environment Variables for Render

### Required
```
GEMINI_API_KEY = your_actual_gemini_api_key_here
NODE_ENV = production
PORT = 10000
```

### Optional
```
FRONTEND_URL = https://your-app.onrender.com
```

---

## 🧪 Testing After Deployment

### Check Health
```
https://your-app.onrender.com/api/health
```

Should return:
```json
{
  "status": "Backend is running",
  "environment": "production"
}
```

### Test Full App
1. Go to `https://your-app.onrender.com/`
2. Paste an article
3. Click Summarize
4. Should see results

---

## 📊 Render Deployment Flow

```
Your GitHub Repository
        ↓
Render detects new push
        ↓
Build Phase:
  - npm install
  - npm run build (frontend)
  ↓
Deploy Phase:
  - npm start
  ↓
Backend serves frontend + API
  ↓
App Live at: https://your-app.onrender.com/
```

---

## 🔑 Getting Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Paste in Render Environment Variables (GEMINI_API_KEY)

---

## ❌ Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Build fails | Check logs, verify package.json syntax |
| App crashes | Add GEMINI_API_KEY to Environment |
| API 404 | Check build command completed frontend build |
| 502 Bad Gateway | Wait 2-3 min, check if service started |
| Summarization fails | Verify GEMINI_API_KEY is correct |

---

## 📱 Accessing Your App

Once deployed:
- **Frontend**: `https://your-app.onrender.com/`
- **API Health**: `https://your-app.onrender.com/api/health`
- **Summarize API**: `POST https://your-app.onrender.com/api/summarize`

---

## 🚀 Redeploy After Changes

```bash
# Make changes
git add .
git commit -m "Update message"
git push origin main

# Render auto-redeploys!
```

Or manually: Render Dashboard → Manual Deploy → Latest

---

## 💡 Tips

- Use **Free Plan** for testing (50-sec startup acceptable)
- Monitor **Logs** tab for errors
- CORS automatically configured for production
- Can upgrade to Paid plan anytime for always-on service
- Render provides SSL certificate automatically (HTTPS)

---

**Deployed successfully? Share your URL! 🎉**
