'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { User, Mail, Shield, Save, KeyRound, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type UserProfile = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  phone_number?: string;
  wilaya?: string;
  address?: string;
};

type Credentials = {
  id?: string;
  email?: string;
  role?: string;
};

const roleLabel = (role?: string) => {
  const normalized = String(role || '').toUpperCase();
  if (normalized === 'ADM' || normalized === 'ADMIN') return 'Administrateur';
  if (normalized === 'SC') return 'Service contractant';
  if (normalized === 'OE') return 'Operateur economique';
  return normalized || '-';
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingCredentials, setSavingCredentials] = useState(false);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    wilaya: '',
    address: '',
  });

  const [credentialsForm, setCredentialsForm] = useState({
    email: '',
    role: '',
    password: '',
  });

  const displayName = useMemo(() => {
    const first = profile?.first_name || '';
    const last = profile?.last_name || '';
    const full = `${first} ${last}`.trim();
    return full || 'Utilisateur';
  }, [profile]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profileRes, credentialsRes] = await Promise.all([
        api.get('/users/me'),
        api.get('/users/me/credentials'),
      ]);

      const userData = profileRes.data as UserProfile;
      const credData = credentialsRes.data as Credentials;

      setProfile(userData);
      setCredentials(credData);

      setProfileForm({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone_number: userData.phone_number || '',
        wilaya: userData.wilaya || '',
        address: userData.address || '',
      });

      setCredentialsForm({
        email: credData.email || userData.email || '',
        role: String(credData.role || userData.role || '').toUpperCase(),
        password: '',
      });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors du chargement du profil';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const { data } = await api.put('/users/me', profileForm);
      setProfile(data);
      toast.success('Profil mis a jour');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la mise a jour du profil';
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const submitCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCredentials(true);
    try {
      const payload: { email?: string; role?: string; password?: string } = {
        email: credentialsForm.email,
        role: credentialsForm.role,
      };

      if (credentialsForm.password.trim()) {
        payload.password = credentialsForm.password;
      }

      const { data } = await api.put('/users/me/credentials', payload);
      setCredentials(data);
      setCredentialsForm((prev) => ({ ...prev, password: '' }));
      toast.success('Identifiants mis a jour');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la mise a jour des identifiants';
      toast.error(message);
    } finally {
      setSavingCredentials(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-slate-500">Chargement du profil...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4A84B] to-[#C49438] text-white flex items-center justify-center font-bold text-xl">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{displayName}</h2>
            <p className="text-sm text-slate-500">{credentials?.email || profile?.email || '-'}</p>
            <p className="text-xs text-slate-400">{roleLabel(credentials?.role || profile?.role)}</p>
          </div>
        </div>

        <form onSubmit={submitProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prenom"
            value={profileForm.first_name}
            onChange={(e) => setProfileForm((prev) => ({ ...prev, first_name: e.target.value }))}
            icon={<User size={16} />}
          />
          <Input
            label="Nom"
            value={profileForm.last_name}
            onChange={(e) => setProfileForm((prev) => ({ ...prev, last_name: e.target.value }))}
            icon={<User size={16} />}
          />
          <Input
            label="Telephone"
            value={profileForm.phone_number}
            onChange={(e) => setProfileForm((prev) => ({ ...prev, phone_number: e.target.value }))}
            icon={<Phone size={16} />}
          />
          <Input
            label="Wilaya"
            value={profileForm.wilaya}
            onChange={(e) => setProfileForm((prev) => ({ ...prev, wilaya: e.target.value }))}
            icon={<MapPin size={16} />}
          />
          <div className="md:col-span-2">
            <Input
              label="Adresse"
              value={profileForm.address}
              onChange={(e) => setProfileForm((prev) => ({ ...prev, address: e.target.value }))}
              icon={<MapPin size={16} />}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" isLoading={savingProfile} icon={<Save size={16} />}>
              Enregistrer le profil
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Credentials</h3>

        <form onSubmit={submitCredentials} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email de connexion"
            type="email"
            value={credentialsForm.email}
            onChange={(e) => setCredentialsForm((prev) => ({ ...prev, email: e.target.value }))}
            icon={<Mail size={16} />}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
            <div className="relative">
              <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                aria-label="Role credential"
                className="w-full h-11 rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm"
                value={credentialsForm.role}
                onChange={(e) => setCredentialsForm((prev) => ({ ...prev, role: e.target.value }))}
              >
                <option value="ADM">ADM - Administrateur</option>
                <option value="SC">SC - Service contractant</option>
                <option value="OE">OE - Operateur economique</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <Input
              label="Nouveau mot de passe (optionnel)"
              type="password"
              placeholder="Laisser vide pour ne pas changer"
              value={credentialsForm.password}
              onChange={(e) => setCredentialsForm((prev) => ({ ...prev, password: e.target.value }))}
              icon={<KeyRound size={16} />}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" isLoading={savingCredentials} icon={<Save size={16} />}>
              Enregistrer les credentials
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
