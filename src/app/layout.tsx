import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Al-Mizan — Plateforme Intelligente des Marchés Publics',
  description:
    'Al-Mizan : transparence, équité et efficience dans la gestion des marchés publics algériens grâce à l\'intelligence artificielle.',
  keywords: ['marchés publics', 'Al-Mizan', 'appels d\'offres', 'Algérie', 'transparence'],
  authors: [{ name: 'Équipe Al-Mizan' }],
  icons: {
    icon: '/images/al-mizan-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr">
      <body className="min-h-screen bg-ivory">
        {children}
      </body>
    </html>
  );
}
