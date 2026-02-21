import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onGetStarted: () => void;
}

export function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already building amazing products.
              Start your free trial today, no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-white hover:bg-primary-50 text-primary-700 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-transparent hover:bg-primary-500/20 text-white rounded-xl font-medium transition-colors border-2 border-white">
                Contact Sales
              </button>
            </div>

            <p className="text-sm text-primary-100 mt-6">
              Free 14-day trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
