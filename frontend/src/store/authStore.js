import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  hasVisited: localStorage.getItem('regenlens-visited') === 'true',
  isDemo: false,
  user: null,

  // Set user from Clerk
  setUser: (user) => {
    set({ user });
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

  // Clear user on sign out
  clearUser: () => {
    set({ user: null });
  }
}));

export default useAuthStore;