import { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Upload, Clock, Settings, LogOut, CreditCard, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_NAME } from '@/constants/copy';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import logoSvg from '@/assets/logo.svg';

const sidebarLinks = [
  { label: 'Upload', href: '/dashboard', icon: Upload },
  { label: 'History', href: '/dashboard/history', icon: Clock },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const profile = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const user = {
    full_name: profile?.full_name || 'User',
    plan: profile?.plan || 'free',
    credits: profile?.credits ?? 3,
  };
  const creditsUsed = Math.max(0, 3 - (profile?.credits ?? 3));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    toast.success('Signed out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brand-surface flex flex-col">
      {/* Mobile topbar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-card border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoSvg} alt={SITE_NAME} className="h-7 w-7 rounded-md" />
          <span className="text-sm font-bold text-foreground">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {user.plan === 'free' ? `${creditsUsed}/${user.credits} credits` : 'Unlimited'}
          </span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-60 flex-col bg-card border-r border-border fixed inset-y-0 left-0 z-30">
          <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
            <img src={logoSvg} alt={SITE_NAME} className="h-8 w-8 rounded-lg" />
            <span className="text-base font-bold text-foreground">{SITE_NAME}</span>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Credits widget */}
          <div className="p-3">
            <div className="rounded-lg bg-brand-surface p-4 mb-3">
              <p className="text-xs font-semibold text-foreground mb-1">Credits</p>
              {user.plan === 'free' ? (
                <>
                  <p className="text-lg font-bold text-foreground">{creditsUsed}/{user.credits}</p>
                  <div className="w-full bg-border rounded-full h-1.5 mt-2">
                    <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${(creditsUsed / user.credits) * 100}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Resets at midnight UTC</p>
                  <Link to="/upgrade">
                    <Button size="sm" className="w-full mt-3 gradient-primary hover:opacity-90 rounded-lg text-xs">
                      <CreditCard size={14} className="mr-1" />
                      Upgrade Plan
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="text-lg font-bold text-success">Unlimited</p>
              )}
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 w-full text-sm text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-foreground/40" onClick={() => setMobileOpen(false)}>
            <aside className="w-64 bg-card h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
              <nav className="p-3 pt-4 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'
                      )}
                    >
                      <link.icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 lg:ml-60">
          {/* Desktop topbar */}
          <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-card border-b border-border">
            <div />
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-muted-foreground">
                {user.plan === 'free' ? `${creditsUsed}/${user.credits} credits used today` : 'Unlimited credits'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                {user.plan}
              </span>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {user.full_name.charAt(0)}
              </div>
            </div>
          </header>

          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-30">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardLayout;
