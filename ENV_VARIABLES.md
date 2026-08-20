# 🔐 Environment Variables - Complete Reference

## Overview

Environment variables are configuration settings stored securely in Render (not in your code).

---

## 🎯 Variable List for Render

### Critical Variables (Must Set)

#### 1. GEMINI_API_KEY
```
Variable Name: GEMINI_API_KEY
Value: [Your actual API key from Google AI Studio]
Required: YES
Where to get: https://makersuite.google.com/app/apikey
```

**How to set on Render:**
1. Render Dashboard → Your Service
2. Settings → Environment
3. Add Variable
4. Key: `GEMINI_API_KEY`
5. Value: `AIzaSyD-xxxxx...` (paste your key)
6. Save

**Important:**
- Do NOT include quotes
- Do NOT add spaces before/after
- Copy carefully from Google AI Studio
- Do NOT commit to GitHub

#### 2. NODE_ENV
```
Variable Name: NODE_ENV
Value: production
Required: YES (for Render)
```

**Why needed:**
- Enables production optimizations
- Prevents debug output
- Proper error handling

#### 3. PORT
```
Variable Name: PORT
Value: 10000
Required: YES
Render assigns this automatically
```

**Note:** Render assigns this value. Don't change it.

---

### Optional Variables

#### FRONTEND_URL
```
Variable Name: FRONTEND_URL
Value: https://smartbrief-ai-backend.onrender.com
Required: NO
Default: Auto-detected from request
```

**When to use:**
- Custom domain deployment
- When frontend and backend on different domains
- For CORS configuration

**Example values:**
- `https://smartbrief-ai-backend.onrender.com`
- `https://example.com`
- `http://localhost:3000` (development)

---

## 📝 Setting Variables on Render

### Step-by-Step

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click on your service

2. **Open Environment Settings**
   - Click "Environment" tab (or Settings → Environment)
   - You'll see existing variables listed

3. **Add GEMINI_API_KEY**
   - Click "Add Environment Variable"
   - Key: `GEMINI_API_KEY`
   - Value: Paste your API key
   - Click "Save"

4. **Service Auto-Restarts**
   - Render automatically redeploys
   - Wait 1-2 minutes for restart
   - Check service logs for confirmation

5. **Verify Deployment**
   - Visit: `https://your-app.onrender.com/api/health`
   - Should see health check response

---

## 🔒 Security Best Practices

### DO ✅
- ✅ Set sensitive variables in Render Environment
- ✅ Copy API key carefully without extra spaces
- ✅ Use strong, unique API keys
- ✅ Regenerate keys if compromised
- ✅ Keep API key in Render, not in code
- ✅ Use `.gitignore` for `.env` file
- ✅ Review environment variables regularly

### DON'T ❌
- ❌ Put API key in `.env` that's committed
- ❌ Use same API key across multiple projects
- ❌ Share API key in messages/screenshots
- ❌ Commit `.env` file to GitHub
- ❌ Expose secrets in logs
- ❌ Use placeholder values in production
- ❌ Leave API key in code comments

---

## 🧪 Testing Variables

### Check if Variables are Set

**Option 1: View in Render Dashboard**
1. Service → Environment → View all variables

**Option 2: Check Backend Logs**
```
Backend startup message shows environment:
🚀 SmartBrief AI Backend running on port 10000
Environment: production
```

**Option 3: API Health Check**
```bash
curl https://your-app.onrender.com/api/health
```

Should show:
```json
{
  "status": "Backend is running",
  "environment": "production"
}
```

---

## 🆘 Troubleshooting Variables

### Issue: "API key not set" error

**Symptoms:**
- Summarization returns API key error
- Logs show: `Error: GEMINI_API_KEY is not set`

**Solutions:**
1. Go to Render Dashboard
2. Click Service → Environment
3. Verify `GEMINI_API_KEY` is listed
4. Check value is not empty
5. Copy key again (extra spaces might be issue)
6. Click "Save" to trigger redeploy
7. Wait 2 minutes and test

### Issue: Wrong API key

**Symptoms:**
- "API key is invalid" or "quota exceeded"
- Consistent API errors

**Solutions:**
1. Verify key is from Google AI Studio
2. Key should start with: `AIzaSy...`
3. Get new key: https://makersuite.google.com/app/apikey
4. Delete old key, add new one
5. Test immediately

### Issue: Environment variables not updating

**Symptoms:**
- Changes don't take effect
- Old values still active

**Solutions:**
1. Click "Save" after each change
2. Wait for auto-redeploy (2-3 minutes)
3. Check logs for: `Environment variables loaded`
4. If stuck: Click "Manual Deploy" → "Latest"
5. Hard refresh browser (Ctrl+Shift+R)

---

## 📋 Variable Configuration Examples

### Minimal Configuration (Free Plan)
```
GEMINI_API_KEY = AIzaSyD-xxxxx...
NODE_ENV = production
PORT = 10000
```

### Full Configuration (Recommended)
```
GEMINI_API_KEY = AIzaSyD-xxxxx...
NODE_ENV = production
PORT = 10000
FRONTEND_URL = https://your-service.onrender.com
```

### Development Local (.env file)
```
GEMINI_API_KEY = AIzaSyD-xxxxx...
NODE_ENV = development
PORT = 5000
FRONTEND_URL = http://localhost:5173
```

---

## 🔄 Variable Usage in Code

### Backend Access
```javascript
// server.js
const apiKey = process.env.GEMINI_API_KEY;
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
```

### Frontend Access
```javascript
// Note: Frontend CANNOT access backend variables
// Frontend uses environment set by Vite during build
```

---

## 📊 Environment Variables Comparison

| Variable | Development | Production | Required |
|----------|-------------|-----------|----------|
| `GEMINI_API_KEY` | Needed locally | Set in Render | YES |
| `NODE_ENV` | development | production | YES |
| `PORT` | 5000 | 10000 | YES |
| `FRONTEND_URL` | Optional | Optional | NO |

---

## 🚀 Variable Setup Checklist

- [ ] GEMINI_API_KEY obtained from Google AI Studio
- [ ] GEMINI_API_KEY value copied (no extra spaces)
- [ ] Render Dashboard → Environment opened
- [ ] GEMINI_API_KEY added to Render
- [ ] NODE_ENV set to production
- [ ] PORT variable visible (10000)
- [ ] "Save" clicked
- [ ] Service redeploy completed (2-3 min)
- [ ] Health check passes
- [ ] Summarization works end-to-end
- [ ] No API key errors in logs

---

## 💡 Pro Tips

1. **Test Locally First**
   - Set variables in local `.env`
   - Test before deploying to Render

2. **Use Secure Copy**
   - Don't manually type API key
   - Copy directly from Google AI Studio
   - Paste directly into Render

3. **Monitor Variables**
   - Check Render Environment tab weekly
   - Verify all variables still set
   - Regenerate keys if suspicious activity

4. **Version Control**
   - Always use `.gitignore` for `.env`
   - Never commit real API keys
   - Use `.env.example` for template

5. **Debugging**
   - Check logs when issues occur
   - Service → Logs → filter by errors
   - Search for "Error" or "API key"

---

## 🔗 Related Resources

- **Get API Key**: https://makersuite.google.com/app/apikey
- **Render Docs**: https://render.com/docs/environment-variables
- **GitHub .gitignore**: https://github.com/github/gitignore

---

**Your app is now secure and production-ready! 🎉**
