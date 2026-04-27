import { X, Download, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "../App";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import forgeLogo from "figma:asset/21f3c6abd25d5385d3fa88edecb250b65cc3ef8f.png";

interface PNLShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  holdingsCount: number;
  topHoldings: Array<{
    tokenName: string;
    tokenSymbol: string;
    profitLoss: number;
    profitLossPercent: number;
  }>;
}

export function PNLShareModal({
  isOpen,
  onClose,
  totalValue,
  totalProfitLoss,
  totalProfitLossPercent,
  holdingsCount,
  topHoldings,
}: PNLShareModalProps) {
  const { effectiveTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generatePNLImage();
    }
  }, [isOpen, totalValue, totalProfitLoss]);

  const generatePNLImage = async () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size (Twitter optimal: 1200x675 for 16:9)
    const width = 1200;
    const height = 675;
    canvas.width = width;
    canvas.height = height;

    // Dark gaming background with cyberpunk aesthetic
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(0.5, "#0A0E1A");
    bgGradient.addColorStop(1, "#000000");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Space background elements
    // Draw stars (small dots)
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      ctx.globalAlpha = Math.random() * 0.5 + 0.5;
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;

    // Draw larger stars (twinkling effect)
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 2;
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw planets
    // Planet 1 - Blue planet (bottom left)
    const planet1Gradient = ctx.createRadialGradient(150, height - 100, 20, 150, height - 100, 80);
    planet1Gradient.addColorStop(0, "#4F46E5");
    planet1Gradient.addColorStop(0.6, "#3730A3");
    planet1Gradient.addColorStop(1, "#1E1B4B");
    ctx.fillStyle = planet1Gradient;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(150, height - 100, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Planet 2 - Red/Pink planet (top right)
    const planet2Gradient = ctx.createRadialGradient(width - 200, 150, 30, width - 200, 150, 100);
    planet2Gradient.addColorStop(0, "#F472B6");
    planet2Gradient.addColorStop(0.5, "#EC4899");
    planet2Gradient.addColorStop(1, "#BE185D");
    ctx.fillStyle = planet2Gradient;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(width - 200, 150, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Planet 3 - Saturn-like planet with ring (right side)
    const planet3Gradient = ctx.createRadialGradient(width - 150, height - 200, 40, width - 150, height - 200, 120);
    planet3Gradient.addColorStop(0, "#3B82F6");
    planet3Gradient.addColorStop(0.6, "#2563EB");
    planet3Gradient.addColorStop(1, "#1E40AF");
    ctx.fillStyle = planet3Gradient;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.arc(width - 150, height - 200, 120, 0, Math.PI * 2);
    ctx.fill();
    
    // Saturn ring
    ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
    ctx.lineWidth = 15;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.ellipse(width - 150, height - 200, 180, 40, Math.PI / 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Grid pattern overlay (subtle)
    ctx.strokeStyle = "rgba(86, 200, 128, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Neon glow effects
    const topGlow = ctx.createRadialGradient(width / 2, 100, 0, width / 2, 100, 400);
    topGlow.addColorStop(0, "rgba(86, 200, 128, 0.2)");
    topGlow.addColorStop(1, "rgba(86, 200, 128, 0)");
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, width, height);

    // Outer thick border with neon glow
    ctx.shadowColor = "#56C880";
    ctx.shadowBlur = 30;
    ctx.strokeStyle = "#56C880";
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Corner accents (Steam/Epic style)
    const cornerSize = 40;
    const cornerThick = 6;
    ctx.lineWidth = cornerThick;
    
    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(20, 60);
    ctx.lineTo(20, 20);
    ctx.lineTo(60, 20);
    ctx.stroke();
    
    // Top-right corner
    ctx.beginPath();
    ctx.moveTo(width - 60, 20);
    ctx.lineTo(width - 20, 20);
    ctx.lineTo(width - 20, 60);
    ctx.stroke();
    
    // Bottom-left corner
    ctx.beginPath();
    ctx.moveTo(60, height - 20);
    ctx.lineTo(20, height - 20);
    ctx.lineTo(20, height - 60);
    ctx.stroke();
    
    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(width - 20, height - 60);
    ctx.lineTo(width - 20, height - 20);
    ctx.lineTo(width - 60, height - 20);
    ctx.stroke();
    
    ctx.shadowBlur = 0;

    // Inner border
    ctx.strokeStyle = "rgba(86, 200, 128, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Load CROSS coin image
    const crossImage = new Image();
    crossImage.crossOrigin = "anonymous";
    
    await new Promise((resolve) => {
      crossImage.onload = resolve;
      crossImage.onerror = resolve;
      crossImage.src = crossCoin;
    });

    // Load Forge logo image
    const forgeImage = new Image();
    forgeImage.crossOrigin = "anonymous";
    
    await new Promise((resolve) => {
      forgeImage.onload = resolve;
      forgeImage.onerror = resolve;
      forgeImage.src = forgeLogo;
    });

    const padding = 60;
    
    // TOP SECTION - Forge Logo (using image)
    if (forgeImage.complete) {
      // Draw CROSS Forge logo
      const logoHeight = 50;
      const logoWidth = (forgeImage.width / forgeImage.height) * logoHeight;
      ctx.drawImage(forgeImage, padding, 45, logoWidth, logoHeight);
      
      // Add "Forge" text next to logo
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Forge", padding + logoWidth + 15, 80);
    }
    
    ctx.fillStyle = "#56C880";
    ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("PORTFOLIO", padding + 180, 80);
    ctx.shadowBlur = 0;

    // ROCKET EFFECT - Forge logo as rocket traveling through space
    // Position rocket in the upper-middle area
    const rocketX = width * 0.75;
    const rocketY = height * 0.35;
    const rocketSize = 200; // Increased from 120 to 200
    
    // Draw rocket fire/exhaust trail (multiple layers for depth)
    ctx.save();
    ctx.translate(rocketX, rocketY);
    ctx.rotate(Math.PI / 6); // Tilt the rocket
    
    // Fire trail - outer glow (increased size)
    const fireGradient1 = ctx.createLinearGradient(0, rocketSize / 2, 0, rocketSize / 2 + 250);
    fireGradient1.addColorStop(0, "rgba(255, 100, 50, 0.8)");
    fireGradient1.addColorStop(0.3, "rgba(255, 150, 50, 0.6)");
    fireGradient1.addColorStop(0.6, "rgba(255, 200, 100, 0.3)");
    fireGradient1.addColorStop(1, "rgba(255, 200, 100, 0)");
    
    // Flame shape 1 (left) - larger
    ctx.beginPath();
    ctx.moveTo(-25, rocketSize / 2);
    ctx.quadraticCurveTo(-40, rocketSize / 2 + 80, -50, rocketSize / 2 + 160);
    ctx.quadraticCurveTo(-35, rocketSize / 2 + 210, -25, rocketSize / 2 + 250);
    ctx.quadraticCurveTo(-15, rocketSize / 2 + 200, -10, rocketSize / 2 + 130);
    ctx.quadraticCurveTo(-15, rocketSize / 2 + 60, -25, rocketSize / 2);
    ctx.fillStyle = fireGradient1;
    ctx.fill();
    
    // Flame shape 2 (right) - larger
    ctx.beginPath();
    ctx.moveTo(25, rocketSize / 2);
    ctx.quadraticCurveTo(40, rocketSize / 2 + 80, 50, rocketSize / 2 + 160);
    ctx.quadraticCurveTo(35, rocketSize / 2 + 210, 25, rocketSize / 2 + 250);
    ctx.quadraticCurveTo(15, rocketSize / 2 + 200, 10, rocketSize / 2 + 130);
    ctx.quadraticCurveTo(15, rocketSize / 2 + 60, 25, rocketSize / 2);
    ctx.fillStyle = fireGradient1;
    ctx.fill();
    
    // Inner fire (brighter core) - larger
    const fireGradient2 = ctx.createLinearGradient(0, rocketSize / 2, 0, rocketSize / 2 + 200);
    fireGradient2.addColorStop(0, "rgba(255, 200, 100, 1)");
    fireGradient2.addColorStop(0.4, "rgba(255, 150, 50, 0.8)");
    fireGradient2.addColorStop(1, "rgba(255, 100, 50, 0)");
    
    ctx.beginPath();
    ctx.moveTo(-18, rocketSize / 2);
    ctx.quadraticCurveTo(-25, rocketSize / 2 + 70, -20, rocketSize / 2 + 130);
    ctx.quadraticCurveTo(-12, rocketSize / 2 + 165, 0, rocketSize / 2 + 180);
    ctx.quadraticCurveTo(12, rocketSize / 2 + 165, 20, rocketSize / 2 + 130);
    ctx.quadraticCurveTo(25, rocketSize / 2 + 70, 18, rocketSize / 2);
    ctx.closePath();
    ctx.fillStyle = fireGradient2;
    ctx.fill();
    
    // Add glow effect to fire
    ctx.shadowColor = "#FF6432";
    ctx.shadowBlur = 40; // Increased blur for larger fire
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw Forge logo as rocket body
    if (forgeImage.complete) {
      const rocketLogoWidth = (forgeImage.width / forgeImage.height) * rocketSize;
      ctx.shadowColor = "#56C880";
      ctx.shadowBlur = 30; // Increased glow
      ctx.drawImage(forgeImage, -rocketLogoWidth / 2, -rocketSize / 2, rocketLogoWidth, rocketSize);
      ctx.shadowBlur = 0;
    }
    
    // Rocket trail particles (more particles for larger rocket)
    for (let i = 0; i < 25; i++) {
      const particleY = rocketSize / 2 + Math.random() * 180;
      const particleX = (Math.random() - 0.5) * 50;
      const particleSize = Math.random() * 6 + 2; // Larger particles
      const particleAlpha = Math.random() * 0.6 + 0.2;
      
      ctx.globalAlpha = particleAlpha;
      ctx.fillStyle = i % 3 === 0 ? "#FF6432" : (i % 3 === 1 ? "#FFA500" : "#FFD700");
      ctx.beginPath();
      ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    
    ctx.restore();

    // MIDDLE SECTION - Total PnL (Percentage Display)
    const middleY = 200;
    
    // "Total PnL" label
    ctx.fillStyle = "#94A3B8";
    ctx.font = "28px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Total PnL", padding, middleY);

    // Large PnL percentage with extreme glow
    const pnlColor = totalProfitLoss >= 0 ? "#56C880" : "#EF4444";
    ctx.fillStyle = pnlColor;
    ctx.font = "bold 96px system-ui, -apple-system, sans-serif";
    ctx.shadowColor = pnlColor;
    ctx.shadowBlur = 40;
    const pnlText = `${totalProfitLoss >= 0 ? '+' : ''}${totalProfitLossPercent.toFixed(2)}%`;
    ctx.fillText(pnlText, padding, middleY + 90);
    ctx.shadowBlur = 0;

    // CROSS value below
    ctx.fillStyle = "#64748B";
    ctx.font = "32px system-ui, -apple-system, sans-serif";
    ctx.fillText(`${totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)} CROSS`, padding, middleY + 130);

    // BOTTOM SECTION - 4 Column Metrics Grid (Evenly Divided)
    const bottomY = 440;
    const gridStartX = padding;
    const gridEndX = width - padding;
    const gridWidth = gridEndX - gridStartX;
    const colWidth = gridWidth / 4;
    
    // Get top gain and loss
    const topGain = topHoldings.filter(h => h.profitLoss > 0).sort((a, b) => b.profitLoss - a.profitLoss)[0];
    const topLoss = topHoldings.filter(h => h.profitLoss < 0).sort((a, b) => a.profitLoss - b.profitLoss)[0];

    // Column 1: Total Value
    let colX = gridStartX;
    ctx.textAlign = "left";
    ctx.fillStyle = "#94A3B8";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText("Total Value", colX, bottomY);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
    ctx.fillText(totalValue.toFixed(2), colX, bottomY + 60);
    
    ctx.fillStyle = "#64748B";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText(`$${(totalValue * 2.5).toFixed(2)}`, colX, bottomY + 95);

    // Column 2: Launched
    colX = gridStartX + colWidth;
    ctx.fillStyle = "#94A3B8";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText("Launched", colX, bottomY);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
    ctx.fillText(`${holdingsCount}`, colX, bottomY + 60);
    
    ctx.fillStyle = "#64748B";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText(`Token${holdingsCount !== 1 ? 's' : ''}`, colX, bottomY + 95);

    // Column 3: Top Gain
    colX = gridStartX + colWidth * 2;
    ctx.fillStyle = "#94A3B8";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText("Top Gain", colX, bottomY);
    
    if (topGain) {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
      ctx.fillText(topGain.tokenSymbol, colX, bottomY + 60);
      
      ctx.fillStyle = "#10B981";
      ctx.font = "24px system-ui, -apple-system, sans-serif";
      ctx.fillText(`+${topGain.profitLossPercent.toFixed(2)}%`, colX, bottomY + 95);
    } else {
      ctx.fillStyle = "#64748B";
      ctx.font = "24px system-ui, -apple-system, sans-serif";
      ctx.fillText("N/A", colX, bottomY + 60);
    }

    // Column 4: Top Loss
    colX = gridStartX + colWidth * 3;
    ctx.fillStyle = "#94A3B8";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText("Top Loss", colX, bottomY);
    
    if (topLoss) {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
      ctx.fillText(topLoss.tokenSymbol, colX, bottomY + 60);
      
      ctx.fillStyle = "#EF4444";
      ctx.font = "24px system-ui, -apple-system, sans-serif";
      ctx.fillText(`${topLoss.profitLossPercent.toFixed(2)}%`, colX, bottomY + 95);
    } else {
      ctx.fillStyle = "#64748B";
      ctx.font = "24px system-ui, -apple-system, sans-serif";
      ctx.fillText("N/A", colX, bottomY + 60);
    }

    // Footer branding with glow
    const footerY = height - 40;
    ctx.fillStyle = "#56C880";
    ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.shadowColor = "#56C880";
    ctx.shadowBlur = 20;
    ctx.fillText("x.crosstoken.io/forge", width / 2, footerY);
    ctx.shadowBlur = 0;

    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/png");
    setImageDataUrl(dataUrl);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!imageDataUrl) return;

    const link = document.createElement("a");
    link.download = `cross-forge-pnl-${Date.now()}.png`;
    link.href = imageDataUrl;
    link.click();
  };

  const handleShareToTwitter = () => {
    if (!imageDataUrl) return;

    // Copy image to clipboard
    fetch(imageDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          // Show success message
          alert("✅ Image copied to clipboard!\n\nThe image has been copied. When you post on X, simply paste (Ctrl+V or Cmd+V) to attach the image.");
        }).catch(() => {
          // Fallback: just download
          handleDownload();
          alert("📥 Image downloaded!\n\nPlease manually attach the downloaded image when posting on X.");
        });
      });
    
    // Open Twitter with text
    const emoji = totalProfitLoss >= 0 ? "📈" : "📉";
    const tweetText = `${emoji} My CROSS Forge Portfolio\n\nTotal: ${totalValue.toFixed(2)} CROSS ($${(totalValue * 2.5).toFixed(2)})\nPNL: ${totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)} CROSS (${totalProfitLoss >= 0 ? '+' : ''}${totalProfitLossPercent.toFixed(2)}%)\n\n🚀 Trade game tokens @CrossToken\n#CROSSForge #GameFi`;
    
    setTimeout(() => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, "_blank", "width=550,height=420");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl ${
          effectiveTheme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            effectiveTheme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <img src={forgeLogo} alt="Forge" className="w-8 h-8" />
            <h3
              className={`text-xl font-bold ${
                effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Share Your PNL
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              effectiveTheme === "dark"
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Canvas Preview */}
          <div className="relative bg-gray-950 rounded-xl overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-auto"
              style={{ display: isGenerating ? "none" : "block" }}
            />
            {isGenerating && (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-400">Generating image...</div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div
            className={`p-4 rounded-xl ${
              effectiveTheme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-sm ${
                effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              💡 <strong>Tip:</strong> Download the image and attach it when posting to X (Twitter) for maximum engagement!
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownload}
              disabled={!imageDataUrl || isGenerating}
              className={`flex-1 ${
                effectiveTheme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              } disabled:opacity-50`}
            >
              <Download size={18} className="mr-2" />
              Download Image
            </Button>
            <Button
              onClick={handleShareToTwitter}
              disabled={!imageDataUrl || isGenerating}
              className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white disabled:opacity-50"
            >
              <Twitter size={18} className="mr-2" />
              Post to X
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}