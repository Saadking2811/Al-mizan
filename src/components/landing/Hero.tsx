'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  CheckCircle,
  FileText,
  Users,
  Lock,
  TrendingUp,
  Bell,
  Star,
  MapPin,
  ChevronRight,
  Zap,
  BarChart3,
  Building2,
  Award,
} from 'lucide-react';
import Button from '@/components/ui/Button';

/* ─── Animated counter ──────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

/* ─── Notification ticker ───────────────────────── */
const notifications = [
  { icon: Bell, text: 'Nouvel appel d\'offres à Alger', time: 'à l\'instant', color: 'text-gold-500' },
  { icon: CheckCircle, text: 'Soumission validée — Oran', time: 'il y a 2min', color: 'text-green-400' },
  { icon: Award, text: 'Marché attribué — Annaba', time: 'il y a 5min', color: 'text-blue-400' },
  { icon: Users, text: 'Commission évaluation créée', time: 'il y a 8min', color: 'text-purple-400' },
];

function NotificationTicker() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % notifications.length), 3000);
    return () => clearInterval(timer);
  }, []);
  const n = notifications[current];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 text-sm"
      >
        <n.icon size={13} className={n.color} />
        <span className="text-white/80 truncate">{n.text}</span>
        <span className="text-white/35 text-xs shrink-0">{n.time}</span>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Mini dashboard mockup ─────────────────────── */
function DashboardMockup() {
  const tenders = useCounter(15482, 1800);
  const orgs = useCounter(2547, 1600);
  const rate = useCounter(99, 1000);
  const bars = [65, 82, 54, 91, 73, 88];

  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-royal-500/10 blur-3xl rounded-3xl scale-110 -z-10" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative bg-navy-800/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-navy-900/60 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-gold-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <div className="flex-1 mx-3 h-5 bg-white/5 rounded-md flex items-center px-2.5">
            <span className="text-[10px] text-white/30">al-mizan.dz/dashboard</span>
          </div>
          <Shield size={11} className="text-green-400" />
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Appels publiés', value: tenders.toLocaleString(), icon: FileText },
              { label: 'Organismes', value: orgs.toLocaleString(), icon: Building2 },
              { label: 'Disponibilité', value: `${rate}%`, icon: TrendingUp },
            ].map((kpi, i) => (
              <div key={i} className="bg-navy-900/50 rounded-xl p-2.5 border border-white/5">
                <kpi.icon size={11} className="text-gold-400 mb-1.5" />
                <p className="text-sm font-bold text-white leading-none">{kpi.value}</p>
                <p className="text-[9px] text-navy-400 mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-navy-900/50 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 size={10} className="text-gold-400" />
                <span className="text-[10px] text-navy-300">Marchés / mois</span>
              </div>
              <span className="text-[9px] text-navy-500">2025–2026</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: i === 3 ? 'linear-gradient(to top, #B8902F, #D4A84B)' : 'rgba(212,168,75,0.35)',
                    height: `${h}%`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                />
              ))}
            </div>
            <div className="flex gap-1 mt-1">
              {['Aoû', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan'].map((m) => (
                <span key={m} className="flex-1 text-center text-[8px] text-navy-500">{m}</span>
              ))}
            </div>
          </div>

          {/* Tenders */}
          <div className="bg-navy-900/50 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-navy-300 font-medium">Derniers appels d'offres</span>
              <ChevronRight size={10} className="text-navy-500" />
            </div>
            {[
              { ref: 'AO-ALG-0847', title: 'École primaire — VRD', dot: 'bg-green-400' },
              { ref: 'AO-ORA-0312', title: 'Équipements informatiques', dot: 'bg-gold-400' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dot}`} />
                <span className="text-[9px] text-navy-400 font-mono shrink-0">{t.ref}</span>
                <span className="text-[9px] text-white/65 truncate">{t.title}</span>
              </div>
            ))}
          </div>

          {/* Live ticker */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gold-500/10 border border-gold-500/20 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 animate-pulse" />
            <NotificationTicker />
          </div>
        </div>
      </motion.div>

      {/* Floating badge top-left */}
      <motion.div
        className="absolute -top-5 -left-5 flex items-center gap-2 bg-white rounded-2xl shadow-2xl px-3 py-2 z-10"
        initial={{ opacity: 0, x: -15, rotate: -6 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <CheckCircle size={14} className="text-green-600" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-navy-900">Conforme</p>
          <p className="text-[9px] text-navy-500">Décret 15-247</p>
        </div>
      </motion.div>

      {/* Floating badge bottom-right */}
      <motion.div
        className="absolute -bottom-4 -right-5 flex items-center gap-2 bg-white rounded-2xl shadow-2xl px-3 py-2 z-10"
        initial={{ opacity: 0, x: 15, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="w-7 h-7 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
          <MapPin size={14} className="text-gold-600" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-navy-900">48 Wilayas</p>
          <p className="text-[9px] text-navy-500">couvertes</p>
        </div>
      </motion.div>

      {/* Floating star rating */}
      <motion.div
        className="absolute top-1/3 -right-8 flex items-center gap-2 bg-navy-800/90 backdrop-blur border border-white/10 rounded-2xl shadow-xl px-3 py-2 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <Star size={12} className="text-gold-400" />
        <div>
          <p className="text-[10px] font-bold text-white">4.9/5</p>
          <p className="text-[9px] text-navy-400">1,200+ avis</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Feature chips data ────────────────────────── */
const features = [
  { icon: Shield, text: 'Décret 15-247' },
  { icon: Zap, text: 'AES-256' },
  { icon: FileText, text: 'BOMOP / BAOSEM' },
  { icon: CheckCircle, text: '100% dématérialisé' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* ── Background ──────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* ── Animated orbs ───────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-gold-500/6 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-royal-500/6 blur-[100px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(rgba(212,168,75,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Main content ──────────────────────────── */}
      <div className="section-container relative z-10 py-24 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left column ─────────────────────── */}
          <div className="text-center lg:text-left">
            {/* Live badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm text-gold-400 mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Plateforme nationale des marchés publics</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              Marchés Publics{' '}
              <span className="text-gradient">Algériens</span>
              <br />
              <span className="text-2xl sm:text-3xl xl:text-4xl font-semibold text-white/70 leading-relaxed">
                Digitalisés &amp; Transparents
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg text-navy-200/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Al-Mizan dématérialise l&apos;ensemble des marchés publics — de la publication
              des avis à l&apos;attribution — pour les{' '}
              <strong className="text-gold-400">48 wilayas</strong> d&apos;Algérie.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {features.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/6 border border-white/10 rounded-full text-sm text-white/70 hover:bg-white/10 hover:border-gold-500/30 transition-all"
                >
                  <f.icon size={13} className="text-gold-500 shrink-0" />
                  {f.text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link href="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto group"
                  icon={<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                >
                  Commencer gratuitement
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
                  icon={<Lock size={16} />}
                >
                  Se connecter
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-4 mt-8 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex -space-x-2.5">
                {['K', 'F', 'Y', 'A', 'M'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-navy-900 bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-[10px] font-bold text-navy-900"
                    style={{ zIndex: 5 - i }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-xs text-navy-300">+2,500 organismes</p>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: Dashboard Mockup ──── */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* ── Stats row ───────────────────────────── */}
        <motion.div
          className="mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: '48', label: 'Wilayas couvertes', icon: MapPin },
            { value: '2,500+', label: 'Organismes inscrits', icon: Users },
            { value: '15,000+', label: 'Appels publiés', icon: FileText },
            { value: '99.9%', label: 'Disponibilité SLA', icon: TrendingUp },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2 p-4 sm:p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-default"
              whileHover={{ y: -3, borderColor: 'rgba(212,168,75,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
            >
              <stat.icon size={18} className="text-gold-500" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-navy-300 text-center">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll hint ─────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-gold-500 rounded-full" />
        </div>
      </motion.div>

      {/* ── Bottom wave ─────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#FAF8F0" />
        </svg>
      </div>
    </section>
  );
}
