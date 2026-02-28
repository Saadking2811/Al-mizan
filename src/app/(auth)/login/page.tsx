'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthStore } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.email) errs.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email invalide';
    if (!formData.password) errs.password = 'Le mot de passe est requis';
    else if (formData.password.length < 6) errs.password = '6 caractères minimum';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mode test : connexion directe même avec champs vides
    try {
      await login(formData.email || 'test@demo.dz', formData.password || 'demo123');
      toast.success('Connexion réussie !');
    } catch {
      // Ignorer les erreurs API en mode test
    }
    router.push('/dashboard');
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Header ─────────────────────────────── */}
      <div className="space-y-2">
        <motion.h1 
          className="text-3xl font-bold text-navy-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Bienvenue sur Al-Mizan
        </motion.h1>
        <motion.p 
          className="text-navy-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Connectez-vous pour accéder à la plateforme des marchés publics
        </motion.p>
      </div>

      {/* ── Form ───────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            label="Adresse email"
            type="email"
            placeholder="nom@organisme.dz"
            icon={<Mail size={18} />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            autoComplete="email"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Input
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-navy-400 hover:text-navy-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </motion.div>

        {/* ── Remember + Forgot ──────────────── */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-navy-200 text-gold-500 focus:ring-gold-500/40"
            />
            <span className="text-sm text-navy-600 group-hover:text-navy-800 transition-colors">
              Se souvenir de moi
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
          >
            Mot de passe oublié ?
          </Link>
        </motion.div>

        {/* ── Submit ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            <LogIn size={18} />
            Se connecter
          </Button>
        </motion.div>
      </form>

      {/* ── Divider ────────────────────────────── */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="divider-gold" />
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ivory px-4 text-sm text-navy-400">
          ou
        </span>
      </motion.div>

      {/* ── Demo accounts ──────────────────────── */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-center text-sm text-navy-500">Comptes de démonstration</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setFormData({ email: 'operateur@demo.dz', password: 'demo123' })}
            className="px-3 py-2 text-xs font-medium text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
          >
            Opérateur
          </button>
          <button
            type="button"
            onClick={() => setFormData({ email: 'service@demo.dz', password: 'demo123' })}
            className="px-3 py-2 text-xs font-medium text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
          >
            Service
          </button>
          <button
            type="button"
            onClick={() => setFormData({ email: 'commission@demo.dz', password: 'demo123' })}
            className="px-3 py-2 text-xs font-medium text-navy-600 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
          >
            Commission
          </button>
        </div>
      </motion.div>

      {/* ── Register link ──────────────────────── */}
      <motion.p 
        className="text-center text-navy-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Pas encore inscrit ?{' '}
        <Link
          href="/register"
          className="text-gold-600 hover:text-gold-700 font-semibold transition-colors inline-flex items-center gap-1"
        >
          Créer un compte
          <ArrowRight size={14} />
        </Link>
      </motion.p>
    </motion.div>
  );
}
