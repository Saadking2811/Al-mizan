'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Building2, Pencil, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { usePermissions } from '@/hooks/usePermissions';

type Organization = {
  id: string;
  name: string;
  org_type: string;
  nif?: string | null;
  nis?: string | null;
  rc?: string | null;
  address?: string | null;
  wilaya?: string | null;
  phone?: string | null;
  official_email?: string | null;
  website?: string | null;
  is_verified?: boolean;
  is_national?: boolean;
  capital_majority_national?: boolean;
  is_blacklisted?: boolean;
  blacklist_reason?: string | null;
};

type OrgForm = {
  name: string;
  org_type: string;
  nif: string;
  nis: string;
  rc: string;
  address: string;
  wilaya: string;
  phone: string;
  official_email: string;
  website: string;
  is_verified: boolean;
  is_national: boolean;
  capital_majority_national: boolean;
  is_blacklisted: boolean;
  blacklist_reason: string;
};

const orgTypeOptions = ['EPA', 'EPIC', 'MINISTERE', 'WILAYA', 'APC', 'EPE', 'PRIVE', 'START_UP'];

const emptyForm: OrgForm = {
  name: '',
  org_type: 'PRIVE',
  nif: '',
  nis: '',
  rc: '',
  address: '',
  wilaya: '',
  phone: '',
  official_email: '',
  website: '',
  is_verified: false,
  is_national: false,
  capital_majority_national: false,
  is_blacklisted: false,
  blacklist_reason: '',
};

const toForm = (org: Organization): OrgForm => ({
  name: org.name || '',
  org_type: org.org_type || 'PRIVE',
  nif: org.nif || '',
  nis: org.nis || '',
  rc: org.rc || '',
  address: org.address || '',
  wilaya: org.wilaya || '',
  phone: org.phone || '',
  official_email: org.official_email || '',
  website: org.website || '',
  is_verified: Boolean(org.is_verified),
  is_national: Boolean(org.is_national),
  capital_majority_national: Boolean(org.capital_majority_national),
  is_blacklisted: Boolean(org.is_blacklisted),
  blacklist_reason: org.blacklist_reason || '',
});

const toPayload = (form: OrgForm) => ({
  name: form.name.trim(),
  org_type: form.org_type,
  nif: form.nif.trim() || undefined,
  nis: form.nis.trim() || undefined,
  rc: form.rc.trim() || undefined,
  address: form.address.trim() || undefined,
  wilaya: form.wilaya.trim() || undefined,
  phone: form.phone.trim() || undefined,
  official_email: form.official_email.trim() || undefined,
  website: form.website.trim() || undefined,
  is_verified: form.is_verified,
  is_national: form.is_national,
  capital_majority_national: form.capital_majority_national,
  is_blacklisted: form.is_blacklisted,
  blacklist_reason: form.blacklist_reason.trim() || undefined,
});

export default function OrganizationsPage() {
  const { can, permissionsLoading } = usePermissions();
  const canRead = can('organizations', 'read');
  const canCreate = can('organizations', 'create');
  const canUpdate = can('organizations', 'update');
  const canDelete = can('organizations', 'delete');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [form, setForm] = useState<OrgForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<OrgForm>(emptyForm);

  const sortedOrganizations = useMemo(
    () => [...organizations].sort((a, b) => a.name.localeCompare(b.name)),
    [organizations]
  );

  const loadOrganizations = async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get('/organizations');
      setOrganizations((data || []) as Organization[]);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors du chargement des organisations';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permissionsLoading) return;
    loadOrganizations();
  }, [permissionsLoading, canRead]);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCreate) {
      toast.error('Vous n avez pas la permission de creer des organisations');
      return;
    }

    if (!form.name.trim() || !form.org_type) {
      toast.error('Le nom et le type sont obligatoires');
      return;
    }

    setSaving(true);
    try {
      await api.post('/organizations', toPayload(form));
      toast.success('Organisation creee');
      setForm(emptyForm);
      await loadOrganizations();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la creation de l organisation';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (org: Organization) => {
    if (!canUpdate) return;
    setEditingId(org.id);
    setEditForm(toForm(org));
  };

  const onSaveEdit = async (orgId: string) => {
    if (!canUpdate) {
      toast.error('Vous n avez pas la permission de modifier des organisations');
      return;
    }

    if (!editForm.name.trim() || !editForm.org_type) {
      toast.error('Le nom et le type sont obligatoires');
      return;
    }

    try {
      await api.put(`/organizations/${orgId}`, toPayload(editForm));
      toast.success('Organisation mise a jour');
      setEditingId(null);
      await loadOrganizations();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la mise a jour de l organisation';
      toast.error(message);
    }
  };

  const onDelete = async (orgId: string) => {
    if (!canDelete) {
      toast.error('Vous n avez pas la permission de supprimer des organisations');
      return;
    }

    if (!window.confirm('Confirmer la suppression de cette organisation ?')) {
      return;
    }

    try {
      await api.delete(`/organizations/${orgId}`);
      toast.success('Organisation supprimee');
      await loadOrganizations();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la suppression de l organisation';
      toast.error(message);
    }
  };

  const renderBool = (value?: boolean) => (value ? 'Oui' : 'Non');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Gestion des organisations</h2>
        <Button variant="outline" onClick={loadOrganizations}>
          <RefreshCw size={16} />
          Rafraichir
        </Button>
      </div>

      {canCreate && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={18} />
            Ajouter une organisation
          </h3>

          <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Nom"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
              <select
                aria-label="Type organisation"
                className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
                value={form.org_type}
                onChange={(e) => setForm((p) => ({ ...p, org_type: e.target.value }))}
              >
                {orgTypeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <Input label="NIF" value={form.nif} onChange={(e) => setForm((p) => ({ ...p, nif: e.target.value }))} />
            <Input label="NIS" value={form.nis} onChange={(e) => setForm((p) => ({ ...p, nis: e.target.value }))} />
            <Input label="RC" value={form.rc} onChange={(e) => setForm((p) => ({ ...p, rc: e.target.value }))} />
            <Input
              label="Email officiel"
              type="email"
              value={form.official_email}
              onChange={(e) => setForm((p) => ({ ...p, official_email: e.target.value }))}
            />
            <Input
              label="Telephone"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            />
            <Input label="Wilaya" value={form.wilaya} onChange={(e) => setForm((p) => ({ ...p, wilaya: e.target.value }))} />
            <Input
              label="Adresse"
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            />
            <Input
              label="Site web"
              value={form.website}
              onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
            />
            <Input
              label="Raison blacklist"
              value={form.blacklist_reason}
              onChange={(e) => setForm((p) => ({ ...p, blacklist_reason: e.target.value }))}
            />

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.is_verified}
                onChange={(e) => setForm((p) => ({ ...p, is_verified: e.target.checked }))}
              />
              Verifiee
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.is_national}
                onChange={(e) => setForm((p) => ({ ...p, is_national: e.target.checked }))}
              />
              Nationale
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.capital_majority_national}
                onChange={(e) => setForm((p) => ({ ...p, capital_majority_national: e.target.checked }))}
              />
              Capital majoritairement national
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.is_blacklisted}
                onChange={(e) => setForm((p) => ({ ...p, is_blacklisted: e.target.checked }))}
              />
              Blacklistee
            </label>

            <div className="md:col-span-2 lg:col-span-3 flex justify-end">
              <Button type="submit" isLoading={saving}>
                <Building2 size={16} />
                Creer
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Liste des organisations</h3>
        </div>

        {permissionsLoading || loading ? (
          <div className="p-5 text-sm text-slate-500">Chargement...</div>
        ) : !canRead ? (
          <div className="p-5 text-sm text-slate-500">Vous n avez pas la permission de voir les organisations.</div>
        ) : sortedOrganizations.length === 0 ? (
          <div className="p-5 text-sm text-slate-500">Aucune organisation</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-left">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">NIF/NIS</th>
                  <th className="px-4 py-3">Email/Phone</th>
                  <th className="px-4 py-3">Flags</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrganizations.map((org) => {
                  const isEditing = editingId === org.id;

                  return (
                    <tr key={org.id} className="border-t border-slate-200 align-top">
                      <td className="px-4 py-3 min-w-[220px]">
                        {isEditing ? (
                          <Input
                            label=""
                            value={editForm.name}
                            onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                          />
                        ) : (
                          <div>
                            <p className="font-medium text-slate-800">{org.name}</p>
                            <p className="text-xs text-slate-500">{org.wilaya || '-'}</p>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 min-w-[160px]">
                        {isEditing ? (
                          <select
                            aria-label="Type organisation edition"
                            className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                            value={editForm.org_type}
                            onChange={(e) => setEditForm((p) => ({ ...p, org_type: e.target.value }))}
                          >
                            {orgTypeOptions.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        ) : (
                          <span>{org.org_type || '-'}</span>
                        )}
                      </td>

                      <td className="px-4 py-3 min-w-[220px]">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              aria-label="NIF organisation"
                              className="h-10 rounded-lg border border-slate-300 px-3 w-full"
                              value={editForm.nif}
                              onChange={(e) => setEditForm((p) => ({ ...p, nif: e.target.value }))}
                              placeholder="NIF"
                            />
                            <input
                              aria-label="NIS organisation"
                              className="h-10 rounded-lg border border-slate-300 px-3 w-full"
                              value={editForm.nis}
                              onChange={(e) => setEditForm((p) => ({ ...p, nis: e.target.value }))}
                              placeholder="NIS"
                            />
                          </div>
                        ) : (
                          <span>{org.nif || '-'} / {org.nis || '-'}</span>
                        )}
                      </td>

                      <td className="px-4 py-3 min-w-[220px]">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              aria-label="Email organisation"
                              type="email"
                              className="h-10 rounded-lg border border-slate-300 px-3 w-full"
                              value={editForm.official_email}
                              onChange={(e) => setEditForm((p) => ({ ...p, official_email: e.target.value }))}
                              placeholder="Email"
                            />
                            <input
                              aria-label="Telephone organisation"
                              className="h-10 rounded-lg border border-slate-300 px-3 w-full"
                              value={editForm.phone}
                              onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
                              placeholder="Telephone"
                            />
                          </div>
                        ) : (
                          <span>{org.official_email || '-'} / {org.phone || '-'}</span>
                        )}
                      </td>

                      <td className="px-4 py-3 min-w-[220px]">
                        {isEditing ? (
                          <div className="space-y-2 text-sm text-slate-700">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editForm.is_verified}
                                onChange={(e) => setEditForm((p) => ({ ...p, is_verified: e.target.checked }))}
                              />
                              Verifiee
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editForm.is_national}
                                onChange={(e) => setEditForm((p) => ({ ...p, is_national: e.target.checked }))}
                              />
                              Nationale
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editForm.capital_majority_national}
                                onChange={(e) => setEditForm((p) => ({ ...p, capital_majority_national: e.target.checked }))}
                              />
                              Capital nat.
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editForm.is_blacklisted}
                                onChange={(e) => setEditForm((p) => ({ ...p, is_blacklisted: e.target.checked }))}
                              />
                              Blacklistee
                            </label>
                          </div>
                        ) : (
                          <span>
                            V:{renderBool(org.is_verified)} / N:{renderBool(org.is_national)} / C:{renderBool(org.capital_majority_national)} / B:{renderBool(org.is_blacklisted)}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 min-w-[190px]">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => onSaveEdit(org.id)}>
                              <Save size={14} />
                              Enregistrer
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                              <X size={14} />
                              Annuler
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            {canUpdate ? (
                              <Button size="sm" variant="outline" onClick={() => startEdit(org)}>
                                <Pencil size={14} />
                                Modifier
                              </Button>
                            ) : null}

                            {canDelete ? (
                              <Button size="sm" variant="outline" onClick={() => onDelete(org.id)}>
                                <Trash2 size={14} />
                                Supprimer
                              </Button>
                            ) : null}

                            {!canUpdate && !canDelete ? <span className="text-slate-400">-</span> : null}
                          </div>
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
