'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Search, 
  Clock, 
  Lock, 
  BarChart3,
  Globe,
  Users,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Publication Dématérialisée',
    description: 'Publiez vos avis d\'appel d\'offres conformément au BOMOP avec signature électronique qualifiée et horodatage certifié.',
  },
  {
    icon: Lock,
    title: 'Soumission Sécurisée',
    description: 'Chiffrement AES-256 des offres avec ouverture simultanée. Intégrité garantie par empreinte SHA-256.',
  },
  {
    icon: Users,
    title: 'Commission d\'Évaluation',
    description: 'Espace collaboratif pour les membres de commission avec grilles de notation et procès-verbaux automatisés.',
  },
  {
    icon: BarChart3,
    title: 'Détection Anti-Collusion',
    description: 'Algorithmes IA analysant les patterns de soumission pour identifier les comportements collusifs.',
  },
  {
    icon: Globe,
    title: '48 Wilayas Connectées',
    description: 'Couverture nationale complète avec intégration aux directions des équipements publics de chaque wilaya.',
  },
  {
    icon: Clock,
    title: 'Conformité Réglementaire',
    description: 'Respect intégral du Décret 15-247 et de l\'Arrêté du 28 mars 2011 sur les marchés publics.',
  },
  {
    icon: Shield,
    title: 'Traçabilité Complète',
    description: 'Journal d\'audit immuable de toutes les actions. Chaque opération est horodatée et signée.',
  },
  {
    icon: Search,
    title: 'Recherche Avancée',
    description: 'Filtres par wilaya, secteur d\'activité, montant estimé, et type de marché (travaux, fournitures, services).',
  },
  {
    icon: CheckCircle,
    title: 'Notifications Temps Réel',
    description: 'Alertes email et SMS pour les nouvelles opportunités correspondant à votre profil d\'activité.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-ivory overflow-hidden">
      <div className="section-container">
        {/* ── Header ─────────────────────────────── */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Une plateforme complète pour les
            <span className="text-gradient"> marchés publics</span>
          </h2>
          <p className="text-lg text-navy-600">
            Al-Mizan couvre l&apos;intégralité du cycle de passation des marchés publics,
            de la publication à l&apos;attribution, en conformité avec la réglementation algérienne.
          </p>
        </motion.div>

        {/* ── Features Grid ──────────────────────── */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group card p-6 hover:border-gold-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-4 group-hover:bg-gold-50 transition-colors">
                <feature.icon size={24} className="text-navy-700 group-hover:text-gold-600 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA Banner ─────────────────────────── */}
        <motion.div 
          className="mt-12 sm:mt-16 bg-gradient-navy rounded-2xl p-6 sm:p-8 lg:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Rejoignez les 2,500+ organismes qui utilisent Al-Mizan
          </h3>
          <p className="text-navy-200 max-w-2xl mx-auto mb-6">
            Directions de wilayas, établissements publics, entreprises économiques — 
            tous digitalisent leurs marchés publics avec notre plateforme.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-gold-400" />
              <span>Inscription gratuite</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-gold-400" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-gold-400" />
              <span>Formation incluse</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
