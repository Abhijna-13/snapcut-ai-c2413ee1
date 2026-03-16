import { HOW_IT_WORKS_STEPS } from '@/constants/copy';
import { Upload, Sparkles, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [Upload, Sparkles, Download];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to remove any background. No design skills needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl gradient-primary flex items-center justify-center hero-glow">
                  <Icon className="text-primary-foreground" size={28} />
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">{step.step}</span>
                <h3 className="text-foreground mt-2 mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
