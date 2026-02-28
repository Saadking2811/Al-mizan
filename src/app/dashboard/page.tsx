'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  FileText,
  Upload,
  ClipboardCheck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Users,
  Activity,
  Plus,
  Bell,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
  Shield,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const statsCards = [
  {
    label: "Appels d'offres actifs",
    value: '24',
    change: '+3 ce mois',
    sub: '18 en phase de réception',
    icon: FileText,
    trend: 'up',
    accent: 'from-gold-500 to-gold-600',
    bg: 'bg-gold-50',
    iconColor: 'text-gold-600',
  },
  {
    label: 'Soumissions en cours',
    value: '12',
    change: '5 en évaluation',
    sub: '7 en attente de dépôt',
    icon: Upload,
    trend: 'neutral',
    accent: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Évaluations terminées',
    value: '87',
    change: '+12 ce trimestre',
    sub: '98.2% conformes aux normes',
    icon: ClipboardCheck,
    trend: 'up',
    accent: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    label: 'Alertes actives',
    value: '2',
    change: '1 urgente ce jour',
    sub: 'Conforme Décret 15-247',
    icon: AlertTriangle,
    trend: 'down',
    accent: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
];

const recentTenders = [
  {
    id: 'AO-ALG-2026-0847',
    title: "Réalisation d'une école primaire — Lot 2 : Travaux VRD",
    wilaya: 'Tipaza',
    organism: 'Direction des Équipements Publics',
    status: 'En cours',
    deadline: '15 Mars 2026',
    amount: '45 000 000 DZD',
    offers: 8,
  },
  {
    id: 'AO-ORA-2026-0312',
    title: "Fourniture d'équipements informatiques pour administration",
    wilaya: 'Oran',
    organism: "APC d'Oran",
    status: 'Évaluation',
    deadline: '28 Fév 2026',
    amount: '12 500 000 DZD',
    offers: 12,
  },
  {
    id: 'AO-CNS-2026-0198',
    title: "Réhabilitation du réseau d'assainissement — Phase 1",
    wilaya: 'Constantine',
    organism: "Direction de l'Hydraulique",
    status: 'Attribué',
    deadline: '10 Fév 2026',
    amount: '180 000 000 DZD',
    offers: 5,
  },
  {
    id: 'AO-ALG-2026-0756',
    title: 'Acquisition de véhicules de transport collectif scolaire',
    wilaya: 'Alger',
    organism: 'Direction des Transports',
    status: 'En cours',
    deadline: '20 Mars 2026',
    amount: '95 000 000 DZD',
    offers: 6,
  },
];

const quickActions = [
  { label: "Créer un appel d'offres", href: '/dashboard/tenders/new', icon: Plus, color: 'text-gold-500' },
  { label: 'Soumettre une offre', href: '/dashboard/submissions/new', icon: Upload, color: 'text-blue-500' },
  { label: 'Voir les évaluations', href: '/dashboard/evaluations', icon: ClipboardCheck, color: 'text-green-500' },
  { label: 'Consulter analytics', href: '/dashboard/analytics', icon: BarChart3, color: 'text-purple-500' },
];

const upcomingDeadlines = [
  { title: 'Clôture AO-ALG-2026-0847', date: '15 Mars', type: 'deadline', id: 'AO-ALG-2026-0847' },
  { title: "Commission d'évaluation n°34", date: '12 Mars', type: 'meeting', id: null },
  { title: 'Publication BOMOP Lot 3', date: '18 Mars', type: 'publication', id: null },
];

const recentActivity = [
  { icon: CheckCircle2, bg: 'bg-green-100', color: 'text-green-600', text: 'Nouvelle soumission reçue', sub: 'AO-ALG-2026-0847 — il y a 2h' },
  { icon: Building2,   bg: 'bg-gold-100',  color: 'text-gold-600',  text: 'Évaluation démarrée',     sub: 'AO-ORA-2026-0312 — il y a 5h' },
  { icon: Bell,        bg: 'bg-red-100',   color: 'text-red-600',   text: 'Alerte délai imminente',  sub: 'AO-CNS-2026-0198 — il y a 8h' },
  { icon: Shield,      bg: 'bg-navy-100',  color: 'text-navy-600',  text: 'Conformité Décret 15-247 vérifiée', sub: 'AO-ALG-2026-0756 — hier' },
];

const statusMeta: Record<string, { color: string; dot: string }> = {
  'En cours':   { color: 'bg-navy-100 text-navy-700',   dot: 'bg-navy-500' },
  'Évaluation': { color: 'bg-gold-100 text-gold-700',   dot: 'bg-gold-500' },
  'Attribué':   { color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  'Clôturé':    { color: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400' },
};

function WelcomeBanner() {
  const [greeting, setGreeting] = useState('Bonjour');
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 18) setGreeting('Bon après-midi');
    else if (h >= 18) setGreeting('Bonsoir');
  }, []);

  return (
    <motion.div variants={itemVariants}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 p-6 sm:p-8">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gold-500/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-gold-400/5 blur-xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gold-400 text-sm font-medium mb-1 flex items-center gap-2">
              <Zap size={14} /> Plateforme Al-Mizan — BOMOP / BAOSEM
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {greeting}, Administrateur 👋
            </h1>
            <p className="text-navy-300 mt-1 text-sm">
              Vous avez <span className="text-gold-400 font-semibold">2 alertes</span> et{' '}
              <span className="text-gold-400 font-semibold">5 soumissions</span> en attente d&apos;évaluation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/dashboard/tenders/new">
              <Button variant="primary" size="md" className="whitespace-nowrap">
                <Plus size={16} /> Nouvel appel d&apos;offres
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
          {[
            { label: 'Wilayas couvertes', value: '48 / 58', icon: Target },
            { label: 'Marchés ce mois', value: '1 247', icon: BarChart3 },
            { label: 'Conformité globale', value: '99,1 %', icon: Shield },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <s.icon size={18} className="text-gold-400 shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">{s.value}</p>
                <p className="text-navy-400 text-xs hidden sm:block">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">

      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsCards.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card padding="none" className="group relative overflow-hidden cursor-pointer h-full">
              <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${stat.accent}`} />
              <div className="p-5 pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon size={20} className={stat.iconColor} />
                  </div>
                  {stat.trend === 'up'   && <TrendingUp   size={16} className="text-green-500 mt-1" />}
                  {stat.trend === 'down' && <TrendingDown  size={16} className="text-red-500 mt-1" />}
                </div>
                <p className="text-3xl font-bold text-navy-900 tabular-nums">{stat.value}</p>
                <p className="text-sm text-navy-500 font-medium mt-0.5">{stat.label}</p>
                <div className="mt-3 pt-3 border-t border-navy-100">
                  <p className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-500' : 'text-navy-500'
                  }`}>{stat.change}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href}>
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-white border border-navy-100 rounded-xl p-4 hover:border-gold-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center shrink-0">
                  <action.icon size={18} className={action.color} />
                </div>
                <span className="text-sm font-medium text-navy-700 leading-tight">{action.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Tenders table — 2 cols */}
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <Card padding="none" hover={false} className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-navy-100">
              <div>
                <h2 className="text-base font-semibold text-navy-900">Appels d&apos;offres récents</h2>
                <p className="text-xs text-navy-400 mt-0.5">Derniers marchés publiés sur BOMOP / BAOSEM</p>
              </div>
              <Link href="/dashboard/tenders">
                <Button variant="ghost" size="sm" className="text-gold-600 hover:bg-gold-50 gap-1">
                  Voir tout <ArrowUpRight size={14} />
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-50/60">
                    <th className="text-left py-3 px-5 text-xs font-semibold text-navy-500 uppercase tracking-wider">Référence</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-navy-500 uppercase tracking-wider">Intitulé</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-navy-500 uppercase tracking-wider">Statut</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Échéance</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden lg:table-cell">Offres</th>
                    <th className="py-3 px-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-50">
                  {recentTenders.map((tender) => {
                    const meta = statusMeta[tender.status] ?? { color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };
                    return (
                      <motion.tr
                        key={tender.id}
                        className="hover:bg-gold-50/30 transition-colors cursor-pointer group"
                        whileHover={{ x: 2 }}
                      >
                        <td className="py-4 px-5">
                          <span className="text-xs font-mono text-navy-700 bg-navy-100 px-2 py-1 rounded-md whitespace-nowrap">
                            {tender.id}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <p className="text-sm font-medium text-navy-900 max-w-[220px] truncate">{tender.title}</p>
                          <p className="text-xs text-navy-400 flex items-center gap-1 mt-1">
                            <MapPin size={10} />{tender.wilaya} — {tender.organism}
                          </p>
                        </td>
                        <td className="py-4 px-5">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${meta.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                            {tender.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-sm text-navy-600 whitespace-nowrap">
                            <Clock size={13} className="text-navy-400" />{tender.deadline}
                          </div>
                        </td>
                        <td className="py-4 px-5 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-navy-700">
                            <CheckCircle2 size={13} className="text-green-500" />{tender.offers}
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <Link href={`/dashboard/tenders/${tender.id}`}>
                            <span className="text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 text-xs font-medium whitespace-nowrap">
                              Détails <ChevronRight size={13} />
                            </span>
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-navy-50 bg-navy-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-navy-400">Affichage de 4 marchés sur 24 actifs</p>
              <Link href="/dashboard/tenders">
                <Button variant="outline" size="sm">
                  Tous les appels d&apos;offres <ArrowUpRight size={13} />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Key Stats */}
          <motion.div variants={itemVariants}>
            <Card padding="none" hover={false} className="overflow-hidden">
              <div className="px-5 py-4 border-b border-navy-100">
                <h3 className="text-sm font-semibold text-navy-900">Statistiques clés</h3>
              </div>
              <div className="divide-y divide-navy-50">
                {[
                  { label: 'Budget total géré',       value: '2,4 Mds DZD', icon: DollarSign, color: 'text-gold-600',   bg: 'bg-gold-50' },
                  { label: 'Soumissionnaires actifs', value: '1 247',        icon: Users,      color: 'text-blue-600',   bg: 'bg-blue-50' },
                  { label: 'Taux de réussite',        value: '78 %',         icon: Activity,   color: 'text-green-600',  bg: 'bg-green-50' },
                  { label: 'Délai moyen évaluation',  value: '12 jours',     icon: Clock,      color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-navy-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                        <stat.icon size={15} className={stat.color} />
                      </div>
                      <span className="text-sm text-navy-600">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold text-navy-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div variants={itemVariants}>
            <Card padding="none" hover={false} className="overflow-hidden">
              <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-navy-900">Échéances é  venir</h3>
                <Calendar size={15} className="text-navy-400" />
              </div>
              <div className="p-4 space-y-3">
                {upcomingDeadlines.map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${
                    item.type === 'deadline'    ? 'bg-red-50 border-red-100' :
                    item.type === 'meeting'     ? 'bg-gold-50 border-gold-100' :
                                                  'bg-blue-50 border-blue-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      item.type === 'deadline' ? 'bg-red-500' : item.type === 'meeting' ? 'bg-gold-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      {item.id ? (
                        <Link href={`/dashboard/tenders/${item.id}`} className="text-sm text-navy-800 hover:text-gold-600 truncate block transition-colors font-medium">
                          {item.title}
                        </Link>
                      ) : (
                        <p className="text-sm text-navy-800 truncate font-medium">{item.title}</p>
                      )}
                      <p className="text-xs text-navy-400 mt-0.5">
                        {item.type === 'deadline' ? 'Date limite' : item.type === 'meeting' ? 'Réunion' : 'Publication'}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${
                      item.type === 'deadline' ? 'text-red-600' : item.type === 'meeting' ? 'text-gold-700' : 'text-blue-700'
                    }`}>{item.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Activity */}
          <motion.div variants={itemVariants}>
            <Card padding="none" hover={false} className="overflow-hidden">
              <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-navy-900">Activité récente</h3>
                <Link href="/dashboard/notifications">
                  <span className="text-xs text-gold-600 hover:text-gold-700 font-medium transition-colors flex items-center gap-0.5">
                    Tout voir <ChevronRight size={12} />
                  </span>
                </Link>
              </div>
              <div className="p-4 space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full ${a.bg} flex items-center justify-center shrink-0`}>
                      <a.icon size={14} className={a.color} />
                    </div>
                    <div>
                      <p className="text-sm text-navy-800 font-medium leading-tight">{a.text}</p>
                      <p className="text-xs text-navy-400 mt-0.5">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
