# Mapbox 3D Map Setup Guide

## Why Mapbox?

The new modern dashboard uses Mapbox GL JS for beautiful 3D terrain visualization, satellite imagery, and smooth map interactions. It's free for up to 50,000 map loads per month.

## Quick Setup (5 minutes)

### 1. Create a Mapbox Account
1. Go to [https://mapbox.com](https://mapbox.com)
2. Click "Sign up" (it's free!)
3. Verify your email

### 2. Get Your Access Token
1. After signing in, you'll be taken to your account dashboard
2. Go to [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
3. You'll see a "Default public token" already created
4. Click the copy icon to copy your token (starts with `pk.`)

### 3. Add Token to Your Project
1. Open `frontend/.env`
2. Find the line: `VITE_MAPBOX_TOKEN=...`
3. Replace the value with your token:
   ```env
   VITE_MAPBOX_TOKEN=pk.your_actual_token_here
   ```

### 4. Restart Your Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 5. Test the 3D Map
1. Visit `http://localhost:5173/dashboard`
2. You should see a beautiful 3D satellite map of Africa
3. Try these features:
   - Click and drag to pan
   - Scroll to zoom
   - Right-click + drag to rotate
   - Ctrl + drag to adjust pitch (3D angle)
   - Toggle "3D Terrain" to see elevation

## Features You Get

✅ **3D Terrain** - Real elevation data with exaggerated relief
✅ **Satellite Imagery** - High-resolution satellite photos
✅ **Multiple Map Styles** - Satellite, Terrain, Dark, Light modes
✅ **Smooth Animations** - Fly-to transitions when selecting regions
✅ **Interactive Markers** - Click regions to analyze
✅ **Real-time Search** - Find any location in Africa
✅ **Custom Styling** - Branded to match ReGenLens

## Map Styles Available

1. **Satellite** - High-res satellite imagery (default)
2. **Terrain** - Topographic map with terrain features
3. **Dark** - Dark mode for night viewing
4. **Light** - Clean, minimal style

## Customization

### Change Default Map Style
In `MapView3D.jsx`, line 50:
```javascript
const [mapStyle, setMapStyle] = useState('satellite'); // Change to 'terrain', 'dark', or 'light'
```

### Adjust 3D Terrain Exaggeration
In `MapView3D.jsx`, line 73:
```javascript
map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 }); // Increase for more dramatic terrain
```

### Change Initial View
In `MapView3D.jsx`, line 56:
```javascript
const [viewState, setViewState] = useState({
  longitude: 20.0,    // Center longitude
  latitude: 0.0,      // Center latitude
  zoom: 3,            // Zoom level (1-20)
  pitch: 45,          // 3D angle (0-60)
  bearing: 0          // Rotation (0-360)
});
```

## Free Tier Limits

Mapbox free tier includes:
- **50,000 map loads/month** - More than enough for development
- **Unlimited map interactions** - Pan, zoom, rotate as much as you want
- **All map styles** - Access to all Mapbox styles
- **3D terrain** - Full 3D terrain support
- **Satellite imagery** - High-resolution satellite photos

## Troubleshooting

### Map Not Loading
- Check that your token is correctly added to `.env`
- Make sure you restarted the dev server after adding the token
- Verify the token starts with `pk.`
- Check browser console for errors

### "Unauthorized" Error
- Your token might be invalid or expired
- Create a new token in your Mapbox dashboard
- Make sure the token has the correct scopes (default public token works)

### Map is Blank/White
- Check your internet connection (Mapbox requires internet)
- Open browser console to see specific errors
- Try a different map style

### 3D Terrain Not Working
- Make sure "3D Terrain" toggle is enabled
- Some zoom levels don't show terrain - zoom in closer
- Terrain data is only available for certain regions

## Production Deployment

When deploying to production:

1. **Create a Production Token**
   - Go to Mapbox dashboard
   - Create a new token specifically for production
   - Add URL restrictions for security

2. **Update Environment Variables**
   - Add your production token to your hosting platform's env vars
   - Use different tokens for dev/staging/production

3. **Monitor Usage**
   - Check your Mapbox dashboard regularly
   - Set up usage alerts
   - Upgrade plan if you exceed free tier

## Alternative: Use Without Mapbox

If you don't want to use Mapbox, you can use the classic dashboard:
- Visit `/dashboard/classic` instead of `/dashboard`
- Uses OpenStreetMap (no account needed)
- 2D map only (no 3D terrain)
- Still fully functional

## Need Help?

- [Mapbox Documentation](https://docs.mapbox.com/)
- [Mapbox GL JS Examples](https://docs.mapbox.com/mapbox-gl-js/examples/)
- [Mapbox Support](https://support.mapbox.com/)
- [Mapbox Community](https://community.mapbox.com/)

## Cost Estimate

For reference, typical usage:
- **Development**: ~100-500 loads/month (well within free tier)
- **Small Production**: ~5,000-10,000 loads/month (free tier)
- **Medium Production**: ~50,000+ loads/month (may need paid plan at $5/month)

The free tier is very generous and perfect for getting started!
