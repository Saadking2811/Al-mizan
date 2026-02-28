'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Upload,
  ClipboardCheck,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Shield,
  Users,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth';

const navItems = [
  { label: 'Tableau de bord', href: '/dashboard',              icon: LayoutDashboard },
  { label: "Appels d'offres",  href: '/dashboard/tenders',     icon: FileText },
  { label: 'Soumissions',      href: '/dashboard/submissions',  icon: Upload },
  { label: 'Évaluations',      href: '/dashboard/evaluations',  icon: ClipboardCheck },
  { label: 'Statistiques',     href: '/dashboard/analytics',    icon: BarChart3 },
  { label: 'Notifications',    href: '/dashboard/notifications', icon: Bell },
];

const adminItems = [
  { label: 'Utilisateurs', href: '/dashboard/admin/users', icon: Users },
  { label: 'Audit',        href: '/dashboard/admin/audit', icon: Shield },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const isActive = (href: string) =>
    href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(href);

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const active = isActive(item.href);
    return (
      <Link href={item.href} onClick={onMobileClose}>
        <div className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
          active
            ? 'bg-[#D4A84B] text-white shadow-md'
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
        )}>
          <item.icon size={17} className={cn('flex-shrink-0', active ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
          <span className="flex-1">{item.label}</span>
          {active && <ChevronRight size={14} className="text-white/70" />}
        </div>
      </Link>
    );
  };

  const content = (
    <div className="flex flex-col h-full bg-[#0F1B2D] border-r border-white/10">

      {/* '”€'”€ Logo header '”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€ */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/images/al-mizan-logo.png"
            alt="Al-Mizan"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <span className="text-white font-bold text-lg">Al-Mizan</span>
        </Link>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            aria-label="Fermer"
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-slate-400"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* '”€'”€ User card '”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€ */}
      <Link href="/dashboard/profile" onClick={onMobileClose}>
        <div className="mx-4 mt-4 mb-2 flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/[0.15] transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A84B] to-[#C49438] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{user?.name ?? 'Administrateur'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email ?? 'admin@al-mizan.dz'}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" title="En ligne" />
        </div>
      </Link>

      {/* '”€'”€ Main nav '”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€ */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pt-2 pb-2">Menu</p>
        {navItems.map((item) => <NavItem key={item.href} item={item} />)}

        {/* Admin */}
        <div className="pt-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pb-2">Administration</p>
          {adminItems.map((item) => <NavItem key={item.href} item={item} />)}
        </div>
      </nav>

      {/* '”€'”€ Bottom actions '”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€'”€ */}
      <div className="px-3 pb-4 pt-2 border-t border-white/10 space-y-0.5">
        <Link href="/dashboard/settings" onClick={onMobileClose}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all group">
            <Settings size={17} className="text-slate-400 group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
            <span>Paramètres</span>
          </div>
        </Link>
        <button
          onClick={() => { logout(); onMobileClose?.(); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-900/40 hover:text-red-300 transition-all group"
        >
          <LogOut size={17} className="text-slate-400 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop — fixed sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 z-40 flex-col">
        {content}
      </div>

      {/* Mobile — slide-in drawer */}
      <>
        {/* Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={onMobileClose}
          />
        )}
        <div className={cn(
          'fixed left-0 top-0 h-screen w-64 z-40 lg:hidden transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          {content}
        </div>
      </>
    </>
  );
}
