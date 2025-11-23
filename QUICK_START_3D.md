# 🚀 Quick Start: Enable 3D Map (2 Minutes)

## Your Dashboard is Ready!

Visit: **http://localhost:5173/dashboard**

You'll see a working map, but to unlock the **full 3D experience** with terrain and satellite imagery, follow these quick steps:

## ⚡ Super Quick Setup

### 1️⃣ Get Token (1 minute)
Click this link: **https://account.mapbox.com/auth/signup/**
- Sign up with your email
- Copy your token (starts with `pk.`)

### 2️⃣ Add Token (30 seconds)
Open `frontend/.env` and update:
```env
VITE_MAPBOX_TOKEN=pk.your_actual_token_here
```

### 3️⃣ Restart (30 seconds)
```bash
# Press Ctrl+C, then:
npm run dev
```

### 4️⃣ Enjoy! ✨
Refresh your browser and see:
- 🏔️ **3D Terrain** - Real mountains and valleys
- 🛰️ **Satellite View** - High-res imagery from space
- 🎮 **3D Controls** - Rotate, tilt, and fly around
- 🌍 **Beautiful Maps** - 4 different styles

## 🎮 3D Controls

Once enabled, you can:
- **Pan**: Click + drag
- **Zoom**: Scroll wheel
- **Rotate**: Right-click + drag (or Ctrl + drag)
- **Tilt**: Ctrl + drag up/down
- **Fly to region**: Click any marker

## 🎨 Features You Get

### Map Styles
- 🛰️ **Satellite** - Real satellite photos
- ⛰️ **Terrain** - Topographic with elevation
- 🌙 **Dark** - Night mode
- ☀️ **Light** - Clean minimal

### 3D Terrain
- Toggle on/off with the checkbox
- Exaggeration: 2.0x (dramatic mountains!)
- Real elevation data from NASA

### Camera Angles
- **Initial view**: 60° pitch (tilted for 3D)
- **Region zoom**: 65° pitch + 30° rotation
- **Smooth animations**: 2-second fly-to transitions

## 💡 Tips

### Best 3D Experience
1. Enable "3D Terrain" toggle
2. Use Satellite or Terrain style
3. Zoom in to see elevation details
4. Tilt the map to 60-70° angle
5. Click regions to fly there

### Performance
- Works best on modern browsers (Chrome, Firefox, Safari)
- Requires decent GPU for smooth 3D
- Disable 3D terrain if performance is slow

### Troubleshooting
- **Map not loading?** Check token in `.env`
- **No 3D effect?** Enable "3D Terrain" toggle
- **Flat terrain?** Zoom in closer (works best at zoom 8+)
- **Still issues?** See `GET_MAPBOX_TOKEN.md`

## 📊 What's Different?

### Without Token (Current)
- ✅ Map works
- ✅ Basic functionality
- ⚠️ Limited 3D
- ⚠️ Basic imagery

### With Token (2 min setup)
- ✅ Full 3D terrain
- ✅ Satellite imagery
- ✅ All map styles
- ✅ Smooth animations
- ✅ Better performance

## 🆓 It's Free!

- **50,000 map loads/month** - Free forever
- **No credit card** - Required
- **2 minutes** - Setup time
- **$0** - Cost

## 🎯 Current Settings

Your map is configured for maximum 3D effect:
- **Pitch**: 60° (initial), 65° (zoomed)
- **Terrain exaggeration**: 2.0x
- **Bearing**: 30° rotation on zoom
- **Animation**: 2-second smooth transitions

## 📚 More Help

- **Quick guide**: `GET_MAPBOX_TOKEN.md`
- **Detailed setup**: `MAPBOX_SETUP.md`
- **Dashboard features**: `DASHBOARD_UPGRADE_SUMMARY.md`

---

**Ready to see your map in 3D? Get your token now!** 🚀

👉 **https://account.mapbox.com/auth/signup/**
