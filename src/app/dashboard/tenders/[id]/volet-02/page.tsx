'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  ArrowLeft,
  Printer,
  Save,
  Edit3,
  FileText,
  Shield,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Info,
  BookOpen,
  AlertCircle,
  Wrench,
  Truck,
  HardHat,
  ClipboardList,
  BarChart3,
  Target,
  Calendar,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   VOLET 02 — OFFRE TECHNIQUE
   Décret Présidentiel n°15-247 — Art. 67, 78
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PersonnelCle {
  nom: string;
  fonction: string;
  diplome: string;
  experience: string; // ex: "15 ans"
  affectation: string; // ex: "Permanent" | "Temps partiel"
}

interface MoyenMateriel {
  designation: string;
  quantite: string;
  etat: string; // 'bon' | 'moyen' | 'neuf'
  propriete: string; // 'propre' | 'location'
  observation: string;
}

interface Reference {
  intituleProjet: string;
  maitreOuvrage: string;
  montant: string; // DA
  annee: string;
  duree: string;
  attestation: boolean; // attestation de bonne exécution fournie
}

interface PhaseExecution {
  designation: string;
  dureeJours: string;
  observation: string;
}

interface Volet02Data {
  // Section A — Mémoire technique descriptif
  memoire: {
    comprehensionProjet: string;
    methodologieTravaux: string;
    organisationChantier: string;
    mesuresSecurite: string;
    planQualite: string;
    protectionEnvironnement: string;
  };
  // Section B — Moyens humains
  personnelCle: PersonnelCle[];
  effectifTotal: string;
  encadrementQualifie: string;
  // Section C — Moyens matériels
  moyensMateriels: MoyenMateriel[];
  // Section D — Références professionnelles
  references: Reference[];
  // Section E — Planning d'exécution
  planning: {
    dureeGlobale: string; // ex: "18 mois"
    dateDebutPrevue: string;
    dateFinPrevue: string;
    phases: PhaseExecution[];
  };
  // Section F — Sous-traitance
  sousTraitance: {
    prevue: boolean;
    pourcentageMax: string; // ex: "40%"
    description: string;
    sousTraitants: string;
  };
}

// ─── Default mock data ─────────────────────────────────────────────────────────

const defaultData: Volet02Data = {
  memoire: {
    comprehensionProjet:
      'Le projet consiste en la réalisation d\'un groupe scolaire de 12 classes dans la commune d\'Oran. ' +
      'L\'entreprise a une parfaite compréhension des exigences techniques et architecturales du projet ' +
      'conformément au cahier des charges et aux normes en vigueur (DTR, RPA 2003).',
    methodologieTravaux:
      'Phase 1 : Terrassement et fondations (semelles filantes, plots en BA)\n' +
      'Phase 2 : Gros œuvre (structure poteaux-poutres, planchers, maçonnerie)\n' +
      'Phase 3 : Corps d\'état secondaires (étanchéité, menuiserie, plomberie, électricité)\n' +
      'Phase 4 : VRD, aménagements extérieurs et finitions',
    organisationChantier:
      'Installation d\'une base vie complète, clôture de chantier, bureau de chantier pour la maîtrise d\'œuvre, ' +
      'aire de stockage matériaux, centrale à béton mobile sur site.',
    mesuresSecurite:
      'Plan HSE conforme à la réglementation en vigueur. EPI obligatoires, signalétique de chantier, ' +
      'formation sécurité pour tout le personnel, extincteurs et trousse de premiers secours.',
    planQualite:
      'Contrôle qualité béton par laboratoire agréé (LCTP). Essais de sol, essais d\'écrasement, ' +
      'contrôle de compactage VRD. Fiches de suivi par lot.',
    protectionEnvironnement:
      'Gestion des déchets de chantier (tri sélectif), arrosage des pistes pour éviter la poussière, ' +
      'protection des arbres existants, restitution du site en état propre.',
  },
  personnelCle: [
    { nom: 'BOUDIAF Ahmed', fonction: 'Chef de projet', diplome: 'Ingénieur Génie Civil', experience: '20 ans', affectation: 'Permanent' },
    { nom: 'KADDOUR Fatima', fonction: 'Conducteur de travaux', diplome: 'Ingénieur BTP', experience: '12 ans', affectation: 'Permanent' },
    { nom: 'MEBARKI Sofiane', fonction: 'Responsable HSE', diplome: 'Master HSE', experience: '8 ans', affectation: 'Permanent' },
    { nom: 'BENAISSA Karima', fonction: 'Responsable Qualité', diplome: 'Ingénieur Contrôle', experience: '10 ans', affectation: 'Permanent' },
    { nom: 'HAMIDI Mourad', fonction: 'Topographe', diplome: 'Technicien supérieur', experience: '15 ans', affectation: 'Temps partiel' },
  ],
  effectifTotal: '85',
  encadrementQualifie: '12 ingénieurs et techniciens supérieurs',
  moyensMateriels: [
    { designation: 'Pelle hydraulique CAT 320', quantite: '2', etat: 'bon', propriete: 'propre', observation: '' },
    { designation: 'Grue à tour 40 m', quantite: '1', etat: 'bon', propriete: 'propre', observation: 'Certificat de conformité valide' },
    { designation: 'Bétonnière 750L', quantite: '3', etat: 'bon', propriete: 'propre', observation: '' },
    { designation: 'Camion benne 15T', quantite: '4', etat: 'bon', propriete: 'propre', observation: '' },
    { designation: 'Compacteur vibrant', quantite: '2', etat: 'bon', propriete: 'propre', observation: '' },
    { designation: 'Groupe électrogène 100 KVA', quantite: '1', etat: 'neuf', propriete: 'propre', observation: '' },
    { designation: 'Centrale à béton mobile', quantite: '1', etat: 'bon', propriete: 'location', observation: 'Contrat de location joint' },
  ],
  references: [
    { intituleProjet: 'Réalisation d\'un lycée 800 places à Sidi Bel Abbès', maitreOuvrage: 'Direction de l\'Éducation, Wilaya de SBA', montant: '240 000 000', annee: '2023', duree: '24 mois', attestation: true },
    { intituleProjet: 'Construction d\'un CEM 600 places à Mascara', maitreOuvrage: 'Direction des Équipements Publics, Wilaya de Mascara', montant: '180 000 000', annee: '2022', duree: '18 mois', attestation: true },
    { intituleProjet: 'Extension université USTO — Bloc pédagogique', maitreOuvrage: 'USTO Mohamed Boudiaf', montant: '320 000 000', annee: '2021', duree: '30 mois', attestation: true },
  ],
  planning: {
    dureeGlobale: '18 mois',
    dateDebutPrevue: '2026-05-01',
    dateFinPrevue: '2027-10-31',
    phases: [
      { designation: 'Installation de chantier', dureeJours: '15', observation: '' },
      { designation: 'Terrassement et fondations', dureeJours: '60', observation: 'Selon étude de sol' },
      { designation: 'Gros œuvre (structure)', dureeJours: '150', observation: '' },
      { designation: 'Étanchéité et isolation', dureeJours: '30', observation: '' },
      { designation: 'Corps d\'état secondaires', dureeJours: '120', observation: 'Plomberie, électricité, menuiserie' },
      { designation: 'VRD et aménagements extérieurs', dureeJours: '60', observation: '' },
      { designation: 'Finitions et nettoyage', dureeJours: '30', observation: '' },
      { designation: 'Réception provisoire', dureeJours: '15', observation: 'PV de réception' },
    ],
  },
  sousTraitance: {
    prevue: true,
    pourcentageMax: '30%',
    description: 'Sous-traitance prévue pour les lots spécialisés : étanchéité, menuiserie aluminium, ascenseur.',
    sousTraitants: 'SARL ETANCH-PLUS (étanchéité), EURL ALU-TECH (menuiserie alu)',
  },
};

// ─── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, subtitle, article }: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  article?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-[#0F1B2D] flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-[#D4A84B]" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          {article && (
            <span className="text-[10px] font-semibold bg-[#0F1B2D]/10 text-[#0F1B2D] px-2 py-0.5 rounded-full">{article}</span>
          )}
        </div>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── FieldRow ──────────────────────────────────────────────────────────────────

function FieldRow({ label, value, editing, onChange, full = false, textarea = false, type = 'text' }: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  full?: boolean;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div className={`${full ? 'col-span-2' : ''} flex flex-col gap-1`}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {editing ? (
        textarea ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={4}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
          />
        )
      ) : (
        <p className="text-sm text-gray-900 font-medium py-1.5 border-b border-dashed border-gray-200 min-h-[32px] whitespace-pre-line">
          {value || <span className="text-gray-400 italic">Non renseigné</span>}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Volet02Page() {
  const params = useParams();
  const tenderId = params?.id as string ?? 'N/A';
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<Volet02Data>(defaultData);

  const updateMemoire = (field: string, val: string) =>
    setData(prev => ({ ...prev, memoire: { ...prev.memoire, [field]: val } }));

  const updatePlanning = (field: string, val: string) =>
    setData(prev => ({ ...prev, planning: { ...prev.planning, [field]: val } }));

  const updateSousTraitance = (field: string, val: string | boolean) =>
    setData(prev => ({ ...prev, sousTraitance: { ...prev.sousTraitance, [field]: val } }));

  const updatePersonnel = (index: number, field: keyof PersonnelCle, val: string) => {
    setData(prev => {
      const updated = [...prev.personnelCle];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, personnelCle: updated };
    });
  };

  const addPersonnel = () => {
    setData(prev => ({
      ...prev,
      personnelCle: [...prev.personnelCle, { nom: '', fonction: '', diplome: '', experience: '', affectation: 'Permanent' }],
    }));
  };

  const removePersonnel = (index: number) => {
    setData(prev => ({ ...prev, personnelCle: prev.personnelCle.filter((_, i) => i !== index) }));
  };

  const updateMateriel = (index: number, field: keyof MoyenMateriel, val: string) => {
    setData(prev => {
      const updated = [...prev.moyensMateriels];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, moyensMateriels: updated };
    });
  };

  const addMateriel = () => {
    setData(prev => ({
      ...prev,
      moyensMateriels: [...prev.moyensMateriels, { designation: '', quantite: '1', etat: 'bon', propriete: 'propre', observation: '' }],
    }));
  };

  const removeMateriel = (index: number) => {
    setData(prev => ({ ...prev, moyensMateriels: prev.moyensMateriels.filter((_, i) => i !== index) }));
  };

  const updateReference = (index: number, field: keyof Reference, val: string | boolean) => {
    setData(prev => {
      const updated = [...prev.references];
      updated[index] = { ...updated[index], [field]: val } as Reference;
      return { ...prev, references: updated };
    });
  };

  const addReference = () => {
    setData(prev => ({
      ...prev,
      references: [...prev.references, { intituleProjet: '', maitreOuvrage: '', montant: '', annee: '', duree: '', attestation: false }],
    }));
  };

  const removeReference = (index: number) => {
    setData(prev => ({ ...prev, references: prev.references.filter((_, i) => i !== index) }));
  };

  const updatePhase = (index: number, field: keyof PhaseExecution, val: string) => {
    setData(prev => {
      const phases = [...prev.planning.phases];
      phases[index] = { ...phases[index], [field]: val };
      return { ...prev, planning: { ...prev.planning, phases } };
    });
  };

  const addPhase = () => {
    setData(prev => ({
      ...prev,
      planning: { ...prev.planning, phases: [...prev.planning.phases, { designation: '', dureeJours: '', observation: '' }] },
    }));
  };

  const removePhase = (index: number) => {
    setData(prev => ({
      ...prev,
      planning: { ...prev.planning, phases: prev.planning.phases.filter((_, i) => i !== index) },
    }));
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: API call
  };

  // ─── Gantt-like bar helper ──────────────────────────────────────────────────
  const totalDays = data.planning.phases.reduce((s, p) => s + (parseInt(p.dureeJours) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/tenders/${tenderId}`}>
              <Button variant="ghost" className="gap-1.5 text-sm">
                <ArrowLeft size={15} />
                Retour
              </Button>
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <Wrench size={16} className="text-[#D4A84B]" />
              <span className="font-semibold text-gray-800 text-sm">Volet 02 — Offre Technique</span>
              <span className="text-[10px] bg-[#0F1B2D] text-[#D4A84B] font-bold px-2 py-0.5 rounded-full">{tenderId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-1.5 text-sm" onClick={() => window.print()}>
              <Printer size={15} /> Imprimer
            </Button>
            {editing ? (
              <>
                <Button variant="ghost" className="text-sm" onClick={() => setEditing(false)}>Annuler</Button>
                <Button variant="primary" className="gap-1.5 text-sm" onClick={handleSave}>
                  <Save size={15} /> Enregistrer
                </Button>
              </>
            ) : (
              <Button variant="secondary" className="gap-1.5 text-sm" onClick={() => setEditing(true)}>
                <Edit3 size={15} /> Modifier
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Print header ─────────────────────────────────────────── */}
      <div className="hidden print:block text-center py-6 border-b-2 border-gray-800 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">République Algérienne Démocratique et Populaire</p>
        <h1 className="text-xl font-bold text-gray-900 mt-2">VOLET 02 — OFFRE TECHNIQUE</h1>
        <p className="text-sm text-gray-600 mt-1">Décret Présidentiel n°15-247 du 16 Septembre 2015 — Art. 67, 78</p>
        <p className="text-sm font-semibold text-gray-800 mt-2">Référence : {tenderId}</p>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Legal notice */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-[#0F1B2D]/5 border border-[#0F1B2D]/20 rounded-xl px-4 py-3 print:hidden"
        >
          <Info size={16} className="text-[#0F1B2D] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>Volet 02</strong> constitue l'offre technique du soumissionnaire. Il comprend le mémoire technique,
            les moyens humains et matériels, les références professionnelles et le planning d'exécution,
            conformément aux <strong>articles 67 et 78 du Décret 15-247</strong>.
          </p>
        </motion.div>

        {/* ═══════════ SECTION A — Mémoire Technique ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card padding="md">
            <SectionHeader icon={FileText} title="Section A — Mémoire technique descriptif"
              subtitle="Description de la méthodologie et de l'organisation proposées" article="Art. 67" />
            <div className="grid grid-cols-1 gap-4">
              <FieldRow label="Compréhension du projet" value={data.memoire.comprehensionProjet} editing={editing}
                onChange={v => updateMemoire('comprehensionProjet', v)} full textarea />
              <FieldRow label="Méthodologie des travaux" value={data.memoire.methodologieTravaux} editing={editing}
                onChange={v => updateMemoire('methodologieTravaux', v)} full textarea />
              <FieldRow label="Organisation du chantier" value={data.memoire.organisationChantier} editing={editing}
                onChange={v => updateMemoire('organisationChantier', v)} full textarea />
              <FieldRow label="Mesures de sécurité (HSE)" value={data.memoire.mesuresSecurite} editing={editing}
                onChange={v => updateMemoire('mesuresSecurite', v)} full textarea />
              <FieldRow label="Plan de contrôle qualité" value={data.memoire.planQualite} editing={editing}
                onChange={v => updateMemoire('planQualite', v)} full textarea />
              <FieldRow label="Protection de l'environnement" value={data.memoire.protectionEnvironnement} editing={editing}
                onChange={v => updateMemoire('protectionEnvironnement', v)} full textarea />
            </div>
          </Card>
        </motion.div>

        {/* ═══════════ SECTION B — Moyens Humains ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card padding="md">
            <SectionHeader icon={Users} title="Section B — Moyens humains"
              subtitle="Personnel clé affecté au projet" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <FieldRow label="Effectif total prévu" value={data.effectifTotal} editing={editing}
                onChange={v => setData(prev => ({ ...prev, effectifTotal: v }))} type="number" />
              <FieldRow label="Encadrement qualifié" value={data.encadrementQualifie} editing={editing}
                onChange={v => setData(prev => ({ ...prev, encadrementQualifie: v }))} />
            </div>

            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Personnel clé</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    {['Nom & Prénom', 'Fonction', 'Diplôme', 'Expérience', 'Affectation', ''].map(h => (
                      <th key={h} className="py-2 px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.personnelCle.map((p, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                      {(['nom', 'fonction', 'diplome', 'experience', 'affectation'] as const).map(field => (
                        <td key={field} className="py-2 px-2">
                          {editing ? (
                            <input value={p[field]} onChange={e => updatePersonnel(i, field, e.target.value)}
                              className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]" />
                          ) : (
                            <span className="text-gray-800">{p[field] || '—'}</span>
                          )}
                        </td>
                      ))}
                      <td className="py-2 px-2">
                        {editing && (
                          <button onClick={() => removePersonnel(i)} className="text-red-400 hover:text-red-600 p-1">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editing && (
              <button onClick={addPersonnel}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#D4A84B] hover:text-[#C49438] transition-colors">
                <Plus size={14} /> Ajouter un personnel
              </button>
            )}
          </Card>
        </motion.div>

        {/* ═══════════ SECTION C — Moyens Matériels ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card padding="md">
            <SectionHeader icon={Truck} title="Section C — Moyens matériels"
              subtitle="Engins, équipements et matériel affectés au projet" />

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    {['Désignation', 'Qté', 'État', 'Propriété', 'Observation', ''].map(h => (
                      <th key={h} className="py-2 px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.moyensMateriels.map((m, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-2 px-2">
                        {editing ? (
                          <input value={m.designation} onChange={e => updateMateriel(i, 'designation', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]" />
                        ) : <span className="text-gray-800 font-medium">{m.designation || '—'}</span>}
                      </td>
                      <td className="py-2 px-2 w-16">
                        {editing ? (
                          <input value={m.quantite} type="number" onChange={e => updateMateriel(i, 'quantite', e.target.value)}
                            className="w-16 text-sm border border-gray-200 rounded px-2 py-1.5 text-center focus:outline-none focus:border-[#D4A84B]" />
                        ) : <span className="text-gray-800 text-center block">{m.quantite}</span>}
                      </td>
                      <td className="py-2 px-2">
                        {editing ? (
                          <select value={m.etat} onChange={e => updateMateriel(i, 'etat', e.target.value)}
                            className="text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]">
                            <option value="neuf">Neuf</option>
                            <option value="bon">Bon</option>
                            <option value="moyen">Moyen</option>
                          </select>
                        ) : (
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            m.etat === 'neuf' ? 'bg-green-100 text-green-700' :
                            m.etat === 'bon' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'}`}>
                            {m.etat.charAt(0).toUpperCase() + m.etat.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2">
                        {editing ? (
                          <select value={m.propriete} onChange={e => updateMateriel(i, 'propriete', e.target.value)}
                            className="text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]">
                            <option value="propre">Propre</option>
                            <option value="location">Location</option>
                          </select>
                        ) : (
                          <span className="text-gray-700">{m.propriete === 'propre' ? 'Propre' : 'Location'}</span>
                        )}
                      </td>
                      <td className="py-2 px-2">
                        {editing ? (
                          <input value={m.observation} onChange={e => updateMateriel(i, 'observation', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]" />
                        ) : <span className="text-gray-500 text-xs">{m.observation || '—'}</span>}
                      </td>
                      <td className="py-2 px-2">
                        {editing && (
                          <button onClick={() => removeMateriel(i)} className="text-red-400 hover:text-red-600 p-1">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editing && (
              <button onClick={addMateriel}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#D4A84B] hover:text-[#C49438] transition-colors">
                <Plus size={14} /> Ajouter un matériel
              </button>
            )}
          </Card>
        </motion.div>

        {/* ═══════════ SECTION D — Références Professionnelles ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card padding="md">
            <SectionHeader icon={Target} title="Section D — Références professionnelles"
              subtitle="Projets similaires réalisés au cours des 5 dernières années" article="Art. 78" />

            <div className="space-y-4">
              {data.references.map((ref, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 relative hover:border-gray-300 transition-colors">
                  {editing && (
                    <button onClick={() => removeReference(i)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FieldRow label="Intitulé du projet" value={ref.intituleProjet} editing={editing}
                      onChange={v => updateReference(i, 'intituleProjet', v)} full />
                    <FieldRow label="Maître d'ouvrage" value={ref.maitreOuvrage} editing={editing}
                      onChange={v => updateReference(i, 'maitreOuvrage', v)} full />
                    <FieldRow label="Montant du marché (DA)" value={ref.montant} editing={editing}
                      onChange={v => updateReference(i, 'montant', v)} />
                    <FieldRow label="Année de réalisation" value={ref.annee} editing={editing}
                      onChange={v => updateReference(i, 'annee', v)} />
                    <FieldRow label="Durée de réalisation" value={ref.duree} editing={editing}
                      onChange={v => updateReference(i, 'duree', v)} />
                    <div className="flex items-end gap-2 pb-2">
                      {editing ? (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={ref.attestation}
                            onChange={e => updateReference(i, 'attestation', e.target.checked)}
                            className="w-4 h-4 accent-[#D4A84B]" />
                          <span className="text-sm text-gray-700">Attestation de bonne exécution fournie</span>
                        </label>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className={ref.attestation ? 'text-green-500' : 'text-gray-300'} />
                          <span className={`text-sm font-medium ${ref.attestation ? 'text-green-700' : 'text-gray-400'}`}>
                            {ref.attestation ? 'Attestation fournie' : 'Attestation non fournie'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {editing && (
              <button onClick={addReference}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#D4A84B] hover:text-[#C49438] transition-colors">
                <Plus size={14} /> Ajouter une référence
              </button>
            )}
          </Card>
        </motion.div>

        {/* ═══════════ SECTION E — Planning d'Exécution ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card padding="md">
            <SectionHeader icon={Calendar} title="Section E — Planning d'exécution"
              subtitle="Planification détaillée des phases de réalisation" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <FieldRow label="Durée globale" value={data.planning.dureeGlobale} editing={editing}
                onChange={v => updatePlanning('dureeGlobale', v)} />
              <FieldRow label="Date de début prévue" value={data.planning.dateDebutPrevue} editing={editing}
                onChange={v => updatePlanning('dateDebutPrevue', v)} type="date" />
              <FieldRow label="Date de fin prévue" value={data.planning.dateFinPrevue} editing={editing}
                onChange={v => updatePlanning('dateFinPrevue', v)} type="date" />
            </div>

            {/* Phase table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="py-2 px-2 text-[10px] font-bold text-gray-500 uppercase w-8">#</th>
                    <th className="py-2 px-2 text-[10px] font-bold text-gray-500 uppercase">Désignation de la phase</th>
                    <th className="py-2 px-2 text-[10px] font-bold text-gray-500 uppercase w-24">Durée (j)</th>
                    <th className="py-2 px-2 text-[10px] font-bold text-gray-500 uppercase">Observation</th>
                    <th className="py-2 px-2 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {data.planning.phases.map((phase, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-2 px-2 text-xs text-gray-400 font-mono">{i + 1}</td>
                      <td className="py-2 px-2">
                        {editing ? (
                          <input value={phase.designation} onChange={e => updatePhase(i, 'designation', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]" />
                        ) : <span className="text-gray-800 font-medium">{phase.designation}</span>}
                      </td>
                      <td className="py-2 px-2">
                        {editing ? (
                          <input value={phase.dureeJours} type="number" onChange={e => updatePhase(i, 'dureeJours', e.target.value)}
                            className="w-20 text-sm border border-gray-200 rounded px-2 py-1.5 text-center focus:outline-none focus:border-[#D4A84B]" />
                        ) : <span className="text-gray-800 text-center block">{phase.dureeJours} j</span>}
                      </td>
                      <td className="py-2 px-2">
                        {editing ? (
                          <input value={phase.observation} onChange={e => updatePhase(i, 'observation', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A84B]" />
                        ) : <span className="text-gray-500 text-xs">{phase.observation || '—'}</span>}
                      </td>
                      <td className="py-2 px-2">
                        {editing && (
                          <button onClick={() => removePhase(i)} className="text-red-400 hover:text-red-600 p-1">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editing && (
              <button onClick={addPhase}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#D4A84B] hover:text-[#C49438] transition-colors">
                <Plus size={14} /> Ajouter une phase
              </button>
            )}

            {/* Gantt-like visual */}
            {totalDays > 0 && (
              <div className="mt-5 space-y-1.5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Diagramme de Gantt simplifié</p>
                {data.planning.phases.map((phase, i) => {
                  const days = parseInt(phase.dureeJours) || 0;
                  const pct = Math.max((days / totalDays) * 100, 2);
                  // offset = sum of previous phases
                  const offset = data.planning.phases.slice(0, i).reduce((s, p) => s + (parseInt(p.dureeJours) || 0), 0);
                  const offsetPct = (offset / totalDays) * 100;
                  const colors = ['bg-[#0F1B2D]', 'bg-[#1e3a5f]', 'bg-[#D4A84B]', 'bg-[#C49438]', 'bg-[#2D6A4F]', 'bg-[#8B6914]', 'bg-[#415A80]', 'bg-[#677B99]'];
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-32 truncate text-right">{phase.designation}</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-full relative overflow-hidden">
                        <div
                          className={`absolute top-0 h-full rounded-full ${colors[i % colors.length]} transition-all flex items-center justify-end pr-1.5`}
                          style={{ left: `${offsetPct}%`, width: `${pct}%` }}
                        >
                          <span className="text-[9px] text-white font-bold">{days}j</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-[136px]">
                  <span>{data.planning.dateDebutPrevue}</span>
                  <span>Total : {totalDays} jours</span>
                  <span>{data.planning.dateFinPrevue}</span>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* ═══════════ SECTION F — Sous-traitance ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card padding="md">
            <SectionHeader icon={Shield} title="Section F — Sous-traitance"
              subtitle="Déclaration de sous-traitance le cas échéant (Art. 140)" article="Art. 140" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sous-traitance prévue</label>
                {editing ? (
                  <label className="flex items-center gap-2 py-2 cursor-pointer">
                    <input type="checkbox" checked={data.sousTraitance.prevue}
                      onChange={e => updateSousTraitance('prevue', e.target.checked)}
                      className="w-4 h-4 accent-[#D4A84B]" />
                    <span className="text-sm text-gray-700">Oui</span>
                  </label>
                ) : (
                  <p className={`text-sm font-semibold py-1.5 border-b border-dashed border-gray-200 ${data.sousTraitance.prevue ? 'text-amber-600' : 'text-gray-500'}`}>
                    {data.sousTraitance.prevue ? 'Oui' : 'Non'}
                  </p>
                )}
              </div>
              {data.sousTraitance.prevue && (
                <>
                  <FieldRow label="Pourcentage maximum" value={data.sousTraitance.pourcentageMax} editing={editing}
                    onChange={v => updateSousTraitance('pourcentageMax', v)} />
                  <FieldRow label="Description des lots sous-traités" value={data.sousTraitance.description} editing={editing}
                    onChange={v => updateSousTraitance('description', v)} full textarea />
                  <FieldRow label="Sous-traitants pressentis" value={data.sousTraitance.sousTraitants} editing={editing}
                    onChange={v => updateSousTraitance('sousTraitants', v)} full textarea />
                </>
              )}
            </div>

            {data.sousTraitance.prevue && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
                <AlertCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Conformément à l'article 140, la sous-traitance ne peut excéder 40% du montant du marché.
                  Le sous-traitant doit répondre aux mêmes conditions de qualification que le titulaire pour la partie sous-traitée.
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="flex items-center justify-between py-2 print:hidden">
          <p className="text-xs text-gray-400">
            Dernière modification : {new Date().toLocaleDateString('fr-DZ')} — Plateforme Al-Mizan | BOMOP/BAOSEM
          </p>
          <div className="flex gap-2">
            <Link href={`/dashboard/tenders/${tenderId}/volet-01`}>
              <Button variant="ghost" className="text-sm gap-1.5">
                <ArrowLeft size={14} /> Volet 01
              </Button>
            </Link>
            <Link href={`/dashboard/tenders/${tenderId}`}>
              <Button variant="ghost" className="text-sm gap-1.5">
                <ArrowLeft size={14} /> Retour
              </Button>
            </Link>
            {editing ? (
              <Button variant="primary" className="gap-1.5 text-sm" onClick={handleSave}>
                <Save size={14} /> Enregistrer le Volet 02
              </Button>
            ) : (
              <Button variant="secondary" className="gap-1.5 text-sm" onClick={() => setEditing(true)}>
                <Edit3 size={14} /> Modifier
              </Button>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
