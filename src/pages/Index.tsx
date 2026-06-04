import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { AIExperience } from "@/components/AIExperience";
import { BackendExpertise } from "@/components/BackendExpertise";
import { TechStackWall } from "@/components/TechStackWall";
import { CodeShowcase } from "@/components/CodeShowcase";
import { GitHubStats } from "@/components/GitHubStats";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { CurrentlyDoing } from "@/components/CurrentlyDoing";
import { DevTerminal } from "@/components/DevTerminal";
import { AIAssistant } from "@/components/AIAssistant";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { EasterEgg } from "@/components/EasterEgg";
import { TrophyCase } from "@/components/Achievements";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <EasterEgg />
      <TrophyCase />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <Dashboard />
      <Projects />
      <CodeShowcase />
      <Skills />
      <AIExperience />
      <BackendExpertise />
      <TechStackWall />
      <GitHubStats />
      <ProjectTimeline />
      <CurrentlyDoing />
      <DevTerminal />
      <Contact />
      <Footer />

      {/* Floating UI */}
      <AIAssistant />
    </div>
  );
};

export default Index;
