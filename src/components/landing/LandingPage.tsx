import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { PlatformShowcase } from './PlatformShowcase';
import { SolutionsBento } from './SolutionsBento';
import { AIIntelligenceSection } from './AIIntelligenceSection';
import { PlatformFeaturesGrid } from './PlatformFeaturesGrid';
import { InteractivePreview } from './InteractivePreview';
import { WhyNSITF } from './WhyNSITF';
import { TestimonialsSection } from './TestimonialsSection';
import { ResourcesSection } from './ResourcesSection';
import { CtaBanner } from './CtaBanner';
import { Footer } from './Footer';

interface LandingPageProps {
  onLaunchPortal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchPortal }) => {
  return (
    <div className="min-h-screen bg-[#050e1a] text-slate-100 font-sans selection:bg-[#00c878] selection:text-slate-950 overflow-x-hidden">
      <Navbar onLaunchPortal={onLaunchPortal} />
      <main>
        <HeroSection onLaunchPortal={onLaunchPortal} />
        <StatsSection />
        <PlatformShowcase />
        <SolutionsBento />
        <AIIntelligenceSection />
        <PlatformFeaturesGrid />
        <InteractivePreview />
        <WhyNSITF />
        <TestimonialsSection />
        <ResourcesSection />
        <CtaBanner onLaunchPortal={onLaunchPortal} />
      </main>
      <Footer onLaunchPortal={onLaunchPortal} />
    </div>
  );
};

export default LandingPage;
