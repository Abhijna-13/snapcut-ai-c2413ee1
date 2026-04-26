import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import type { UserProfile } from '@/types';

interface AuthState {
  session: Session | null;
  authUser: User | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  authUser: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setSession: (session) => set({ session, authUser: session?.user ?? null, isAuthenticated: !!session }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ session: null, authUser: null, user: null, isAuthenticated: false }),
}));
