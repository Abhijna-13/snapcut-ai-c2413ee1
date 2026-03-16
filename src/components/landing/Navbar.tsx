import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, SITE_NAME } from '@/constants/copy';
import logoSvg from '@/assets/logo.svg';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-hero border-b border-brand-navy/20 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoSvg} alt={SITE_NAME} className="h-9 w-9 rounded-lg" />
          <span className="text-lg font-bold text-primary-foreground tracking-tight">{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-brand-blue-light/80 hover:text-primary-foreground transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-brand-blue-light/90 hover:text-primary-foreground hover:bg-brand-navy/40">
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="gradient-primary hover:opacity-90 transition-opacity duration-150 rounded-lg">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden gradient-hero border-t border-brand-navy/20 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium text-brand-blue-light/80 hover:text-primary-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full text-brand-blue-light/90 hover:text-primary-foreground">
                Log In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gradient-primary rounded-lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
