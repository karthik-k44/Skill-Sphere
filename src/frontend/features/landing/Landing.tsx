import { PublicFooter } from "@/frontend/components/layout/PublicFooter";
import { PublicHeader } from "@/frontend/components/layout/PublicHeader";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { ContactSection } from "./components/ContactSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";

const Landing = () => {
  useDocumentTitle("");

  return (
    <div className="flex min-h-svh flex-col">
      <PublicHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
};

export default Landing;
