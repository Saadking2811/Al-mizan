'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  ScrollText,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  Info,
  CheckCircle,
  ShieldAlert,
  Clock,
  User,
  FileText,
  Settings,
  LogIn,
  LogOut,
  Edit3,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

type Severity = 'info' | 'warning' | 'critical' | 'success';

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  details: string;
  ip: string;
  severity: Severity;
}

const severityConfig: Record<Severity, { label: string; icon: React.ElementType; cls: string; bg: string }> = {
  info: { label: 'Info', icon: Info, cls: 'text-blue-600', bg: 'bg-blue-100' },
  success: { label: 'Succès', icon: CheckCircle, cls: 'text-green-600', bg: 'bg-green-100' },
  warning: { label: 'Attention', icon: AlertTriangle, cls: 'text-amber-600', bg: 'bg-amber-100' },
  critical: { label: 'Critique', icon: ShieldAlert, cls: 'text-red-600', bg: 'bg-red-100' },
};

const actionIcons: Record<string, React.ElementType> = {
  login: LogIn,
  logout: LogOut,
  create: Plus,
  update: Edit3,
  delete: Trash2,
  view: Eye,
  config: Settings,
  submit: FileText,
};

const mockAudit: AuditEntry[] = [
  {
    id: 'AUD-20260118-001',
    timestamp: '2026-01-18 09:42:15',
    user: 'Karim Benali',
    role: 'Admin',
    action: 'login',
    resource: 'Système',
    details: 'Connexion au système — authentification 2FA validée',
    ip: '196.74.12.105',
    severity: 'info',
  },
  {
    id: 'AUD-20260118-002',
    timestamp: '2026-01-18 09:55:30',
    user: 'Karim Benali',
    role: 'Admin',
    action: 'update',
    resource: 'Utilisateur USR-005',
    details: 'Statut modifié : actif → suspendu. Motif : Non-conformité documents fiscaux',
    ip: '196.74.12.105',
    severity: 'warning',
  },
  {
    id: 'AUD-20260118-003',
    timestamp: '2026-01-18 10:12:08',
    user: 'Fatima Z. Mekhloufi',
    role: 'Serv. Contractant',
    action: 'create',
    resource: 'Appel d\'offres AO-2026-0105',
    details: 'Création appel d\'offres : Réaménagement Place 1er Novembre — Oran. Budget : 85M DZD',
    ip: '41.107.34.88',
    severity: 'success',
  },
  {
    id: 'AUD-20260118-004',
    timestamp: '2026-01-18 10:38:45',
    user: 'Youcef Hadj Brahim',
    role: 'Opérateur',
    action: 'submit',
    resource: 'Soumission SOUM-2026-0290',
    details: 'Soumission déposée pour AO-2026-0098 — Montant : 42.8M DZD',
    ip: '105.103.56.22',
    severity: 'success',
  },
  {
    id: 'AUD-20260118-005',
    timestamp: '2026-01-18 11:05:00',
    user: 'Amina Khelifi',
    role: 'Évaluateur',
    action: 'update',
    resource: 'Évaluation EVAL-2026-0032',
    details: 'Score technique mis à jour : 72.5 → 75.3. Critère : Qualifications personnel',
    ip: '196.74.15.67',
    severity: 'info',
  },
  {
    id: 'AUD-20260118-006',
    timestamp: '2026-01-18 11:22:33',
    user: 'Système',
    role: 'Auto',
    action: 'config',
    resource: 'Seuil alerte budget',
    details: 'Détection automatique : dépassement seuil 80% budget AO-2026-0087. Notification envoyée à la tutelle.',
    ip: '10.0.0.1',
    severity: 'critical',
  },
  {
    id: 'AUD-20260118-007',
    timestamp: '2026-01-18 12:00:01',
    user: 'Nadia Boudiaf',
    role: 'Serv. Contractant',
    action: 'view',
    resource: 'Tableau de bord analytique',
    details: 'Consultation des statistiques de la wilaya de Sétif — période T4 2025',
    ip: '41.107.90.11',
    severity: 'info',
  },
  {
    id: 'AUD-20260118-008',
    timestamp: '2026-01-18 12:15:44',
    user: 'Mohamed C. Ouali',
    role: 'Admin',
    action: 'delete',
    resource: 'Document DOC-2025-4489',
    details: 'Suppression document périmé : Certificat de conformité fiscale 2024 — Opérateur USR-012',
    ip: '196.74.12.108',
    severity: 'warning',
  },
  {
    id: 'AUD-20260118-009',
    timestamp: '2026-01-18 13:30:20',
    user: 'Rachid Mansouri',
    role: 'Opérateur',
    action: 'login',
    resource: 'Système',
    details: 'Tentative de connexion refusée — compte suspendu',
    ip: '41.111.22.45',
    severity: 'critical',
  },
  {
    id: 'AUD-20260118-010',
    timestamp: '2026-01-18 14:05:12',
    user: 'Karim Benali',
    role: 'Admin',
    action: 'config',
    resource: 'Paramètres plateforme',
    details: 'Modification délai de recours contentieux : 10j → 15j. Conformément arrêté ministériel du 05/01/2026.',
    ip: '196.74.12.105',
    severity: 'warning',
  },
];

const severityFilters = [
  { key: 'all', label: 'Toutes' },
  { key: 'critical', label: 'Critiques' },
  { key: 'warning', label: 'Attention' },
  { key: 'success', label: 'Succès' },
  { key: 'info', label: 'Info' },
];

export default function AuditPage() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = mockAudit.filter((e) => {
    if (severityFilter !== 'all' && e.severity !== severityFilter) return false;
    if (
      search &&
      !e.user.toLowerCase().includes(search.toLowerCase()) &&
      !e.details.toLowerCase().includes(search.toLowerCase()) &&
      !e.resource.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    total: mockAudit.length,
    critical: mockAudit.filter((e) => e.severity === 'critical').length,
    today: mockAudit.length,
    users: new Set(mockAudit.map((e) => e.user)).size,
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <ScrollText size={24} className="text-gold-500" />
            Journal d&apos;audit
          </h1>
          <p className="text-navy-500 text-sm">
            Traçabilité immuable — Conformité Art. 213 Décret 15-247
          </p>
        </div>
        <Button variant="outline" icon={<Download size={16} />}>
          Exporter CSV
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Événements aujourd\'hui', value: stats.today, icon: Clock },
          { label: 'Alertes critiques', value: stats.critical, icon: ShieldAlert },
          { label: 'Total enregistrements', value: '24,891', icon: ScrollText },
          { label: 'Utilisateurs actifs', value: stats.users, icon: User },
        ].map((s, i) => (
          <Card key={i} padding="md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                <s.icon size={18} className="text-gold-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-navy-500">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Rechercher dans le journal…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {severityFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setSeverityFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                severityFilter === f.key
                  ? 'bg-navy-800 text-white'
                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Audit Timeline */}
      <motion.div variants={itemVariants} className="space-y-2">
        {filtered.map((entry) => {
          const sev = severityConfig[entry.severity];
          const SevIcon = sev.icon;
          const ActIcon = actionIcons[entry.action] || Info;

          return (
            <Card key={entry.id} padding="md" hover>
              <div className="flex items-start gap-3">
                {/* Severity indicator */}
                <div className={`w-8 h-8 rounded-lg ${sev.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <SevIcon size={14} className={sev.cls} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy-900">{entry.user}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-100 text-navy-500 font-medium">
                        {entry.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-navy-400">
                      <Clock size={10} />
                      {entry.timestamp}
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-start gap-2">
                    <ActIcon size={12} className="text-navy-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-navy-600">{entry.resource}</span>
                      <p className="text-xs text-navy-500 mt-0.5">{entry.details}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-[10px] text-navy-400">
                    <span>ID: {entry.id}</span>
                    <span>•</span>
                    <span>IP: {entry.ip}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <Card padding="lg">
            <p className="text-center text-navy-400 py-8">Aucun événement trouvé</p>
          </Card>
        )}
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <p className="text-xs text-navy-500">
          Affichage de {filtered.length} résultats sur 24,891
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<ChevronLeft size={14} />}>
            Précédent
          </Button>
          <Button variant="outline" size="sm" icon={<ChevronRight size={14} />}>
            Suivant
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
