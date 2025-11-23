# Clerk Authentication Setup Guide

## Quick Start

### 1. Create a Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Get Your Publishable Key
1. In your Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Paste it in `frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### 3. Configure Your Application

#### Application Settings
In your Clerk Dashboard:

1. **Application Name**: ReGenLens
2. **Application URL**: `http://localhost:5173` (for development)

#### Paths Configuration
Go to **Paths** in your Clerk Dashboard and set:

- **Sign-in page**: `/sign-in`
- **Sign-up page**: `/sign-up`
- **After sign-in**: `/dashboard`
- **After sign-up**: `/dashboard`

#### Social Connections (Optional)
Enable social login providers:
1. Go to **User & Authentication** → **Social Connections**
2. Enable providers you want (Google, GitHub, etc.)
3. Follow the setup instructions for each provider

### 4. Restart Your Dev Server

After updating the `.env` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 5. Test Authentication

1. Visit `http://localhost:5173`
2. Click "Sign Up" or "Sign In"
3. You should see the beautiful Clerk authentication UI
4. Create an account or sign in
5. You'll be redirected to the dashboard

## Features Enabled

✅ Email/Password authentication
✅ Social login (Google, GitHub, etc.)
✅ Email verification
✅ Password reset
✅ User profile management
✅ Session management
✅ Multi-factor authentication (optional)

## Customization

The sign-in and sign-up pages are already styled to match ReGenLens branding. You can further customize:

- **Colors**: Edit the `appearance` prop in `SignInPage.jsx` and `SignUpPage2.jsx`
- **Logo**: Add your logo in Clerk Dashboard → **Customization**
- **Email templates**: Customize in Clerk Dashboard → **Emails**

## Production Deployment

When deploying to production:

1. Get your production Publishable Key from Clerk Dashboard
2. Update your environment variables in your hosting platform
3. Update the Application URL in Clerk Dashboard to your production domain
4. Update redirect URLs to use your production domain

## Troubleshooting

### "Missing Clerk Publishable Key" Error
- Make sure you've added the key to `frontend/.env`
- Restart your dev server after adding the key
- Check that the key starts with `pk_test_` or `pk_live_`

### Authentication Not Working
- Verify your Clerk Dashboard paths match the routes in the app
- Check browser console for errors
- Make sure your Clerk application is active

### Need Help?
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord Community](https://clerk.com/discord)
- [Clerk Support](https://clerk.com/support)
