# ReGenLens Authentication Setup

## Quick Start (Demo Mode)
The application works out of the box in demo mode without any configuration. Simply run:

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to see the landing page.

## Full Authentication Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Choose your organization and fill in project details
4. Wait for the project to be set up (usually 1-2 minutes)

### 2. Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (something like `https://abcdefghijklmnop.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbG...`)

### 3. Configure Environment Variables

1. In the `frontend` directory, copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace the placeholder values:
   ```env
   # Replace with your actual Supabase values
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # Backend API (usually no need to change)
   VITE_API_URL=http://localhost:5000
   
   # App info
   VITE_APP_NAME=ReGenLens
   VITE_APP_VERSION=1.0.0
   ```

### 4. Set Up Authentication

In your Supabase dashboard:

1. Go to **Authentication** → **Settings**
2. Ensure **Enable email confirmations** is configured as needed
3. Configure **Site URL** to `http://localhost:5173` for development

### 5. Enable Google OAuth (Optional)

To enable Google sign-in:

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Find **Google** and click the toggle to enable it
3. You'll need to create a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized origins: `http://localhost:5173` (dev) and your production URL
   - Add authorized redirect URIs: `https://your-project-id.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client Secret** to your Supabase Google provider settings
5. Save the configuration

**Note**: Google OAuth will only work when Supabase is properly configured. In demo mode, the Google buttons will show an error message.

### 6. Test Authentication

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:5173`
3. Click "Sign Up for Full Access"
4. Create a test account
5. You should be redirected to the dashboard

## Features by Mode

### Demo Mode (No Auth Setup)
- ✅ Landing page
- ✅ Welcome back page for returning visitors
- ✅ Demo dashboard with sample data
- ✅ All UI components and animations
- ❌ Real user accounts
- ❌ Data persistence
- ❌ Protected routes

### Full Mode (With Supabase)
- ✅ Everything from Demo Mode
- ✅ Real user registration and login
- ✅ Session persistence
- ✅ Protected dashboard access
- ✅ User profile management
- ✅ Secure authentication flow

## Troubleshooting

### "Authentication not configured" error
- Make sure your `.env` file has the correct Supabase credentials
- Restart the development server after changing environment variables

### Supabase connection issues
- Verify your Project URL and API key are correct
- Check that your Supabase project is active (not paused)
- Ensure you're using the **anon/public** key, not the service role key

### Build/deployment issues
- Make sure environment variables are set in your deployment platform
- For Netlify: Go to Site settings → Environment variables
- For Vercel: Use the Environment Variables section in project settings

## Production Deployment

For production deployment, set these environment variables in your hosting platform:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key
VITE_API_URL=https://your-backend-domain.com
```

The application will automatically detect the environment and enable full authentication features when proper credentials are provided.