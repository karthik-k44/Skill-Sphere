import { useState, useEffect } from 'react';
import { Navigation } from '../../components/navigation';
import { SkeletonCard, SkeletonHero } from '../../components/skeleton';
import { Hero } from '../../components/hero';
import { Features } from '../../components/features';
import { CTA } from '../../components/cta';
import { Footer } from '../../components/footer';
import CreateAndLoginForm from './authentication/create-and-login-form';

function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navigation onLoginClick={() => setIsAuthModalOpen(true)} />

      <main>
        {isLoading ? (
          <>
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <SkeletonHero />
              </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <Hero onGetStarted={() => setIsAuthModalOpen(true)} />
            <Features />
            <CTA onGetStarted={() => setIsAuthModalOpen(true)} />
          </>
        )}
      </main>

      <Footer />

      <CreateAndLoginForm isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
    </div>
  );
}

export default LandingPage;
