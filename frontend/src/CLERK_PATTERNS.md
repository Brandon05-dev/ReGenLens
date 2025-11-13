/**
 * CLERK REACT + VITE - QUICK REFERENCE
 * 
 * Common patterns and examples for using Clerk in your React + Vite app
 */

// ============================================================================
// 1. BASIC IMPORTS
// ============================================================================

import { 
  // Provider (use in main.jsx)
  ClerkProvider,
  
  // Authentication UI Components
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  
  // Conditional Rendering
  SignedIn,
  SignedOut,
  
  // Profile Components
  UserProfile,
  OrganizationProfile,
  
  // Hooks
  useUser,
  useAuth,
  useClerk,
  useSession
} from '@clerk/clerk-react';

// ============================================================================
// 2. SETUP IN main.jsx
// ============================================================================

import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);

// ============================================================================
// 3. AUTHENTICATION BUTTONS
// ============================================================================

// Sign In Button (Modal)
<SignInButton mode="modal">
  <button className="btn-primary">Sign In</button>
</SignInButton>

// Sign Up Button (Modal)
<SignUpButton mode="modal">
  <button className="btn-primary">Sign Up</button>
</SignUpButton>

// User Button (Profile Dropdown)
<UserButton afterSignOutUrl="/" />

// Custom Sign Out
import { useClerk } from '@clerk/clerk-react';

function SignOutButton() {
  const { signOut } = useClerk();
  
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}

// ============================================================================
// 4. CONDITIONAL RENDERING
// ============================================================================

function Navbar() {
  return (
    <nav>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button>Sign Up</button>
        </SignUpButton>
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}

// ============================================================================
// 5. ACCESSING USER DATA
// ============================================================================

import { useUser } from '@clerk/clerk-react';

function Profile() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Always check isLoaded first
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  // Then check if signed in
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  // Now you can safely access user
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>User ID: {user.id}</p>
      <img src={user.imageUrl} alt="Profile" />
      
      {/* Phone number (if available) */}
      <p>Phone: {user.primaryPhoneNumber?.phoneNumber}</p>
      
      {/* Username (if available) */}
      <p>Username: {user.username}</p>
      
      {/* Full name */}
      <p>Full Name: {user.fullName}</p>
      
      {/* Created date */}
      <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

// ============================================================================
// 6. PROTECTED ROUTES
// ============================================================================

import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// Usage in App.jsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>

// ============================================================================
// 7. AUTHENTICATION STATE
// ============================================================================

import { useAuth } from '@clerk/clerk-react';

function MyComponent() {
  const { 
    isLoaded,        // Has Clerk loaded?
    isSignedIn,      // Is user signed in?
    userId,          // Current user's ID
    sessionId,       // Current session ID
    orgId,           // Current organization ID (if using orgs)
    signOut          // Sign out function
  } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {isSignedIn ? (
        <>
          <p>User ID: {userId}</p>
          <p>Session ID: {sessionId}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}

// ============================================================================
// 8. MAKING AUTHENTICATED API CALLS
// ============================================================================

import { useAuth } from '@clerk/clerk-react';

function DataFetcher() {
  const { getToken } = useAuth();
  
  const fetchProtectedData = async () => {
    try {
      // Get the session token
      const token = await getToken();
      
      // Make API call with token
      const response = await fetch('/api/protected-data', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <button onClick={fetchProtectedData}>
      Fetch Protected Data
    </button>
  );
}

// ============================================================================
// 9. USER PROFILE COMPONENT
// ============================================================================

import { UserProfile } from '@clerk/clerk-react';

function ProfilePage() {
  return (
    <div>
      <h1>My Profile</h1>
      <UserProfile 
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none"
          }
        }}
      />
    </div>
  );
}

// ============================================================================
// 10. CUSTOM APPEARANCE
// ============================================================================

// In main.jsx
<ClerkProvider 
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    baseTheme: undefined, // or 'dark' for dark theme
    variables: {
      colorPrimary: '#16a34a',        // Your brand color
      colorBackground: '#ffffff',
      colorInputBackground: '#f9fafb',
      colorInputText: '#111827',
      borderRadius: '0.5rem'
    },
    elements: {
      formButtonPrimary: 
        'bg-forest-600 hover:bg-forest-700 text-sm normal-case',
      card: 'shadow-xl',
      headerTitle: 'text-forest-700 font-bold',
      headerSubtitle: 'text-earth-600',
      socialButtonsBlockButton: 
        'border-gray-200 hover:bg-gray-50',
      formFieldLabel: 'text-sm font-medium text-gray-700',
      formFieldInput: 
        'rounded-lg border-gray-300 focus:border-forest-500',
      footerActionLink: 'text-forest-600 hover:text-forest-700'
    }
  }}
>
  <App />
</ClerkProvider>

// ============================================================================
// 11. PROGRAMMATIC NAVIGATION
// ============================================================================

import { useClerk } from '@clerk/clerk-react';

function MyComponent() {
  const { openSignIn, openSignUp, openUserProfile } = useClerk();
  
  return (
    <div>
      <button onClick={() => openSignIn()}>
        Open Sign In
      </button>
      <button onClick={() => openSignUp()}>
        Open Sign Up
      </button>
      <button onClick={() => openUserProfile()}>
        Open Profile
      </button>
    </div>
  );
}

// ============================================================================
// 12. SESSION MANAGEMENT
// ============================================================================

import { useSession } from '@clerk/clerk-react';

function SessionInfo() {
  const { session, isLoaded } = useSession();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>No active session</div>;
  }
  
  return (
    <div>
      <p>Session ID: {session.id}</p>
      <p>Status: {session.status}</p>
      <p>Expires: {new Date(session.expireAt).toLocaleString()}</p>
      <p>Last Active: {new Date(session.lastActiveAt).toLocaleString()}</p>
    </div>
  );
}

// ============================================================================
// 13. ERROR HANDLING
// ============================================================================

import { useUser } from '@clerk/clerk-react';

function MyComponent() {
  const { user, isLoaded } = useUser();
  
  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  
  // Handle no user
  if (!user) {
    return (
      <div className="text-center p-8">
        <h2>Authentication Required</h2>
        <p>Please sign in to continue</p>
        <SignInButton mode="modal">
          <button className="btn-primary mt-4">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }
  
  // User is loaded and authenticated
  return <div>Welcome, {user.firstName}!</div>;
}

// ============================================================================
// 14. MULTI-SESSION SUPPORT
// ============================================================================

import { useAuth } from '@clerk/clerk-react';

function AccountSwitcher() {
  const { signOut } = useAuth();
  
  const handleSwitchAccount = async () => {
    // Sign out and redirect to sign in
    await signOut({ 
      sessionId: 'current_session_id',  // Optional: specify session
      redirectUrl: '/?sign-in=true'     // Optional: redirect after
    });
  };
  
  return (
    <button onClick={handleSwitchAccount}>
      Switch Account
    </button>
  );
}

// ============================================================================
// 15. METADATA ACCESS
// ============================================================================

import { useUser } from '@clerk/clerk-react';

function UserMetadata() {
  const { user } = useUser();
  
  if (!user) return null;
  
  return (
    <div>
      {/* Public metadata (visible to everyone) */}
      <p>Bio: {user.publicMetadata?.bio}</p>
      
      {/* Private metadata (only visible to user) */}
      <p>Preferences: {JSON.stringify(user.privateMetadata)}</p>
      
      {/* Unsafe metadata (writable by user) */}
      <p>Settings: {JSON.stringify(user.unsafeMetadata)}</p>
    </div>
  );
}

// ============================================================================
// 16. REDIRECT AFTER SIGN IN/UP
// ============================================================================

// Option 1: Using redirectUrl prop
<SignInButton 
  mode="redirect" 
  redirectUrl="/dashboard"
  afterSignInUrl="/onboarding"
  afterSignUpUrl="/welcome"
>
  <button>Sign In</button>
</SignInButton>

// Option 2: Using ClerkProvider
<ClerkProvider 
  publishableKey={PUBLISHABLE_KEY}
  afterSignInUrl="/dashboard"
  afterSignUpUrl="/welcome"
>
  <App />
</ClerkProvider>

// ============================================================================
// 17. LOADING STATES
// ============================================================================

import { useUser } from '@clerk/clerk-react';

function SmartLoader() {
  const { isLoaded, isSignedIn } = useUser();
  
  // Show skeleton while loading
  if (!isLoaded) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }
  
  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="mb-4">Sign in to access this content</p>
        <SignInButton mode="modal">
          <button className="btn-primary">Sign In</button>
        </SignInButton>
      </div>
    );
  }
  
  // User is authenticated
  return <YourProtectedContent />;
}

// ============================================================================
// 18. CHECKING SPECIFIC PERMISSIONS
// ============================================================================

import { useUser } from '@clerk/clerk-react';

function AdminPanel() {
  const { user } = useUser();
  
  // Check if user has admin role (stored in metadata)
  const isAdmin = user?.publicMetadata?.role === 'admin';
  
  if (!isAdmin) {
    return <div>Access denied. Admin only.</div>;
  }
  
  return <div>Admin Panel Content</div>;
}

// ============================================================================
// NOTES:
// - Always check isLoaded before accessing user data
// - Use modal mode for seamless UX (no page redirects)
// - Tokens automatically refresh, no manual handling needed
// - Clerk handles all security, session management, and token refresh
// - All user data is synced across devices automatically
// ============================================================================
