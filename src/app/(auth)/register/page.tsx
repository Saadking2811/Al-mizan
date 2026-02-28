'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  FileText, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthStore } from '@/lib/auth';
import toast from 'react-hot-toast';

type RoleType = 'economic_operator' | 'contracting_service' | 'commission_member';

interface RoleOption {
  id: RoleType;
  title: string;
  description: string;
  icon: React.ElementType;
  examples: string[];
}

const roles: RoleOption[] = [
  {
    id: 'economic_operator',
    title: 'Opérateur Économique',
    description: 'Entreprises soumissionnant aux marchés publics',
    icon: Building2,
    examples: ['SARL', 'SPA', 'EURL', 'Auto-entrepreneur'],
  },
  {
    id: 'contracting_service',
    title: 'Service Contractant',
    description: 'Organismes publiant des appels d\'offres',
    icon: FileText,
    examples: ['APC', 'Direction de wilaya', 'EPA', 'EPIC'],
  },
  {
    id: 'commission_member',
    title: 'Membre de Commission',
    description: 'Évaluateurs des offres soumises',
    icon: Users,
    examples: ['Commission d\'ouverture', 'Commission d\'évaluation'],
  },
];

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
  'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
  'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Na'ma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès',
  'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa'
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    wilaya: '',
    phone: '',
    nif: '', // Numéro d'Identification Fiscale
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name) errs.name = 'Le nom est requis';
    if (!formData.email) errs.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email invalide';
    if (!formData.password) errs.password = 'Le mot de passe est requis';
    else if (formData.password.length < 8) errs.password = '8 caractères minimum';
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.organization) errs.organization = 'L\'organisme est requis';
    if (!formData.wilaya) errs.wilaya = 'La wilaya est requise';
    if (selectedRole === 'economic_operator' && !formData.nif) {
      errs.nif = 'Le NIF est requis pour les opérateurs économiques';
    }
    if (!acceptTerms) errs.terms = 'Vous devez accepter les conditions';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole!,
        organization: formData.organization,
        wilaya: formData.wilaya,
      });
      toast.success('Inscription réussie ! Vérifiez votre email.');
      router.push('/login');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Erreur lors de l\'inscription';
      toast.error(message);
    }
  };

  const nextStep = () => {
    if (step === 1 && selectedRole) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Progress Steps ─────────────────────── */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                step > s 
                  ? 'bg-gold-500 text-navy-900' 
                  : step === s 
                    ? 'bg-navy-900 text-white' 
                    : 'bg-navy-100 text-navy-400'
              }`}
              animate={{ scale: step === s ? 1.1 : 1 }}
            >
              {step > s ? <CheckCircle size={18} /> : s}
            </motion.div>
            {s < 3 && (
              <div className={`w-12 h-1 rounded ${step > s ? 'bg-gold-500' : 'bg-navy-100'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Step Content ───────────────────────── */}
      <AnimatePresence mode="wait">
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold text-navy-900 mb-2">
                Créer votre compte Al-Mizan
              </h1>
              <p className="text-navy-500">
                Choisissez votre profil pour personnaliser votre expérience
              </p>
            </div>

            <div className="space-y-3">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                    selectedRole === role.id
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-navy-100 bg-white hover:border-navy-200'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedRole === role.id ? 'bg-gold-500' : 'bg-navy-100'
                    }`}>
                      <role.icon size={24} className={selectedRole === role.id ? 'text-navy-900' : 'text-navy-600'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-navy-900">{role.title}</h3>
                        {selectedRole === role.id && (
                          <CheckCircle size={20} className="text-gold-600" />
                        )}
                      </div>
                      <p className="text-sm text-navy-500 mt-1">{role.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {role.examples.map((ex, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-navy-50 text-navy-600 rounded">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!selectedRole}
              onClick={nextStep}
            >
              Continuer
              <ChevronRight size={18} />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Personal Info */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold text-navy-900 mb-2">
                Informations personnelles
              </h1>
              <p className="text-navy-500">
                Ces informations seront utilisées pour votre profil
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Nom complet"
                placeholder="Prénom et nom"
                icon={<User size={18} />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />

              <Input
                label="Adresse email"
                type="email"
                placeholder="nom@organisme.dz"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              <div className="relative">
                <Input
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8 caractères minimum"
                  icon={<Lock size={18} />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-navy-400 hover:text-navy-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Input
                label="Confirmer le mot de passe"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={prevStep}
              >
                <ChevronLeft size={18} />
                Retour
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={nextStep}
              >
                Continuer
                <ChevronRight size={18} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Organization Info */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold text-navy-900 mb-2">
                Informations de l&apos;organisme
              </h1>
              <p className="text-navy-500">
                Complétez les informations de votre organisation
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nom de l'organisme"
                placeholder={selectedRole === 'economic_operator' ? 'SARL Exemple' : 'Direction de...'}
                icon={<Building2 size={18} />}
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                error={errors.organization}
              />

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Wilaya
                </label>
                <select
                  className="input-field"
                  value={formData.wilaya}
                  onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                >
                  <option value="">Sélectionnez une wilaya</option>
                  {wilayas.map((w, i) => (
                    <option key={i} value={w}>{`${String(i + 1).padStart(2, '0')} - ${w}`}</option>
                  ))}
                </select>
                {errors.wilaya && <p className="text-sm text-red-500 mt-1">{errors.wilaya}</p>}
              </div>

              {selectedRole === 'economic_operator' && (
                <Input
                  label="Numéro d'Identification Fiscale (NIF)"
                  placeholder="000000000000000"
                  value={formData.nif}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                  error={errors.nif}
                />
              )}

              <Input
                label="Téléphone (optionnel)"
                type="tel"
                placeholder="+213 XX XX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer p-4 bg-navy-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-navy-300 text-gold-500 focus:ring-gold-500/40"
                />
                <span className="text-sm text-navy-600">
                  J&apos;accepte les{' '}
                  <Link href="/legal/terms" className="text-gold-600 hover:underline">
                    Conditions d&apos;utilisation
                  </Link>
                  {' '}et la{' '}
                  <Link href="/legal/privacy" className="text-gold-600 hover:underline">
                    Politique de confidentialité
                  </Link>
                  {' '}d&apos;Al-Mizan.
                </span>
              </label>
              {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={prevStep}
                >
                  <ChevronLeft size={18} />
                  Retour
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  isLoading={isLoading}
                >
                  Créer mon compte
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Login link ─────────────────────────── */}
      <p className="text-center text-navy-600">
        Déjà inscrit ?{' '}
        <Link
          href="/login"
          className="text-gold-600 hover:text-gold-700 font-semibold transition-colors"
        >
          Se connecter
        </Link>
      </p>
    </motion.div>
  );
}
