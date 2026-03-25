'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import { Bell, Search, Menu, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/auth';
import { usePermissions } from '@/hooks/usePermissions';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':              { title: 'Tableau de bord',  subtitle: "Vue d'ensemble de votre activité" },
  '/dashboard/tenders':      { title: "Appels d'offres",  subtitle: 'Gestion des marchés publics' },
  '/dashboard/submissions':  { title: 'Soumissions',      subtitle: 'Vos dossiers de soumission' },
  '/dashboard/evaluations':  { title: 'Évaluations',      subtitle: "Commissions d'évaluation" },
  '/dashboard/analytics':    { title: 'Statistiques',     subtitle: 'Analyses et indicateurs' },
  '/dashboard/notifications':{ title: 'Notifications',    subtitle: 'Vos alertes et messages' },
  '/dashboard/profile':      { title: 'Profil',           subtitle: 'Vos informations personnelles' },
  '/dashboard/settings':     { title: 'Paramètres',       subtitle: 'Configuration de votre espace' },
  '/dashboard/admin/users':  { title: 'Utilisateurs',     subtitle: 'Gestion des accès' },
  '/dashboard/admin/permissions': { title: 'Roles & permissions', subtitle: 'Gestion des droits d accès' },
  '/dashboard/admin/organizations': { title: 'Organisations', subtitle: 'Gestion des organismes' },
  '/dashboard/admin/audit':  { title: 'Audit',            subtitle: "Journal d'activité" },
};

const getRequiredAdminPermission = (path: string) => {
  if (path.startsWith('/dashboard/admin/users')) {
    return { module: 'users', action: 'read' as const };
  }
  if (path.startsWith('/dashboard/admin/organizations')) {
    return { module: 'organizations', action: 'read' as const };
  }
  if (path.startsWith('/dashboard/admin/permissions')) {
    return { module: 'settings', action: 'read' as const };
  }
  if (path.startsWith('/dashboard/admin/audit')) {
    return { module: 'reports', action: 'read' as const };
  }

  return { module: 'settings', action: 'read' as const };
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, initialized, initialize } = useAuthStore();
  const { can, permissionsLoading } = usePermissions();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const requiredAdminPermission = getRequiredAdminPermission(pathname);
  const canAccessAdminRoute = !isAdminRoute || can(requiredAdminPermission.module, requiredAdminPermission.action);

  const pageInfo = pageTitles[pathname] ?? { title: 'Al-Mizan', subtitle: '' };

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (isAdminRoute && !permissionsLoading && !canAccessAdminRoute) {
      router.replace('/dashboard');
    }
  }, [initialized, isAuthenticated, isAdminRoute, permissionsLoading, canAccessAdminRoute, router]);

  if (!initialized || !isAuthenticated || (isAdminRoute && (permissionsLoading || !canAccessAdminRoute))) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm font-medium',
          style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' },
        }}
      />

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Main content — offset by sidebar width on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">

        {/* '”€'”€ Top navbar '”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€ */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 gap-4">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className="lg:hidden p-2 -ml-1 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Logo (mobile only) */}
          <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
            <Image
              src="/images/al-mizan-logo.png"
              alt="Al-Mizan"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-sm font-bold text-gray-800">Al-Mizan</span>
          </Link>

          {/* Page title + breadcrumb */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 select-none">
              <span className="text-[#D4A84B] font-semibold">Al-Mizan</span>
              <ChevronRight size={12} />
              <span className="text-gray-600">{pageInfo.title}</span>
            </div>
            <h1 className="text-sm font-bold text-gray-800 leading-tight truncate hidden sm:block mt-0.5">
              {pageInfo.subtitle}
            </h1>
          </div>

          {/* Search bar */}
          <button className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm text-gray-400 transition-colors w-56">
            <Search size={15} />
            <span>Rechercher'€¦</span>
            <kbd className="ml-auto text-[10px] bg-white border border-gray-300 text-gray-400 rounded px-1.5 py-0.5 font-mono">'Œ˜K</kbd>
          </button>

          {/* Notifications */}
          <Link href="/dashboard/notifications">
            <button aria-label="Notifications" className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell size={19} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200" />

          {/* User avatar */}
          <Link href="/dashboard/profile">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A84B] to-[#C49438] flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name ?? 'Administrateur'}</p>
                <p className="text-xs text-gray-400 leading-tight">Admin</p>
              </div>
            </div>
          </Link>
        </header>

        {/* '”€'”€ Page content '”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€ */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


