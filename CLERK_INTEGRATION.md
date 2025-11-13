# Clerk Integration for React + Vite - ReGenLens

## ✅ Integration Complete!

Clerk authentication has been successfully integrated into your React + Vite application following the official Clerk quickstart guide.

**Official Documentation:** https://clerk.com/docs/quickstarts/react

---

## 🚀 Quick Start

### 1. Set Up Clerk Account

1. Visit [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up or sign in
3. Create a new application
4. Go to [API Keys page](https://dashboard.clerk.com/last-active?path=api-keys)
5. Select **React** and copy your **Publishable Key**

### 2. Configure Environment Variables

Update `/frontend/.env.local` with your Clerk key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

⚠️ **Important:** Replace `YOUR_PUBLISHABLE_KEY` with your actual key from the Clerk dashboard.

### 3. Run the Application

```bash
cd /home/brandon/Desktop/ReGenLens-1
npm run dev
```

---

## 📦 What Was Installed

- **@clerk/clerk-react** - Official Clerk SDK for React applications

---

## 🔧 What Was Changed

### 1. **main.jsx** - Added ClerkProvider
Wrapped the entire app with `<ClerkProvider>` to enable Clerk authentication throughout your application.

```jsx
import { ClerkProvider } from '@clerk/clerk-react'

<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <App />
</ClerkProvider>
```

### 2. **Navbar.jsx** - Added Authentication UI
Added Clerk's pre-built components for sign in, sign up, and user management:

- `<SignInButton>` - Opens sign-in modal
- `<SignUpButton>` - Opens sign-up modal
- `<UserButton>` - Shows user profile dropdown
- `<SignedIn>` - Shows content only when user is signed in
- `<SignedOut>` - Shows content only when user is signed out

### 3. **ProtectedRoute.jsx** - Updated for Clerk
Now uses Clerk's `useUser()` hook to protect routes requiring authentication.

### 4. **authStore.js** - Enhanced with Clerk Support
Added functions to sync Clerk user state with Zustand store.

### 5. **App.jsx** - Integrated Clerk Hooks
- Uses `useUser()` hook to access current user
- Syncs Clerk user with local state
- Added ProfilePage route (protected)

### 6. **ProfilePage.jsx** - NEW!
Example page showing how to use Clerk's `<UserProfile>` component for user management.

---

## 🎯 Available Clerk Components

### Authentication Components

```jsx
import { 
  SignInButton, 
  SignUpButton, 
  SignOutButton,
  UserButton 
} from '@clerk/clerk-react';

// Sign In Button
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

// Sign Up Button
<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>

// User Button (shows profile dropdown)
<UserButton afterSignOutUrl="/" />
```

### Conditional Rendering

```jsx
import { SignedIn, SignedOut } from '@clerk/clerk-react';

<SignedOut>
  <p>You are signed out</p>
</SignedOut>

<SignedIn>
  <p>You are signed in!</p>
</SignedIn>
```

### User Profile Component

```jsx
import { UserProfile } from '@clerk/clerk-react';

<UserProfile />
```

---

## 🪝 Available Clerk Hooks

### useUser()
Access the current user and loading state:

```jsx
import { useUser } from '@clerk/clerk-react';

function MyComponent() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  if (isSignedIn) {
    return <div>Hello, {user.firstName}!</div>;
  }
  
  return <div>Please sign in</div>;
}
```

### useAuth()
Access authentication state and methods:

```jsx
import { useAuth } from '@clerk/clerk-react';

function MyComponent() {
  const { isLoaded, userId, sessionId, signOut } = useAuth();
  
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

### useClerk()
Access Clerk instance for advanced operations:

```jsx
import { useClerk } from '@clerk/clerk-react';

function MyComponent() {
  const { openSignIn, openSignUp } = useClerk();
  
  return (
    <>
      <button onClick={() => openSignIn()}>Sign In</button>
      <button onClick={() => openSignUp()}>Sign Up</button>
    </>
  );
}
```

---

## 🔒 Protected Routes

Use the `ProtectedRoute` component to protect pages requiring authentication:

```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute requireAuth={true}>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

---

## 🎨 Customizing Clerk Components

### Appearance Customization

```jsx
<ClerkProvider 
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    elements: {
      formButtonPrimary: 'bg-forest-600 hover:bg-forest-700',
      card: 'shadow-xl',
      headerTitle: 'text-forest-700',
      headerSubtitle: 'text-earth-600'
    }
  }}
>
  <App />
</ClerkProvider>
```

### Modal vs Redirect Mode

```jsx
// Modal (recommended)
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

// Redirect to dedicated sign-in page
<SignInButton mode="redirect" redirectUrl="/dashboard">
  <button>Sign In</button>
</SignInButton>
```

---

## 📱 User Data Access

### Basic User Info

```jsx
import { useUser } from '@clerk/clerk-react';

function Profile() {
  const { user } = useUser();
  
  return (
    <div>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>ID: {user.id}</p>
      <img src={user.imageUrl} alt="Profile" />
    </div>
  );
}
```

### Metadata

```jsx
// Public metadata (visible to everyone)
user.publicMetadata

// Private metadata (only visible to user)
user.privateMetadata

// Unsafe metadata (writable by user)
user.unsafeMetadata
```

---

## 🔐 Backend Integration

When making API calls to your backend, include the session token:

```jsx
import { useAuth } from '@clerk/clerk-react';

function MyComponent() {
  const { getToken } = useAuth();
  
  const fetchData = async () => {
    const token = await getToken();
    
    const response = await fetch('/api/data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.json();
  };
  
  return <button onClick={fetchData}>Fetch Protected Data</button>;
}
```

---

## 🧪 Testing

Clerk provides test users in development mode. You can:

1. Create test accounts directly in the Clerk dashboard
2. Use the built-in sign-up flow to create test users
3. Configure social login providers (Google, GitHub, etc.)

---

## 🚨 Important Notes

### Environment Variables
- Always use `VITE_` prefix for Vite environment variables
- Never commit `.env.local` to version control
- Use different keys for development and production

### Key Differences from Next.js
- No `middleware.ts` file needed (Next.js only)
- No server-side rendering considerations
- All authentication happens client-side
- Use `import.meta.env` instead of `process.env`

### Security
- Publishable key is safe to expose (it's public)
- Secret key should NEVER be used in frontend code
- Always validate user sessions on your backend
- Use Clerk's backend SDKs for server-side verification

---

## 📚 Additional Resources

- [Clerk React Documentation](https://clerk.com/docs/references/react/overview)
- [Clerk Dashboard](https://dashboard.clerk.com/)
- [Clerk Component Reference](https://clerk.com/docs/components/overview)
- [Clerk Customization](https://clerk.com/docs/components/customization/overview)

---

## 🐛 Troubleshooting

### "Clerk: Missing publishableKey"
- Ensure your `.env.local` file has `VITE_CLERK_PUBLISHABLE_KEY`
- Restart the dev server after adding environment variables
- Check that you're using the correct key from Clerk dashboard

### Components not showing
- Verify ClerkProvider is wrapping your app in `main.jsx`
- Check browser console for errors
- Ensure `@clerk/clerk-react` is installed

### User not loading
- Check `isLoaded` state before accessing user
- Verify your publishable key is correct
- Check network tab for API errors

---

## ✅ Next Steps

1. **Add your Clerk publishable key** to `.env.local`
2. **Restart the dev server** with `npm run dev`
3. **Test sign up/sign in** using the buttons in the navbar
4. **Visit `/profile`** to see the user profile page
5. **Customize appearance** to match your brand

---

## 🎉 You're All Set!

Clerk is now fully integrated into your ReGenLens application. Users can sign up, sign in, and manage their profiles with enterprise-grade security and a beautiful UI.

**Need help?** Check the Clerk docs or visit the Clerk Discord community.
