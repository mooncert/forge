import { useTheme } from "../App";
import svgPaths from "../../imports/svg-k3icwnyk34";
import imgCross from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import imgRoundedRectangle from "figma:asset/d6cd2ee0417af18455720dd9e3bfd55889c23b3a.png";
import imgUsdt from "figma:asset/d5bfdbb3822d009d1a88f63c61be254bb18401c8.png";
import imgVerse8 from "figma:asset/982a23103c80741acd7667d1a04b011f35c87c8b.png";
import imgReward from "figma:asset/173ec134c875bbe425802e7883ac16208718ddcf.png";
import imgWave from "figma:asset/599ea2d5a162ac0f644866ac22874ad61e62358d.png";
import imgNft from "figma:asset/8b449a4a9a3e1198e4d64fb6ef959c9504ae9a85.png";
import imgBridge from "figma:asset/07f4ded5c607a699ee5c3b965fe3b0385d108ad3.png";
import imgExplorer from "figma:asset/663cc707821b72cb890ba02fb443e1f573fb7584.png";
import { createPortal } from "react-dom";

interface MenuItem {
  id: string;
  label: string;
  url: string;
  iconType: "image" | "svg";
  iconSrc?: string;
  newUntil: string | null;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "gametoken-cross",
    label: "Gametoken (CROSS)",
    url: "https://x.crosstoken.io/en/gametoken/",
    iconType: "image",
    iconSrc: imgRoundedRectangle,
    newUntil: null
  },
  {
    id: "gametoken-usdt",
    label: "Gametoken (USDT)",
    url: "https://x.crosstoken.io/en/gametoken/USDT/",
    iconType: "image",
    iconSrc: imgUsdt,
    newUntil: null
  },
  {
    id: "gametoken-verse8",
    label: "Gametoken - Verse8 (USDT)",
    url: "https://x.crosstoken.io/en/gametoken/VERSE8",
    iconType: "image",
    iconSrc: imgUsdt,
    newUntil: "2026-01-31T23:59:59Z",
    badge: imgVerse8
  },
  {
    id: "forge",
    label: "Forge",
    url: "https://x.crosstoken.io/forge",
    iconType: "svg",
    newUntil: "2026-12-31T23:59:59Z"
  },
  {
    id: "rewards",
    label: "Game Reward",
    url: "https://x.crosstoken.io/rewards",
    iconType: "image",
    iconSrc: imgReward,
    newUntil: null
  },
  {
    id: "wave",
    label: "CROSS Wave",
    url: "https://wave.crosstoken.io/en",
    iconType: "image",
    iconSrc: imgWave,
    newUntil: null
  },
  {
    id: "nft",
    label: "NFT Market",
    url: "https://www.crossnft.io/",
    iconType: "image",
    iconSrc: imgNft,
    newUntil: null
  },
  {
    id: "bridge",
    label: "Bridge",
    url: "https://x.crosstoken.io/en/bridge",
    iconType: "image",
    iconSrc: imgBridge,
    newUntil: null
  },
  {
    id: "explorer",
    label: "CROSS Explorer",
    url: "https://explorer.crosstoken.io/612055",
    iconType: "image",
    iconSrc: imgExplorer,
    newUntil: null
  }
];

interface BentoMenuProps {
  onClose: () => void;
}

export function BentoMenu({ onClose }: BentoMenuProps) {
  const { effectiveTheme } = useTheme();

  const isNew = (newUntil: string | null) => {
    if (!newUntil) return false;
    return new Date(newUntil) > new Date();
  };

  const handleItemClick = (item: MenuItem) => {
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const menuContent = (
    <>
      {/* Backdrop - semi-transparent overlay for closing */}
      <div 
        className="fixed inset-0 z-[60] bg-black/20"
        onClick={onClose}
      />

      {/* Menu */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-20 right-4 z-[70] w-[320px] rounded-[20px] shadow-2xl border-[6px] overflow-hidden ${
          effectiveTheme === 'dark'
            ? 'bg-gray-900 border-gray-700/15'
            : 'bg-white border-[rgba(18,18,18,0.15)]'
        }`}
      >
        <div className="p-4 space-y-0 max-h-[70vh] overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full rounded-xl px-2 py-2 flex items-center gap-3 transition-all ${
                effectiveTheme === 'dark'
                  ? 'hover:bg-gray-800'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Icon */}
              <div className="relative shrink-0">
                {item.iconType === "svg" ? (
                  // Forge SVG Logo
                  <div className="w-9 h-9 flex items-center justify-center">
                    <svg className="block w-[30.857px] h-9" fill="none" preserveAspectRatio="none" viewBox="0 0 30.8571 36">
                      <g>
                        <path d={svgPaths.p2fb11080} fill="#3AAA63" />
                        <path d={svgPaths.pea66000} fill="#56C880" />
                        <path d={svgPaths.p96c4db0} fill="#56C880" />
                        <path d={svgPaths.p38925340} fill="#56C880" />
                        <path d={svgPaths.p2ef6f000} fill="#56C880" />
                        <path d={svgPaths.p27a76640} fill="#56C880" />
                        <path d={svgPaths.p3978a9d2} fill="#3AAA63" />
                        <path d={svgPaths.p217bc300} fill="#56C880" />
                        <path d={svgPaths.p14ea7bc0} fill="#56C880" />
                        <path d={svgPaths.p1f7ecc80} fill="#3AAA63" />
                        <path d={svgPaths.p21d37f00} fill="#3AAA63" />
                        <path d={svgPaths.p2f04e1c0} fill="#56C880" />
                        <path d={svgPaths.p13dd3a00} fill="#56C880" />
                        <path d={svgPaths.pbe7d00} fill="#3AAA63" />
                        <path d={svgPaths.p209b8f00} fill="#3AAA63" />
                        <path d={svgPaths.p365b6700} fill="#56C880" />
                        <path d={svgPaths.pb3e7a00} fill="#56C880" />
                        <path d={svgPaths.p2d86ca00} fill="#56C880" />
                        <path d={svgPaths.pbace7e0} fill="#56C880" />
                        <path d={svgPaths.p2fa46f80} fill="#56C880" />
                        <path d={svgPaths.p15df3500} fill="#3AAA63" />
                        <path d={svgPaths.p22a1d900} fill="#56C880" />
                        <path d={svgPaths.p1f58eb00} fill="#56C880" />
                        <path d={svgPaths.p11451c80} fill="#56C880" />
                        <path d={svgPaths.pb8b5000} fill="#56C880" />
                        <path d={svgPaths.p3e6c5480} fill="#3AAA63" />
                        <path d={svgPaths.p1f8a600} fill="#56C880" />
                        <path d={svgPaths.p33d98600} fill="#3AAA63" />
                        <path d={svgPaths.p1669ba00} fill="#56C880" />
                        <path d={svgPaths.p33685000} fill="#3AAA63" />
                        <path d={svgPaths.p15b532f0} fill="#56C880" />
                        <path d={svgPaths.p33035180} fill="#56C880" />
                        <path d={svgPaths.pf046d80} fill="#3AAA63" />
                        <path d={svgPaths.p39f29bf0} fill="#56C880" />
                        <path d={svgPaths.p17f85000} fill="#56C880" />
                        <path d={svgPaths.p1517e3c0} fill="#56C880" />
                        <path d={svgPaths.pfba1c00} fill="#56C880" />
                        <path d={svgPaths.p20083400} fill="#3AAA63" />
                        <path d={svgPaths.p163c6e80} fill="#56C880" />
                        <path d={svgPaths.p37f5a280} fill="#56C880" />
                        <path d={svgPaths.p525ee00} fill="#56C880" />
                        <path d={svgPaths.p12ae8280} fill="#56C880" />
                        <path d={svgPaths.p1c097800} fill="#56C880" />
                        <rect fill="#15161A" height="2.13729" width="2.13729" x="18.4341" y="4.141" />
                        <rect fill="#15161A" height="2.13729" width="2.13729" x="23.5102" y="4.141" />
                      </g>
                    </svg>
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl overflow-hidden relative flex items-center justify-center">
                    <img 
                      src={item.iconSrc} 
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Badge for Verse8 */}
                {item.badge && (
                  <div className="absolute top-0 right-0 w-4 h-4 rounded-bl-lg overflow-hidden">
                    <img 
                      src={item.badge}
                      alt="Verse8"
                      className="absolute inset-0 w-full h-full object-cover rounded-bl-lg"
                    />
                    <div className="absolute inset-[-2px] border-2 border-white rounded-bl-[10px]" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="flex-1 text-left flex items-center gap-2">
                <span className={`text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap ${
                  effectiveTheme === 'dark' ? 'text-gray-200' : 'text-[#121212]'
                }`}>
                  {item.label}
                </span>
                
                {/* NEW Badge */}
                {isNew(item.newUntil) && item.id !== "gametoken-verse8" && (
                  <div className="shrink-0 w-4 h-4 rounded-full bg-[#E70077] flex items-center justify-center">
                    <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <rect fill="#E70077" height="16" rx="8" width="16" />
                      <path d={svgPaths.p354aa5b0} fill="white" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return createPortal(menuContent, document.body);
}