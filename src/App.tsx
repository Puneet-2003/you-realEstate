import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RedefiningLiving } from './components/RedefiningLiving';
import { BentoStats } from './components/BentoStats';
import { FeaturedProjects } from './components/FeaturedProjects';
import { NextGenTechnology } from './components/NextGenTechnology';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { InquiryModal } from './components/InquiryModal';
import { EditionSwitcher, EditionType } from './components/EditionSwitcher';
import { ResidenceAuroraView } from './components/aurora/ResidenceAuroraView';
import { RivieraAgencyView } from './components/riviera/RivieraAgencyView';
import { ScrollCanvas } from './components/ScrollCanvas';
import { Project, PROJECTS } from './data/projects';

export default function App() {
  const [currentEdition, setCurrentEdition] = useState<EditionType>('novaris');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState<string | undefined>(undefined);

  const handleExploreHomes = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFeatured = () => {
    const featured = PROJECTS.find((p) => p.id === 'novaris-horizon-villa') || PROJECTS[0];
    setSelectedProject(featured);
  };

  const handleOpenInquiry = (projectName?: string) => {
    setInquiryProject(projectName);
    setInquiryOpen(true);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-transparent text-white selection:bg-white selection:text-black relative">
      {/* Scroll-Based Animation Canvas pinned to background */}
      <ScrollCanvas />

      {/* Main interactive page content rendered above on the scroll animation */}
      <div className="relative z-10 w-full overflow-x-hidden" style={{ transform: 'translate3d(0, 0, 0)' }}>
        {/* Dynamic View by Edition */}
        {currentEdition === 'novaris' && (
          <>
            {/* Top Floating Navigation */}
            <Navbar
              onExploreClick={handleExploreHomes}
              onContactClick={() => handleOpenInquiry()}
            />

            {/* Main Page Flow for Novaris Estate */}
            <main className="w-full overflow-x-hidden">
              {/* Hero Section */}
              <Hero
                onViewProjects={handleViewProjects}
                onOpenFeatured={handleOpenFeatured}
              />

              {/* Redefining Modern Living Section */}
              <RedefiningLiving />

              {/* Bento Stats & Architectural Landmark Grid */}
              <BentoStats />

              {/* Featured Projects Carousel Showcase */}
              <FeaturedProjects
                onSelectProject={(project) => setSelectedProject(project)}
              />

              {/* Built With Next-Gen Technology Section */}
              <NextGenTechnology />
            </main>

            {/* Footer */}
            <Footer
              onContactClick={() => handleOpenInquiry()}
              onExploreClick={handleExploreHomes}
            />
          </>
        )}

        {currentEdition === 'aurora' && (
          <ResidenceAuroraView
            onBackToNovaris={() => setCurrentEdition('novaris')}
            onInquire={() => handleOpenInquiry('Residence Aurora Frankfurt')}
          />
        )}

        {currentEdition === 'riviera' && (
          <RivieraAgencyView
            onBackToNovaris={() => setCurrentEdition('novaris')}
            onInquire={() => handleOpenInquiry('French Riviera Portfolio')}
          />
        )}

        {/* Persistent Edition Switcher Pill */}
        <EditionSwitcher
          currentEdition={currentEdition}
          onChangeEdition={setCurrentEdition}
        />

        {/* Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onInquire={(projectName) => handleOpenInquiry(projectName)}
        />

        <InquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          initialProject={inquiryProject}
        />
      </div>
    </div>
  );
}
