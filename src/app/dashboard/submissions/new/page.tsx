'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Save,
  Send,
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plus,
  X,
  File,
  Image,
  FileSpreadsheet,
  Lock,
  Shield,
  DollarSign,
  User,
  Building2,
  Calendar,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';

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

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  category: string;
}

const documentCategories = [
  { id: 'admin', label: 'Dossier administratif', required: true },
  { id: 'tech', label: 'Offre technique', required: true },
  { id: 'financial', label: 'Offre financière', required: true },
  { id: 'other', label: 'Documents complémentaires', required: false },
];

const requiredDocuments = [
  { category: 'admin', name: 'CNAS (mise à jour)', required: true },
  { category: 'admin', name: 'CASNOS (mise à jour)', required: true },
  { category: 'admin', name: 'Extrait de rôle ou échéancier', required: true },
  { category: 'admin', name: 'Casier judiciaire du gérant', required: true },
  { category: 'admin', name: 'Registre de commerce (CNRC)', required: true },
  { category: 'admin', name: 'Qualification professionnelle', required: true },
  { category: 'tech', name: 'Mémoire technique', required: true },
  { category: 'tech', name: 'Planning d\'exécution', required: true },
  { category: 'tech', name: 'Moyens matériels', required: true },
  { category: 'tech', name: 'Moyens humains', required: true },
  { category: 'financial', name: 'BPU renseigné', required: true },
  { category: 'financial', name: 'DQE estimatif', required: true },
  { category: 'financial', name: 'Lettre de soumission', required: true },
];

export default function NewSubmissionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenderId = searchParams.get('tender') || '';
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: 'SARL Mansouri BTP',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    nif: '',
    
    // Step 2: Financial
    amount: '',
    discount: '',
    validityPeriod: '120',
    
    // Step 3: Documents
    uploadedFiles: [] as UploadedFile[],
    
    // Step 4: Confirmation
    acceptTerms: false,
    certifyInfo: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState('admin');

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = useCallback(() => {
    // Simulate file upload
    const mockFile: UploadedFile = {
      id: Date.now(),
      name: `document_${Date.now()}.pdf`,
      size: '1.2 MB',
      type: 'application/pdf',
      category: activeCategory,
    };
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, mockFile],
    }));
    toast.success('Document ajouté avec succès');
  }, [activeCategory]);

  const removeFile = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((f) => f.id !== id),
    }));
  };

  const validateStep = (stepNum: number): boolean => {
    const errs: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.contactName) errs.contactName = 'Le nom du contact est requis';
      if (!formData.contactEmail) errs.contactEmail = 'L\'email est requis';
      if (!formData.nif) errs.nif = 'Le NIF est requis';
    } else if (stepNum === 2) {
      if (!formData.amount) errs.amount = 'Le montant de l\'offre est requis';
    } else if (stepNum === 4) {
      if (!formData.acceptTerms) errs.acceptTerms = 'Vous devez accepter les conditions';
      if (!formData.certifyInfo) errs.certifyInfo = 'Vous devez certifier les informations';
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
    if (!isDraft && !validateStep(step)) return;
    
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (isDraft) {
        toast.success('Brouillon enregistré');
      } else {
        toast.success('Soumission envoyée avec succès !');
      }
      router.push('/dashboard/submissions');
    } catch {
      toast.error('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Informations entreprise' },
    { num: 2, label: 'Offre financière' },
    { num: 3, label: 'Documents' },
    { num: 4, label: 'Confirmation' },
  ];

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet;
    return File;
  };

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
            href="/dashboard/submissions"
            className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-600 hover:bg-navy-200 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Nouvelle soumission</h1>
            <p className="text-navy-500">
              {tenderId ? `Appel d'offres : ${tenderId}` : 'Étape ' + step + ' sur ' + steps.length}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => handleSubmit(true)} disabled={isSubmitting}>
          <Save size={16} />
          Sauvegarder
        </Button>
      </motion.div>

      {/* ── Tender Info Banner ───────────────── */}
      {tenderId && (
        <motion.div variants={itemVariants}>
          <div className="p-4 bg-gold-50 border border-gold-200 rounded-xl">
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-gold-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-navy-900">
                  Réalisation d&apos;une école primaire — Lot 2 : Travaux VRD
                </p>
                <p className="text-sm text-navy-600">
                  Direction des Équipements Publics — Tipaza • Date limite : 15 Mars 2026
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
                  <span className={`text-sm font-medium hidden md:block ${step >= s.num ? 'text-navy-900' : 'text-navy-400'}`}>
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
        {/* Step 1: Company Info */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-gold-500" />
                Informations de l&apos;entreprise
              </h2>
              <div className="space-y-5">
                <div className="p-4 bg-navy-50 rounded-xl">
                  <p className="text-sm text-navy-600 flex items-center gap-2">
                    <Info size={16} className="text-navy-400" />
                    Les informations de votre entreprise sont pré-remplies depuis votre profil.
                  </p>
                </div>

                <Input
                  label="Raison sociale"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  disabled
                  icon={<Building2 size={18} />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Nom du contact"
                    placeholder="Prénom et nom"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    error={errors.contactName}
                    icon={<User size={18} />}
                  />
                  <Input
                    label="Numéro d'Identification Fiscale (NIF)"
                    placeholder="000000000000000"
                    value={formData.nif}
                    onChange={(e) => updateField('nif', e.target.value)}
                    error={errors.nif}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Email du contact"
                    type="email"
                    placeholder="contact@entreprise.dz"
                    value={formData.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    error={errors.contactEmail}
                  />
                  <Input
                    label="Téléphone"
                    type="tel"
                    placeholder="+213 XX XX XX XX"
                    value={formData.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Financial Offer */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <DollarSign size={20} className="text-gold-500" />
                Offre financière
              </h2>
              <div className="space-y-5">
                <div className="p-4 bg-gold-50 border border-gold-200 rounded-xl">
                  <p className="text-sm text-gold-800 flex items-start gap-2">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    Le montant estimatif du marché est de <strong>45,000,000 DZD</strong>. 
                    Votre offre doit être conforme au BPU fourni.
                  </p>
                </div>

                <Input
                  label="Montant total de l'offre (TTC)"
                  placeholder="Ex: 42,500,000"
                  value={formData.amount}
                  onChange={(e) => updateField('amount', e.target.value)}
                  error={errors.amount}
                  icon={<DollarSign size={18} />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Rabais proposé (%)"
                    placeholder="Ex: 5"
                    value={formData.discount}
                    onChange={(e) => updateField('discount', e.target.value)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">
                      Délai de validité de l&apos;offre
                    </label>
                    <select
                      className="input-field"
                      value={formData.validityPeriod}
                      onChange={(e) => updateField('validityPeriod', e.target.value)}
                    >
                      <option value="90">90 jours</option>
                      <option value="120">120 jours</option>
                      <option value="180">180 jours</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-navy-50 rounded-xl">
                  <p className="text-sm text-navy-600 flex items-start gap-2">
                    <Lock size={16} className="shrink-0 mt-0.5 text-navy-400" />
                    Votre offre financière sera chiffrée et ne sera visible qu&apos;au moment 
                    de l&apos;ouverture des plis par la commission.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Category Tabs */}
            <Card padding="md" hover={false}>
              <div className="flex flex-wrap gap-2">
                {documentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gold-500 text-navy-900'
                        : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                    }`}
                  >
                    {cat.label}
                    {cat.required && <span className="text-red-500 ml-1">*</span>}
                  </button>
                ))}
              </div>
            </Card>

            {/* Required Documents Checklist */}
            <Card padding="lg" hover={false}>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                Documents requis
              </h3>
              <div className="space-y-3">
                {requiredDocuments
                  .filter((doc) => doc.category === activeCategory)
                  .map((doc, i) => {
                    const isUploaded = formData.uploadedFiles.some(
                      (f) => f.category === doc.category && f.name.includes(doc.name.toLowerCase().replace(/\s/g, '_'))
                    );
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          isUploaded ? 'bg-green-50' : 'bg-navy-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isUploaded ? (
                            <CheckCircle size={18} className="text-green-500" />
                          ) : (
                            <div className="w-4.5 h-4.5 rounded-full border-2 border-navy-300" />
                          )}
                          <span className={isUploaded ? 'text-green-700' : 'text-navy-700'}>
                            {doc.name}
                            {doc.required && <span className="text-red-500 ml-1">*</span>}
                          </span>
                        </div>
                        {!isUploaded && (
                          <Button variant="ghost" size="sm" onClick={handleFileUpload}>
                            <Upload size={14} />
                            Ajouter
                          </Button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </Card>

            {/* Upload Area */}
            <Card padding="lg" hover={false}>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                Téléverser des documents
              </h3>

              <div
                className="border-2 border-dashed border-navy-200 rounded-xl p-8 text-center hover:border-gold-400 transition-colors cursor-pointer"
                onClick={handleFileUpload}
              >
                <Upload size={32} className="mx-auto text-navy-400 mb-3" />
                <p className="font-medium text-navy-700 mb-1">
                  Glissez vos fichiers ici ou cliquez pour parcourir
                </p>
                <p className="text-sm text-navy-500">
                  PDF, XLSX, DOCX, JPG — max 20 MB par fichier
                </p>
              </div>

              {/* Uploaded Files */}
              {formData.uploadedFiles.filter((f) => f.category === activeCategory).length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium text-navy-700">Fichiers téléversés</h4>
                  {formData.uploadedFiles
                    .filter((f) => f.category === activeCategory)
                    .map((file) => {
                      const FileIcon = getFileIcon(file.type);
                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-navy-50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                              <FileIcon size={18} className="text-gold-600" />
                            </div>
                            <div>
                              <p className="font-medium text-navy-900">{file.name}</p>
                              <p className="text-xs text-navy-400">{file.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Summary */}
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6">
                Récapitulatif de votre soumission
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-navy-50 rounded-xl">
                    <p className="text-xs text-navy-400 mb-1">Entreprise</p>
                    <p className="font-semibold text-navy-900">{formData.companyName}</p>
                  </div>
                  <div className="p-4 bg-navy-50 rounded-xl">
                    <p className="text-xs text-navy-400 mb-1">Contact</p>
                    <p className="font-semibold text-navy-900">{formData.contactName || '-'}</p>
                  </div>
                  <div className="p-4 bg-gold-50 rounded-xl">
                    <p className="text-xs text-gold-600 mb-1">Montant de l&apos;offre</p>
                    <p className="font-bold text-navy-900 text-lg">{formData.amount || '-'} DZD</p>
                  </div>
                  <div className="p-4 bg-navy-50 rounded-xl">
                    <p className="text-xs text-navy-400 mb-1">Documents joints</p>
                    <p className="font-semibold text-navy-900">{formData.uploadedFiles.length} fichiers</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Certifications */}
            <Card padding="lg" hover={false}>
              <h2 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
                <Shield size={20} className="text-gold-500" />
                Engagements et certification
              </h2>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-navy-50 rounded-xl">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => updateField('acceptTerms', e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-navy-300 text-gold-500 focus:ring-gold-500/40"
                  />
                  <span className="text-sm text-navy-700">
                    J&apos;accepte les conditions générales de soumission et m&apos;engage à 
                    respecter les dispositions du Décret exécutif 15-247 relatif aux 
                    marchés publics.
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-500">{errors.acceptTerms}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer p-4 bg-navy-50 rounded-xl">
                  <input
                    type="checkbox"
                    checked={formData.certifyInfo}
                    onChange={(e) => updateField('certifyInfo', e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-navy-300 text-gold-500 focus:ring-gold-500/40"
                  />
                  <span className="text-sm text-navy-700">
                    Je certifie sur l&apos;honneur que les informations fournies sont exactes 
                    et que les documents joints sont authentiques. Je reconnais que toute 
                    fausse déclaration entraîne l&apos;exclusion de ma soumission.
                  </span>
                </label>
                {errors.certifyInfo && (
                  <p className="text-sm text-red-500">{errors.certifyInfo}</p>
                )}
              </div>
            </Card>

            {/* Security Notice */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-800 flex items-start gap-2">
                <Lock size={16} className="shrink-0 mt-0.5" />
                Votre soumission sera chiffrée de bout en bout (AES-256) et horodatée 
                avec un hash SHA-256. Elle ne sera accessible qu&apos;au moment de 
                l&apos;ouverture officielle des plis.
              </p>
            </div>
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
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleSubmit(false)}
                  isLoading={isSubmitting}
                >
                  <Send size={18} />
                  Soumettre mon offre
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
