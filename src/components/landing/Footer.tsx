import { Link } from 'react-router-dom';
import { SITE_NAME, FOOTER_LINKS } from '@/constants/copy';
import logoSvg from '@/assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoSvg} alt={SITE_NAME} className="h-8 w-8 rounded-lg" />
              <span className="text-lg font-bold text-primary-foreground tracking-tight">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-brand-blue-light/50 leading-relaxed">
              Professional AI background removal. Fast, accurate, and secure.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4 capitalize">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-blue-light/50 hover:text-brand-blue-light transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-blue/10 pt-8 text-center">
          <p className="text-xs text-brand-blue-light/40">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
