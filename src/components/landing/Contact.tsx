'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  FileText,
  HelpCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+213 21 XX XX XX',
    href: 'tel:+21321XXXXXX',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@al-mizan.dz',
    href: 'mailto:contact@al-mizan.dz',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Alger, Algérie',
    href: '#',
  },
];

const quickLinks = [
  { label: 'Guide utilisateur', href: '/docs/guide', icon: FileText },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-ivory overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── Left: Info ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-4">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Besoin d&apos;assistance ?
            </h2>
            <p className="text-lg text-navy-600 mb-8">
              Notre équipe de support est disponible pour vous accompagner 
              dans l&apos;utilisation de la plateforme Al-Mizan.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-navy-100 hover:border-gold-200 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center group-hover:bg-gold-50 transition-colors">
                    <item.icon size={22} className="text-navy-600 group-hover:text-gold-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-500">{item.label}</p>
                    <p className="font-medium text-navy-900">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-700 rounded-lg hover:bg-navy-100 transition-colors text-sm font-medium"
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-navy-900 mb-6">
                Envoyez-nous un message
              </h3>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Nom complet"
                    placeholder="Votre nom"
                  />
                  <Input
                    label="Organisme"
                    placeholder="Direction / Entreprise"
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  placeholder="votre.email@exemple.dz"
                  icon={<Mail size={18} />}
                />

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">
                    Sujet
                  </label>
                  <select className="input-field">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="support">Support technique</option>
                    <option value="inscription">Problème d&apos;inscription</option>
                    <option value="soumission">Question sur les soumissions</option>
                    <option value="facturation">Facturation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre demande..."
                    className="input-field resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <Send size={18} />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
