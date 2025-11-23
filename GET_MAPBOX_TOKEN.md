# Get Your Free Mapbox Token (2 Minutes)

## Step-by-Step Guide

### 1. Sign Up (30 seconds)
1. Go to: **https://account.mapbox.com/auth/signup/**
2. Enter your email and create a password
3. Click "Get started"

### 2. Verify Email (1 minute)
1. Check your email inbox
2. Click the verification link
3. You'll be redirected to your Mapbox dashboard

### 3. Get Your Token (30 seconds)
1. You'll see your **Default public token** immediately
2. It looks like: `pk.eyJ1IjoieW91cm5hbWUiLCJhIjoiY2x...`
3. Click the **Copy** button

### 4. Add to Your Project (30 seconds)
1. Open `frontend/.env` in your editor
2. Find the line: `VITE_MAPBOX_TOKEN=...`
3. Replace with your token:
   ```env
   VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cm5hbWUiLCJhIjoiY2x...
   ```
4. Save the file

### 5. Restart Server (10 seconds)
```bash
# Press Ctrl+C to stop
# Then run:
npm run dev
```

### 6. See the Magic! ✨
Visit: **http://localhost:5173/dashboard**

You should now see:
- 🗺️ Beautiful 3D terrain
- 🛰️ Satellite imagery
- 🎮 Smooth 3D controls
- ⛰️ Real elevation data

## What You Get (FREE)

✅ **50,000 map loads per month** - More than enough!
✅ **3D terrain** - Real elevation data
✅ **Satellite imagery** - High-resolution photos
✅ **All map styles** - Satellite, Terrain, Dark, Light
✅ **Unlimited interactions** - Pan, zoom, rotate forever
✅ **No credit card required** - Completely free to start

## Quick Links

- **Sign Up**: https://account.mapbox.com/auth/signup/
- **Get Token**: https://account.mapbox.com/access-tokens/
- **Documentation**: https://docs.mapbox.com/

## Troubleshooting

### "Invalid Token" Error
- Make sure you copied the entire token (starts with `pk.`)
- Check for extra spaces before/after the token
- Restart the dev server after adding the token

### Map Still Not Loading
1. Check browser console for errors (F12)
2. Verify the token is in `.env` file
3. Make sure you restarted the server
4. Try refreshing the browser (Ctrl+R)

### Need Help?
- Check `MAPBOX_SETUP.md` for detailed guide
- Mapbox has great support: https://support.mapbox.com/

---

**Total Time: ~2 minutes** ⏱️

**Cost: $0** 💰

**Result: Amazing 3D maps!** 🚀
