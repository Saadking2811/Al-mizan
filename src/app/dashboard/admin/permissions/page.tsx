'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Save, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import { usePermissions } from '@/hooks/usePermissions';

type PermissionMap = Record<string, string[]>;

type RolePermissions = {
  role: string;
  label?: string;
  permissions: PermissionMap;
  updated_at?: string;
};

const defaultModules = ['users', 'organizations', 'tenders', 'reports', 'statistics', 'notifications', 'settings'];
const actions = ['read', 'create', 'update', 'delete', 'export'];

export default function AdminPermissionsPage() {
  const { can, permissionsLoading } = usePermissions();
  const canReadSettings = can('settings', 'read');
  const canUpdateSettings = can('settings', 'update');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<RolePermissions[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [draftPermissions, setDraftPermissions] = useState<PermissionMap>({});

  const selectedRoleRow = useMemo(
    () => roles.find((r) => r.role === selectedRole) || null,
    [roles, selectedRole]
  );

  const allModules = useMemo(() => {
    const modules = new Set<string>(defaultModules);
    for (const role of roles) {
      Object.keys(role.permissions || {}).forEach((moduleName) => modules.add(moduleName));
    }
    return Array.from(modules).sort();
  }, [roles]);

  const loadRoles = async () => {
    if (!canReadSettings) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get('/roles');
      const rows = (data || []) as RolePermissions[];
      setRoles(rows);

      if (rows.length > 0) {
        const first = rows[0];
        setSelectedRole((prev) => prev || first.role);
        setDraftPermissions(first.permissions || {});
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors du chargement des permissions';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permissionsLoading) return;
    loadRoles();
  }, [permissionsLoading, canReadSettings]);

  useEffect(() => {
    if (!selectedRoleRow) return;
    setDraftPermissions(selectedRoleRow.permissions || {});
  }, [selectedRoleRow?.role]);

  const togglePermission = (moduleName: string, action: string) => {
    setDraftPermissions((prev) => {
      const current = Array.isArray(prev[moduleName]) ? prev[moduleName] : [];
      const exists = current.includes(action);
      const next = exists ? current.filter((a) => a !== action) : [...current, action];

      return {
        ...prev,
        [moduleName]: next,
      };
    });
  };

  const onSave = async () => {
    if (!selectedRole) {
      toast.error('Aucun role selectionne');
      return;
    }

    if (!canUpdateSettings) {
      toast.error('Vous n avez pas la permission de modifier les roles');
      return;
    }

    setSaving(true);
    try {
      await api.put(`/roles/${selectedRole}/permissions`, { permissions: draftPermissions });
      toast.success('Permissions mises a jour');
      await loadRoles();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.message ||
        (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error ||
        'Erreur lors de la mise a jour des permissions';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Roles & permissions</h2>
        <Button variant="outline" onClick={loadRoles}>
          <RefreshCw size={16} />
          Rafraichir
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Shield size={18} />
          Matrice des permissions
        </h3>

        {permissionsLoading || loading ? (
          <div className="text-sm text-slate-500">Chargement...</div>
        ) : !canReadSettings ? (
          <div className="text-sm text-slate-500">Vous n avez pas la permission de consulter les roles.</div>
        ) : roles.length === 0 ? (
          <div className="text-sm text-slate-500">Aucun role trouve.</div>
        ) : (
          <>
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <select
                aria-label="Selection role"
                className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role.role} value={role.role}>
                    {role.label || role.role}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-left">
                    <th className="px-4 py-3">Module</th>
                    {actions.map((action) => (
                      <th key={action} className="px-4 py-3 uppercase">{action}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allModules.map((moduleName) => (
                    <tr key={moduleName} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-medium text-slate-700">{moduleName}</td>
                      {actions.map((action) => {
                        const checked = Array.isArray(draftPermissions[moduleName]) && draftPermissions[moduleName].includes(action);

                        return (
                          <td key={`${moduleName}-${action}`} className="px-4 py-3">
                            <input
                              aria-label={`${moduleName}-${action}`}
                              type="checkbox"
                              checked={checked}
                              disabled={!canUpdateSettings}
                              onChange={() => togglePermission(moduleName, action)}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {canUpdateSettings && (
              <div className="flex justify-end">
                <Button onClick={onSave} isLoading={saving}>
                  <Save size={16} />
                  Enregistrer
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
