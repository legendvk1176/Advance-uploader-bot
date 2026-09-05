# Cloudflare Workers Deployment Guide for Advance Uploader Bot

## Setting Environment Variables in Cloudflare

### Step 1: Login to Cloudflare Dashboard
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign in with your Cloudflare account (create one if needed - it's free)

### Step 2: Create/Access Your Workers Project
1. Click **"Workers & Pages"** in the left sidebar
2. Click **"Create application"** → **"Create a Worker"**
3. Name it: `advance-uploader-bot`
4. Click **"Create"**

### Step 3: Deploy from GitHub
1. In your Worker project, click **"Settings"**
2. Go to **"Deployments"** tab
3. Click **"Connect a Git repository"**
4. Select your GitHub account and choose: `legendvk1176/Advance-uploader-bot`
5. Under **"Build settings"**:
   - Build command: `npm install`
   - Build output directory: Leave empty
6. Click **"Save and Deploy"**

### Step 4: Set Environment Variables
After deployment, set the `PYTHON_SERVER_URL`:

**Option A: Via Cloudflare Dashboard**
1. Go to your Worker settings
2. Click **"Settings"** → **"Environment Variables"**
3. Click **"Add variable"**
4. Set:
   - **Variable name**: `PYTHON_SERVER_URL`
   - **Value**: `https://your-python-backend-url.com` (e.g., `https://my-bot.railway.app`)
5. Click **"Save"**
6. Redeploy your worker

**Option B: Via wrangler.toml** (commit to repo)
Edit your `wrangler.toml`:
```toml
name = "advance-uploader-bot"
main = "src/index.js"
compatibility_date = "2024-01-01"

[env.production]
name = "advance-uploader-bot-prod"
vars = { PYTHON_SERVER_URL = "https://your-python-backend-url.com" }
```

### Step 5: Deploy Your Python Backend

You have these free options:

#### **Railway.app (Recommended)**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `legendvk1176/Advance-uploader-bot`
5. Railway auto-detects it's Python (from `requirements.txt`)
6. Add environment variables if needed
7. Deploy
8. Get your URL: `https://your-app-name.up.railway.app`

#### **Render.com**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New+" → "Web Service"
4. Connect your GitHub repo
5. Set:
   - **Name**: `advance-uploader-bot`
   - **Runtime**: `Python 3.11`
   - **Build command**: `pip install -r requirements.txt`
   - **Start command**: `python main.py` or `gunicorn app:app`
6. Deploy
7. Get your URL from the dashboard

### Step 6: Update Cloudflare with Your Backend URL

Once your Python app is deployed:

1. Go back to Cloudflare Dashboard
2. Open your `advance-uploader-bot` Worker
3. Click **Settings** → **Environment Variables**
4. Update `PYTHON_SERVER_URL` with your actual backend URL
5. Click **Save** and redeploy

### Step 7: Test Your Setup
```bash
# Test if Cloudflare Worker is working
curl https://advance-uploader-bot.workers.dev/

# Should proxy to your Python backend
```

---

## Environment Variables Explained

| Variable | Example | Purpose |
|----------|---------|---------|
| `PYTHON_SERVER_URL` | `https://my-bot.railway.app` | URL of your Python backend (Railway, Render, etc.) |

When a request comes to your Cloudflare Worker, it automatically forwards it to this URL.

---

## Your Cloudflare Worker URL
After deployment, your bot will be available at:
- **Primary**: `https://advance-uploader-bot.workers.dev`
- **Custom domain**: Add your own domain in Cloudflare settings

---

## Troubleshooting

**"PYTHON_SERVER_URL environment variable not set"**
- Go to Worker Settings → Environment Variables
- Add the variable and redeploy

**"502 Bad Gateway"**
- Check if your Python backend URL is correct
- Ensure your Python app is running

**"Timeout"**
- Python app might be slow to respond
- Check Railway/Render logs
- Cloudflare Workers have a 30-second timeout limit

---

## Quick Checklist
- [ ] Created Cloudflare Workers account
- [ ] Deployed this repository to Cloudflare Workers
- [ ] Deployed Python backend to Railway or Render
- [ ] Set `PYTHON_SERVER_URL` in Cloudflare environment variables
- [ ] Redeployed Worker after setting variables
- [ ] Tested the URL
