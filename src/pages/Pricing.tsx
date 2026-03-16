import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import PricingSection from '@/components/landing/PricingSection';
import { FAQ_ITEMS } from '@/constants/copy';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <PricingSection />

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h2 className="text-foreground text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl px-6 card-shadow border-none">
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
