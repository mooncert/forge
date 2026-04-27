import { Palette, Type, Layout, Zap, Box, Circle, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useTheme } from "../App";
import { useState } from "react";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import gameTokenIcon from "figma:asset/ed5cd97fee00ddf5d6d7491bd26eeeb9d3dd3d1e.png";

export function DesignSystem() {
  const { effectiveTheme } = useTheme();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');

  const copyToClipboard = (text: string, label: string) => {
    // Use fallback method for better compatibility
    const textArea = document.createElement('textarea');
    textArea.value = text;
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
        setCopiedColor(label);
        setTimeout(() => setCopiedColor(null), 2000);
      }
    } catch (err) {
      document.body.removeChild(textArea);
      console.error('Failed to copy:', err);
    }
  };

  // Brand Colors
  const brandColors = [
    { name: "Primary Green", hex: "#56C880", usage: "Main brand color, CTAs, success states" },
    { name: "Primary Hover", hex: "#45B570", usage: "Hover states for primary actions" },
    { name: "Dark Background", hex: "#000000", usage: "Dark mode background" },
    { name: "Light Background", hex: "#F9FAFB", usage: "Light mode background" },
  ];

  // Neutral Colors - Dark Theme
  const darkNeutralColors = [
    { name: "Gray 950", hex: "#030712", usage: "Deepest background" },
    { name: "Gray 900", hex: "#111827", usage: "Cards, modals" },
    { name: "Gray 800", hex: "#1F2937", usage: "Hover states" },
    { name: "Gray 700", hex: "#374151", usage: "Borders, dividers" },
    { name: "Gray 600", hex: "#4B5563", usage: "Disabled text" },
    { name: "Gray 500", hex: "#6B7280", usage: "Placeholder text" },
    { name: "Gray 400", hex: "#9CA3AF", usage: "Secondary text" },
    { name: "Gray 300", hex: "#D1D5DB", usage: "Primary text" },
    { name: "Gray 200", hex: "#E5E7EB", usage: "Headings" },
    { name: "Gray 100", hex: "#F3F4F6", usage: "Emphasis text" },
  ];

  // Neutral Colors - Light Theme
  const lightNeutralColors = [
    { name: "Gray 900", hex: "#111827", usage: "Headings" },
    { name: "Gray 800", hex: "#1F2937", usage: "Primary text" },
    { name: "Gray 700", hex: "#374151", usage: "Secondary text" },
    { name: "Gray 600", hex: "#4B5563", usage: "Tertiary text" },
    { name: "Gray 500", hex: "#6B7280", usage: "Placeholder text" },
    { name: "Gray 400", hex: "#9CA3AF", usage: "Disabled text" },
    { name: "Gray 300", hex: "#D1D5DB", usage: "Borders, dividers" },
    { name: "Gray 200", hex: "#E5E7EB", usage: "Hover states" },
    { name: "Gray 100", hex: "#F3F4F6", usage: "Backgrounds" },
    { name: "Gray 50", hex: "#F9FAFB", usage: "Page background" },
  ];

  // Semantic Colors
  const semanticColors = [
    { name: "Success", hex: "#10B981", usage: "Positive actions, price increases" },
    { name: "Warning", hex: "#F59E0B", usage: "Caution, important notices" },
    { name: "Error", hex: "#EF4444", usage: "Errors, price decreases" },
    { name: "Info", hex: "#3B82F6", usage: "Informational messages" },
  ];

  return (
    <div className={`min-h-screen ${effectiveTheme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Palette className="text-[#56C880]" size={28} />
              <h1 className={`text-2xl sm:text-3xl font-bold ${
                effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Design System
              </h1>
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => setPreviewTheme('dark')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all ${
                  previewTheme === 'dark'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Moon size={18} />
                <span className="font-semibold text-sm sm:text-base">Dark</span>
              </button>
              <button
                onClick={() => setPreviewTheme('light')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all ${
                  previewTheme === 'light'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sun size={18} />
                <span className="font-semibold text-sm sm:text-base">Light</span>
              </button>
            </div>
          </div>
          <p className={`text-sm sm:text-base lg:text-lg ${
            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Forge 디자인 시스템 - 게임 토큰 런치패드의 일관된 UI/UX를 위한 가이드
          </p>
        </div>

        {/* Colors Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="text-[#56C880]" size={24} />
            <h2 className={`text-2xl font-bold ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Colors
            </h2>
          </div>

          {/* Brand Colors */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${
              effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Brand Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <Card
                  key={color.name}
                  className={`overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                    effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
                  }`}
                  onClick={() => copyToClipboard(color.hex, color.name)}
                >
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <p className={`font-semibold mb-1 ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {color.name}
                    </p>
                    <p className={`text-sm font-mono mb-2 ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {color.hex}
                    </p>
                    <p className={`text-xs ${
                      effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {color.usage}
                    </p>
                    {copiedColor === color.name && (
                      <p className="text-xs text-[#56C880] mt-2">✓ Copied!</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${
              effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Neutral Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(previewTheme === 'dark' ? darkNeutralColors : lightNeutralColors).map((color) => (
                <Card
                  key={color.name}
                  className={`overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                    effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
                  }`}
                  onClick={() => copyToClipboard(color.hex, color.name)}
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-3">
                    <p className={`font-semibold text-sm mb-1 ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {color.name}
                    </p>
                    <p className={`text-xs font-mono ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {color.hex}
                    </p>
                    <p className={`text-xs ${
                      effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {color.usage}
                    </p>
                    {copiedColor === color.name && (
                      <p className="text-xs text-[#56C880] mt-1">✓ Copied!</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${
              effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Semantic Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {semanticColors.map((color) => (
                <Card
                  key={color.name}
                  className={`overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                    effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
                  }`}
                  onClick={() => copyToClipboard(color.hex, color.name)}
                >
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <p className={`font-semibold mb-1 ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {color.name}
                    </p>
                    <p className={`text-sm font-mono mb-2 ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {color.hex}
                    </p>
                    <p className={`text-xs ${
                      effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {color.usage}
                    </p>
                    {copiedColor === color.name && (
                      <p className="text-xs text-[#56C880] mt-2">✓ Copied!</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Type className="text-[#56C880]" size={24} />
            <h2 className={`text-2xl font-bold ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Typography
            </h2>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Heading 1 - 36px / 2.25rem
                </p>
                <h1 className={`text-4xl font-bold ${
                  effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  The quick brown fox jumps
                </h1>
              </div>

              <div>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Heading 2 - 30px / 1.875rem
                </p>
                <h2 className={`text-3xl font-bold ${
                  effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  The quick brown fox jumps
                </h2>
              </div>

              <div>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Heading 3 - 24px / 1.5rem
                </p>
                <h3 className={`text-2xl font-bold ${
                  effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  The quick brown fox jumps
                </h3>
              </div>

              <div>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Body - 16px / 1rem
                </p>
                <p className={`text-base ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  The quick brown fox jumps over the lazy dog. This is a standard body text example.
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Small - 14px / 0.875rem
                </p>
                <p className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  The quick brown fox jumps over the lazy dog. This is a small text example.
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Extra Small - 12px / 0.75rem
                </p>
                <p className={`text-xs ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  The quick brown fox jumps over the lazy dog. This is an extra small text example.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-[#56C880]" size={24} />
            <h2 className={`text-2xl font-bold ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Buttons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Primary Buttons
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-[#56C880] hover:bg-[#45B570] text-white">
                  Primary Button
                </Button>
                <Button className="w-full bg-[#56C880] hover:bg-[#45B570] text-white" disabled>
                  Disabled Button
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Secondary Buttons
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className={`w-full ${
                    effectiveTheme === 'dark'
                      ? 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Secondary Button
                </Button>
                <Button 
                  variant="outline"
                  className={`w-full ${
                    effectiveTheme === 'dark'
                      ? 'bg-gray-900 border-gray-700 text-gray-300'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                  disabled
                >
                  Disabled Button
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Buy Button
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-[#56C880] hover:bg-[#45B570] text-white font-bold">
                  Buy
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Sell Button
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">
                  Sell
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Icons & Assets Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Box className="text-[#56C880]" size={24} />
            <h2 className={`text-2xl font-bold ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Icons & Assets
            </h2>
          </div>

          <Card className="p-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Token Icons
            </h3>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <img src={crossCoin} alt="CROSS" className="w-16 h-16 mx-auto mb-2" />
                <p className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  CROSS Coin
                </p>
              </div>
              <div className="text-center">
                <img src={gameTokenIcon} alt="Game Token" className="w-16 h-16 rounded-full mx-auto mb-2" />
                <p className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Game Token
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Spacing Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Layout className="text-[#56C880]" size={24} />
            <h2 className={`text-2xl font-bold ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Spacing
            </h2>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">4px (1)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '4px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">8px (2)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '8px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">12px (3)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '12px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">16px (4)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '16px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">24px (6)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '24px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">32px (8)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '32px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">48px (12)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '48px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-500">64px (16)</div>
                <div className="h-8 bg-[#56C880] rounded" style={{ width: '64px' }} />
              </div>
            </div>
          </Card>
        </section>

        {/* Design Principles */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Circle className="text-[#56C880]" size={24} />
            <h2 className={`text-2xl font-bold ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Design Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Gaming Identity
              </h3>
              <p className={`text-sm ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                게임 플랫폼 스타일의 디자인 정체성 강조
              </p>
            </Card>

            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Consistent Metrics
              </h3>
              <p className={`text-sm ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                CROSS 메트릭 표시 방식 통일
              </p>
            </Card>

            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Brand Color
              </h3>
              <p className={`text-sm ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                56C880 그린을 메인 브랜드 컬러로 사용
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}