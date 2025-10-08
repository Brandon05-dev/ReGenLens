import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'demo';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo';

// Only create Supabase client if we have valid credentials
export const supabase = (supabaseUrl !== 'demo' && supabaseAnonKey !== 'demo') 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: false,
  error: null,
  hasVisited: localStorage.getItem('regenlens-visited') === 'true',
  isDemo: false,

  // Initialize auth state
  initialize: async () => {
    set({ loading: true });
    try {
      if (!supabase) {
        // Demo mode - no real auth
        set({ loading: false });
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      set({ 
        session,
        user: session?.user || null,
        loading: false 
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        set({ 
          session,
          user: session?.user || null,
          error: null
        });
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Sign up
  signUp: async (email, password, userData = {}) => {
    if (!supabase) {
      set({ error: 'Authentication not configured' });
      return { data: null, error: 'Authentication not configured' };
    }

    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
      set({ loading: false });
      return { data, error: null };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { data: null, error: error.message };
    }
  },

  // Sign in
  signIn: async (email, password) => {
    if (!supabase) {
      set({ error: 'Authentication not configured' });
      return { data: null, error: 'Authentication not configured' };
    }

    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      set({ loading: false });
      return { data, error: null };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { data: null, error: error.message };
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    if (!supabase) {
      set({ error: 'Google sign-in requires Supabase configuration. Please set up your environment variables or continue with the demo.' });
      return { data: null, error: 'Google sign-in requires Supabase configuration. Please set up your environment variables or continue with the demo.' };
    }

    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
      
      set({ loading: false });
      return { data, error: null };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { data: null, error: error.message };
    }
  },

  // Sign out
  signOut: async () => {
    set({ loading: true });
    try {
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      
      set({ 
        user: null, 
        session: null, 
        loading: false,
        isDemo: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Set demo mode
  setDemoMode: (isDemo) => {
    set({ isDemo });
    localStorage.setItem('regenlens-demo', isDemo.toString());
  },

  // Mark as visited
  markAsVisited: () => {
    set({ hasVisited: true });
    localStorage.setItem('regenlens-visited', 'true');
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset auth state
  reset: () => {
    set({
      user: null,
      session: null,
      loading: false,
      error: null,
      isDemo: false
    });
  }
}));

export default useAuthStore;