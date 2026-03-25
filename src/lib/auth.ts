import Cookies from 'js-cookie';
import { create } from 'zustand';
import api, { authApi } from '@/lib/api';

/* ── Types ─────────────────────────────────────────────────── */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  organization?: string;
  wilaya?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  initialize: () => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

const TOKEN_COOKIE = 'almizan_token';
const REFRESH_COOKIE = 'almizan_refresh';

const toUser = (raw: Partial<User> & { first_name?: string; last_name?: string; createdAt?: string }) => {
  const firstName = raw.first_name || '';
  const lastName = raw.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    id: String(raw.id || ''),
    name: raw.name || fullName || 'Utilisateur',
    email: raw.email || '',
    role: String(raw.role || '').toUpperCase(),
    created_at: raw.created_at || raw.createdAt || new Date().toISOString(),
  } as User;
};

/* ── Store Zustand ─────────────────────────────────────────── */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  initialized: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.login(email, password);

      const accessToken = data?.accessToken || data?.data?.access_token;
      const refreshToken = data?.refreshToken || data?.data?.refresh_token;
      const loginUser = data?.user || data?.data?.user;

      if (accessToken) {
        Cookies.set(TOKEN_COOKIE, accessToken, { expires: 1 / 24, sameSite: 'strict' });
      }
      if (refreshToken) {
        Cookies.set(REFRESH_COOKIE, refreshToken, { expires: 7, sameSite: 'strict' });
      }

      // Prefer profile endpoint so UI has full user information.
      try {
        const profileRes = await api.get('/users/me');
        set({ user: toUser(profileRes.data), isAuthenticated: true, isLoading: false, initialized: true });
      } catch {
        set({ user: toUser(loginUser || {}), isAuthenticated: true, isLoading: false, initialized: true });
      }
    } catch (error) {
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(REFRESH_COOKIE);
      set({ user: null, isAuthenticated: false, isLoading: false, initialized: true });
      throw error;
    }
  },

  register: async (payload) => {
    set({ isLoading: true });
    try {
      // Keep register flexible for current gateway/auth implementation.
      await authApi.register(payload.name, payload.email, payload.password);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  initialize: async () => {
    if (typeof window === 'undefined') {
      set({ initialized: true });
      return;
    }

    const token = Cookies.get(TOKEN_COOKIE);
    if (!token) {
      set({ user: null, isAuthenticated: false, initialized: true });
      return;
    }

    try {
      const profileRes = await api.get('/users/me');
      set({ user: toUser(profileRes.data), isAuthenticated: true, initialized: true });
    } catch {
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(REFRESH_COOKIE);
      set({ user: null, isAuthenticated: false, initialized: true });
    }
  },

  logout: () => {
    Cookies.remove(TOKEN_COOKIE);
    Cookies.remove(REFRESH_COOKIE);
    set({ user: null, isAuthenticated: false, initialized: true });
  },

  setUser: (user) => set({ user, isAuthenticated: true, initialized: true }),
}));
