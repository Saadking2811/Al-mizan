'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw, Save, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { usePermissions } from '@/hooks/usePermissions';

type AppUser = {
  id: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  status?: string;
  organization_id?: string;
  created_at?: string;
};

type UserCredential = {
  id?: string;
  email?: string;
  role?: string;
};

type Organization = {
  id: string;
  name: string;
};

const roleOptions = ['ADM', 'SC', 'OE'];

const normalizeRole = (role?: string) => String(role || '').toUpperCase();

export default function AdminUsersPage() {
  const { can, permissionsLoading } = usePermissions();
  const canReadUsers = can('users', 'read');
  const canCreateUsers = can('users', 'create');
  const canUpdateUsers = can('users', 'update');

  const [users, setUsers] = useState<AppUser[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [credentialsByUserId, setCredentialsByUserId] = useState<Record<string, UserCredential>>({});
  const [loading, setLoading] = useState(true);

  const [createForm, setCreateForm] = useState({
    first_name: '',
    last_name: '',
    role: 'SC',
    status: 'ACTIVE',
    organization_id: '',
    email: '',
    password: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    role: 'SC',
    status: 'ACTIVE',
    organization_id: '',
    email: '',
    password: '',
  });

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || '')),
    [users]
  );

  const loadData = async () => {
    if (!canReadUsers) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [usersRes, orgsRes] = await Promise.all([
        api.get('/users'),
        api.get('/organizations').catch(() => ({ data: [] })),
      ]);

      const usersData = (usersRes.data || []) as AppUser[];
      const orgsData = (orgsRes.data || []) as Organization[];

      setUsers(usersData);
      setOrganizations(orgsData);

      const credentialEntries = await Promise.all(
        usersData.map(async (user) => {
          try {
            const { data } = await api.get(`/users/${user.id}/credentials`);
            return [user.id, data as UserCredential] as const;
          } catch {
            return [user.id, { role: user.role }] as const;
          }
        })
      );

      setCredentialsByUserId(Object.fromEntries(credentialEntries));
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors du chargement des utilisateurs';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permissionsLoading) return;
    loadData();
  }, [permissionsLoading, canReadUsers]);

  const onCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!createForm.email || !createForm.password) {
      toast.error('Email et mot de passe sont obligatoires');
      return;
    }

    try {
      await api.post('/users', {
        first_name: createForm.first_name,
        last_name: createForm.last_name,
        role: createForm.role,
        status: createForm.status,
        organization_id: createForm.organization_id || undefined,
        email: createForm.email,
        password: createForm.password,
      });

      toast.success('Utilisateur cree');
      setCreateForm({
        first_name: '',
        last_name: '',
        role: 'SC',
        status: 'ACTIVE',
        organization_id: '',
        email: '',
        password: '',
      });
      await loadData();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la creation';
      toast.error(message);
    }
  };

  const startEdit = (user: AppUser) => {
    const creds = credentialsByUserId[user.id] || {};
    setEditingId(user.id);
    setEditForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      role: normalizeRole(creds.role || user.role) || 'SC',
      status: user.status || 'ACTIVE',
      organization_id: user.organization_id || '',
      email: creds.email || '',
      password: '',
    });
  };

  const saveEdit = async (userId: string) => {
    try {
      await api.put(`/users/${userId}`, {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        role: editForm.role,
        status: editForm.status,
        organization_id: editForm.organization_id || undefined,
        email: editForm.email,
        ...(editForm.password.trim() ? { password: editForm.password } : {}),
      });

      toast.success('Utilisateur mis a jour');
      setEditingId(null);
      await loadData();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la mise a jour';
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Gestion des utilisateurs</h2>
        <Button variant="outline" onClick={loadData}>
          <RefreshCw size={16} />
          Rafraichir
        </Button>
      </div>

      {canCreateUsers && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <UserPlus size={18} />
          Creer un utilisateur
        </h3>

        <form onSubmit={onCreateUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Prenom"
            value={createForm.first_name}
            onChange={(e) => setCreateForm((p) => ({ ...p, first_name: e.target.value }))}
          />
          <Input
            label="Nom"
            value={createForm.last_name}
            onChange={(e) => setCreateForm((p) => ({ ...p, last_name: e.target.value }))}
          />
          <Input
            label="Email (credential)"
            type="email"
            value={createForm.email}
            onChange={(e) => setCreateForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <Input
            label="Mot de passe (credential)"
            type="password"
            value={createForm.password}
            onChange={(e) => setCreateForm((p) => ({ ...p, password: e.target.value }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
            <select
              aria-label="Role nouvel utilisateur"
              className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
              value={createForm.role}
              onChange={(e) => setCreateForm((p) => ({ ...p, role: e.target.value }))}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
            <select
              aria-label="Statut nouvel utilisateur"
              className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
              value={createForm.status}
              onChange={(e) => setCreateForm((p) => ({ ...p, status: e.target.value }))}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Organisation</label>
            <select
              aria-label="Organisation nouvel utilisateur"
              className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
              value={createForm.organization_id}
              onChange={(e) => setCreateForm((p) => ({ ...p, organization_id: e.target.value }))}
            >
              <option value="">Par defaut</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button type="submit">
              <Plus size={16} />
              Creer
            </Button>
          </div>
        </form>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Liste des utilisateurs</h3>
        </div>

        {permissionsLoading || loading ? (
          <div className="p-5 text-sm text-slate-500">Chargement...</div>
        ) : !canReadUsers ? (
          <div className="p-5 text-sm text-slate-500">Vous n avez pas la permission de voir les utilisateurs.</div>
        ) : sortedUsers.length === 0 ? (
          <div className="p-5 text-sm text-slate-500">Aucun utilisateur</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-left">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Email credential</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => {
                  const creds = credentialsByUserId[user.id] || {};
                  const isEditing = editingId === user.id;

                  return (
                    <tr key={user.id} className="border-t border-slate-200 align-top">
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="grid grid-cols-1 gap-2">
                            <input
                              className="h-10 rounded-lg border border-slate-300 px-3"
                              value={editForm.first_name}
                              onChange={(e) => setEditForm((p) => ({ ...p, first_name: e.target.value }))}
                              placeholder="Prenom"
                            />
                            <input
                              className="h-10 rounded-lg border border-slate-300 px-3"
                              value={editForm.last_name}
                              onChange={(e) => setEditForm((p) => ({ ...p, last_name: e.target.value }))}
                              placeholder="Nom"
                            />
                          </div>
                        ) : (
                          <span>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            className="h-10 rounded-lg border border-slate-300 px-3 w-full"
                            type="email"
                            aria-label="Email utilisateur"
                            placeholder="email@exemple.dz"
                            value={editForm.email}
                            onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                          />
                        ) : (
                          <span>{creds.email || '-'}</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            aria-label="Role utilisateur"
                            className="h-10 rounded-lg border border-slate-300 px-3"
                            value={editForm.role}
                            onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))}
                          >
                            {roleOptions.map((role) => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        ) : (
                          <span>{normalizeRole(creds.role || user.role)}</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            aria-label="Statut utilisateur"
                            className="h-10 rounded-lg border border-slate-300 px-3"
                            value={editForm.status}
                            onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value }))}
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                          </select>
                        ) : (
                          <span>{user.status || '-'}</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              className="h-10 rounded-lg border border-slate-300 px-3 w-full"
                              type="password"
                              placeholder="Nouveau mot de passe (optionnel)"
                              value={editForm.password}
                              onChange={(e) => setEditForm((p) => ({ ...p, password: e.target.value }))}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => saveEdit(user.id)}>
                                <Save size={14} />
                                Enregistrer
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                Annuler
                              </Button>
                            </div>
                          </div>
                        ) : canUpdateUsers ? (
                          <Button size="sm" variant="outline" onClick={() => startEdit(user)}>
                            Modifier
                          </Button>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
