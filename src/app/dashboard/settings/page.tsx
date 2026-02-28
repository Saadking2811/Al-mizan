'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Settings,
  Bell,
  Shield,
  Globe,
  Palette,
  Monitor,
  Moon,
  Sun,
  Lock,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Check,
  Languages,
  Volume2,
  VolumeX,
} from 'lucide-react';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const tabs = [
  { key: 'general', label: 'Général', icon: Settings },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Sécurité', icon: Shield },
  { key: 'display', label: 'Affichage', icon: Palette },
];

function Toggle({ enabled, onChange, label, description }: { enabled: boolean; onChange: () => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-navy-900">{label}</p>
        {description && <p className="text-xs text-navy-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-gold-500' : 'bg-navy-200'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : ''}`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  // General settings
  const [language, setLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Africa/Algiers');
  const [currency, setCurrency] = useState('DZD');

  // Notification settings
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [soundNotif, setSoundNotif] = useState(true);
  const [newTenderNotif, setNewTenderNotif] = useState(true);
  const [evaluationNotif, setEvaluationNotif] = useState(true);
  const [deadlineNotif, setDeadlineNotif] = useState(true);
  const [systemNotif, setSystemNotif] = useState(false);

  // Security settings
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Display settings
  const [theme, setTheme] = useState('light');
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSave = () => {
    toast.success('Paramètres sauvegardés avec succès');
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
            <Settings size={24} className="text-gold-500" />
            Paramètres
          </h1>
          <p className="text-navy-500 text-sm">
            Configuration de votre espace Al-Mizan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<RotateCcw size={14} />}>
            Réinitialiser
          </Button>
          <Button variant="primary" icon={<Save size={14} />} onClick={handleSave}>
            Sauvegarder
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-2 border-b border-navy-100 pb-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-white text-navy-900 border border-navy-100 border-b-white -mb-[1px]'
                : 'text-navy-500 hover:text-navy-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants}>
        {/* ── Général ────────────────────── */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Globe size={16} className="text-gold-500" />
                Préférences régionales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy-600 mb-1.5">Langue</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-600 mb-1.5">Fuseau horaire</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="Africa/Algiers">Alger (GMT+1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-600 mb-1.5">Devise</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="DZD">Dinar Algérien (DZD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">Dollar US (USD)</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Monitor size={16} className="text-gold-500" />
                Informations de la plateforme
              </h3>
              <div className="space-y-2 text-sm text-navy-600">
                <div className="flex justify-between py-2 border-b border-navy-50">
                  <span>Version</span>
                  <span className="font-medium text-navy-900">Al-Mizan v2.1.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy-50">
                  <span>Dernière mise à jour</span>
                  <span className="font-medium text-navy-900">15 janvier 2026</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy-50">
                  <span>Cadre réglementaire</span>
                  <span className="font-medium text-navy-900">Décret 15-247</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Support technique</span>
                  <span className="font-medium text-gold-600">support@al-mizan.dz</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── Notifications ──────────────── */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-gold-500" />
                Canaux de notification
              </h3>
              <div className="divide-y divide-navy-50">
                <Toggle enabled={emailNotif} onChange={() => setEmailNotif(!emailNotif)} label="Notifications par email" description="Recevoir les alertes sur votre adresse email" />
                <Toggle enabled={pushNotif} onChange={() => setPushNotif(!pushNotif)} label="Notifications push" description="Notifications dans le navigateur" />
                <Toggle enabled={smsNotif} onChange={() => setSmsNotif(!smsNotif)} label="Notifications SMS" description="Alertes critiques par SMS" />
                <Toggle enabled={soundNotif} onChange={() => setSoundNotif(!soundNotif)} label="Son de notification" description="Jouer un son lors d'une nouvelle notification" />
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
                <Bell size={16} className="text-gold-500" />
                Types d&apos;alertes
              </h3>
              <div className="divide-y divide-navy-50">
                <Toggle enabled={newTenderNotif} onChange={() => setNewTenderNotif(!newTenderNotif)} label="Nouveaux appels d'offres" description="Notifier lors de la publication d'un nouvel appel d'offres" />
                <Toggle enabled={evaluationNotif} onChange={() => setEvaluationNotif(!evaluationNotif)} label="Résultats d'évaluation" description="Alerter lors de la mise à jour des évaluations" />
                <Toggle enabled={deadlineNotif} onChange={() => setDeadlineNotif(!deadlineNotif)} label="Rappels de délais" description="Rappeler 48h avant chaque date limite" />
                <Toggle enabled={systemNotif} onChange={() => setSystemNotif(!systemNotif)} label="Annonces système" description="Maintenance et mises à jour de la plateforme" />
              </div>
            </Card>
          </div>
        )}

        {/* ── Sécurité ───────────────────── */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Lock size={16} className="text-gold-500" />
                Authentification
              </h3>
              <div className="divide-y divide-navy-50">
                <Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} label="Authentification à deux facteurs (2FA)" description="Sécuriser chaque connexion avec un code temporaire" />
                <Toggle enabled={loginAlerts} onChange={() => setLoginAlerts(!loginAlerts)} label="Alertes de connexion" description="Être notifié en cas de connexion depuis un nouvel appareil" />
              </div>
              <div className="mt-4 pt-4 border-t border-navy-100">
                <label className="block text-sm font-medium text-navy-900 mb-1.5">
                  Délai d&apos;expiration de session (minutes)
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="input-field w-32"
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="60">1 heure</option>
                    <option value="120">2 heures</option>
                  </select>
                  <p className="text-xs text-navy-500">Session inactive automatiquement déconnectée</p>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Shield size={16} className="text-gold-500" />
                Mot de passe
              </h3>
              <div className="space-y-4 max-w-md">
                <Input label="Mot de passe actuel" type="password" placeholder="••••••••" />
                <Input label="Nouveau mot de passe" type="password" placeholder="••••••••" />
                <Input label="Confirmer le nouveau mot de passe" type="password" placeholder="••••••••" />
                <Button variant="primary" size="sm">
                  Mettre à jour le mot de passe
                </Button>
              </div>
              <div className="mt-4 p-3 bg-navy-50 rounded-lg">
                <p className="text-xs text-navy-600 font-medium mb-1">Exigences du mot de passe :</p>
                <ul className="text-xs text-navy-500 space-y-0.5">
                  <li className="flex items-center gap-1"><Check size={10} className="text-green-500" /> 8 caractères minimum</li>
                  <li className="flex items-center gap-1"><Check size={10} className="text-green-500" /> Au moins une lettre majuscule</li>
                  <li className="flex items-center gap-1"><Check size={10} className="text-green-500" /> Au moins un chiffre</li>
                  <li className="flex items-center gap-1"><Check size={10} className="text-green-500" /> Au moins un caractère spécial</li>
                </ul>
              </div>
            </Card>
          </div>
        )}

        {/* ── Affichage ──────────────────── */}
        {activeTab === 'display' && (
          <div className="space-y-6">
            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Palette size={16} className="text-gold-500" />
                Thème
              </h3>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[
                  { key: 'light', label: 'Clair', icon: Sun },
                  { key: 'dark', label: 'Sombre', icon: Moon },
                  { key: 'system', label: 'Système', icon: Monitor },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      theme === t.key
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-navy-100 bg-white hover:border-navy-200'
                    }`}
                  >
                    <t.icon size={20} className={theme === t.key ? 'text-gold-600' : 'text-navy-400'} />
                    <span className={`text-xs font-medium ${theme === t.key ? 'text-navy-900' : 'text-navy-500'}`}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
                <Monitor size={16} className="text-gold-500" />
                Interface
              </h3>
              <div className="divide-y divide-navy-50">
                <Toggle enabled={compactMode} onChange={() => setCompactMode(!compactMode)} label="Mode compact" description="Réduire les espaces pour afficher plus de contenu" />
                <Toggle enabled={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} label="Animations" description="Activer les animations de transition" />
                <Toggle enabled={sidebarCollapsed} onChange={() => setSidebarCollapsed(!sidebarCollapsed)} label="Sidebar réduite par défaut" description="Démarrer avec le menu latéral replié" />
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
