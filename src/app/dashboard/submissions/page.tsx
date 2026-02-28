'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Search,
  Filter,
  Plus,
  Clock,
  FileText,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Building2,
  Calendar,
  BarChart3,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Statuses for submissions
const statusOptions = ['Toutes', 'Brouillon', 'Soumise', 'En évaluation', 'Acceptée', 'Rejetée'];

// Mock submissions data
const submissionsData = [
  {
    id: 'SOUM-2026-0847-001',
    tenderId: 'AO-ALG-2026-0847',
    tenderTitle: 'Réalisation d\'une école primaire — Lot 2 : Travaux VRD',
    organism: 'Direction des Équipements Publics — Tipaza',
    status: 'Soumise',
    submittedAt: '10 Mars 2026',
    amount: '42,500,000 DZD',
    score: null,
    documents: 8,
    deadline: '15 Mars 2026',
  },
  {
    id: 'SOUM-2026-0312-003',
    tenderId: 'AO-ORA-2026-0312',
    tenderTitle: 'Fourniture d\'équipements informatiques pour administration',
    organism: 'APC d\'Oran',
    status: 'En évaluation',
    submittedAt: '25 Fév 2026',
    amount: '11,800,000 DZD',
    score: 78,
    documents: 12,
    deadline: '28 Fév 2026',
  },
  {
    id: 'SOUM-2026-0198-002',
    tenderId: 'AO-CNS-2026-0198',
    tenderTitle: 'Réhabilitation du réseau d\'assainissement — Phase 1',
    organism: 'Direction de l\'Hydraulique — Constantine',
    status: 'Acceptée',
    submittedAt: '05 Fév 2026',
    amount: '175,000,000 DZD',
    score: 92,
    documents: 15,
    deadline: '10 Fév 2026',
    rank: 1,
  },
  {
    id: 'SOUM-2026-0421-001',
    tenderId: 'AO-SET-2026-0421',
    tenderTitle: 'Étude et suivi de construction d\'un complexe sportif',
    organism: 'Direction de la Jeunesse et des Sports — Sétif',
    status: 'Brouillon',
    submittedAt: null,
    amount: '7,200,000 DZD',
    score: null,
    documents: 4,
    deadline: '25 Mars 2026',
  },
  {
    id: 'SOUM-2026-0589-001',
    tenderId: 'AO-ANB-2026-0589',
    tenderTitle: 'Fourniture d\'équipements médicaux — Lot 4 : Imagerie',
    organism: 'CHU Ibn Rochd — Annaba',
    status: 'Rejetée',
    submittedAt: '01 Mars 2026',
    amount: '310,000,000 DZD',
    score: 45,
    documents: 10,
    deadline: '05 Mars 2026',
    rejectReason: 'Documents incomplets',
  },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType; bgColor: string }> = {
  'Brouillon': { color: 'text-navy-600', icon: FileText, bgColor: 'bg-navy-100' },
  'Soumise': { color: 'text-blue-600', icon: Clock, bgColor: 'bg-blue-100' },
  'En évaluation': { color: 'text-gold-600', icon: BarChart3, bgColor: 'bg-gold-100' },
  'Acceptée': { color: 'text-green-600', icon: CheckCircle, bgColor: 'bg-green-100' },
  'Rejetée': { color: 'text-red-600', icon: XCircle, bgColor: 'bg-red-100' },
};

export default function SubmissionsListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Toutes');

  const filteredSubmissions = submissionsData.filter((sub) => {
    const matchesSearch = sub.tenderTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.tenderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Toutes' || sub.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: submissionsData.length,
    draft: submissionsData.filter(s => s.status === 'Brouillon').length,
    submitted: submissionsData.filter(s => s.status === 'Soumise').length,
    inEval: submissionsData.filter(s => s.status === 'En évaluation').length,
    accepted: submissionsData.filter(s => s.status === 'Acceptée').length,
  };

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
          <h1 className="text-2xl font-bold text-navy-900">Mes soumissions</h1>
          <p className="text-navy-500">
            Gérez vos offres soumises aux appels d&apos;offres
          </p>
        </div>
        <Link href="/dashboard/submissions/new">
          <Button variant="primary" size="md">
            <Plus size={18} />
            Nouvelle soumission
          </Button>
        </Link>
      </motion.div>

      {/* ── Stats Cards ──────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-navy-900' },
          { label: 'Brouillons', value: stats.draft, color: 'text-navy-600' },
          { label: 'Soumises', value: stats.submitted, color: 'text-blue-600' },
          { label: 'En évaluation', value: stats.inEval, color: 'text-gold-600' },
          { label: 'Acceptées', value: stats.accepted, color: 'text-green-600' },
        ].map((stat, i) => (
          <Card key={i} padding="sm" className="text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-navy-500">{stat.label}</p>
          </Card>
        ))}
      </motion.div>

      {/* ── Search & Filters ────────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="md" hover={false}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par référence ou titre..."
                icon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ── Submissions List ────────────────── */}
      <motion.div variants={containerVariants} className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card padding="lg" hover={false}>
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-navy-300 mb-4" />
              <h3 className="text-lg font-semibold text-navy-700 mb-2">
                Aucune soumission trouvée
              </h3>
              <p className="text-navy-500 mb-4">
                Parcourez les appels d&apos;offres disponibles pour soumettre une offre.
              </p>
              <Link href="/dashboard/tenders">
                <Button variant="primary" size="md">
                  Voir les appels d&apos;offres
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => {
            const statusInfo = statusConfig[submission.status];
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div key={submission.id} variants={itemVariants}>
                <Link href={`/dashboard/submissions/${submission.id}`}>
                  <Card padding="md" className="group">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Status Icon */}
                      <div className={`w-12 h-12 rounded-xl ${statusInfo.bgColor} flex items-center justify-center shrink-0`}>
                        <StatusIcon size={22} className={statusInfo.color} />
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-mono text-navy-500 bg-navy-50 px-2 py-0.5 rounded">
                            {submission.id}
                          </span>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {submission.status}
                          </span>
                          {submission.rank && (
                            <span className="text-xs font-semibold px-2 py-0.5 bg-gold-500 text-navy-900 rounded">
                              #{submission.rank}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-navy-900 group-hover:text-gold-600 transition-colors mb-1 line-clamp-1">
                          {submission.tenderTitle}
                        </h3>
                        <p className="text-sm text-navy-500 flex items-center gap-1.5">
                          <Building2 size={14} className="text-navy-400" />
                          {submission.organism}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-navy-400 text-xs mb-1">Montant offre</p>
                          <p className="font-semibold text-navy-900">{submission.amount}</p>
                        </div>
                        {submission.score !== null && (
                          <div className="text-center">
                            <p className="text-navy-400 text-xs mb-1">Score</p>
                            <p className={`font-bold ${submission.score >= 70 ? 'text-green-600' : submission.score >= 50 ? 'text-gold-600' : 'text-red-600'}`}>
                              {submission.score}%
                            </p>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-navy-400 text-xs mb-1">Documents</p>
                          <p className="font-medium text-navy-700">{submission.documents}</p>
                        </div>
                        {submission.submittedAt ? (
                          <div className="text-center">
                            <p className="text-navy-400 text-xs mb-1">Soumise le</p>
                            <p className="font-medium text-navy-700 flex items-center gap-1">
                              <Calendar size={12} />
                              {submission.submittedAt}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-navy-400 text-xs mb-1">Échéance</p>
                            <p className="font-medium text-gold-600 flex items-center gap-1">
                              <AlertCircle size={12} />
                              {submission.deadline}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <ChevronRight size={20} className="text-navy-300 group-hover:text-gold-500 transition-colors hidden lg:block" />
                    </div>

                    {/* Reject reason if applicable */}
                    {submission.status === 'Rejetée' && submission.rejectReason && (
                      <div className="mt-4 pt-4 border-t border-navy-100">
                        <p className="text-sm text-red-600 flex items-center gap-2">
                          <XCircle size={14} />
                          Motif : {submission.rejectReason}
                        </p>
                      </div>
                    )}
                  </Card>
                </Link>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </motion.div>
  );
}
