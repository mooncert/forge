import { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ExploreView } from "./components/ExploreView";
import { TokenDetails } from "./components/TokenDetails";
import { CreateToken } from "./components/CreateToken";
import { Portfolio } from "./components/Portfolio";
import { History } from "./components/History";
import { Market } from "./components/Market";
import { CardComparison } from "./components/CardComparison";
import { Referral } from "./components/Referral";
import { DesignSystem } from "./components/DesignSystem";
import { AgentSkills } from "./components/AgentSkills";
import { mockTokens } from "./data/mockTokens";
import type { TokenData, View, Theme, ThemeContextType } from "./types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>("explore");
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [tokens] = useState<TokenData[]>(mockTokens);
  const [theme, setTheme] = useState<Theme>("system");

  const effectiveTheme = useMemo(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      };
      mediaQuery.addEventListener("change", handler);
      handler();
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const handleNavigate = useCallback((view: View, tokenId?: string) => {
    setCurrentView(view);
    if (tokenId) {
      setSelectedTokenId(tokenId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectedToken = useMemo(
    () => tokens.find((t) => t.id === selectedTokenId),
    [tokens, selectedTokenId]
  );

  const themeContextValue = useMemo(
    () => ({ theme, setTheme, effectiveTheme }),
    [theme, effectiveTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`min-h-screen flex flex-col ${effectiveTheme === "dark" ? "dark bg-gray-950" : "bg-gray-50"}`}>
        <Header
          onNavigate={handleNavigate}
          currentView={currentView}
        />
        <main className="flex-grow">
          {(currentView === "home" || currentView === "explore") && (
            <ExploreView
              tokens={tokens}
              onSelectToken={(token) => handleNavigate("token", token.id)}
              onCreateClick={() => handleNavigate("create")}
              onAgentSkillsClick={() => handleNavigate("agent-skills")}
            />
          )}
          {currentView === "token" && selectedToken && (
            <TokenDetails token={selectedToken} onNavigate={handleNavigate} />
          )}
          {currentView === "create" && <CreateToken onNavigate={handleNavigate} />}
          {currentView === "portfolio" && <Portfolio onNavigate={handleNavigate} />}
          {currentView === "history" && <History onNavigate={handleNavigate} />}
          {currentView === "market" && <Market tokens={tokens} onNavigate={handleNavigate} />}
          {currentView === "referral" && <Referral onNavigate={handleNavigate} />}
          {currentView === "card-comparison" && <CardComparison onNavigate={handleNavigate} />}
          {currentView === "design-system" && <DesignSystem onNavigate={handleNavigate} />}
          {currentView === "agent-skills" && <AgentSkills onNavigate={handleNavigate} />}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </ThemeContext.Provider>
  );
}