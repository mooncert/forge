import { Sun, Moon, Monitor, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../App";
import { CrossForgeLogo } from "./CrossForgeLogo";
import { useState, useRef, useEffect } from "react";

export function Footer() {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={16} />;
      case "dark":
        return <Moon size={16} />;
      case "system":
        return <Monitor size={16} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
    }
  };

  const handleThemeSelect = (selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    setIsMenuOpen(false);
  };

  return (
    <footer className={`border-t py-8 mt-16 ${
      effectiveTheme === 'dark' 
        ? 'bg-gray-950 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="w-full px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Side - Logo & Links */}
          <div className="flex flex-col gap-3">
            {/* Logo */}
            <div className="flex items-center">
              <CrossForgeLogo height={24} />
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm">
              <a 
                href="https://docs.crosstoken.io/docs/cross-forge" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Docs
              </a>
              <span className={effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>|</span>
              <a 
                href="https://terms.crosstoken.io/docs/forge-terms" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Terms of Use
              </a>
              <span className={effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>|</span>
              <a 
                href="https://terms.crosstoken.io/docs/nexus-privacy-policy" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Privacy Policy
              </a>
            </div>
            
            {/* Copyright */}
            <div className={`text-xs md:text-sm ${
              effectiveTheme === 'dark' ? 'text-gray-600' : 'text-gray-500'
            }`}>
              © 2025 NEXUS Co., Ltd. All Rights Reserved.
            </div>
            
            {/* TradingView Attribution */}
            <div className={`text-xs ${
              effectiveTheme === 'dark' ? 'text-gray-600' : 'text-gray-500'
            }`}>
              CrossX uses TradingView's dynamic charts to keep you ahead of the market curve. The most popular platform for market analysis, TradingView helps track key events with the{' '}
              <a 
                href="https://www.tradingview.com/economic-calendar/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`underline transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'text-gray-500 hover:text-gray-400'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Economic Calendar
              </a>
              {' '}and make smarter trading moves.
            </div>
          </div>

          {/* Right Side - Theme Selector */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all font-medium text-sm border ${
                effectiveTheme === 'dark'
                  ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200'
                  : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getThemeIcon()}
              <span>{getThemeLabel()}</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className={`absolute bottom-full right-0 mb-2 w-48 rounded-lg border overflow-hidden ${
                effectiveTheme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                {/* Light Option */}
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  } ${theme === 'light' ? effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Sun size={16} />
                    <span className="font-medium">Light</span>
                  </div>
                  {theme === 'light' && (
                    <Check size={16} className="text-[#56C880]" />
                  )}
                </button>

                {/* Dark Option */}
                <button
                  onClick={() => handleThemeSelect('dark')}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  } ${theme === 'dark' ? effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Moon size={16} />
                    <span className="font-medium">Dark</span>
                  </div>
                  {theme === 'dark' && (
                    <Check size={16} className="text-[#56C880]" />
                  )}
                </button>

                {/* Divider */}
                <div className={`h-px ${
                  effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`} />

                {/* System Option */}
                <button
                  onClick={() => handleThemeSelect('system')}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  } ${theme === 'system' ? effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Monitor size={16} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">System</span>
                      <span className={`text-xs ${
                        effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Use system setting
                      </span>
                    </div>
                  </div>
                  {theme === 'system' && (
                    <Check size={16} className="text-[#56C880]" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}