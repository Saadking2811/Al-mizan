'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Users,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  Building,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const roles = [
  { key: 'all', label: 'Tous', count: 156 },
  { key: 'admin', label: 'Administrateurs', count: 5 },
  { key: 'evaluator', label: 'Évaluateurs', count: 18 },
  { key: 'operator', label: 'Opérateurs', count: 89 },
  { key: 'contracting', label: 'Serv. Contractant', count: 44 },
];

type UserStatus = 'actif' | 'inactif' | 'suspendu';
type UserRole = 'admin' | 'evaluator' | 'operator' | 'contracting';

interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  wilaya: string;
  role: UserRole;
  status: UserStatus;
  organization: string;
  registeredAt: string;
  lastLogin: string;
}

const mockUsers: AppUser[] = [
  {
    id: 'USR-001',
    name: 'Karim Benali',
    email: 'k.benali@mizan.dz',
    phone: '+213 5 55 12 34 56',
    wilaya: 'Alger',
    role: 'admin',
    status: 'actif',
    organization: 'Ministère des Finances',
    registeredAt: '2024-01-15',
    lastLogin: '2026-01-18 09:42',
  },
  {
    id: 'USR-002',
    name: 'Fatima Zahra Mekhloufi',
    email: 'fz.mekhloufi@wilaya-oran.dz',
    phone: '+213 6 60 78 90 12',
    wilaya: 'Oran',
    role: 'contracting',
    status: 'actif',
    organization: 'Direction de l\'Urbanisme — Wilaya d\'Oran',
    registeredAt: '2024-06-22',
    lastLogin: '2026-01-17 15:10',
  },
  {
    id: 'USR-003',
    name: 'Youcef Hadj Brahim',
    email: 'y.hadjbrahim@infotechalgerie.dz',
    phone: '+213 7 71 34 56 78',
    wilaya: 'Constantine',
    role: 'operator',
    status: 'actif',
    organization: 'SPA InfoTech Algérie',
    registeredAt: '2024-09-10',
    lastLogin: '2026-01-18 11:05',
  },
  {
    id: 'USR-004',
    name: 'Amina Khelifi',
    email: 'a.khelifi@cnas.dz',
    phone: '+213 5 52 67 89 01',
    wilaya: 'Blida',
    role: 'evaluator',
    status: 'actif',
    organization: 'Commission d\'évaluation — CNAS',
    registeredAt: '2025-02-14',
    lastLogin: '2026-01-16 08:30',
  },
  {
    id: 'USR-005',
    name: 'Rachid Mansouri',
    email: 'r.mansouri@mansourbtp.dz',
    phone: '+213 6 63 45 67 89',
    wilaya: 'Annaba',
    role: 'operator',
    status: 'suspendu',
    organization: 'SARL Mansouri BTP',
    registeredAt: '2024-04-08',
    lastLogin: '2025-11-20 10:15',
  },
  {
    id: 'USR-006',
    name: 'Nadia Boudiaf',
    email: 'n.boudiaf@setif.dz',
    phone: '+213 7 78 12 34 56',
    wilaya: 'Sétif',
    role: 'contracting',
    status: 'inactif',
    organization: 'APC Sétif',
    registeredAt: '2025-05-30',
    lastLogin: '2025-12-01 14:22',
  },
  {
    id: 'USR-007',
    name: 'Mohamed Cherif Ouali',
    email: 'mc.ouali@mizan.dz',
    phone: '+213 5 59 87 65 43',
    wilaya: 'Alger',
    role: 'admin',
    status: 'actif',
    organization: 'Ministère des Finances',
    registeredAt: '2024-01-15',
    lastLogin: '2026-01-18 08:00',
  },
];

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  evaluator: 'Évaluateur',
  operator: 'Opérateur',
  contracting: 'Serv. Contractant',
};

const roleIcons: Record<UserRole, React.ElementType> = {
  admin: ShieldAlert,
  evaluator: ShieldCheck,
  operator: Users,
  contracting: Building,
};

const statusConfig: Record<UserStatus, { label: string; icon: React.ElementType; cls: string }> = {
  actif: { label: 'Actif', icon: CheckCircle, cls: 'bg-green-100 text-green-700' },
  inactif: { label: 'Inactif', icon: Clock, cls: 'bg-gray-100 text-gray-600' },
  suspendu: { label: 'Suspendu', icon: XCircle, cls: 'bg-red-100 text-red-600' },
};

export default function AdminUsersPage() {
  const [activeRole, setActiveRole] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockUsers.filter((u) => {
    if (activeRole !== 'all' && u.role !== activeRole) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockUsers.length,
    actifs: mockUsers.filter((u) => u.status === 'actif').length,
    suspendus: mockUsers.filter((u) => u.status === 'suspendu').length,
    nouveaux: 3,
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
            <Shield size={24} className="text-gold-500" />
            Gestion des utilisateurs
          </h1>
          <p className="text-navy-500 text-sm">
            Administration et contrôle des accès — Décret 15-247
          </p>
        </div>
        <Button variant="primary" icon={<UserPlus size={16} />}>
          Nouvel utilisateur
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total utilisateurs', value: stats.total, icon: Users },
          { label: 'Actifs', value: stats.actifs, icon: CheckCircle },
          { label: 'Suspendus', value: stats.suspendus, icon: XCircle },
          { label: 'Nouveaux (30j)', value: stats.nouveaux, icon: UserPlus },
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
            placeholder="Rechercher par nom ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {roles.map((r) => (
            <button
              key={r.key}
              onClick={() => setActiveRole(r.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === r.key
                  ? 'bg-navy-800 text-white'
                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }`}
            >
              {r.label}
              <span className="ml-1 opacity-60">{r.count}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* User List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filtered.map((user) => {
          const RoleIcon = roleIcons[user.role];
          const st = statusConfig[user.status];
          const StIcon = st.icon;
          const isExpanded = expandedId === user.id;

          return (
            <Card key={user.id} padding="md" hover>
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : user.id)}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-navy-900 truncate">{user.name}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${st.cls}`}>
                      <StIcon size={10} />
                      {st.label}
                    </span>
                  </div>
                  <p className="text-xs text-navy-500 truncate">{user.organization}</p>
                </div>

                {/* Role badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-100 text-navy-700">
                  <RoleIcon size={12} />
                  <span className="text-xs font-medium">{roleLabels[user.role]}</span>
                </div>

                {/* Wilaya */}
                <div className="hidden md:flex items-center gap-1 text-xs text-navy-500">
                  <MapPin size={12} />
                  {user.wilaya}
                </div>

                {/* Expand */}
                <ChevronDown
                  size={16}
                  className={`text-navy-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-navy-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Mail size={14} className="text-navy-400" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Phone size={14} className="text-navy-400" />
                        {user.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Calendar size={14} className="text-navy-400" />
                        Inscrit le {user.registeredAt}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Clock size={14} className="text-navy-400" />
                        Dernière connexion : {user.lastLogin}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier le rôle
                      </Button>
                      {user.status === 'actif' ? (
                        <Button variant="danger" size="sm">
                          Suspendre
                        </Button>
                      ) : (
                        <Button variant="primary" size="sm">
                          Réactiver
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Historique
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <Card padding="lg">
            <p className="text-center text-navy-400 py-8">Aucun utilisateur trouvé</p>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}
