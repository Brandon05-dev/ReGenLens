# 🗺️ Get Your FREE Mapbox Token (2 Minutes)

## Why You Need This

The default Mapbox token has **expired**. To see the real-world 3D map with satellite imagery, you need your own FREE token.

## What You Get (FREE Tier)

✅ **50,000 map loads per month** (plenty for development!)
✅ Real-world satellite imagery
✅ 3D terrain with elevation data
✅ Street maps and labels
✅ Global coverage
✅ No credit card required for free tier

## Quick Setup Steps

### 1. Sign Up (30 seconds)

Go to: https://account.mapbox.com/auth/signup/

- Use your email or GitHub account
- No credit card required
- Completely free for development

### 2. Get Your Token (30 seconds)

After signing up, you'll be redirected to your dashboard, or go to:
https://account.mapbox.com/access-tokens/

- You'll see a "Default public token" already created
- Click the **copy icon** next to it

### 3. Add to Your Project (1 minute)

Open `frontend/.env` and replace the token:

```env
VITE_MAPBOX_TOKEN=pk.YOUR_ACTUAL_TOKEN_HERE
```

### 4. Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## That's It! 🎉

Refresh your browser and you'll see:
- Real satellite imagery of Earth
- 3D terrain with mountains and valleys
- Interactive 3D buildings
- All the real-world map features

## Troubleshooting

**Map still not showing?**
1. Make sure you copied the ENTIRE token (starts with `pk.`)
2. Check there are no extra spaces in the .env file
3. Restart the dev server completely
4. Hard refresh your browser (Ctrl+Shift+R)

**Token not working?**
- Make sure you're using the "Default public token"
- Check that the token is active (green dot in Mapbox dashboard)
- Try creating a new token if needed

## Free Tier Limits

- **50,000 map loads/month** - More than enough for development
- If you exceed, Mapbox will email you
- You can upgrade later if needed (but unlikely for this project)

## Need Help?

Check the official guide: https://docs.mapbox.com/help/getting-started/access-tokens/

---

**Note:** Keep your token in the `.env` file (it's in `.gitignore` so it won't be committed to GitHub)
