import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS } from '@/constants/copy';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 gradient-hero">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-brand-blue-light/70 text-lg max-w-2xl mx-auto">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={cn(
                'rounded-xl p-6 md:p-8 flex flex-col',
                plan.popular
                  ? 'bg-card ring-2 ring-primary scale-[1.02] shadow-xl'
                  : 'bg-card/5 border border-brand-blue/20'
              )}
            >
              {plan.popular && (
                <span className="inline-block self-start text-xs font-bold px-3 py-1 rounded-full gradient-primary text-primary-foreground mb-4">
                  Most Popular
                </span>
              )}
              <h3 className={cn('text-xl font-bold mb-1', plan.popular ? 'text-foreground' : 'text-primary-foreground')}>
                {plan.name}
              </h3>
              <p className={cn('text-sm mb-4', plan.popular ? 'text-muted-foreground' : 'text-brand-blue-light/60')}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={cn('text-4xl font-bold', plan.popular ? 'text-foreground' : 'text-primary-foreground')}>
                  {plan.price}
                </span>
                <span className={cn('text-sm', plan.popular ? 'text-muted-foreground' : 'text-brand-blue-light/60')}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={16} className={cn('mt-0.5 shrink-0', plan.popular ? 'text-success' : 'text-brand-blue-light/60')} />
                    <span className={cn('text-sm', plan.popular ? 'text-foreground' : 'text-brand-blue-light/80')}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to={plan.plan === 'free' ? '/register' : '/upgrade'}>
                <Button
                  className={cn(
                    'w-full rounded-lg min-h-[44px] font-semibold transition-opacity duration-150',
                    plan.popular
                      ? 'gradient-primary hover:opacity-90'
                      : 'bg-brand-blue/20 text-brand-blue-light hover:bg-brand-blue/30 border border-brand-blue/30'
                  )}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
