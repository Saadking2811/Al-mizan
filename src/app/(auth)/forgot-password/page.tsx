'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('L\'adresse email est requise');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Adresse email invalide');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast.success('Email envoyé avec succès !');
    } catch {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="text-center">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Mail size={32} className="text-gold-600" />
              </motion.div>
              <h1 className="text-2xl font-bold text-navy-900 mb-2">
                Mot de passe oublié ?
              </h1>
              <p className="text-navy-500">
                Entrez votre adresse email et nous vous enverrons un lien de réinitialisation.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Adresse email"
                type="email"
                placeholder="nom@organisme.dz"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                <Send size={18} />
                Envoyer le lien
              </Button>
            </form>

            {/* Info box */}
            <div className="p-4 bg-navy-50 rounded-xl">
              <h4 className="font-semibold text-navy-800 text-sm mb-2">
                Vous n&apos;avez pas reçu l&apos;email ?
              </h4>
              <ul className="text-sm text-navy-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Vérifiez votre dossier spam ou courrier indésirable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Assurez-vous d&apos;avoir utilisé l&apos;email lié à votre compte
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Contactez le support si le problème persiste
                </li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6"
          >
            {/* Success Icon */}
            <motion.div
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
            >
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">
                Email envoyé !
              </h2>
              <p className="text-navy-500">
                Un lien de réinitialisation a été envoyé à{' '}
                <span className="font-semibold text-navy-700">{email}</span>
              </p>
            </div>

            {/* Instructions */}
            <div className="p-5 bg-gold-50 rounded-xl border border-gold-200 text-left">
              <h4 className="font-semibold text-navy-800 mb-3">
                Prochaines étapes :
              </h4>
              <ol className="text-sm text-navy-600 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </span>
                  <span>Ouvrez votre boîte mail et recherchez un email d&apos;Al-Mizan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </span>
                  <span>Cliquez sur le lien de réinitialisation (valide 24h)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </span>
                  <span>Créez votre nouveau mot de passe sécurisé</span>
                </li>
              </ol>
            </div>

            {/* Resend */}
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-gold-600 hover:text-gold-700 font-semibold text-sm transition-colors"
            >
              Renvoyer l&apos;email
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to login */}
      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-navy-600 hover:text-navy-800 font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Retour à la connexion
      </Link>
    </motion.div>
  );
}
