import { Gamepad2, Wallet, Plus, Search, History as HistoryIcon, Copy, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "../App";
import { CrossForgeLogo } from "./CrossForgeLogo";
import { useState, useRef, useEffect } from "react";
import { BentoMenu } from "./BentoMenu";
import { motion } from "motion/react";

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export function Header({ onNavigate, currentView }: HeaderProps) {
  const { effectiveTheme } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBentoMenu, setShowBentoMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const walletAddress = "0x7a2f...";
  
  const handleLogoClick = () => {
    if (currentView === 'explore') {
      // 이미 explore 페이지에 있으면 새로고침
      window.location.reload();
    } else {
      // 다른 페이지에 있으면 explore로 이동
      onNavigate('explore');
    }
  };
  
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Auto-hide snackbar after 2 seconds
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);
  
  const handleCopyAddress = () => {
    const fullAddress = "0x7a2fB4c9";
    
    // Use fallback method for better compatibility
    const textArea = document.createElement('textarea');
    textArea.value = fullAddress;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setShowDropdown(false);
        setShowSnackbar(true);
      }
    } catch (err) {
      document.body.removeChild(textArea);
      console.error('Failed to copy:', err);
    }
  };
  
  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setShowDropdown(false);
      setShowSnackbar(true);
    } catch (err) {
      console.error('Failed to copy address:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
    setShowDropdown(false);
  };
  
  return (
    <header className={`border-b sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
      effectiveTheme === 'dark' 
        ? 'border-gray-800 bg-gray-900/80' 
        : 'border-gray-200 bg-white/80'
    }`}>
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side: Hamburger + Logo (Mobile) / Logo + Nav (Desktop) */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} size={24} />
              ) : (
                <Menu className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} size={24} />
              )}
            </button>

            {/* Logo and Navigation Container */}
            <div 
              className="flex items-center gap-8 cursor-pointer"
              onClick={handleLogoClick}
            >
              <motion.div
                className="flex items-center cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CrossForgeLogo height={28} />
              </motion.div>
              
              <nav className="hidden md:flex items-center gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('explore');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    currentView === 'explore' 
                      ? 'text-[#56C880]' 
                      : effectiveTheme === 'dark'
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Tokens
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('portfolio');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    currentView === 'portfolio' 
                      ? 'text-[#56C880]' 
                      : effectiveTheme === 'dark'
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Portfolio
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('referral');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    currentView === 'referral' 
                      ? 'text-[#56C880]' 
                      : effectiveTheme === 'dark'
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Share & Earn
                </button>
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('market');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    currentView === 'market'
                      ? 'text-[#56C880]'
                      : effectiveTheme === 'dark'
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Market
                </button> */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('history');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    currentView === 'history' 
                      ? 'text-[#56C880]' 
                      : effectiveTheme === 'dark'
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  History
                </button>
                {/* <a
                  href="https://docs.crosstoken.io/update/docs/cross-forge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    effectiveTheme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Docs
                </a> */}
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => onNavigate('design-system')}
              className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer hidden lg:block ${
                currentView === 'design-system'
                  ? 'text-[#56C880]'
                  : effectiveTheme === 'dark'
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Design
            </button> */}
            
            <div className="relative hidden lg:block">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} size={18} />
              <Input
                placeholder="Search tokens..."
                className={`pl-10 w-64 ${
                  effectiveTheme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-gray-200 placeholder:text-gray-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>
            
            <Button 
              onClick={() => onNavigate('create')}
              className="bg-[#56C880] hover:bg-[#45B570] text-white font-semibold hidden md:flex"
            >
              <Plus size={18} className="max-[540px]:mr-0 mr-1" />
              <span className="max-[540px]:hidden">Forge Token</span>
            </Button>
            
            {/* Bento Menu Button - Desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBentoMenu(!showBentoMenu);
              }}
              className={`p-2 rounded-xl transition-all hover:scale-105 hidden md:block ${
                effectiveTheme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex flex-col gap-[3px]">
                <div className="flex gap-[3px]">
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                </div>
                <div className="flex gap-[3px]">
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                </div>
                <div className="flex gap-[3px]">
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                </div>
              </div>
            </button>

            {/* Connect Wallet - Always Visible on Desktop */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              {!isConnected ? (
                <Button 
                  variant="outline"
                  className={effectiveTheme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-white font-semibold'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold'
                  }
                  onClick={() => setIsConnected(true)}
                >
                  <Wallet size={16} className="max-[540px]:mr-0 mr-1" />
                  <span className="max-[540px]:hidden">Connect Wallet</span>
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className={effectiveTheme === 'dark'
                      ? 'bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-white font-semibold'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold'
                    }
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <Wallet size={16} className="max-[540px]:mr-0 mr-1" />
                    <span className="max-[540px]:hidden">{walletAddress}</span>
                    <ChevronDown size={16} className="max-[540px]:hidden ml-1" />
                  </Button>
                  
                  {showDropdown && (
                    <div 
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border overflow-hidden ${
                        effectiveTheme === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="py-1">
                        <button 
                          className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                            effectiveTheme === 'dark' 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={handleCopyAddress}
                        >
                          <Copy size={16} />
                          <span>Copy Address</span>
                        </button>
                        <button 
                          className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                            effectiveTheme === 'dark' 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={handleDisconnect}
                        >
                          <LogOut size={16} />
                          <span>Disconnect</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Bento Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBentoMenu(!showBentoMenu);
              }}
              className={`p-2 rounded-xl transition-all hover:scale-105 md:hidden ${
                effectiveTheme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex flex-col gap-[3px]">
                <div className="flex gap-[3px]">
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                </div>
                <div className="flex gap-[3px]">
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                </div>
                <div className="flex gap-[3px]">
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                  <div className={`rounded-full size-[4px] ${
                    effectiveTheme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                  }`} />
                </div>
              </div>
            </button>

            {/* Connect Wallet - Mobile (Always Visible) */}
            {!isConnected ? (
              <Button 
                variant="outline"
                className={`md:hidden ${effectiveTheme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-white font-semibold'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold'
                }`}
                onClick={() => setIsConnected(true)}
              >
                <Wallet size={16} />
              </Button>
            ) : (
              <Button 
                variant="outline"
                className={`md:hidden flex items-center gap-1.5 ${effectiveTheme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-white font-semibold'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold'
                }`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <CrossForgeLogo height={16} />
                <span className="text-xs font-mono">{walletAddress}</span>
              </Button>
            )}

            {/* Mobile Dropdown for Connected Wallet */}
            {isConnected && showDropdown && (
              <div 
                className={`md:hidden fixed right-4 mt-2 w-48 rounded-lg shadow-lg border overflow-hidden z-50 ${
                  effectiveTheme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}
                style={{ top: '60px' }}
              >
                <div className="py-1">
                  <div className={`px-4 py-2.5 text-sm border-b ${
                    effectiveTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CrossForgeLogo height={16} />
                      <span className={`font-mono text-xs ${
                        effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{walletAddress}</span>
                    </div>
                  </div>
                  <button 
                    className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                      effectiveTheme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      handleCopyAddress();
                      setShowDropdown(false);
                    }}
                  >
                    <Copy size={16} />
                    <span>Copy Address</span>
                  </button>
                  <button 
                    className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                      effectiveTheme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      handleDisconnect();
                      setShowDropdown(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSnackbar && (
        <div 
          className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-50 animate-slide-down ${
            effectiveTheme === 'dark' 
              ? 'bg-[#56C880] text-white' 
              : 'bg-[#56C880] text-white'
          }`}
        >
          <Copy size={18} className="text-white" />
          <span className="font-semibold text-[15px]">Address copied to clipboard!</span>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={`md:hidden border-t ${
          effectiveTheme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <nav className="px-4 py-4 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('explore');
                setShowMobileMenu(false);
              }}
              className={`px-4 py-3 rounded-lg font-semibold text-left transition-all ${
                currentView === 'explore'
                  ? 'bg-[#56C880] text-white'
                  : effectiveTheme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              Tokens
            </button>
            <button
              onClick={() => {
                onNavigate('portfolio');
                setShowMobileMenu(false);
              }}
              className={`px-4 py-3 rounded-lg font-semibold text-left transition-all ${
                currentView === 'portfolio'
                  ? 'bg-[#56C880] text-white'
                  : effectiveTheme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              Portfolio
            </button>
            <button
              onClick={() => {
                onNavigate('referral');
                setShowMobileMenu(false);
              }}
              className={`px-4 py-3 rounded-lg font-semibold text-left transition-all ${
                currentView === 'referral'
                  ? 'bg-[#56C880] text-white'
                  : effectiveTheme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              Share & Earn
            </button>
            {/* <button
              onClick={() => {
                onNavigate('market');
                setShowMobileMenu(false);
              }}
              className={`px-4 py-3 rounded-lg font-semibold text-left transition-all ${
                currentView === 'market'
                  ? 'bg-[#56C880] text-white'
                  : effectiveTheme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              Market
            </button> */}
            <button
              onClick={() => {
                onNavigate('history');
                setShowMobileMenu(false);
              }}
              className={`px-4 py-3 rounded-lg font-semibold text-left transition-all ${
                currentView === 'history'
                  ? 'bg-[#56C880] text-white'
                  : effectiveTheme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              History
            </button>
            {/* <a
              href="https://docs.crosstoken.io/update/docs/cross-forge"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-3 rounded-lg font-semibold text-left transition-all block ${
                effectiveTheme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Docs
            </a> */}
            
            {/* Forge Token Button */}
            <div className={`pt-2 border-t ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <Button
                onClick={() => {
                  onNavigate('create');
                  setShowMobileMenu(false);
                }}
                className="w-full bg-[#56C880] hover:bg-[#45B570] text-white font-semibold justify-start"
              >
                <Plus size={16} className="mr-2" />
                Forge Token
              </Button>
            </div>

            {/* Connect Wallet in Mobile Menu */}
            <div className={`pt-2 border-t ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              {!isConnected ? (
                <Button
                  variant="outline"
                  className={`w-full justify-start ${
                    effectiveTheme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700 font-semibold'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold'
                  }`}
                  onClick={() => {
                    setIsConnected(true);
                    setShowMobileMenu(false);
                  }}
                >
                  <Wallet size={16} className="mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className={`px-4 py-3 rounded-lg font-semibold ${
                    effectiveTheme === 'dark'
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CrossForgeLogo height={20} />
                      <span>{walletAddress}</span>
                    </div>
                  </div>
                  <button
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-left flex items-center gap-2 transition-all ${
                      effectiveTheme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      handleCopyAddress();
                      setShowMobileMenu(false);
                    }}
                  >
                    <Copy size={16} />
                    <span>Copy Address</span>
                  </button>
                  <button
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-left flex items-center gap-2 transition-all ${
                      effectiveTheme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      handleDisconnect();
                      setShowMobileMenu(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Disconnect</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Bento Menu */}
      {showBentoMenu && (
        <BentoMenu onClose={() => setShowBentoMenu(false)} />
      )}
    </header>
  );
}