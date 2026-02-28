'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Fonctionnalités', href: '/#features' },
  { label: 'Comment ça marche', href: '/#how-it-works' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-md py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="section-container flex items-center justify-between">
        {/* ── Logo ──────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/al-mizan-logo.png"
            alt="Al-Mizan"
            width={44}
            height={44}
            className="transition-transform group-hover:scale-105"
          />
          <span
            className={cn(
              'text-xl font-bold tracking-tight transition-colors',
              isScrolled ? 'text-navy-900' : 'text-white'
            )}
          >
            Al-Mizan
          </span>
        </Link>

        {/* ── Desktop Links ─────────────────────────── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors relative',
                'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0',
                'after:bg-gold-500 after:transition-all after:duration-300',
                'hover:after:w-full',
                isScrolled
                  ? 'text-navy-700 hover:text-navy-900'
                  : 'text-white/80 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── CTA Buttons ───────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant={isScrolled ? 'ghost' : 'ghost'}
              size="sm"
              className={cn(!isScrolled && 'text-white hover:bg-white/10')}
            >
              Se connecter
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Créer un compte
            </Button>
          </Link>
        </div>

        {/* ── Mobile Toggle ─────────────────────────── */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors',
            isScrolled ? 'text-navy-900' : 'text-white'
          )}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu ───────────────────────────────── */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-navy-100 shadow-lg animate-fade-in">
          <div className="section-container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block py-2 text-navy-700 hover:text-navy-900 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="divider-gold my-3" />
            <div className="flex flex-col gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full">
                  Se connecter
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="w-full">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
