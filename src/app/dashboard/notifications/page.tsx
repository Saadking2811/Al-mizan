'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  FileText,
  Users,
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  Settings,
  Mail,
  Smartphone,
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

interface Notification {
  id: number;
  type: 'tender' | 'submission' | 'evaluation' | 'system' | 'deadline';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    type: 'submission',
    title: 'Nouvelle soumission reçue',
    message: 'SARL Mansouri BTP a soumis une offre pour l\'appel AO-ALG-2026-0847.',
    time: 'Il y a 2 heures',
    read: false,
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Échéance imminente',
    message: 'La date limite de dépôt pour AO-ORA-2026-0312 est dans 3 jours.',
    time: 'Il y a 5 heures',
    read: false,
  },
  {
    id: 3,
    type: 'evaluation',
    title: 'Évaluation terminée',
    message: 'La commission a terminé l\'évaluation de AO-CNS-2026-0198. Résultats disponibles.',
    time: 'Hier à 16:30',
    read: false,
  },
  {
    id: 4,
    type: 'tender',
    title: 'Nouvel appel d\'offres',
    message: 'Un nouvel appel d\'offres correspondant à vos critères a été publié dans la wilaya de Tipaza.',
    time: 'Hier à 10:15',
    read: true,
  },
  {
    id: 5,
    type: 'system',
    title: 'Mise à jour du système',
    message: 'Al-Mizan sera en maintenance le 20 Mars de 02h00 à 04h00.',
    time: '22 Fév 2026',
    read: true,
  },
  {
    id: 6,
    type: 'submission',
    title: 'Offre acceptée',
    message: 'Félicitations ! Votre offre pour AO-CNS-2026-0198 a été retenue. Classement : #1.',
    time: '20 Fév 2026',
    read: true,
  },
  {
    id: 7,
    type: 'deadline',
    title: 'Rappel : Documents à renouveler',
    message: 'Votre attestation CNAS expire dans 30 jours. Pensez à la mettre à jour.',
    time: '18 Fév 2026',
    read: true,
  },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  tender: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
  submission: { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  evaluation: { icon: Users, color: 'text-gold-600', bg: 'bg-gold-100' },
  deadline: { icon: Clock, color: 'text-red-600', bg: 'bg-red-100' },
  system: { icon: AlertTriangle, color: 'text-navy-600', bg: 'bg-navy-100' },
};

const filterOptions = ['Toutes', 'Non lues', 'Appels d\'offres', 'Soumissions', 'Évaluations', 'Système'];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedFilter, setSelectedFilter] = useState('Toutes');
  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'Toutes') return true;
    if (selectedFilter === 'Non lues') return !n.read;
    if (selectedFilter === 'Appels d\'offres') return n.type === 'tender';
    if (selectedFilter === 'Soumissions') return n.type === 'submission';
    if (selectedFilter === 'Évaluations') return n.type === 'evaluation';
    if (selectedFilter === 'Système') return n.type === 'system' || n.type === 'deadline';
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
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
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <Bell size={24} className="text-gold-500" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 px-2.5 py-0.5 bg-red-500 text-white text-sm rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-navy-500">
            Restez informé des dernières activités
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck size={16} />
            Tout marquer comme lu
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={16} />
          </Button>
        </div>
      </motion.div>

      {/* ── Settings Panel ───────────────────── */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card padding="lg" hover={false}>
            <h3 className="text-lg font-semibold text-navy-900 mb-4">
              Paramètres de notification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-navy-700 flex items-center gap-2">
                  <Mail size={16} />
                  Notifications par email
                </h4>
                {[
                  { label: 'Nouveaux appels d\'offres', checked: true },
                  { label: 'Résultats d\'évaluation', checked: true },
                  { label: 'Rappels d\'échéances', checked: true },
                  { label: 'Actualités du système', checked: false },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-navy-600">{item.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-4 h-4 rounded border-navy-300 text-gold-500 focus:ring-gold-500/40"
                    />
                  </label>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-navy-700 flex items-center gap-2">
                  <Smartphone size={16} />
                  Notifications SMS
                </h4>
                {[
                  { label: 'Échéances imminentes (< 24h)', checked: true },
                  { label: 'Attribution de marché', checked: true },
                  { label: 'Alertes critiques', checked: true },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-navy-600">{item.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-4 h-4 rounded border-navy-300 text-gold-500 focus:ring-gold-500/40"
                    />
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* ── Filters ──────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Notifications List ───────────────── */}
      <motion.div variants={containerVariants} className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card padding="lg" hover={false}>
            <div className="text-center py-12">
              <Bell size={48} className="mx-auto text-navy-300 mb-4" />
              <h3 className="text-lg font-semibold text-navy-700 mb-2">
                Aucune notification
              </h3>
              <p className="text-navy-500">
                Vous n&apos;avez pas de nouvelles notifications pour le moment.
              </p>
            </div>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <motion.div key={notification.id} variants={itemVariants}>
                <Card
                  padding="md"
                  className={`group ${!notification.read ? 'border-l-4 border-l-gold-500' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={18} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={`font-semibold ${!notification.read ? 'text-navy-900' : 'text-navy-700'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-navy-500 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-navy-400 mt-2 flex items-center gap-1">
                            <Calendar size={12} />
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="w-8 h-8 rounded-lg text-navy-500 hover:bg-navy-100 flex items-center justify-center transition-colors"
                              title="Marquer comme lu"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </motion.div>
  );
}
