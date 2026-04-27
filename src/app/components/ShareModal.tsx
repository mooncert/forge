import { X, Copy, Check, Link as LinkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useTheme } from '../App';
import type { TokenData } from './TokenCard';
import { toast } from 'sonner';

interface ShareModalProps {
  onClose: () => void;
  token: TokenData;
}

export function ShareModal({ onClose, token }: ShareModalProps) {
  const { effectiveTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://x.crosstoken.io/forge/${token.symbol}`;
  const shareText = `Check out ${token.name} (${token.symbol}) on CROSS Forge! 🎮`;

  // Update meta tags for social sharing
  useEffect(() => {
    // Store original meta tags
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const originalOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const originalTwitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');
    const originalTwitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Open Graph tags
    updateMetaTag('og:title', `${token.name} (${token.symbol})`);
    updateMetaTag('og:description', shareText);
    updateMetaTag('og:image', token.image);
    updateMetaTag('og:url', shareUrl);
    updateMetaTag('og:type', 'website');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', `${token.name} (${token.symbol})`, true);
    updateMetaTag('twitter:description', shareText, true);
    updateMetaTag('twitter:image', token.image, true);

    // Cleanup function to restore original meta tags
    return () => {
      if (originalOgTitle) updateMetaTag('og:title', originalOgTitle);
      if (originalOgDescription) updateMetaTag('og:description', originalOgDescription);
      if (originalOgImage) updateMetaTag('og:image', originalOgImage);
      if (originalOgUrl) updateMetaTag('og:url', originalOgUrl);
      if (originalTwitterCard) updateMetaTag('twitter:card', originalTwitterCard, true);
      if (originalTwitterTitle) updateMetaTag('twitter:title', originalTwitterTitle, true);
      if (originalTwitterDescription) updateMetaTag('twitter:description', originalTwitterDescription, true);
      if (originalTwitterImage) updateMetaTag('twitter:image', originalTwitterImage, true);
    };
  }, [token, shareText, shareUrl]);

  const handleCopyLink = async () => {
    try {
      // Use fallback method for better compatibility
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link!');
    }
  };

  const socialPlatforms = [
    {
      name: 'X (Twitter)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: '#000000'
    },
    {
      name: 'Telegram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: '#0088cc'
    },
    {
      name: 'Discord',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      url: shareUrl,
      color: '#5865F2'
    },
    {
      name: 'Farcaster',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M18.24 4.32c.66 0 1.2.54 1.2 1.2v13.2c0 .33-.27.6-.6.6h-1.8c-.33 0-.6-.27-.6-.6v-6h-9v6c0 .33-.27.6-.6.6H4.8c-.33 0-.6-.27-.6-.6V5.52c0-.66.54-1.2 1.2-1.2h12.84zM15 7.8H9v3h6v-3z"/>
        </svg>
      ),
      url: `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`,
      color: '#8A63D2'
    },
    {
      name: 'Warpcast',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.47 7.53v8.94c0 .89-.39 1.67-1 2.22-.61.56-1.39.84-2.22.84h-10.5c-.83 0-1.61-.28-2.22-.84-.61-.55-1-1.33-1-2.22V7.53c0-.89.39-1.67 1-2.22.61-.56 1.39-.84 2.22-.84h10.5c.83 0 1.61.28 2.22.84.61.55 1 1.33 1 2.22zm-3.22 1.72h-2.5v-1.5h2.5v1.5zm-6.5 0h-2.5v-1.5h2.5v1.5z"/>
        </svg>
      ),
      url: `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`,
      color: '#8A63D2'
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card 
        className={`w-full max-w-lg rounded-xl sm:rounded-2xl shadow-2xl ${
          effectiveTheme === 'dark' 
            ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-800' 
            : 'bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
          effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <h3 className={`text-lg sm:text-xl font-bold ${
            effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Share
          </h3>
          <button
            onClick={onClose}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              effectiveTheme === 'dark'
                ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 space-y-4 sm:space-y-6">
          {/* Post on X */}
          <div>
            <button
              onClick={() => window.open(socialPlatforms[0].url, '_blank')}
              className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                effectiveTheme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Post on
              {socialPlatforms[0].icon}
            </button>
          </div>

          {/* Page Link Section */}
          <div>
            <label className={`text-xs sm:text-sm font-medium mb-2 block ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Page Link
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                effectiveTheme === 'dark'
                  ? 'bg-[#1A1A1A] border border-gray-800'
                  : 'bg-gray-50 border border-gray-300'
              }`}>
                <LinkIcon size={16} className={`flex-shrink-0 sm:w-[18px] sm:h-[18px] ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <span className={`text-xs sm:text-sm font-mono truncate ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {shareUrl}
                </span>
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 sm:px-6 py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all whitespace-nowrap ${
                  effectiveTheme === 'dark'
                    ? 'bg-[#5EEAD4] hover:bg-[#4DD4BE] text-black'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {copied ? (
                  <div className="flex items-center justify-center">
                    <Check size={14} className="mr-1 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Copied</span>
                    <span className="sm:hidden">Copied</span>
                  </div>
                ) : (
                  <>
                    <span className="hidden sm:inline">Copy Link</span>
                    <span className="sm:hidden">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Icons Grid - Hidden for now, can be enabled later
          <div>
            <p className={`text-sm font-medium mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Share with your community
            </p>
            <div className="grid grid-cols-4 gap-3">
              {socialPlatforms.slice(1).map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => window.open(platform.url, '_blank')}
                  className={`aspect-square flex items-center justify-center rounded-lg transition-all ${
                    effectiveTheme === 'dark'
                      ? 'bg-[#2D2D2D] border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white'
                      : 'bg-[#F3F4F6] hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                  title={platform.name}
                >
                  {platform.icon}
                </button>
              ))}
            </div>
          </div>
          */}
        </div>
      </Card>
    </div>
  );
}