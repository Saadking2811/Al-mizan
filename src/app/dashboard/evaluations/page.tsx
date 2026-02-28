'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  ClipboardCheck,
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  BarChart3,
  ChevronRight,
  Eye,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const evaluations = [
  {
    id: 'EVAL-2026-0034',
    tender: 'AO-ALG-2026-0847',
    title: 'Réalisation d\'une école primaire — Lot 2 : VRD',
    status: 'en-cours',
    progress: 65,
    members: 5,
    submissions: 8,
    deadline: '20 Mars 2026',
    phase: 'Évaluation technique',
  },
  {
    id: 'EVAL-2026-0033',
    tender: 'AO-ORA-2026-0312',
    title: 'Fourniture d\'équipements informatiques',
    status: 'en-cours',
    progress: 40,
    members: 3,
    submissions: 12,
    deadline: '25 Mars 2026',
    phase: 'Ouverture des plis',
  },
  {
    id: 'EVAL-2026-0032',
    tender: 'AO-CNS-2026-0198',
    title: 'Réhabilitation réseau d\'assainissement — Phase 1',
    status: 'termine',
    progress: 100,
    members: 5,
    submissions: 5,
    deadline: '10 Fév 2026',
    phase: 'Attribué',
    winner: 'SARL Mansouri BTP',
    score: 87.5,
  },
  {
    id: 'EVAL-2026-0031',
    tender: 'AO-BLD-2026-0089',
    title: 'Construction d\'un centre de santé — Blida',
    status: 'termine',
    progress: 100,
    members: 4,
    submissions: 6,
    deadline: '05 Fév 2026',
    phase: 'Attribué',
    winner: 'EURL Benbrahim Construction',
    score: 91.2,
  },
  {
    id: 'EVAL-2026-0030',
    tender: 'AO-SIF-2026-0177',
    title: 'Fourniture de mobilier scolaire — Sétif',
    status: 'suspendu',
    progress: 30,
    members: 3,
    submissions: 4,
    deadline: '28 Fév 2026',
    phase: 'Suspendu — Recours',
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  'en-cours': { label: 'En cours', color: 'bg-blue-100 text-blue-700', icon: Clock },
  'termine': { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  'suspendu': { label: 'Suspendu', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
};

const statsCards = [
  { label: 'Évaluations en cours', value: '2', icon: Clock, color: 'bg-blue-100 text-blue-600' },
  { label: 'Terminées ce mois', value: '8', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  { label: 'Soumissions examinées', value: '47', icon: FileText, color: 'bg-gold-100 text-gold-600' },
  { label: 'Score moyen', value: '76.3', icon: Star, color: 'bg-navy-100 text-navy-600' },
];

export default function EvaluationsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEval, setSelectedEval] = useState<string | null>(null);

  const filtered = evaluations.filter(
    (e) => filterStatus === 'all' || e.status === filterStatus
  );

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
            <ClipboardCheck size={24} className="text-gold-500" />
            Évaluations
          </h1>
          <p className="text-navy-500 text-sm">
            Commission d&apos;ouverture et d&apos;évaluation des offres
          </p>
        </div>
      </motion.div>

      {/* ── Stats ────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <Card key={i} padding="md">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-xs text-navy-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* ── Filters ──────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'en-cours', label: 'En cours' },
          { key: 'termine', label: 'Terminées' },
          { key: 'suspendu', label: 'Suspendues' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterStatus === f.key
                ? 'bg-gold-500 text-navy-900'
                : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* ── Evaluations List ─────────────────── */}
      <motion.div variants={containerVariants} className="space-y-4">
        {filtered.map((evaluation) => {
          const config = statusConfig[evaluation.status];
          const StatusIcon = config.icon;
          const isExpanded = selectedEval === evaluation.id;

          return (
            <motion.div key={evaluation.id} variants={itemVariants}>
              <Card padding="md" className={isExpanded ? 'ring-2 ring-gold-500/30' : ''}>
                <div
                  className="flex flex-col lg:flex-row lg:items-center gap-4 cursor-pointer"
                  onClick={() => setSelectedEval(isExpanded ? null : evaluation.id)}
                >
                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono bg-navy-100 text-navy-700 px-2 py-0.5 rounded">
                        {evaluation.id}
                      </span>
                      <span className="text-xs text-navy-400">→</span>
                      <span className="text-xs font-mono text-gold-600">
                        {evaluation.tender}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-navy-900 truncate">
                      {evaluation.title}
                    </h3>
                    <p className="text-sm text-navy-500 mt-1">{evaluation.phase}</p>
                  </div>

                  {/* Progress + Meta */}
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-navy-500">Progression</span>
                        <span className="text-xs font-medium text-navy-700">{evaluation.progress}%</span>
                      </div>
                      <div className="w-32 h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            evaluation.progress === 100 ? 'bg-green-500' : 'bg-gold-500'
                          }`}
                          style={{ width: `${evaluation.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-navy-500">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {evaluation.members}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText size={14} />
                        {evaluation.submissions}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {evaluation.deadline}
                      </span>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`text-navy-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-navy-100"
                  >
                    {evaluation.status === 'termine' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-green-50 rounded-xl">
                          <p className="text-xs text-green-600 mb-1">Attributaire</p>
                          <p className="text-sm font-semibold text-green-800">
                            {(evaluation as { winner?: string }).winner}
                          </p>
                        </div>
                        <div className="p-3 bg-gold-50 rounded-xl">
                          <p className="text-xs text-gold-600 mb-1">Score final</p>
                          <p className="text-sm font-semibold text-gold-800">
                            {(evaluation as { score?: number }).score}/100
                          </p>
                        </div>
                        <div className="p-3 bg-navy-50 rounded-xl">
                          <p className="text-xs text-navy-500 mb-1">Soumissionnaires</p>
                          <p className="text-sm font-semibold text-navy-800">
                            {evaluation.submissions} offres évaluées
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm">
                        <Eye size={14} />
                        Voir détails
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 size={14} />
                        Grille de notation
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={14} />
                        PV d&apos;évaluation
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
