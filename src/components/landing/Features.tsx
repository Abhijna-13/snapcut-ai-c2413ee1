import { FEATURES } from '@/constants/copy';
import { Zap, Timer, ImageUp, Layers, Shield, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = { Zap, Timer, ImageUp, Layers, Shield, Code };

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-brand-surface">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-foreground mb-4">Built for Speed & Quality</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enterprise-grade background removal that fits any workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow duration-150"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
