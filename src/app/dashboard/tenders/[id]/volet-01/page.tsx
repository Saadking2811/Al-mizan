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
  Building2,
  FileText,
  Calendar,
  Shield,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Hash,
  Info,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Volet01Data {
  // Section A – Organisme contractant
  organisme: {
    denomination: string;
    type: string; // 'wilaya' | 'commune' | 'ministere' | 'epep' | 'enterprise_publique' | 'autre'
    adresse: string;
    wilaya: string;
    commune: string;
    codePostal: string;
    telephone: string;
    fax: string;
    email: string;
    siteWeb: string;
    nif: string;        // Numéro d'Identification Fiscale
    nis: string;        // Numéro d'Identification Statistique
    responsable: string; // Nom du responsable habilité
    qualite: string;    // Qualité du responsable
  };
  // Section B – Objet
  objet: {
    intitule: string;
    reference: string;   // Ex: AO-ALG-2026-0847
    referenceBomop: string; // N° publication BOMOP/BAOSEM
    secteur: string;    // 'travaux' | 'fournitures' | 'services' | 'etudes'
    lot: string;
    descriptionLot: string;
    montantEstimatif: string; // En DA HT
    codeNomenclature: string; // Code CPV / nomenclature nationale
    lieuExecution: string;
    dureeExecution: string;  // ex: "12 mois"
  };
  // Section C – Mode de passation
  passage: {
    mode: string; // 'ouvert' | 'restreint' | 'gré_a_gre'
    justification: string;
    avisJuridique: string; // ref avis juristes
  };
  // Section D – Conditions de participation
  conditions: {
    capaciteFinanciere: string; // description
    capaciteTechnique: string;
    capaciteReferentielle: string;
    qualificationAgrement: string; // ex: "Agrément catégorie II"
    chiffreAffairesMin: string;    // en DA
  };
  // Section E – Pièces à fournir
  pieces: {
    extRoleApure: boolean;
    extRoleApureNote: string;
    statutsJuridiques: boolean;
    bilanN1: boolean;
    bilanN2: boolean;
    bilanN3: boolean;
    declarationFiscale: boolean;
    affiliationCnasMode: boolean;
    casierJudiciaire: boolean;
    referencesSimilaires: boolean;
    attestationQualification: boolean;
    moyensMateriel: boolean;
    moyensHumains: boolean;
    declarationProbitePolitique: boolean;
    autresPieces: string;
  };
  // Section F – Calendrier
  calendrier: {
    dateLancement: string;       // ISO date
    datePublicationBomop: string;
    dateLimiteDossier: string;   // Date limite retrait dossier
    dateLimiteSoumission: string; // Date limite dépôt offres
    heureDepot: string;          // heure limite (ex: "10:00")
    dateOuverturePlis: string;   // Date ouverture plis
    heureOuverture: string;
    lieuDepot: string;
    lieuOuverture: string;
  };
  // Section G – Caution de soumission
  caution: {
    montant: string;       // en DA
    pourcentage: string;   // du montant estimatif, ex: "1%"
    forme: string;         // 'cheque_certifie' | 'caution_bancaire' | 'especes'
    banqueEmettrice: string;
    validite: string;      // durée ex: "90 jours après ouverture plis"
  };
  // Section H – Validité des offres
  validite: {
    dureeJours: string;     // ex: "90"
    dateExpiration: string;
    prorogation: boolean;
  };
}

const SECTEURS = [
  { value: 'travaux',    label: 'Travaux' },
  { value: 'fournitures', label: 'Fournitures' },
  { value: 'services',   label: 'Services' },
  { value: 'etudes',     label: 'Études et maîtrise d\'œuvre' },
];

const MODES_PASSATION = [
  { value: 'ouvert',     label: 'Appel d\'offres ouvert', article: 'Art. 40' },
  { value: 'restreint',  label: 'Appel d\'offres restreint', article: 'Art. 41' },
  { value: 'gre_a_gre',  label: 'Gré à gré', article: 'Art. 49' },
];

const TYPES_ORGANISME = [
  { value: 'ministere',        label: 'Ministère' },
  { value: 'wilaya',           label: 'Wilaya' },
  { value: 'commune',          label: 'Commune' },
  { value: 'epep',             label: 'EPEP (Établissement public à caractère pédagogique)' },
  { value: 'epic',             label: 'EPIC (Établissement public industriel et commercial)' },
  { value: 'enterprise_publique', label: 'Entreprise publique économique' },
  { value: 'autre',            label: 'Autre organisme public' },
];

const FORMES_CAUTION = [
  { value: 'cheque_certifie', label: 'Chèque certifié' },
  { value: 'caution_bancaire', label: 'Caution bancaire' },
  { value: 'especes',         label: 'Espèces (caisse de l\'organisme)' },
];

// ─── Default data (mock for demo) ─────────────────────────────────────────────

const defaultData: Volet01Data = {
  organisme: {
    denomination: 'Direction des Équipements Publics de la Wilaya d\'Oran',
    type: 'wilaya',
    adresse: 'Cité administrative, Bâtiment des services techniques',
    wilaya: 'Oran',
    commune: 'Oran',
    codePostal: '31000',
    telephone: '041 33 XX XX',
    fax: '041 33 XX XX',
    email: 'dep.oran@mhuv.gov.dz',
    siteWeb: 'www.oran.gov.dz',
    nif: '000631041XXXXX',
    nis: '06 31 41 XXXX',
    responsable: 'M. XXXX XXXXXX',
    qualite: 'Directeur des Équipements Publics',
  },
  objet: {
    intitule: 'Réalisation d\'un groupe scolaire de 12 classes à Oran',
    reference: 'AO-ALG-2026-0847',
    referenceBomop: 'BOMOP N° 12/2026 du 15 Mars 2026',
    secteur: 'travaux',
    lot: 'Lot unique',
    descriptionLot: 'Travaux de génie civil, VRD et corps d\'état secondaires',
    montantEstimatif: '185 000 000',
    codeNomenclature: '45214200-2',
    lieuExecution: 'Cité Fellaoucène, commune d\'Oran, wilaya d\'Oran',
    dureeExecution: '18 mois',
  },
  passage: {
    mode: 'ouvert',
    justification: 'Marché ouvert à la concurrence conformément aux dispositions de l\'article 40 du décret présidentiel n°15-247 du 16 septembre 2015.',
    avisJuridique: '',
  },
  conditions: {
    capaciteFinanciere: 'Chiffre d\'affaires annuel minimum de 50 000 000 DA sur les 3 derniers exercices',
    capaciteTechnique: 'Expérience avérée dans la réalisation de bâtiments similaires (écoles, lycées, universités)',
    capaciteReferentielle: 'Au moins 2 références de travaux similaires réalisés au cours des 5 dernières années',
    qualificationAgrement: 'Agrément de qualification et de classification catégorie IV dans le domaine du bâtiment (FNBTP)',
    chiffreAffairesMin: '50 000 000',
  },
  pieces: {
    extRoleApure: true,
    extRoleApureNote: 'Extrait de rôle apuré en cours de validité',
    statutsJuridiques: true,
    bilanN1: true,
    bilanN2: true,
    bilanN3: true,
    declarationFiscale: true,
    affiliationCnasMode: true,
    casierJudiciaire: true,
    referencesSimilaires: true,
    attestationQualification: true,
    moyensMateriel: true,
    moyensHumains: true,
    declarationProbitePolitique: true,
    autresPieces: 'Liste du matériel propre à l\'entreprise avec les certificats de propriété',
  },
  calendrier: {
    dateLancement: '2026-03-10',
    datePublicationBomop: '2026-03-15',
    dateLimiteDossier: '2026-03-25',
    dateLimiteSoumission: '2026-04-10',
    heureDepot: '10:00',
    dateOuverturePlis: '2026-04-10',
    heureOuverture: '10:30',
    lieuDepot: 'Direction des Équipements Publics – Bureau du secretariat, 1er étage',
    lieuOuverture: 'Salle de réunion du Directeur — Direction des Équipements Publics',
  },
  caution: {
    montant: '1 850 000',
    pourcentage: '1%',
    forme: 'caution_bancaire',
    banqueEmettrice: 'BNA / BEA / CPA / BADR (banque domiciliataire de l\'entreprise)',
    validite: '90 jours après la date d\'ouverture des plis',
  },
  validite: {
    dureeJours: '90',
    dateExpiration: '2026-07-10',
    prorogation: false,
  },
};

// ─── Section header component ──────────────────────────────────────────────────

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

// ─── Field row ────────────────────────────────────────────────────────────────

function FieldRow({ label, value, editing, name, onChange, type = 'text', options, full = false, textarea = false }: {
  label: string;
  value: string;
  editing: boolean;
  name: string;
  onChange: (name: string, val: string) => void;
  type?: string;
  options?: { value: string; label: string }[];
  full?: boolean;
  textarea?: boolean;
}) {
  const cls = full ? 'col-span-2' : '';
  return (
    <div className={`${cls} flex flex-col gap-1`}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {editing ? (
        options ? (
          <select
            value={value}
            onChange={e => onChange(name, e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
          >
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ) : textarea ? (
          <textarea
            value={value}
            onChange={e => onChange(name, e.target.value)}
            rows={3}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(name, e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
          />
        )
      ) : (
        <p className="text-sm text-gray-900 font-medium py-1.5 border-b border-dashed border-gray-200 min-h-[32px]">
          {value || <span className="text-gray-400 italic">Non renseigné</span>}
        </p>
      )}
    </div>
  );
}

// ─── Checkbox field ───────────────────────────────────────────────────────────

function CheckField({ label, checked, editing, name, onChange, note }: {
  label: string;
  checked: boolean;
  editing: boolean;
  name: string;
  onChange: (name: string, val: boolean) => void;
  note?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
      {editing ? (
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(name, e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#D4A84B] flex-shrink-0"
        />
      ) : (
        <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${checked ? 'bg-green-500' : 'bg-gray-200'}`}>
          {checked && <CheckCircle size={12} className="text-white" />}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-800 font-medium">{label}</p>
        {note && <p className="text-xs text-gray-400 mt-0.5">{note}</p>}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Volet01Page() {
  const params = useParams();
  const tenderId = params?.id as string ?? 'N/A';
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<Volet01Data>(defaultData);

  const setField = (section: keyof Volet01Data, field: string, val: string | boolean) => {
    setData(prev => ({
      ...prev,
      [section]: { ...(prev[section] as Record<string, unknown>), [field]: val },
    }));
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: API call to persist data
  };

  const sectionId = (s: string) => `volet-01-${s}`;

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/tenders/${tenderId}`}>
              <Button variant="ghost" className="gap-1.5 text-sm">
                <ArrowLeft size={15} />
                Retour à l'appel d'offres
              </Button>
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#D4A84B]" />
              <span className="font-semibold text-gray-800 text-sm">Volet 01 — Renseignements généraux</span>
              <span className="text-[10px] bg-[#0F1B2D] text-[#D4A84B] font-bold px-2 py-0.5 rounded-full">
                {tenderId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="gap-1.5 text-sm print:hidden"
              onClick={() => window.print()}
            >
              <Printer size={15} />
              Imprimer
            </Button>
            {editing ? (
              <>
                <Button variant="ghost" className="text-sm" onClick={() => setEditing(false)}>
                  Annuler
                </Button>
                <Button variant="primary" className="gap-1.5 text-sm" onClick={handleSave}>
                  <Save size={15} />
                  Enregistrer
                </Button>
              </>
            ) : (
              <Button variant="secondary" className="gap-1.5 text-sm" onClick={() => setEditing(true)}>
                <Edit3 size={15} />
                Modifier
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Print header ─────────────────────────────────────────────────────── */}
      <div className="hidden print:block text-center py-6 border-b-2 border-gray-800 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">République Algérienne Démocratique et Populaire</p>
        <p className="text-xs text-gray-600 mb-2">Ministère / Organisme contractant</p>
        <h1 className="text-xl font-bold text-gray-900 mt-2">VOLET 01 — RENSEIGNEMENTS GÉNÉRAUX DE L'APPEL D'OFFRES</h1>
        <p className="text-sm text-gray-600 mt-1">Décret Présidentiel n°15-247 du 16 Septembre 2015</p>
        <p className="text-sm font-semibold text-gray-800 mt-2">Référence : {data.objet.reference}</p>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Legal notice */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-[#0F1B2D]/5 border border-[#0F1B2D]/20 rounded-xl px-4 py-3 print:hidden"
        >
          <Info size={16} className="text-[#0F1B2D] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>Volet 01</strong> constitue la fiche de renseignements généraux de l'appel d'offres, conformément au
            <strong> Décret Présidentiel n°15-247 du 16 Septembre 2015</strong> portant réglementation des marchés publics.
            Ce document est obligatoire et fait partie intégrante du dossier d'appel d'offres (DAO).
          </p>
        </motion.div>

        {/* ─────────────── SECTION A ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} id={sectionId('a')}>
          <Card padding="md">
            <SectionHeader icon={Building2} title="Section A — Identification de l'organisme contractant" subtitle="Informations légales et coordonnées de l'entité adjudicatrice" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldRow label="Dénomination de l'organisme" value={data.organisme.denomination} editing={editing} name="denomination" onChange={(n, v) => setField('organisme', n, v)} full textarea />
              <FieldRow label="Type d'organisme" value={data.organisme.type} editing={editing} name="type" onChange={(n, v) => setField('organisme', n, v)} options={TYPES_ORGANISME} />
              <FieldRow label="Wilaya" value={data.organisme.wilaya} editing={editing} name="wilaya" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Commune / Siège" value={data.organisme.commune} editing={editing} name="commune" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Adresse complète" value={data.organisme.adresse} editing={editing} name="adresse" onChange={(n, v) => setField('organisme', n, v)} full />
              <FieldRow label="Code postal" value={data.organisme.codePostal} editing={editing} name="codePostal" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Téléphone" value={data.organisme.telephone} editing={editing} name="telephone" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Fax" value={data.organisme.fax} editing={editing} name="fax" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Email officiel" value={data.organisme.email} editing={editing} name="email" onChange={(n, v) => setField('organisme', n, v)} type="email" />
              <FieldRow label="Site web" value={data.organisme.siteWeb} editing={editing} name="siteWeb" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="N° d'Identification Fiscale (NIF)" value={data.organisme.nif} editing={editing} name="nif" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="N° d'Identification Statistique (NIS)" value={data.organisme.nis} editing={editing} name="nis" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Nom du responsable habilité" value={data.organisme.responsable} editing={editing} name="responsable" onChange={(n, v) => setField('organisme', n, v)} />
              <FieldRow label="Qualité / Fonction" value={data.organisme.qualite} editing={editing} name="qualite" onChange={(n, v) => setField('organisme', n, v)} />
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── SECTION B ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} id={sectionId('b')}>
          <Card padding="md">
            <SectionHeader icon={FileText} title="Section B — Objet de l'appel d'offres" subtitle="Description et caractéristiques du marché" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldRow label="Intitulé de l'appel d'offres" value={data.objet.intitule} editing={editing} name="intitule" onChange={(n, v) => setField('objet', n, v)} full textarea />
              <FieldRow label="Référence interne" value={data.objet.reference} editing={editing} name="reference" onChange={(n, v) => setField('objet', n, v)} />
              <FieldRow label="Référence publication BOMOP/BAOSEM" value={data.objet.referenceBomop} editing={editing} name="referenceBomop" onChange={(n, v) => setField('objet', n, v)} />
              <FieldRow label="Secteur d'activité" value={data.objet.secteur} editing={editing} name="secteur" onChange={(n, v) => setField('objet', n, v)} options={SECTEURS} />
              <FieldRow label="Désignation du lot" value={data.objet.lot} editing={editing} name="lot" onChange={(n, v) => setField('objet', n, v)} />
              <FieldRow label="Description du lot" value={data.objet.descriptionLot} editing={editing} name="descriptionLot" onChange={(n, v) => setField('objet', n, v)} full textarea />
              <FieldRow label="Montant estimatif général (DA HT)" value={data.objet.montantEstimatif} editing={editing} name="montantEstimatif" onChange={(n, v) => setField('objet', n, v)} />
              <FieldRow label="Code nomenclature / CPV" value={data.objet.codeNomenclature} editing={editing} name="codeNomenclature" onChange={(n, v) => setField('objet', n, v)} />
              <FieldRow label="Lieu d'exécution" value={data.objet.lieuExecution} editing={editing} name="lieuExecution" onChange={(n, v) => setField('objet', n, v)} full />
              <FieldRow label="Durée d'exécution" value={data.objet.dureeExecution} editing={editing} name="dureeExecution" onChange={(n, v) => setField('objet', n, v)} />
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── SECTION C ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} id={sectionId('c')}>
          <Card padding="md">
            <SectionHeader icon={Shield} title="Section C — Mode de passation" subtitle="Procédure de sélection conformément au Décret 15-247" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldRow label="Mode de passation" value={data.passage.mode} editing={editing} name="mode" onChange={(n, v) => setField('passage', n, v)} options={MODES_PASSATION} />
              <FieldRow label="Référence avis juridique / visa (si requis)" value={data.passage.avisJuridique} editing={editing} name="avisJuridique" onChange={(n, v) => setField('passage', n, v)} />
              <FieldRow label="Justification du choix de la procédure" value={data.passage.justification} editing={editing} name="justification" onChange={(n, v) => setField('passage', n, v)} full textarea />
            </div>
            {/* Visual mode indicator */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {MODES_PASSATION.map(m => (
                <div key={m.value} className={`rounded-xl border-2 p-3 text-center transition-all ${data.passage.mode === m.value ? 'border-[#D4A84B] bg-[#D4A84B]/10' : 'border-gray-200 bg-gray-50 opacity-50'}`}>
                  <p className="text-xs font-bold text-[#0F1B2D]">{m.label}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{m.article}</p>
                  {data.passage.mode === m.value && <CheckCircle size={14} className="text-[#D4A84B] mx-auto mt-2" />}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── SECTION D ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} id={sectionId('d')}>
          <Card padding="md">
            <SectionHeader icon={Users} title="Section D — Conditions de participation" subtitle="Capacités requises des soumissionnaires" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldRow label="Capacités financières" value={data.conditions.capaciteFinanciere} editing={editing} name="capaciteFinanciere" onChange={(n, v) => setField('conditions', n, v)} full textarea />
              <FieldRow label="Chiffre d'affaires annuel minimum (DA)" value={data.conditions.chiffreAffairesMin} editing={editing} name="chiffreAffairesMin" onChange={(n, v) => setField('conditions', n, v)} />
              <FieldRow label="Qualification / Agrément requis" value={data.conditions.qualificationAgrement} editing={editing} name="qualificationAgrement" onChange={(n, v) => setField('conditions', n, v)} />
              <FieldRow label="Capacités techniques et professionnelles" value={data.conditions.capaciteTechnique} editing={editing} name="capaciteTechnique" onChange={(n, v) => setField('conditions', n, v)} full textarea />
              <FieldRow label="Références similaires requises" value={data.conditions.capaciteReferentielle} editing={editing} name="capaciteReferentielle" onChange={(n, v) => setField('conditions', n, v)} full textarea />
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── SECTION E ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} id={sectionId('e')}>
          <Card padding="md">
            <SectionHeader icon={FileText} title="Section E — Pièces constitutives du dossier" subtitle="Documents obligatoires à joindre à l'offre (Art. 67 du Décret 15-247)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Documents administratifs</p>
                <CheckField label="Extrait de rôle apuré" checked={data.pieces.extRoleApure} editing={editing} name="extRoleApure" onChange={(n, v) => setField('pieces', n, v)} note="En cours de validité, délivré par la DGI" />
                <CheckField label="Statuts de l'entreprise" checked={data.pieces.statutsJuridiques} editing={editing} name="statutsJuridiques" onChange={(n, v) => setField('pieces', n, v)} note="Copie légalisée, registre de commerce" />
                <CheckField label="Déclaration fiscale (dernier exercice)" checked={data.pieces.declarationFiscale} editing={editing} name="declarationFiscale" onChange={(n, v) => setField('pieces', n, v)} />
                <CheckField label="Affiliation CNAS / CASNOS" checked={data.pieces.affiliationCnasMode} editing={editing} name="affiliationCnasMode" onChange={(n, v) => setField('pieces', n, v)} note="Attestation en cours de validité" />
                <CheckField label="Extrait du casier judiciaire (dirigeants)" checked={data.pieces.casierJudiciaire} editing={editing} name="casierJudiciaire" onChange={(n, v) => setField('pieces', n, v)} note="Art. 75 — moins de 3 mois" />
                <CheckField label="Déclaration de probité et candidature" checked={data.pieces.declarationProbitePolitique} editing={editing} name="declarationProbitePolitique" onChange={(n, v) => setField('pieces', n, v)} note="Modèle joint au DAO" />
              </div>
              <div className="md:pl-6 md:border-l border-gray-100 mt-4 md:mt-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Documents financiers &amp; techniques</p>
                <CheckField label="Bilan financier N-1" checked={data.pieces.bilanN1} editing={editing} name="bilanN1" onChange={(n, v) => setField('pieces', n, v)} note="Certifié par commissaire aux comptes" />
                <CheckField label="Bilan financier N-2" checked={data.pieces.bilanN2} editing={editing} name="bilanN2" onChange={(n, v) => setField('pieces', n, v)} />
                <CheckField label="Bilan financier N-3" checked={data.pieces.bilanN3} editing={editing} name="bilanN3" onChange={(n, v) => setField('pieces', n, v)} />
                <CheckField label="Références de travaux similaires" checked={data.pieces.referencesSimilaires} editing={editing} name="referencesSimilaires" onChange={(n, v) => setField('pieces', n, v)} note="Attestations de bonne exécution" />
                <CheckField label="Attestation de qualification FNBTP" checked={data.pieces.attestationQualification} editing={editing} name="attestationQualification" onChange={(n, v) => setField('pieces', n, v)} />
                <CheckField label="Liste des moyens en matériel" checked={data.pieces.moyensMateriel} editing={editing} name="moyensMateriel" onChange={(n, v) => setField('pieces', n, v)} />
                <CheckField label="Liste des moyens humains (CV encadrement)" checked={data.pieces.moyensHumains} editing={editing} name="moyensHumains" onChange={(n, v) => setField('pieces', n, v)} />
              </div>
            </div>
            {(data.pieces.autresPieces || editing) && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <FieldRow label="Autres pièces spécifiques" value={data.pieces.autresPieces} editing={editing} name="autresPieces" onChange={(n, v) => setField('pieces', n, v)} full textarea />
              </div>
            )}
          </Card>
        </motion.div>

        {/* ─────────────── SECTION F ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} id={sectionId('f')}>
          <Card padding="md">
            <SectionHeader icon={Calendar} title="Section F — Calendrier de la procédure" subtitle="Dates et délais réglementaires" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldRow label="Date de lancement" value={data.calendrier.dateLancement} editing={editing} name="dateLancement" onChange={(n, v) => setField('calendrier', n, v)} type="date" />
              <FieldRow label="Date de publication BOMOP/BAOSEM" value={data.calendrier.datePublicationBomop} editing={editing} name="datePublicationBomop" onChange={(n, v) => setField('calendrier', n, v)} type="date" />
              <FieldRow label="Date limite de retrait du dossier" value={data.calendrier.dateLimiteDossier} editing={editing} name="dateLimiteDossier" onChange={(n, v) => setField('calendrier', n, v)} type="date" />
              <FieldRow label="Date limite de dépôt des offres" value={data.calendrier.dateLimiteSoumission} editing={editing} name="dateLimiteSoumission" onChange={(n, v) => setField('calendrier', n, v)} type="date" />
              <FieldRow label="Heure limite de dépôt" value={data.calendrier.heureDepot} editing={editing} name="heureDepot" onChange={(n, v) => setField('calendrier', n, v)} type="time" />
              <FieldRow label="Date d'ouverture des plis" value={data.calendrier.dateOuverturePlis} editing={editing} name="dateOuverturePlis" onChange={(n, v) => setField('calendrier', n, v)} type="date" />
              <FieldRow label="Heure d'ouverture des plis" value={data.calendrier.heureOuverture} editing={editing} name="heureOuverture" onChange={(n, v) => setField('calendrier', n, v)} type="time" />
              <div /> {/* spacer */}
              <FieldRow label="Lieu de dépôt des offres" value={data.calendrier.lieuDepot} editing={editing} name="lieuDepot" onChange={(n, v) => setField('calendrier', n, v)} full textarea />
              <FieldRow label="Lieu d'ouverture des plis" value={data.calendrier.lieuOuverture} editing={editing} name="lieuOuverture" onChange={(n, v) => setField('calendrier', n, v)} full textarea />
            </div>
            {/* Timeline visual */}
            <div className="mt-5 flex items-center gap-0 overflow-x-auto">
              {[
                { label: 'Lancement', date: data.calendrier.dateLancement, icon: Clock },
                { label: 'Publication', date: data.calendrier.datePublicationBomop, icon: Globe },
                { label: 'Limite dépôt', date: data.calendrier.dateLimiteSoumission, icon: FileText },
                { label: 'Ouverture plis', date: data.calendrier.dateOuverturePlis, icon: Shield },
              ].map((step, i, arr) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-1 min-w-[90px]">
                    <div className="w-9 h-9 rounded-full bg-[#0F1B2D] flex items-center justify-center">
                      <step.icon size={14} className="text-[#D4A84B]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-700 text-center">{step.label}</p>
                    <p className="text-[10px] text-gray-500 text-center">{step.date || '—'}</p>
                  </div>
                  {i < arr.length - 1 && <div className="flex-1 h-px bg-gradient-to-r from-[#0F1B2D] to-[#D4A84B] min-w-[20px] mx-1" />}
                </React.Fragment>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── SECTION G ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} id={sectionId('g')}>
          <Card padding="md">
            <SectionHeader icon={DollarSign} title="Section G — Caution de soumission" subtitle="Garantie financière obligatoire pour les soumissionnaires" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldRow label="Montant de la caution (DA)" value={data.caution.montant} editing={editing} name="montant" onChange={(n, v) => setField('caution', n, v)} />
              <FieldRow label="Pourcentage du montant estimatif" value={data.caution.pourcentage} editing={editing} name="pourcentage" onChange={(n, v) => setField('caution', n, v)} />
              <FieldRow label="Forme de la caution" value={data.caution.forme} editing={editing} name="forme" onChange={(n, v) => setField('caution', n, v)} options={FORMES_CAUTION} />
              <FieldRow label="Banque / établissement émetteur accepté" value={data.caution.banqueEmettrice} editing={editing} name="banqueEmettrice" onChange={(n, v) => setField('caution', n, v)} />
              <FieldRow label="Validité de la caution" value={data.caution.validite} editing={editing} name="validite" onChange={(n, v) => setField('caution', n, v)} full />
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
              <AlertCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                La caution de soumission doit être jointe à l'offre financière sous pli séparé. Toute offre non accompagnée de la caution sera rejetée sans ouverture.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── SECTION H ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} id={sectionId('h')}>
          <Card padding="md">
            <SectionHeader icon={Clock} title="Section H — Validité des offres" subtitle="Délai pendant lequel le soumissionnaire reste engagé par son offre" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FieldRow label="Durée de validité (jours)" value={data.validite.dureeJours} editing={editing} name="dureeJours" onChange={(n, v) => setField('validite', n, v)} type="number" />
              <FieldRow label="Date d'expiration estimée" value={data.validite.dateExpiration} editing={editing} name="dateExpiration" onChange={(n, v) => setField('validite', n, v)} type="date" />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Prorogation possible</label>
                {editing ? (
                  <label className="flex items-center gap-2 py-2 cursor-pointer">
                    <input type="checkbox" checked={data.validite.prorogation} onChange={e => setField('validite', 'prorogation', e.target.checked)} className="w-4 h-4 accent-[#D4A84B]" />
                    <span className="text-sm text-gray-700">Oui, avec accord du soumissionnaire</span>
                  </label>
                ) : (
                  <p className={`text-sm font-semibold py-1.5 border-b border-dashed border-gray-200 ${data.validite.prorogation ? 'text-green-600' : 'text-gray-500'}`}>
                    {data.validite.prorogation ? 'Oui — avec accord du soumissionnaire' : 'Non'}
                  </p>
                )}
              </div>
            </div>
            {/* Summary card */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Durée de validité', value: `${data.validite.dureeJours} jours`, icon: Clock, color: 'bg-blue-50 border-blue-200 text-blue-800' },
                { label: 'Expire le', value: data.validite.dateExpiration || '—', icon: Calendar, color: 'bg-red-50 border-red-200 text-red-800' },
                { label: 'Prorogation', value: data.validite.prorogation ? 'Possible' : 'Interdite', icon: Shield, color: data.validite.prorogation ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-700' },
              ].map(card => (
                <div key={card.label} className={`rounded-xl border p-3 ${card.color}`}>
                  <card.icon size={16} className="mb-1.5 opacity-70" />
                  <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{card.label}</p>
                  <p className="text-sm font-bold mt-0.5">{card.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ─────────────── Footer (actions) ─────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="flex items-center justify-between py-2 print:hidden">
          <p className="text-xs text-gray-400">
            Dernière modification : {new Date().toLocaleDateString('fr-DZ')} — Plateforme Al-Mizan | BOMOP/BAOSEM
          </p>
          <div className="flex gap-2">
            <Link href={`/dashboard/tenders/${tenderId}`}>
              <Button variant="ghost" className="text-sm gap-1.5">
                <ArrowLeft size={14} />
                Retour
              </Button>
            </Link>
            {editing ? (
              <Button variant="primary" className="gap-1.5 text-sm" onClick={handleSave}>
                <Save size={14} />
                Enregistrer le Volet 01
              </Button>
            ) : (
              <Button variant="secondary" className="gap-1.5 text-sm" onClick={() => setEditing(true)}>
                <Edit3 size={14} />
                Modifier
              </Button>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
