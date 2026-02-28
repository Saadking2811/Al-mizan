'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Save,
  Eye,
  Send,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Upload,
  CheckCircle,
  AlertTriangle,
  Plus,
  X,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
];

const sectors = [
  'Travaux Publics', 'Fournitures', 'Services', 'Études', 'TIC', 
  'Santé', 'Éducation', 'Agriculture', 'Transport', 'Énergie'
];

const tenderTypes = [
  'Appel d\'offres national ouvert',
  'Appel d\'offres national restreint',
  'Appel d\'offres international ouvert',
  'Consultation restreinte',
  'Gré à gré simple',
  'Gré à gré après consultation',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

interface LotItem {
  id: number;
  title: string;
  estimatedAmount: string;
}

export default function NewTenderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    type: '',
    sector: '',
    description: '',
    
    // Step 2: Location
    wilaya: '',
    commune: '',
    address: '',
    
    // Step 3: Financial
    estimatedAmount: '',
    estimatedMin: '',
    estimatedMax: '',
    duration: '',
    
    // Step 4: Dates
    publishDate: '',
    deadline: '',
    visitDate: '',
    openingDate: '',
    
    // Step 5: Documents & Lots
    lots: [{ id: 1, title: '', estimatedAmount: '' }] as LotItem[],
    requirements: [''],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const addLot = () => {
    setFormData((prev) => ({
      ...prev,
      lots: [...prev.lots, { id: Date.now(), title: '', estimatedAmount: '' }],
    }));
  };

  const removeLot = (id: number) => {
    if (formData.lots.length > 1) {
      setFormData((prev) => ({
        ...prev,
        lots: prev.lots.filter((l) => l.id !== id),
      }));
    }
  };

  const updateLot = (id: number, field: 'title' | 'estimatedAmount', value: string) => {
    setFormData((prev) => ({
      ...prev,
      lots: prev.lots.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }));
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      setFormData((prev) => ({
        ...prev,
        requirements: prev.requirements.filter((_, i) => i !== index),
      }));
    }
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((r, i) => (i === index ? value : r)),
    }));
  };

  const validateStep = (stepNum: number): boolean => {
    const errs: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.title) errs.title = 'Le titre est requis';
      if (!formData.type) errs.type = 'Le type est requis';
      if (!formData.sector) errs.sector = 'Le secteur est requis';
      if (!formData.description) errs.description = 'La description est requise';
    } else if (stepNum === 2) {
      if (!formData.wilaya) errs.wilaya = 'La wilaya est requise';
    } else if (stepNum === 3) {
      if (!formData.estimatedAmount) errs.estimatedAmount = 'Le montant est requis';
      if (!formData.duration) errs.duration = 'La durée est requise';
    } else if (stepNum === 4) {
      if (!formData.deadline) errs.deadline = 'La date limite est requise';
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (isDraft) {
        toast.success('Brouillon enregistré avec succès');
      } else {
        toast.success('Appel d\'offres publié avec succès');
      }
      router.push('/dashboard/tenders');
    } catch {
      toast.error('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Informations générales' },
    { num: 2, label: 'Localisation' },
    { num: 3, label: 'Budget et durée' },
    { num: 4, label: 'Calendrier' },
    { num: 5, label: 'Lots et conditions' },
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Header ───────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/tenders"
            className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-600 hover:bg-navy-200 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Nouvel appel d&apos;offres</h1>
            <p className="text-navy-500">Étape {step} sur {steps.length}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => handleSubmit(true)} disabled={isSubmitting}>
          <Save size={16} />
          Sauvegarder le brouillon
        </Button>
      </motion.div>

      {/* ── Progress Steps ───────────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="md" hover={false}>
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      step > s.num
                        ? 'bg-green-500 text-white'
                        : step === s.num
                          ? 'bg-gold-500 text-navy-900'
                          : 'bg-navy-100 text-navy-400'
                    }`}
                  >
                    {step > s.num ? <CheckCircle size={18} /> : s.num}
                  </div>
                  <span className={`text-sm font-medium hidden lg:block ${step >= s.num ? 'text-navy-900' : 'text-navy-400'}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${step > s.num ? 'bg-green-500' : 'bg-navy-100'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── Step Content ─────────────────────── */}
      <AnimatePresence mode="wait">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6">
                Informations générales
              </h2>
              <div className="space-y-5">
                <Input
                  label="Titre de l'appel d'offres"
                  placeholder="Ex: Réalisation d'une école primaire — Lot 2 : Travaux VRD"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  error={errors.title}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Type de marché
                    </label>
                    <select
                      className="input-field"
                      value={formData.type}
                      onChange={(e) => updateField('type', e.target.value)}
                    >
                      <option value="">Sélectionnez un type</option>
                      {tenderTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Secteur d&apos;activité
                    </label>
                    <select
                      className="input-field"
                      value={formData.sector}
                      onChange={(e) => updateField('sector', e.target.value)}
                    >
                      <option value="">Sélectionnez un secteur</option>
                      {sectors.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.sector && <p className="text-sm text-red-500 mt-1">{errors.sector}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">
                    Description détaillée
                  </label>
                  <textarea
                    className="input-field min-h-[150px] resize-y"
                    placeholder="Décrivez en détail l'objet du marché, les prestations attendues, etc."
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-gold-500" />
                Localisation du marché
              </h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Wilaya
                    </label>
                    <select
                      className="input-field"
                      value={formData.wilaya}
                      onChange={(e) => updateField('wilaya', e.target.value)}
                    >
                      <option value="">Sélectionnez une wilaya</option>
                      {wilayas.map((w, i) => (
                        <option key={w} value={w}>{`${String(i + 1).padStart(2, '0')} - ${w}`}</option>
                      ))}
                    </select>
                    {errors.wilaya && <p className="text-sm text-red-500 mt-1">{errors.wilaya}</p>}
                  </div>

                  <Input
                    label="Commune"
                    placeholder="Ex: Cherchell"
                    value={formData.commune}
                    onChange={(e) => updateField('commune', e.target.value)}
                  />
                </div>

                <Input
                  label="Adresse complète (optionnel)"
                  placeholder="Adresse précise du lieu d'exécution"
                  icon={<MapPin size={18} />}
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />

                <div className="p-4 bg-navy-50 rounded-xl">
                  <p className="text-sm text-navy-600 flex items-start gap-2">
                    <Info size={16} className="shrink-0 mt-0.5 text-navy-400" />
                    La wilaya sera utilisée pour la diffusion de l&apos;avis sur le portail BOMOP 
                    et permettra aux opérateurs de filtrer les marchés par région.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Financial */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <DollarSign size={20} className="text-gold-500" />
                Budget et durée
              </h2>
              <div className="space-y-5">
                <Input
                  label="Montant estimé (TTC)"
                  placeholder="Ex: 45,000,000"
                  value={formData.estimatedAmount}
                  onChange={(e) => updateField('estimatedAmount', e.target.value)}
                  error={errors.estimatedAmount}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Fourchette basse (optionnel)"
                    placeholder="Ex: 40,000,000"
                    value={formData.estimatedMin}
                    onChange={(e) => updateField('estimatedMin', e.target.value)}
                  />
                  <Input
                    label="Fourchette haute (optionnel)"
                    placeholder="Ex: 50,000,000"
                    value={formData.estimatedMax}
                    onChange={(e) => updateField('estimatedMax', e.target.value)}
                  />
                </div>

                <Input
                  label="Durée d'exécution"
                  placeholder="Ex: 12 mois"
                  value={formData.duration}
                  onChange={(e) => updateField('duration', e.target.value)}
                  error={errors.duration}
                />

                <div className="p-4 bg-gold-50 border border-gold-200 rounded-xl">
                  <p className="text-sm text-gold-800 flex items-start gap-2">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    Conformément au Décret 15-247, les montants estimatifs doivent être 
                    établis sur la base des prix du marché et des références récentes.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Calendar */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-gold-500" />
                Calendrier du marché
              </h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Date de publication"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => updateField('publishDate', e.target.value)}
                  />
                  <Input
                    label="Date limite de dépôt"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateField('deadline', e.target.value)}
                    error={errors.deadline}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Date de visite des lieux (optionnel)"
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => updateField('visitDate', e.target.value)}
                  />
                  <Input
                    label="Date d'ouverture des plis"
                    type="date"
                    value={formData.openingDate}
                    onChange={(e) => updateField('openingDate', e.target.value)}
                  />
                </div>

                <div className="p-4 bg-navy-50 rounded-xl">
                  <p className="text-sm text-navy-600 flex items-start gap-2">
                    <Info size={16} className="shrink-0 mt-0.5 text-navy-400" />
                    Le délai minimum entre la publication et la date limite est de 30 jours 
                    pour un appel d&apos;offres ouvert (Art. 66, Décret 15-247).
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Lots & Requirements */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Lots */}
            <Card padding="lg" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-navy-900">
                  Lots (optionnel)
                </h2>
                <Button variant="outline" size="sm" onClick={addLot}>
                  <Plus size={16} />
                  Ajouter un lot
                </Button>
              </div>

              <div className="space-y-4">
                {formData.lots.map((lot, i) => (
                  <div key={lot.id} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center text-sm font-semibold text-navy-600 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Intitulé du lot"
                        value={lot.title}
                        onChange={(e) => updateLot(lot.id, 'title', e.target.value)}
                      />
                      <Input
                        placeholder="Montant estimé (DZD)"
                        value={lot.estimatedAmount}
                        onChange={(e) => updateLot(lot.id, 'estimatedAmount', e.target.value)}
                      />
                    </div>
                    {formData.lots.length > 1 && (
                      <button
                        onClick={() => removeLot(lot.id)}
                        className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Requirements */}
            <Card padding="lg" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-navy-900">
                  Conditions de participation
                </h2>
                <Button variant="outline" size="sm" onClick={addRequirement}>
                  <Plus size={16} />
                  Ajouter
                </Button>
              </div>

              <div className="space-y-3">
                {formData.requirements.map((req, i) => (
                  <div key={i} className="flex gap-3">
                    <Input
                      placeholder="Ex: Qualification professionnelle catégorie III ou supérieure"
                      value={req}
                      onChange={(e) => updateRequirement(i, e.target.value)}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        onClick={() => removeRequirement(i)}
                        className="w-10 h-10 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents Upload */}
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <Upload size={20} className="text-gold-500" />
                Documents du marché
              </h2>

              <div className="border-2 border-dashed border-navy-200 rounded-xl p-8 text-center hover:border-gold-400 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-navy-400 mb-3" />
                <p className="font-medium text-navy-700 mb-1">
                  Glissez vos fichiers ici ou cliquez pour parcourir
                </p>
                <p className="text-sm text-navy-500">
                  Cahier des charges, plans, BPU, DQE, etc. (PDF, XLSX, DOCX — max 50 MB)
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation Buttons ───────────────── */}
      <motion.div variants={itemVariants}>
        <Card padding="md" hover={false}>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={handlePrev}
              disabled={step === 1}
            >
              <ChevronLeft size={18} />
              Précédent
            </Button>

            <div className="flex gap-3">
              {step < steps.length ? (
                <Button variant="primary" size="md" onClick={handleNext}>
                  Suivant
                  <ChevronRight size={18} />
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="md" onClick={() => {/* Preview */}}>
                    <Eye size={18} />
                    Aperçu
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSubmit(false)}
                    isLoading={isSubmitting}
                  >
                    <Send size={18} />
                    Publier l&apos;appel d&apos;offres
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
