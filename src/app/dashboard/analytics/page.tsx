'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Users,
  MapPin,
  Calendar,
  Award,
  Activity,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const kpis = [
  { label: 'Budget total 2026', value: '2.4 Mds DZD', change: '+12.3%', up: true, icon: DollarSign },
  { label: 'Appels d\'offres publiés', value: '347', change: '+8.5%', up: true, icon: FileText },
  { label: 'Taux de soumission', value: '73.2%', change: '+5.1%', up: true, icon: Activity },
  { label: 'Délai moyen attribution', value: '42j', change: '-6j', up: true, icon: Calendar },
];

const budgetByWilaya = [
  { wilaya: 'Alger', budget: 520, percentage: 22 },
  { wilaya: 'Oran', budget: 310, percentage: 13 },
  { wilaya: 'Constantine', budget: 285, percentage: 12 },
  { wilaya: 'Annaba', budget: 190, percentage: 8 },
  { wilaya: 'Blida', budget: 175, percentage: 7 },
  { wilaya: 'Sétif', budget: 160, percentage: 7 },
  { wilaya: 'Tipaza', budget: 140, percentage: 6 },
  { wilaya: 'Autres', budget: 620, percentage: 25 },
];

const sectorDistribution = [
  { sector: 'BTP', count: 124, percentage: 36, color: 'bg-navy-500' },
  { sector: 'Informatique', count: 67, percentage: 19, color: 'bg-gold-500' },
  { sector: 'Santé', count: 48, percentage: 14, color: 'bg-green-500' },
  { sector: 'Transport', count: 39, percentage: 11, color: 'bg-blue-500' },
  { sector: 'Éducation', count: 35, percentage: 10, color: 'bg-purple-500' },
  { sector: 'Énergie', count: 34, percentage: 10, color: 'bg-red-400' },
];

const monthlyTrend = [
  { month: 'Sept', published: 28, awarded: 22 },
  { month: 'Oct', published: 34, awarded: 26 },
  { month: 'Nov', published: 31, awarded: 28 },
  { month: 'Déc', published: 22, awarded: 19 },
  { month: 'Jan', published: 38, awarded: 30 },
  { month: 'Fév', published: 42, awarded: 25 },
];

const topOperators = [
  { name: 'SARL Mansouri BTP', marchés: 8, amount: '320M DZD', score: 91.2 },
  { name: 'EURL Benbrahim Construction', marchés: 6, amount: '280M DZD', score: 88.7 },
  { name: 'SPA InfoTech Algérie', marchés: 5, amount: '145M DZD', score: 85.4 },
  { name: 'SARL Hamdani & Fils', marchés: 4, amount: '210M DZD', score: 82.9 },
  { name: 'EURL Boudjemaa Transport', marchés: 3, amount: '95M DZD', score: 79.6 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6-mois');

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Header ───────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <BarChart3 size={24} className="text-gold-500" />
            Statistiques
          </h1>
          <p className="text-navy-500 text-sm">
            Analyse des marchés publics — Données agrégées
          </p>
        </div>
        <div className="flex gap-2">
          {['30-jours', '3-mois', '6-mois', '1-an'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── KPIs ─────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} padding="md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-navy-500 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-navy-900">{kpi.value}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                  {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change} vs année préc.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                <kpi.icon size={18} className="text-gold-600" />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* ── Charts Row ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div variants={itemVariants}>
          <Card padding="lg" hover={false}>
            <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-gold-500" />
              Tendances mensuelles
            </h3>
            <div className="space-y-3">
              {monthlyTrend.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-navy-500 w-10">{m.month}</span>
                  <div className="flex-1 flex gap-1">
                    <div
                      className="h-6 bg-navy-600 rounded-md flex items-center justify-end pr-2"
                      style={{ width: `${(m.published / 50) * 100}%` }}
                    >
                      <span className="text-[10px] text-white font-medium">{m.published}</span>
                    </div>
                    <div
                      className="h-6 bg-gold-500 rounded-md flex items-center justify-end pr-2"
                      style={{ width: `${(m.awarded / 50) * 100}%` }}
                    >
                      <span className="text-[10px] text-navy-900 font-medium">{m.awarded}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-navy-100">
                <span className="flex items-center gap-1.5 text-xs text-navy-500">
                  <span className="w-3 h-3 bg-navy-600 rounded-sm" /> Publiés
                </span>
                <span className="flex items-center gap-1.5 text-xs text-navy-500">
                  <span className="w-3 h-3 bg-gold-500 rounded-sm" /> Attribués
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sector Distribution */}
        <motion.div variants={itemVariants}>
          <Card padding="lg" hover={false}>
            <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <PieChart size={16} className="text-gold-500" />
              Répartition par secteur
            </h3>
            <div className="space-y-3">
              {sectorDistribution.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-navy-700 w-24 truncate">{s.sector}</span>
                  <div className="flex-1 h-6 bg-navy-50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${s.color} rounded-full flex items-center pl-2`}
                      style={{ width: `${s.percentage}%` }}
                    >
                      {s.percentage > 12 && (
                        <span className="text-[10px] text-white font-medium">{s.count}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-navy-500 w-10 text-right">{s.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Budget by Wilaya + Top Operators ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget par wilaya */}
        <motion.div variants={itemVariants}>
          <Card padding="lg" hover={false}>
            <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-gold-500" />
              Budget par wilaya (Millions DZD)
            </h3>
            <div className="space-y-3">
              {budgetByWilaya.map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-navy-700 w-24 truncate">{w.wilaya}</span>
                  <div className="flex-1 h-5 bg-navy-50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-navy-700 to-gold-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w.percentage * 3.5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                    />
                  </div>
                  <span className="text-xs text-navy-600 font-medium w-16 text-right">{w.budget}M</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Opérateurs */}
        <motion.div variants={itemVariants}>
          <Card padding="lg" hover={false}>
            <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <Award size={16} className="text-gold-500" />
              Top opérateurs économiques
            </h3>
            <div className="space-y-3">
              {topOperators.map((op, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-navy-50/50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-sm font-bold text-gold-700">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">{op.name}</p>
                    <p className="text-xs text-navy-500">
                      {op.marchés} marchés • {op.amount}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-navy-900">{op.score}</p>
                    <p className="text-[10px] text-navy-400">Score moy.</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
