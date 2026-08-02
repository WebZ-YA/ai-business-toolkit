import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomeView } from './components/views/HomeView';
import { ToolsView } from './components/views/ToolsView';
import { PricingView } from './components/views/PricingView';
import { BlogView } from './components/views/BlogView';
import { DashboardView } from './components/views/DashboardView';
import { AdminView } from './components/views/AdminView';

import { ToolRunnerModal } from './components/ToolRunnerModal';
import { SearchModal } from './components/SearchModal';
import { SupabaseModal } from './components/SupabaseModal';

import { toolsData } from './data/toolsData';
import { Tool } from './types';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { showSqlModal, setShowSqlModal } = useAuth();

  const handleSelectToolById = (toolId: string) => {
    const found = toolsData.find((t) => t.id === toolId);
    if (found) {
      setSelectedTool(found);
    }
  };

  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic SEO Meta Head */}
      <SeoHead activeTab={activeTab} />

      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomeView
            onSelectTool={handleSelectTool}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsView onSelectTool={handleSelectTool} />
        )}

        {activeTab === 'pricing' && <PricingView />}

        {activeTab === 'blog' && <BlogView />}

        {activeTab === 'dashboard' && (
          <DashboardView
            onSelectTool={handleSelectTool}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Global Footer */}
      <Footer onNavigateTab={(tab) => setActiveTab(tab)} />

      {/* Modals */}
      <ToolRunnerModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={handleSelectToolById}
      />

      <SupabaseModal
        isOpen={showSqlModal}
        onClose={() => setShowSqlModal(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
