'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Users, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Publication de l\'Avis',
    description: 'Le service contractant publie l\'avis d\'appel d\'offres avec le cahier des charges sur la plateforme.',
    details: [
      'Rédaction assistée conforme BOMOP',
      'Signature électronique du représentant',
      'Diffusion automatique BAOSEM',
    ],
    role: 'Service contractant',
  },
  {
    number: '02',
    icon: Send,
    title: 'Soumission Électronique',
    description: 'Les opérateurs économiques préparent et soumettent leurs offres en ligne de manière sécurisée.',
    details: [
      'Offre technique et financière séparées',
      'Chiffrement bout-en-bout',
      'Accusé de réception horodaté',
    ],
    role: 'Opérateur économique',
  },
  {
    number: '03',
    icon: Users,
    title: 'Évaluation en Commission',
    description: 'La commission d\'ouverture et d\'évaluation analyse les offres selon les critères définis.',
    details: [
      'Ouverture simultanée des plis',
      'Grilles de notation paramétrables',
      'Procès-verbal généré automatiquement',
    ],
    role: 'Membres de commission',
  },
  {
    number: '04',
    icon: Award,
    title: 'Attribution Transparente',
    description: 'Le marché est attribué au soumissionnaire le mieux-disant avec notification automatique.',
    details: [
      'Classement objectif et traçable',
      'Notification aux soumissionnaires',
      'Publication de l\'avis d\'attribution',
    ],
    role: 'Service contractant',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="section-container">
        {/* ── Header ─────────────────────────────── */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-navy-50 text-navy-700 text-sm font-medium rounded-full mb-4">
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Un processus <span className="text-gradient">simplifié</span> et conforme
          </h2>
          <p className="text-lg text-navy-600">
            De la publication à l&apos;attribution, Al-Mizan guide chaque acteur 
            à travers les étapes réglementaires des marchés publics algériens.
          </p>
        </motion.div>

        {/* ── Steps ──────────────────────────────── */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-gold-500/50 to-gold-500/10" />
              )}

              {/* Card */}
              <div className="card p-6 h-full hover:border-gold-200 transition-all group">
                {/* Number + Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-navy-100 group-hover:text-gold-100 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center">
                    <step.icon size={24} className="text-gold-600" />
                  </div>
                </div>

                {/* Role badge */}
                <span className="inline-block px-2 py-0.5 bg-navy-50 text-navy-600 text-xs font-medium rounded mb-3">
                  {step.role}
                </span>

                {/* Content */}
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-navy-600 text-sm mb-4">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ────────────────────────────────── */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-navy-600 mb-6">
            Prêt à digitaliser vos marchés publics ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="primary" size="lg">
                Créer un compte
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/tenders">
              <Button variant="outline" size="lg">
                Consulter les appels d&apos;offres
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
