import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS, CREDIT_PACKS } from '@/constants/copy';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const Upgrade = () => {
  const handleUpgrade = (plan: string) => {
    toast.info(`Stripe not connected yet. Would upgrade to ${plan}.`);
  };

  const handleBuyCredits = (credits: number) => {
    toast.info(`Stripe not connected yet. Would buy ${credits} credits.`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-foreground mb-4">Upgrade Your Plan</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlock unlimited processing and premium features.
            </p>
          </div>

          {/* Plan comparison */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'rounded-xl p-6 md:p-8 flex flex-col bg-card',
                  plan.popular ? 'ring-2 ring-primary shadow-xl' : 'card-shadow'
                )}
              >
                {plan.popular && (
                  <span className="inline-block self-start text-xs font-bold px-3 py-1 rounded-full gradient-primary text-primary-foreground mb-4">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={16} className="mt-0.5 shrink-0 text-success" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleUpgrade(plan.name)}
                  className={cn(
                    'w-full rounded-lg min-h-[44px] font-semibold gap-2',
                    plan.popular ? 'gradient-primary hover:opacity-90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </Button>
              </div>
            ))}
          </div>

          {/* Credit packs */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Need Extra Credits?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {CREDIT_PACKS.map((pack) => (
                <div key={pack.credits} className="bg-card rounded-xl p-6 card-shadow flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-foreground">{pack.credits} Credits</p>
                    <p className="text-sm text-muted-foreground">{pack.price} one-time</p>
                  </div>
                  <Button variant="outline" className="rounded-lg" onClick={() => handleBuyCredits(pack.credits)}>
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upgrade;
