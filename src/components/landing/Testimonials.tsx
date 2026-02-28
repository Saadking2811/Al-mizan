'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Al-Mizan a révolutionné notre processus de passation des marchés. La transparence et la traçabilité sont maintenant garanties à chaque étape.",
    author: "Ahmed Benali",
    role: "Directeur des Équipements Publics",
    organization: "Wilaya de Tipaza",
  },
  {
    quote: "En tant qu'opérateur économique, je peux maintenant soumissionner à des marchés dans toutes les wilayas depuis mon bureau. Un gain de temps considérable.",
    author: "Karim Mansouri",
    role: "Directeur Général",
    organization: "SARL Mansouri BTP",
  },
  {
    quote: "La détection anti-collusion nous a permis d'identifier plusieurs tentatives de manipulation. La plateforme renforce vraiment l'intégrité des marchés.",
    author: "Dr. Fatima Zohra Hadj",
    role: "Inspectrice Générale",
    organization: "ARMP",
  },
  {
    quote: "L'interface est intuitive et le support technique est réactif. Nos équipes ont été opérationnelles en moins d'une semaine de formation.",
    author: "Mohamed Saïdi",
    role: "Chef de Service Marchés",
    organization: "APC d'Oran",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden">
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
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Ils nous font <span className="text-gradient">confiance</span>
          </h2>
          <p className="text-lg text-navy-600">
            Découvrez les retours d&apos;expérience des organismes et entreprises 
            qui utilisent Al-Mizan au quotidien.
          </p>
        </motion.div>

        {/* ── Testimonials Grid ──────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card p-8 hover:border-gold-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center mb-6">
                <Quote size={20} className="text-gold-600" />
              </div>

              {/* Quote text */}
              <blockquote className="text-navy-700 text-lg leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center">
                  <span className="text-navy-600 font-semibold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{testimonial.author}</p>
                  <p className="text-sm text-navy-500">
                    {testimonial.role}, {testimonial.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
