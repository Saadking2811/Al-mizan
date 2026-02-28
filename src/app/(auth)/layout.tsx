import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left panel : branding ─────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-hero relative overflow-hidden flex-col justify-between p-12">
        {/* ── Decorative elements ─────────────── */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-gold-500/5 blur-3xl animate-float" />
          <div className="absolute bottom-32 left-10 w-64 h-64 rounded-full bg-royal-500/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(212,168,75,0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(212,168,75,0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* ── Logo ────────────────────────────── */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            src="/images/al-mizan-logo.png"
            alt="Al-Mizan"
            width={48}
            height={48}
          />
          <span className="text-2xl font-bold text-white">Al-Mizan</span>
        </Link>

        {/* ── Value proposition ───────────────── */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              La transparence des marchés
              <br />
              publics, <span className="text-gradient">réinventée.</span>
            </h2>
            <p className="text-navy-300 leading-relaxed max-w-md">
              Plateforme intelligente de gestion des marchés publics algériens.
              Équité, efficience et conformité garanties par l&apos;IA.
            </p>
          </div>

          {/* ── Feature pills ─────────────────── */}
          <div className="flex flex-wrap gap-3">
            {['Chiffrement E2E', 'IA Anti-collusion', 'Conformité Art. 53', 'Audit immutable'].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* ── Bottom tagline ──────────────────── */}
        <p className="relative z-10 text-navy-500 text-sm">
          © 2026 Al-Mizan — الميزان
        </p>
      </div>

      {/* ── Right panel : form ────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-ivory">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <Image
              src="/images/al-mizan-logo.png"
              alt="Al-Mizan"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-navy-900">Al-Mizan</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
