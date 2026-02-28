'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  FileText,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Award,
  Calendar,
  Briefcase,
  Globe,
  Lock,
  Key,
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
  visible: { opacity: 1, y: 0 },
};

const tabs = [
  { id: 'info', label: 'Informations', icon: User },
  { id: 'organization', label: 'Organisation', icon: Building2 },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'documents', label: 'Documents', icon: FileText },
];

const wilayas = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Tipaza',
  'Tlemcen', 'Béjaïa', 'Sétif', 'Batna', 'Biskra', 'Ouargla',
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Mohamed',
    lastName: 'Benali',
    email: 'mohamed.benali@sarl-benali-btp.dz',
    phone: '+213 555 12 34 56',
    role: 'Opérateur Économique',
    organization: 'SARL Benali BTP',
    cnrc: '16/00-0123456A18',
    nif: '001816012345678',
    nis: '001816012345678901',
    wilaya: 'Alger',
    commune: 'Hussein Dey',
    address: '123 Rue des Entrepreneurs, Cité Industrielle',
    sector: 'B'timent et Travaux Publics',
    website: 'www.benali-btp.dz',
    employeeCount: '50-100',
    capital: '50 000 000 DZD',
    createdAt: '15 Juin 2024',
    lastLogin: '10 Mars 2026 à 09:15',
  });

  const stats = [
    { label: 'Soumissions', value: '47', icon: Briefcase },
    { label: 'Marchés attribués', value: '12', icon: Award },
    { label: 'Taux de réussite', value: '25.5%', icon: Globe },
    { label: 'Membre depuis', value: '2024', icon: Calendar },
  ];

  const documents = [
    { name: 'Extrait du registre de commerce (CNRC)', status: 'valid', expiry: '15 Juin 2027' },
    { name: 'Attestation CNAS', status: 'valid', expiry: '31 Mars 2026' },
    { name: 'Attestation CASNOS', status: 'expiring', expiry: '15 Avril 2026' },
    { name: 'Extrait de rôle', status: 'valid', expiry: '31 Déc 2026' },
    { name: 'Casier judiciaire', status: 'expired', expiry: '01 Fév 2026' },
    { name: 'Certificat de qualification', status: 'valid', expiry: '15 Sept 2027' },
  ];

  const statusColors = {
    valid: 'bg-green-100 text-green-700',
    expiring: 'bg-gold-100 text-gold-700',
    expired: 'bg-red-100 text-red-700',
  };

  const statusLabels = {
    valid: 'Valide',
    expiring: 'Expire bientôt',
    expired: 'Expiré',
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Header ───────────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="lg" className="bg-gradient-to-br from-navy-800 to-navy-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-3xl font-bold text-navy-900">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-navy-300">{profileData.role}</p>
                <p className="text-gold-400 text-sm mt-1">{profileData.organization}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center px-4">
                  <div className="flex items-center justify-center gap-2 text-gold-400 mb-1">
                    <stat.icon size={14} />
                    <span className="text-xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs text-navy-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ── Tabs ─────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap gap-2 border-b border-navy-200 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsEditing(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-navy-900'
                  : 'text-navy-600 hover:bg-navy-100'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Tab Content ──────────────────────── */}
      {activeTab === 'info' && (
        <motion.div variants={containerVariants}>
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
                <User size={18} className="text-gold-500" />
                Informations personnelles
              </h2>
              <Button
                variant={isEditing ? 'outline' : 'primary'}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <X size={16} />
                    Annuler
                  </>
                ) : (
                  <>
                    <Edit3 size={16} />
                    Modifier
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Prénom</label>
                {isEditing ? (
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                ) : (
                  <p className="text-navy-900 py-2">{profileData.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Nom</label>
                {isEditing ? (
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                ) : (
                  <p className="text-navy-900 py-2">{profileData.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1 flex items-center gap-1">
                  <Mail size={14} />
                  Email
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                ) : (
                  <p className="text-navy-900 py-2">{profileData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1 flex items-center gap-1">
                  <Phone size={14} />
                  Téléphone
                </label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-navy-900 py-2">{profileData.phone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy-700 mb-1 flex items-center gap-1">
                  <MapPin size={14} />
                  Adresse
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                ) : (
                  <p className="text-navy-900 py-2">{profileData.address}, {profileData.commune}, {profileData.wilaya}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <Button>
                  <Save size={16} />
                  Enregistrer
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {activeTab === 'organization' && (
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="lg">
            <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2 mb-6">
              <Building2 size={18} className="text-gold-500" />
              Informations de l&apos;organisation
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Raison sociale', value: profileData.organization },
                { label: 'Numéro CNRC', value: profileData.cnrc },
                { label: 'NIF', value: profileData.nif },
                { label: 'NIS', value: profileData.nis },
                { label: 'Secteur d\'activité', value: profileData.sector },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-navy-100 last:border-0">
                  <span className="text-sm text-navy-500">{item.label}</span>
                  <span className="text-sm font-medium text-navy-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2 mb-6">
              <Globe size={18} className="text-gold-500" />
              Détails supplémentaires
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Wilaya', value: profileData.wilaya },
                { label: 'Commune', value: profileData.commune },
                { label: 'Site web', value: profileData.website },
                { label: 'Effectif', value: profileData.employeeCount },
                { label: 'Capital social', value: profileData.capital },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-navy-100 last:border-0">
                  <span className="text-sm text-navy-500">{item.label}</span>
                  <span className="text-sm font-medium text-navy-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'security' && (
        <motion.div variants={containerVariants} className="space-y-6">
          <Card padding="lg">
            <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2 mb-6">
              <Lock size={18} className="text-gold-500" />
              Changer le mot de passe
            </h2>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-navy-500 mt-1">
                  Min 8 caractères, avec majuscules, minuscules, chiffres et symboles
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="mt-2">
                <Key size={16} />
                Mettre à jour le mot de passe
              </Button>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2 mb-6">
              <Shield size={18} className="text-gold-500" />
              Historique de connexion
            </h2>
            <div className="space-y-3">
              {[
                { date: '10 Mars 2026, 09:15', device: 'Windows 11 - Chrome', location: 'Alger, DZ', current: true },
                { date: '9 Mars 2026, 14:30', device: 'Android - Al-Mizan App', location: 'Alger, DZ', current: false },
                { date: '8 Mars 2026, 10:00', device: 'Windows 11 - Chrome', location: 'Alger, DZ', current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-navy-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                          Session actuelle
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-navy-500">{session.date} • {session.location}</p>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Déconnecter
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'documents' && (
        <motion.div variants={containerVariants}>
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
                <FileText size={18} className="text-gold-500" />
                Documents administratifs
              </h2>
              <Button size="sm">
                <FileText size={16} />
                Ajouter un document
              </Button>
            </div>
            <div className="space-y-3">
              {documents.map((doc, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-navy-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-navy-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">{doc.name}</p>
                      <p className="text-xs text-navy-500">Expire le : {doc.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded ${statusColors[doc.status as keyof typeof statusColors]}`}>
                      {statusLabels[doc.status as keyof typeof statusLabels]}
                    </span>
                    <Button variant="outline" size="sm">
                      Mettre à jour
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-xl">
              <p className="text-sm text-gold-700">
                <strong>Rappel :</strong> Conformément au Décret 15-247, tous les documents doivent être valides
                au moment de la soumission. Les documents expirés doivent être renouvelés.
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* ── Account Info ─────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="md" hover={false} className="bg-navy-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="text-navy-500">
              Compte créé le <strong className="text-navy-700">{profileData.createdAt}</strong>
            </span>
            <span className="text-navy-500">
              Dernière connexion : <strong className="text-navy-700">{profileData.lastLogin}</strong>
            </span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
