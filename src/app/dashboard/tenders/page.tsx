'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Search,
  Filter,
  Plus,
  Clock,
  MapPin,
  Building2,
  ChevronRight,
  Calendar,
  DollarSign,
  Eye,
  Users,
  FileText,
  Download,
  X,
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

// Wilayas for filtering
const wilayas = [
  'Toutes', 'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Tipaza', 
  'Sétif', 'Batna', 'Béjaïa', 'Tlemcen', 'Biskra', 'Djelfa'
];

const sectors = [
  'Tous', 'Travaux Publics', 'Fournitures', 'Services', 'Études', 'TIC', 'Santé', 'Éducation'
];

const statusOptions = [
  'Tous', 'En cours', 'Évaluation', 'Attribué', 'Clôturé', 'Annulé'
];

// Mock tender data with real Algerian context
const tendersData = [
  {
    id: 'AO-ALG-2026-0847',
    title: 'Réalisation d\'une école primaire de 12 classes — Lot 2 : Travaux VRD',
    wilaya: 'Tipaza',
    commune: 'Cherchell',
    organism: 'Direction des Équipements Publics',
    sector: 'Travaux Publics',
    status: 'En cours',
    publishDate: '15 Fév 2026',
    deadline: '15 Mars 2026',
    amount: '45,000,000 DZD',
    offers: 8,
    views: 234,
    type: 'Appel d\'offres ouvert',
    reference: 'BOMOP 2026-1547',
  },
  {
    id: 'AO-ORA-2026-0312',
    title: 'Fourniture d\'équipements informatiques pour les services administratifs',
    wilaya: 'Oran',
    commune: 'Oran',
    organism: 'APC d\'Oran',
    sector: 'Fournitures',
    status: 'Évaluation',
    publishDate: '01 Fév 2026',
    deadline: '28 Fév 2026',
    amount: '12,500,000 DZD',
    offers: 12,
    views: 456,
    type: 'Consultation restreinte',
    reference: 'BOMOP 2026-1234',
  },
  {
    id: 'AO-CNS-2026-0198',
    title: 'Réhabilitation du réseau d\'assainissement de la ville — Phase 1',
    wilaya: 'Constantine',
    commune: 'Constantine',
    organism: 'Direction de l\'Hydraulique',
    sector: 'Travaux Publics',
    status: 'Attribué',
    publishDate: '01 Jan 2026',
    deadline: '10 Fév 2026',
    amount: '180,000,000 DZD',
    offers: 5,
    views: 678,
    type: 'Appel d\'offres ouvert',
    reference: 'BOMOP 2026-0987',
  },
  {
    id: 'AO-ALG-2026-0756',
    title: 'Acquisition de véhicules de transport collectif scolaire',
    wilaya: 'Alger',
    commune: 'Bab Ezzouar',
    organism: 'Direction des Transports',
    sector: 'Fournitures',
    status: 'En cours',
    publishDate: '20 Fév 2026',
    deadline: '20 Mars 2026',
    amount: '95,000,000 DZD',
    offers: 6,
    views: 312,
    type: 'Appel d\'offres ouvert',
    reference: 'BOMOP 2026-1678',
  },
  {
    id: 'AO-SET-2026-0421',
    title: 'Étude et suivi de construction d\'un complexe sportif de proximité',
    wilaya: 'Sétif',
    commune: 'Sétif',
    organism: 'Direction de la Jeunesse et des Sports',
    sector: 'Études',
    status: 'En cours',
    publishDate: '18 Fév 2026',
    deadline: '25 Mars 2026',
    amount: '8,500,000 DZD',
    offers: 4,
    views: 189,
    type: 'Consultation restreinte',
    reference: 'BOMOP 2026-1589',
  },
  {
    id: 'AO-ANB-2026-0589',
    title: 'Fourniture d\'équipements médicaux pour le CHU — Lot 4 : Imagerie',
    wilaya: 'Annaba',
    commune: 'Annaba',
    organism: 'CHU Ibn Rochd',
    sector: 'Santé',
    status: 'Évaluation',
    publishDate: '05 Fév 2026',
    deadline: '05 Mars 2026',
    amount: '320,000,000 DZD',
    offers: 7,
    views: 567,
    type: 'Appel d\'offres ouvert',
    reference: 'BOMOP 2026-1456',
  },
];

const statusColors: Record<string, string> = {
  'En cours': 'bg-navy-100 text-navy-700',
  'Évaluation': 'bg-gold-100 text-gold-700',
  'Attribué': 'bg-green-100 text-green-700',
  'Clôturé': 'bg-gray-100 text-gray-600',
  'Annulé': 'bg-red-100 text-red-600',
};

export default function TendersListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState('Toutes');
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [view, setView] = useState<'grid' | 'list'>('list');

  // Filter tenders
  const filteredTenders = tendersData.filter((tender) => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.organism.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWilaya = selectedWilaya === 'Toutes' || tender.wilaya === selectedWilaya;
    const matchesSector = selectedSector === 'Tous' || tender.sector === selectedSector;
    const matchesStatus = selectedStatus === 'Tous' || tender.status === selectedStatus;
    return matchesSearch && matchesWilaya && matchesSector && matchesStatus;
  });

  const activeFiltersCount = [selectedWilaya, selectedSector, selectedStatus]
    .filter((v) => v !== 'Toutes' && v !== 'Tous').length;

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
          <h1 className="text-2xl font-bold text-navy-900">Appels d&apos;offres</h1>
          <p className="text-navy-500">
            {filteredTenders.length} marché(s) trouvé(s) sur {tendersData.length}
          </p>
        </div>
        <Link href="/dashboard/tenders/new">
          <Button variant="primary" size="md">
            <Plus size={18} />
            Nouvel appel d&apos;offres
          </Button>
        </Link>
      </motion.div>

      {/* ── Search & Filters ────────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="md" hover={false}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                placeholder="Rechercher par référence, titre ou organisme..."
                icon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex gap-3">
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                size="md"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-gold-500 text-navy-900 text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {/* Export logic */}}
              >
                <Download size={18} />
                Exporter
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-navy-100">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Wilaya
                    </label>
                    <select
                      className="input-field"
                      value={selectedWilaya}
                      onChange={(e) => setSelectedWilaya(e.target.value)}
                    >
                      {wilayas.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Secteur
                    </label>
                    <select
                      className="input-field"
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                    >
                      {sectors.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Statut
                    </label>
                    <select
                      className="input-field"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-navy-500">Filtres actifs :</span>
                    {selectedWilaya !== 'Toutes' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-navy-100 text-navy-700 rounded text-xs">
                        {selectedWilaya}
                        <button onClick={() => setSelectedWilaya('Toutes')}>
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedSector !== 'Tous' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-navy-100 text-navy-700 rounded text-xs">
                        {selectedSector}
                        <button onClick={() => setSelectedSector('Tous')}>
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedStatus !== 'Tous' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-navy-100 text-navy-700 rounded text-xs">
                        {selectedStatus}
                        <button onClick={() => setSelectedStatus('Tous')}>
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSelectedWilaya('Toutes');
                        setSelectedSector('Tous');
                        setSelectedStatus('Tous');
                      }}
                      className="text-xs text-gold-600 hover:underline ml-2"
                    >
                      Tout effacer
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* ── Tenders List ────────────────────── */}
      <motion.div variants={containerVariants} className="space-y-4">
        {filteredTenders.length === 0 ? (
          <Card padding="lg" hover={false}>
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-navy-300 mb-4" />
              <h3 className="text-lg font-semibold text-navy-700 mb-2">
                Aucun appel d&apos;offres trouvé
              </h3>
              <p className="text-navy-500 mb-4">
                Modifiez vos critères de recherche ou créez un nouvel appel.
              </p>
              <Link href="/dashboard/tenders/new">
                <Button variant="primary" size="md">
                  <Plus size={18} />
                  Créer un appel d&apos;offres
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          filteredTenders.map((tender) => (
            <motion.div key={tender.id} variants={itemVariants}>
              <Link href={`/dashboard/tenders/${tender.id}`}>
                <Card padding="md" className="group">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-navy-600 bg-navy-100 px-2 py-0.5 rounded">
                          {tender.id}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[tender.status]}`}>
                          {tender.status}
                        </span>
                        <span className="text-xs text-navy-400">
                          {tender.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-navy-900 group-hover:text-gold-600 transition-colors mb-2 line-clamp-2">
                        {tender.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 size={14} className="text-navy-400" />
                          {tender.organism}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-navy-400" />
                          {tender.wilaya}, {tender.commune}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-navy-400 text-xs mb-1">Montant estimé</p>
                        <p className="font-semibold text-navy-900 flex items-center gap-1">
                          <DollarSign size={14} className="text-gold-500" />
                          {tender.amount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-navy-400 text-xs mb-1">Date limite</p>
                        <p className="font-medium text-navy-800 flex items-center gap-1">
                          <Calendar size={14} className="text-navy-400" />
                          {tender.deadline}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-navy-400 text-xs mb-1">Offres</p>
                        <p className="font-semibold text-navy-900 flex items-center gap-1">
                          <Users size={14} className="text-navy-400" />
                          {tender.offers}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-navy-400 text-xs mb-1">Vues</p>
                        <p className="font-medium text-navy-600 flex items-center gap-1">
                          <Eye size={14} className="text-navy-400" />
                          {tender.views}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight size={20} className="text-navy-300 group-hover:text-gold-500 transition-colors hidden lg:block" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* ── Pagination placeholder ───────────── */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled>
            Précédent
          </Button>
          <span className="px-3 py-1 bg-gold-500 text-navy-900 rounded text-sm font-medium">1</span>
          <span className="px-3 py-1 text-navy-600 hover:bg-navy-100 rounded text-sm cursor-pointer">2</span>
          <span className="px-3 py-1 text-navy-600 hover:bg-navy-100 rounded text-sm cursor-pointer">3</span>
          <Button variant="ghost" size="sm">
            Suivant
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
