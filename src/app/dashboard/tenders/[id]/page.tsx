'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Download,
  Send,
  Eye,
  Shield,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Phone,
  Mail,
  Printer,
  Share2,
  BookOpen,
  BarChart3,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

// Mock tender detail data
const tenderData = {
  id: 'AO-ALG-2026-0847',
  title: 'Réalisation d\'une école primaire de 12 classes — Lot 2 : Travaux VRD',
  description: `
    Le présent appel d'offres porte sur la réalisation des travaux de voirie et réseaux divers (VRD) dans le cadre de la construction d'une école primaire de 12 classes dans la commune de Cherchell, wilaya de Tipaza.
    
    Les travaux comprennent :
    - Terrassements généraux et mise à niveau du terrain
    - Réalisation du réseau d'assainissement (eaux usées et eaux pluviales)
    - Alimentation en eau potable (AEP)
    - Voirie intérieure et parkings
    - Aménagement des espaces verts
    - Clôture et portail principal
    - Éclairage extérieur
  `,
  wilaya: 'Tipaza',
  commune: 'Cherchell',
  organism: 'Direction des Équipements Publics',
  sector: 'Travaux Publics',
  status: 'En cours',
  type: 'Appel d\'offres national ouvert',
  publishDate: '15 Février 2026',
  deadline: '15 Mars 2026',
  amount: '45,000,000 DZD',
  estimatedMin: '40,000,000 DZD',
  estimatedMax: '50,000,000 DZD',
  duration: '12 mois',
  offers: 8,
  views: 234,
  reference: 'BOMOP 2026-1547',
  decreeRef: 'Décret exécutif 15-247',
  
  // Contact info
  contact: {
    name: 'M. Ahmed Benmoussa',
    title: 'Chef de Service des Marchés',
    phone: '+213 24 XX XX XX',
    email: 'marches.dep-tipaza@mtp.gov.dz',
    address: 'Direction des Équipements Publics, Rue de l\'Indépendance, Tipaza',
  },
  
  // Requirements
  requirements: [
    'Qualification professionnelle catégorie III ou supérieure en BTP',
    'Attestation de mise à jour CNAS et CASNOS',
    'Extrait de rôle apuré ou échéancier',
    'Casier judiciaire du gérant (moins de 3 mois)',
    'Références de travaux similaires (3 dernières années)',
    'Moyens matériels et humains disponibles',
  ],
  
  // Documents
  documents: [
    { name: 'Cahier des charges', size: '2.4 MB', type: 'PDF' },
    { name: 'Plans et dessins techniques', size: '15.8 MB', type: 'ZIP' },
    { name: 'Bordereau des prix unitaires (BPU)', size: '1.2 MB', type: 'XLSX' },
    { name: 'Devis quantitatif estimatif (DQE)', size: '890 KB', type: 'XLSX' },
    { name: 'Modèle de soumission', size: '450 KB', type: 'DOCX' },
  ],
  
  // Key dates
  keyDates: [
    { label: 'Publication BOMOP', date: '15 Février 2026', done: true },
    { label: 'Retrait du cahier des charges', date: 'Jusqu\'au 10 Mars 2026', done: false },
    { label: 'Visite des lieux', date: '25 Février 2026', done: true },
    { label: 'Date limite de dépôt', date: '15 Mars 2026 à 12h00', done: false },
    { label: 'Ouverture des plis', date: '15 Mars 2026 à 14h00', done: false },
  ],
  
  // Statistics
  stats: {
    downloads: 156,
    questions: 12,
    avgOfferTime: '8 jours',
  },
};

const statusColors: Record<string, string> = {
  'En cours': 'bg-navy-100 text-navy-700',
  'Évaluation': 'bg-gold-100 text-gold-700',
  'Attribué': 'bg-green-100 text-green-700',
  'Clôturé': 'bg-gray-100 text-gray-600',
};

export default function TenderDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline'>('overview');

  // In real app, fetch tender by params.id
  const tender = tenderData;

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Back & Actions ───────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/dashboard/tenders"
          className="flex items-center gap-2 text-navy-600 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Retour aux appels d&apos;offres</span>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/tenders/${tender.id}/volet-01`}>
            <Button variant="secondary" size="sm">
              <BookOpen size={16} />
              Volet 01
            </Button>
          </Link>
          <Link href={`/dashboard/tenders/${tender.id}/volet-02`}>
            <Button variant="secondary" size="sm">
              <FileText size={16} />
              Volet 02
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Printer size={16} />
            Imprimer
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 size={16} />
            Partager
          </Button>
          <Link href={`/dashboard/submissions/new?tender=${tender.id}`}>
            <Button variant="primary" size="sm">
              <Send size={16} />
              Soumettre une offre
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* ── Header Card ──────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="lg" hover={false} className="relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm font-mono text-navy-600 bg-navy-100 px-3 py-1 rounded">
                {tender.id}
              </span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[tender.status]}`}>
                {tender.status}
              </span>
              <span className="text-xs text-navy-500 flex items-center gap-1">
                <Eye size={12} />
                {tender.views} vues
              </span>
            </div>

            <h1 className="text-2xl font-bold text-navy-900 mb-4">
              {tender.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-navy-600">
              <span className="flex items-center gap-2">
                <Building2 size={16} className="text-navy-400" />
                {tender.organism}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-navy-400" />
                {tender.wilaya}, {tender.commune}
              </span>
              <span className="flex items-center gap-2">
                <FileText size={16} className="text-navy-400" />
                {tender.type}
              </span>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-navy-100">
              <div>
                <p className="text-xs text-navy-400 mb-1">Montant estimé</p>
                <p className="text-lg font-bold text-navy-900">{tender.amount}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 mb-1">Date limite</p>
                <p className="text-lg font-bold text-gold-600">{tender.deadline}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 mb-1">Durée des travaux</p>
                <p className="text-lg font-bold text-navy-900">{tender.duration}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400 mb-1">Offres reçues</p>
                <p className="text-lg font-bold text-navy-900">{tender.offers}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ── Tabs ─────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 bg-navy-100 rounded-xl">
        {[
          { key: 'overview', label: 'Vue d\'ensemble', icon: BookOpen },
          { key: 'documents', label: 'Documents', icon: FileText },
          { key: 'timeline', label: 'Chronologie', icon: History },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-navy-600 hover:text-navy-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* ── Tab Content ──────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main content - 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card padding="lg" hover={false}>
                <h2 className="text-lg font-semibold text-navy-900 mb-4">
                  Description du marché
                </h2>
                <div className="prose prose-sm prose-navy max-w-none">
                  {tender.description.split('\n').map((p, i) => (
                    <p key={i} className="text-navy-600">{p}</p>
                  ))}
                </div>
              </Card>

              {/* Requirements */}
              <Card padding="lg" hover={false}>
                <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-gold-500" />
                  Conditions de participation
                </h2>
                <ul className="space-y-3">
                  {tender.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-navy-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Key Dates */}
              <Card padding="lg" hover={false}>
                <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-gold-500" />
                  Dates clés
                </h2>
                <div className="space-y-4">
                  {tender.keyDates.map((date, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${date.done ? 'bg-green-500' : 'bg-navy-300'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${date.done ? 'text-navy-500' : 'text-navy-900'}`}>
                          {date.label}
                        </p>
                      </div>
                      <span className={`text-sm ${date.done ? 'text-navy-400' : 'text-gold-600 font-medium'}`}>
                        {date.date}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar - 1 col */}
            <div className="space-y-6">
              {/* Contact */}
              <Card padding="md" hover={false}>
                <h3 className="text-sm font-semibold text-navy-900 mb-4">
                  Contact du service contractant
                </h3>
                <div className="space-y-3">
                  <p className="font-medium text-navy-800">{tender.contact.name}</p>
                  <p className="text-sm text-navy-500">{tender.contact.title}</p>
                  <div className="border-t border-navy-100 my-3" />
                  <a
                    href={`tel:${tender.contact.phone}`}
                    className="flex items-center gap-2 text-sm text-navy-600 hover:text-gold-600 transition-colors"
                  >
                    <Phone size={14} />
                    {tender.contact.phone}
                  </a>
                  <a
                    href={`mailto:${tender.contact.email}`}
                    className="flex items-center gap-2 text-sm text-navy-600 hover:text-gold-600 transition-colors"
                  >
                    <Mail size={14} />
                    {tender.contact.email}
                  </a>
                  <p className="flex items-start gap-2 text-sm text-navy-600">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    {tender.contact.address}
                  </p>
                </div>
              </Card>

              {/* Quick stats */}
              <Card padding="md" hover={false}>
                <h3 className="text-sm font-semibold text-navy-900 mb-4">
                  Statistiques
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-500 flex items-center gap-2">
                      <Download size={14} />
                      Téléchargements
                    </span>
                    <span className="font-semibold text-navy-900">{tender.stats.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-500 flex items-center gap-2">
                      <Users size={14} />
                      Offres reçues
                    </span>
                    <span className="font-semibold text-navy-900">{tender.offers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-500 flex items-center gap-2">
                      <BarChart3 size={14} />
                      Temps moyen
                    </span>
                    <span className="font-medium text-navy-700">{tender.stats.avgOfferTime}</span>
                  </div>
                </div>
              </Card>

              {/* References */}
              <Card padding="md" hover={false}>
                <h3 className="text-sm font-semibold text-navy-900 mb-4">
                  Références légales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink size={14} className="text-navy-400" />
                    <span className="text-navy-600">{tender.reference}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield size={14} className="text-navy-400" />
                    <span className="text-navy-600">{tender.decreeRef}</span>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <Link href={`/dashboard/submissions/new?tender=${tender.id}`} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  <Send size={18} />
                  Soumettre une offre
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div
            key="documents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card padding="lg" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-navy-900">
                    Documents du marché
                  </h2>
                  <p className="text-sm text-navy-500">
                    {tender.documents.length} documents disponibles
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={16} />
                  Tout télécharger
                </Button>
              </div>

              <div className="space-y-3">
                {tender.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-navy-50/50 rounded-xl hover:bg-navy-100/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                        <FileText size={18} className="text-gold-600" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">{doc.name}</p>
                        <p className="text-xs text-navy-400">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Notice */}
              <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-xl">
                <p className="text-sm text-gold-800 flex items-start gap-2">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span>
                    Le téléchargement des documents vaut retrait officiel du cahier des charges. 
                    Votre organisme sera enregistré comme soumissionnaire potentiel.
                  </span>
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6">
                Chronologie du marché
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-navy-200" />

                <div className="space-y-8">
                  {[
                    { date: '15/02/2026', title: 'Publication de l\'avis', desc: 'Avis publié au BOMOP n°1547', icon: FileText, status: 'done' },
                    { date: '25/02/2026', title: 'Visite des lieux', desc: 'Visite technique obligatoire sur site', icon: MapPin, status: 'done' },
                    { date: '10/03/2026', title: 'Fin retrait CDC', desc: 'Dernier jour pour retirer le cahier des charges', icon: Download, status: 'pending' },
                    { date: '15/03/2026', title: 'Date limite de dépôt', desc: 'Clôture des soumissions à 12h00', icon: Clock, status: 'pending' },
                    { date: '15/03/2026', title: 'Ouverture des plis', desc: 'Commission d\'ouverture à 14h00', icon: Users, status: 'pending' },
                    { date: '30/03/2026', title: 'Évaluation', desc: 'Phase d\'évaluation des offres', icon: BarChart3, status: 'pending' },
                    { date: 'À définir', title: 'Attribution', desc: 'Notification au soumissionnaire retenu', icon: CheckCircle, status: 'pending' },
                  ].map((event, i) => (
                    <div key={i} className="flex gap-6">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        event.status === 'done' ? 'bg-green-500' : 'bg-navy-200'
                      }`}>
                        <event.icon size={14} className={event.status === 'done' ? 'text-white' : 'text-navy-500'} />
                      </div>
                      <div className={event.status === 'done' ? 'opacity-60' : ''}>
                        <p className="text-xs text-navy-400 mb-1">{event.date}</p>
                        <p className="font-medium text-navy-900">{event.title}</p>
                        <p className="text-sm text-navy-500">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
