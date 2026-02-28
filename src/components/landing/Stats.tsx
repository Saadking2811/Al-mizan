'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '48', label: 'Wilayas' },
  { value: '2,547', label: 'Organismes inscrits' },
  { value: '15,842', label: 'Appels publiés' },
  { value: '127 Mds', label: 'DZD de marchés' },
  { value: '8,234', label: 'Attributions' },
  { value: '99.9%', label: 'Disponibilité' },
];

const partners = [
  { name: 'Ministère des Finances', short: 'MF' },
  { name: 'ARMP', short: 'ARMP' },
  { name: 'BOMOP', short: 'BOMOP' },
  { name: 'BAOSEM', short: 'BAOSEM' },
  { name: 'Cour des Comptes', short: 'CC' },
  { name: 'CNRC', short: 'CNRC' },
];

const wilayas = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna',
  'Sétif', 'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'Tlemcen', 'Béjaïa',
];

export default function Stats() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-navy relative overflow-hidden">
      {/* ── Background patterns ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gold-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-royal-500/8 blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        {/* ── Header ─────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-gold-400 text-sm font-medium rounded-full mb-4">
            Chiffres clés
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            La plateforme de référence des
            <span className="text-gradient"> marchés publics algériens</span>
          </h2>
          <p className="text-base sm:text-lg text-navy-200">
            Al-Mizan est déployée dans les 48 wilayas et connecte des milliers
            d&apos;organismes publics et d&apos;opérateurs économiques.
          </p>
        </motion.div>

        {/* ── Stats Grid ─────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-500 mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-navy-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Partners ───────────────────────────── */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-center text-navy-400 text-sm mb-6 sm:mb-8">
            En partenariat avec les institutions nationales
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white/5 border border-white/10 rounded-xl justify-center"
                whileHover={{ scale: 1.03, borderColor: 'rgba(212,168,75,0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0">
                  <span className="text-gold-400 font-bold text-[10px] sm:text-xs">{partner.short}</span>
                </div>
                <span className="text-white text-xs sm:text-sm font-medium truncate">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Wilayas coverage ───────────────────── */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Map placeholder */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 400 350" className="w-full h-full p-8 opacity-30">
                  <path
                    d="M200,10 L350,50 L380,150 L350,280 L200,340 L50,280 L20,150 L50,50 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gold-500"
                  />
                  <circle cx="200" cy="80" r="6" className="fill-gold-500" />
                  <circle cx="280" cy="100" r="5" className="fill-gold-400" />
                  <circle cx="320" cy="130" r="4" className="fill-gold-400" />
                  <circle cx="150" cy="90" r="4" className="fill-gold-400" />
                  <circle cx="100" cy="120" r="4" className="fill-gold-400" />
                  <circle cx="250" cy="180" r="4" className="fill-gold-400" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl sm:text-6xl font-bold text-gold-500 mb-2">48</p>
                    <p className="text-white text-base sm:text-lg">Wilayas connectées</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wilayas list */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                Couverture nationale complète
              </h3>
              <p className="text-navy-300 text-sm sm:text-base mb-4 sm:mb-6">
                Al-Mizan est déployée dans toutes les wilayas d&apos;Algérie,
                avec des bureaux de support régionaux à Alger, Oran, Constantine et Annaba.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {wilayas.map((wilaya, index) => (
                  <motion.span
                    key={index}
                    className="px-2 sm:px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-white/80 text-center truncate"
                    whileHover={{ backgroundColor: 'rgba(212,168,75,0.1)', borderColor: 'rgba(212,168,75,0.3)' }}
                  >
                    {wilaya}
                  </motion.span>
                ))}
                <motion.span
                  className="px-2 sm:px-3 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-lg text-xs sm:text-sm text-gold-400 text-center font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  +36 autres
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
