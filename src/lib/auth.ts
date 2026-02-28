import { create } from 'zustand';

/* ── Types ─────────────────────────────────────────────────── */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

/* ── Utilisateur de démo (mode test – pas d'API) ──────────── */
const DEMO_USER: User = {
  id: '1',
  name: 'Administrateur Demo',
  email: 'admin@almizan.dz',
  role: 'admin',
  created_at: new Date().toISOString(),
};

/* ── Store Zustand ─────────────────────────────────────────── */
export const useAuthStore = create<AuthState>((set) => ({
  // Mode test : authentifié par défaut avec un utilisateur de démo
  user: DEMO_USER,
  isLoading: false,
  isAuthenticated: true,

  login: async (_email, _password) => {
    // Mode test : pas d'appel API, connexion immédiate
    set({ user: DEMO_USER, isAuthenticated: true, isLoading: false });
  },

  register: async (_name, _email, _password) => {
    // Mode test : pas d'appel API
    set({ user: DEMO_USER, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    // Mode test : on reste connecté
    set({ user: DEMO_USER, isAuthenticated: true });
  },

  setUser: (user) => set({ user, isAuthenticated: true }),
}));
