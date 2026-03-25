'use client';

import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/auth';

export type PermissionAction = 'read' | 'create' | 'update' | 'delete' | 'export';
export type PermissionMatrix = Record<string, string[]>;

type RolePermissionsRow = {
  role?: string;
  permissions?: PermissionMatrix;
};

type PermissionsMeResponse = {
  role?: string;
  permissions?: PermissionMatrix;
};

const ROLE_ALIASES: Record<string, string> = {
  ADM: 'admin',
  ADMIN: 'admin',
};

const normalizeRole = (role?: string) => {
  const raw = String(role || '').trim();
  if (!raw) return '';

  const upper = raw.toUpperCase();
  if (ROLE_ALIASES[upper]) return ROLE_ALIASES[upper];
  if (upper === 'SC' || upper === 'OE') return upper;
  return raw.toLowerCase();
};

const hasPermission = (permissions: PermissionMatrix, moduleName: string, action: PermissionAction) => {
  const actions = permissions[moduleName];
  return Array.isArray(actions) && actions.includes(action);
};

let permissionCache: { role: string; permissions: PermissionMatrix } | null = null;

const loadPermissions = async (role?: string) => {
  const normalizedRole = normalizeRole(role);

  if (permissionCache && permissionCache.role === normalizedRole) {
    return permissionCache.permissions;
  }

  try {
    const { data } = await api.get('/permissions/me');
    const payload = (data || {}) as PermissionsMeResponse;
    const permissions = payload.permissions && typeof payload.permissions === 'object' ? payload.permissions : {};
    permissionCache = {
      role: normalizeRole(payload.role || role),
      permissions,
    };
    return permissions;
  } catch {
    const { data } = await api.get('/roles');
    const rows = (data || []) as RolePermissionsRow[];
    const row = rows.find((x) => normalizeRole(x.role) === normalizedRole);
    const permissions = row?.permissions && typeof row.permissions === 'object' ? row.permissions : {};

    permissionCache = {
      role: normalizedRole,
      permissions,
    };
    return permissions;
  }
};

export function usePermissions() {
  const { user, initialized, isAuthenticated } = useAuthStore();
  const [permissions, setPermissions] = useState<PermissionMatrix>({});
  const [permissionsLoading, setPermissionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!initialized) return;

      if (!isAuthenticated) {
        if (!cancelled) {
          setPermissions({});
          setPermissionsLoading(false);
        }
        return;
      }

      setPermissionsLoading(true);
      try {
        const loaded = await loadPermissions(user?.role);
        if (!cancelled) {
          setPermissions(loaded);
        }
      } catch {
        if (!cancelled) {
          setPermissions({});
        }
      } finally {
        if (!cancelled) {
          setPermissionsLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [initialized, isAuthenticated, user?.role]);

  const can = useCallback(
    (moduleName: string, action: PermissionAction) => hasPermission(permissions, moduleName, action),
    [permissions]
  );

  return { permissions, permissionsLoading, can };
}
