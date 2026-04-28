import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_TAGLINE, SITE_DESCRIPTION } from '@/constants/copy';
import { motion } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

const Hero = () => {
  return (
    <section className="relative gradient-hero overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-brand-blue-light">AI-Powered Processing</span>
            </div>

            <h1 className="text-primary-foreground mb-6">
              {SITE_TAGLINE.split('Instantly').map((part, i) =>
                i === 0 ? (
                  <span key={i}>
                    {part}
                    <span className="text-gradient">Instantly</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            <p className="text-brand-blue-light/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              {SITE_DESCRIPTION}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/dashboard">
                <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity duration-150 rounded-lg min-h-[44px] px-8 text-base font-semibold gap-2 w-full sm:w-auto">
                  Go to Dashboard
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="border-brand-blue/30 text-brand-blue-light hover:bg-brand-navy/40 rounded-lg min-h-[44px] px-8 text-base w-full sm:w-auto">
                  See How It Works
                </Button>
              </a>
            </div>

            <p className="text-xs text-brand-blue-light/40 mt-4">
              3 free images per day • No credit card required
            </p>
          </motion.div>

          {/* Right - Before/After */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
