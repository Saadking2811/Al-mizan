'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  plateforme: [
    { label: 'Appels d\'offres', href: '/dashboard/tenders' },
    { label: 'Soumissions', href: '/dashboard/submissions' },
    { label: 'Évaluation', href: '/dashboard/evaluations' },
    { label: 'Tableau de bord', href: '/dashboard' },
  ],
  legal: [
    { label: 'Conditions d\'utilisation', href: '/legal/terms' },
    { label: 'Politique de confidentialité', href: '/legal/privacy' },
    { label: 'Mentions légales', href: '/legal/mentions' },
  ],
  support: [
    { label: 'Centre d\'aide', href: '/help' },
    { label: 'Documentation API', href: '/docs' },
    { label: 'Signaler un problème', href: '/support' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* ── Top divider ─────────────────────────────── */}
      <div className="h-1 bg-gradient-gold" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ── Brand ─────────────────────────────── */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/al-mizan-logo.png"
                alt="Al-Mizan"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold">Al-Mizan</span>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed">
              Plateforme intelligente de gestion des marchés publics.
              Transparence, équité et efficience au service de la commande publique algérienne.
            </p>
            <div className="space-y-2 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold-500" />
                Alger, Algérie
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold-500" />
                contact@al-mizan.dz
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold-500" />
                +213 (0) 21 00 00 00
              </div>
            </div>
          </div>

          {/* ── Plateforme ────────────────────────── */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              Plateforme
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.plateforme.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ─────────────────────────────── */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              Juridique
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ───────────────────────────── */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────── */}
        <div className="divider-gold my-10 opacity-30" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-400">
          <p>© 2026 Al-Mizan. Tous droits réservés.</p>
          <p className="text-navy-500">
            Conforme au Décret présidentiel n° 15-247 — Marchés publics & délégations de service public
          </p>
        </div>
      </div>
    </footer>
  );
}
