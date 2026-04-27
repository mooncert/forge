import { ArrowLeft, Share2, Copy, Check, Users, TrendingUp, Award, Gift, ExternalLink, Info, Edit2, Twitter, Zap, Trophy, Star, Sparkles, Target, Gamepad2 } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useTheme } from "../App";
import { useState } from "react";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import forgeLogo from "figma:asset/21f3c6abd25d5385d3fa88edecb250b65cc3ef8f.png";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";

interface ReferralProps {
  onBack: () => void;
}

export function Referral({ onBack }: ReferralProps) {
  const { effectiveTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [refCodeInput, setRefCodeInput] = useState("");
  const [refCodeError, setRefCodeError] = useState("");
  
  // Mock user data
  const myVolume = 125000; // User's cumulative trading volume in CROSS (change to test different scenarios)
  const qualificationThreshold = 1000; // 1,000 CROSS
  const isQualified = myVolume >= qualificationThreshold;
  
  // Mock referral data - START WITH NO CODE
  const [myRefCode, setMyRefCode] = useState<string | null>(null); // null means not set yet
  const [isRefCodeSet, setIsRefCodeSet] = useState(false); // Track if code is permanently set
  
  const referralLink = myRefCode ? `https://x.crosstoken.io/forge?ref=${myRefCode}` : "";
  
  // Only show stats if code is set
  const inviteesVolume = myRefCode ? 185000 : 0; // Total volume from invited users
  const totalEarned = myRefCode ? 12.5 : 0; // CROSS
  
  // Tier system
  const getTier = (volume: number) => {
    if (volume >= 250000) return { name: "Elite", rate: 40, min: 250000, max: null, color: "#FFD700", emoji: "👑", gradient: "from-yellow-300 via-yellow-500 to-orange-500" };
    if (volume >= 50000) return { name: "Pro", rate: 30, min: 50000, max: 250000, color: "#B9F2FF", emoji: "⚡", gradient: "from-cyan-400 to-blue-500" };
    return { name: "Base", rate: 20, min: 0, max: 50000, color: "#56C880", emoji: "🎮", gradient: "from-green-400 to-green-600" };
  };
  
  const currentTier = getTier(inviteesVolume);
  const nextTier = currentTier.max ? getTier(currentTier.max) : null;
  const tierProgress = currentTier.max 
    ? ((inviteesVolume - currentTier.min) / (currentTier.max - currentTier.min)) * 100
    : 100;
  
  // Mock invitees list - only show if code is set
  const invitees = myRefCode ? [
    { address: "0xB903...16b6", volume: 85000, earned: 6.8 },
    { address: "0x742d...9c4a", volume: 62000, earned: 3.72 },
    { address: "0x1A2b...3C4d", volume: 38000, earned: 1.98 },
  ] : [];
  
  const handleCopy = () => {
    // Fallback copy method for when Clipboard API is blocked
    const textarea = document.createElement('textarea');
    textarea.value = referralLink;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Forge',
        text: `Trade game tokens on Forge with reduced fees! Use my referral link:`,
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };
  
  const handleClaim = () => {
    alert(`Claimed ${totalEarned.toFixed(2)} CROSS!`);
  };

  const handleRefCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setRefCodeInput(value);
    setRefCodeError("");
  };

  const handleRefCodeSubmit = () => {
    if (refCodeInput.trim().length < 3) {
      setRefCodeError("Referral code must be at least 3 characters long.");
      return;
    }
    if (refCodeInput.trim().length > 20) {
      setRefCodeError("Referral code must be 20 characters or less.");
      return;
    }
    // Mock API call - in real app, check if code is already taken
    setMyRefCode(refCodeInput);
    setIsRefCodeSet(true);
    setShowSetupModal(false);
    setRefCodeInput("");
  };

  const handleShareToTwitter = () => {
    const tweetText = `🎮 Join me on Forge!

Trade game tokens with reduced fees using my referral link:
${referralLink}

✨ Get 0.1% protocol fee discount
🚀 Powered by @CrossToken

#Forge #GameFi`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className={`min-h-screen ${effectiveTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Epic Hero Section */}
      <div className={`relative overflow-hidden ${effectiveTheme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-[#56C880]/5 to-gray-900' : 'bg-gradient-to-br from-white via-[#56C880]/5 to-gray-50'} border-b ${effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(86, 200, 128, 0.4) 2px, rgba(86, 200, 128, 0.4) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(86, 200, 128, 0.4) 2px, rgba(86, 200, 128, 0.4) 4px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#56C880] rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#56C880] rounded-full blur-[80px] opacity-15" />

        <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl relative">
          <Button
            onClick={onBack}
            variant="ghost"
            className={`mb-6 md:mb-8 ${
              effectiveTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          
          {/* Hero Title */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={forgeLogo} alt="Forge" className="w-16 h-16 md:w-20 md:h-20" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              EARN WHILE YOU GAME
            </h1>
            <p className={`text-xl md:text-2xl font-semibold mb-2 ${effectiveTheme === 'dark' ? 'text-[#56C880]' : 'text-[#56C880]'}`}>
              Share Your Referral Link, Stack Rewards
            </p>
            <p className={`text-base md:text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Every trade your friends make = passive income for you
            </p>
          </div>

          {/* Epic Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Total Earned - Big Focus */}
            <Card className={`p-6 md:p-8 border-2 relative overflow-hidden ${effectiveTheme === 'dark' ? 'bg-gradient-to-br from-[#56C880]/20 to-gray-900 border-[#56C880]/50' : 'bg-gradient-to-br from-[#56C880]/10 to-white border-[#56C880]/30'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#56C880] rounded-full blur-[60px] opacity-30" />
              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-[#56C880]/20">
                    <Sparkles className="text-[#56C880]" size={20} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Earned</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={crossCoin} alt="CROSS" className="w-12 h-12" />
                    <div>
                      <p className="text-4xl md:text-5xl font-bold text-[#56C880] leading-tight">
                        {totalEarned.toFixed(2)}
                      </p>
                      <p className={`text-sm font-semibold mt-1 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        ≈ ${(totalEarned * 2.5).toFixed(2)} USD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Tier */}
            <Card className={`p-6 md:p-8 border-2 relative overflow-hidden ${effectiveTheme === 'dark' ? `bg-gradient-to-br ${currentTier.gradient} border-gray-700` : 'bg-white border-gray-200'}`}>
              <div className="absolute top-0 right-0 text-9xl opacity-10 leading-none">{currentTier.emoji}</div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${currentTier.color}20` }}>
                    <Trophy size={20} style={{ color: currentTier.color }} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${effectiveTheme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>Current Tier</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <div className="text-5xl leading-none">{currentTier.emoji}</div>
                    <div>
                      <p className={`text-2xl md:text-3xl font-bold leading-tight ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ color: effectiveTheme === 'dark' ? 'white' : currentTier.color }}>
                        {currentTier.name}
                      </p>
                      <p className={`text-base md:text-lg font-semibold mt-1 ${effectiveTheme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                        {currentTier.rate}% Revenue Share
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Squad Volume */}
            <Card className={`p-6 md:p-8 border-2 relative overflow-hidden ${effectiveTheme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-[#56C880]/20">
                    <Users className="text-[#56C880]" size={20} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Squad Volume</span>
                </div>
                <div className="flex-1 flex flex-col justify-center mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={crossCoin} alt="CROSS" className="w-12 h-12" />
                    <div>
                      <p className={`text-3xl md:text-4xl font-bold leading-tight ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {(inviteesVolume / 1000).toFixed(0)}K
                      </p>
                      <p className={`text-sm font-semibold mt-1 ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ≈ ${(inviteesVolume * 2.5 / 1000).toFixed(1)}K USD
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Users size={16} className="text-[#56C880]" />
                  <span className={`text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {invitees.length} Gamers Invited
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Qualification Status */}
        {!isQualified && (
          <Card className={`p-6 mb-6 border-2 ${
            effectiveTheme === 'dark'
              ? 'bg-amber-900/20 border-amber-800/50'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start gap-3">
              <Info className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 ${effectiveTheme === 'dark' ? 'text-amber-400' : 'text-amber-800'}`}>
                  🎮 Unlock Your Referral Power!
                </h3>
                <p className={`text-sm mb-3 ${effectiveTheme === 'dark' ? 'text-amber-300/80' : 'text-amber-700'}`}>
                  Trade at least 1,000 CROSS to activate your referral link and start earning
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={effectiveTheme === 'dark' ? 'text-amber-400' : 'text-amber-800'}>
                      Your trading volume
                    </span>
                    <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-amber-300' : 'text-amber-900'}`}>
                      {myVolume.toLocaleString()} / {qualificationThreshold.toLocaleString()} CROSS
                    </span>
                  </div>
                  <Progress value={(myVolume / qualificationThreshold) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Tier Progress - Gaming Style */}
        {nextTier && (
          <Card className={`p-6 mb-6 border-2 relative overflow-hidden ${
            effectiveTheme === 'dark' 
              ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700' 
              : 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
          }`}>
            <div className="absolute top-0 right-0 text-9xl opacity-5">{nextTier.emoji}</div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{currentTier.emoji}</div>
                  <div>
                    <p className={`text-sm font-bold uppercase tracking-wider ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Level Up Progress
                    </p>
                    <p className={`text-xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      {currentTier.name} → {nextTier.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${effectiveTheme === 'dark' ? 'text-[#56C880]' : 'text-[#56C880]'}`}>
                    {tierProgress.toFixed(0)}%
                  </p>
                  <p className={`text-xs ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Complete
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <Progress value={tierProgress} className="h-4 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {inviteesVolume.toLocaleString()} CROSS
                  </span>
                  <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentTier.max?.toLocaleString()} CROSS
                  </span>
                </div>
              </div>

              <div className={`mt-4 p-4 rounded-xl ${effectiveTheme === 'dark' ? 'bg-[#56C880]/10 border border-[#56C880]/30' : 'bg-[#56C880]/5 border border-[#56C880]/20'}`}>
                <div className="flex items-center gap-2">
                  <Target className="text-[#56C880]" size={18} />
                  <p className={`text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Only {((currentTier.max || 0) - inviteesVolume).toLocaleString()} CROSS more to unlock <span style={{ color: nextTier.color }}>{nextTier.name}</span> tier with {nextTier.rate}% revenue share! 🎯
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Referral Link - Gaming Style */}
        <Card className={`p-6 md:p-8 mb-6 border-2 ${
          effectiveTheme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[#56C880]/20">
              <Share2 className="text-[#56C880]" size={28} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Your Referral Link
              </h2>
              <p className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Share this link to earn passive rewards
              </p>
            </div>
          </div>
          
          {!myRefCode && isQualified ? (
            <div className={`p-8 md:p-12 rounded-2xl border-2 border-dashed text-center ${
              effectiveTheme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <Edit2 size={56} className={`mx-auto mb-4 ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={`text-xl font-bold mb-2 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Create Your Referral Code
              </p>
              <p className={`text-sm mb-6 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Choose a unique code for your referral link. You can only set this once!
              </p>
              <Button
                onClick={() => setShowSetupModal(true)}
                className="bg-[#56C880] hover:bg-[#45B570] text-white font-bold text-lg px-8 py-6"
              >
                <Gamepad2 size={20} className="mr-2" />
                Choose Your Code
              </Button>
            </div>
          ) : myRefCode ? (
            <>
              <div className={`p-6 rounded-2xl mb-4 ${effectiveTheme === 'dark' ? 'bg-gray-800 border-2 border-gray-700' : 'bg-gray-50 border-2 border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-[#56C880] text-white text-xs font-bold px-3 py-1">
                    YOUR CODE
                  </Badge>
                  <span className={`text-2xl font-bold font-mono ${effectiveTheme === 'dark' ? 'text-[#56C880]' : 'text-[#56C880]'}`}>
                    {myRefCode}
                  </span>
                </div>
                <div className={`flex items-center gap-2 p-4 rounded-xl ${effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  <span className={`flex-1 font-mono text-sm truncate ${
                    effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {referralLink}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  onClick={handleCopy}
                  className={`font-bold ${
                    copied
                      ? 'bg-[#56C880] hover:bg-[#56C880] text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  onClick={handleShare}
                  className="bg-[#56C880] hover:bg-[#45B570] text-white font-bold"
                >
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleShareToTwitter}
                  className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold col-span-2"
                >
                  <Twitter size={18} className="mr-2" />
                  Post to X (Twitter)
                </Button>
              </div>

              {/* Invitee Benefits */}
              <div className={`mt-6 p-6 rounded-2xl border-2 ${
                effectiveTheme === 'dark' ? 'bg-[#56C880]/10 border-[#56C880]/30' : 'bg-[#56C880]/5 border-[#56C880]/20'
              }`}>
                <div className="flex items-start gap-3">
                  <Gift className="text-[#56C880] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className={`text-lg font-bold mb-2 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      🎁 Your Friends Get Instant Perks!
                    </p>
                    <p className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Protocol fee automatically reduced from <span className="line-through">1.0%</span> to <span className="font-bold text-[#56C880]">0.9%</span> on their very first trade
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Card>

        {/* Invitees List - Gaming Leaderboard Style */}
        <Card className={`border-2 overflow-hidden ${
          effectiveTheme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b-2 bg-gradient-to-r ${effectiveTheme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700' : 'from-gray-50 to-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#56C880]/20">
                  <Users className="text-[#56C880]" size={24} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Your Squad
                  </h2>
                  <p className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Gamers you've invited to the platform
                  </p>
                </div>
              </div>
              <Badge className="bg-[#56C880] text-white font-bold text-lg px-4 py-2">
                {invitees.length} Gamers
              </Badge>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b-2 ${
                effectiveTheme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    User
                  </th>
                  <th className={`px-6 py-4 text-right text-xs font-bold uppercase tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Volume
                  </th>
                  <th className={`px-6 py-4 text-right text-xs font-bold uppercase tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    You Earned
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y-2 ${effectiveTheme === 'dark' ? 'divide-gray-800' : 'divide-gray-200'}`}>
                {invitees.map((invitee, index) => (
                  <tr 
                    key={index}
                    className={`transition-all hover:scale-[1.01] ${
                      effectiveTheme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          effectiveTheme === 'dark' ? 'bg-[#56C880]/20 text-[#56C880]' : 'bg-[#56C880]/10 text-[#56C880]'
                        }`}>
                          #{index + 1}
                        </div>
                        <span className={`font-mono font-semibold ${
                          effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {invitee.address}
                        </span>
                        <button className={`p-1.5 rounded-lg transition-colors ${
                          effectiveTheme === 'dark'
                            ? 'hover:bg-gray-700 text-gray-500'
                            : 'hover:bg-gray-100 text-gray-400'
                        }`}>
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <img src={crossCoin} alt="CROSS" className="w-6 h-6" />
                        <span className={`text-lg font-bold ${
                          effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {invitee.volume.toLocaleString()}
                        </span>
                      </div>
                      <div className={`text-sm ${
                        effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        ≈ ${(invitee.volume * 2.5).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <img src={crossCoin} alt="CROSS" className="w-6 h-6" />
                        <span className="text-lg font-bold text-[#56C880]">
                          +{invitee.earned.toFixed(2)}
                        </span>
                      </div>
                      <div className={`text-sm ${
                        effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        ≈ ${(invitee.earned * 2.5).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {invitees.length === 0 && (
            <div className="p-16 text-center">
              <Users size={64} className={`mx-auto mb-4 ${effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`} />
              <p className={`text-xl font-bold mb-2 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                No Squad Members Yet
              </p>
              <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your referral link to start building your gaming squad
              </p>
            </div>
          )}
        </Card>

        {/* How it Works - Gaming Quest Style */}
        <Card className={`mt-6 p-8 border-2 ${
          effectiveTheme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' 
            : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[#56C880]/20">
              <Gamepad2 className="text-[#56C880]" size={28} />
            </div>
            <h2 className={`text-2xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting Lines - Desktop Only */}
            <div className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-[#56C880]/0 via-[#56C880]/50 to-[#56C880]/0" />
            
            {/* Step 1 */}
            <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl group ${effectiveTheme === 'dark' ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-[#56C880]/50' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#56C880]/30'}`}>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#56C880] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                  effectiveTheme === 'dark' ? 'bg-gradient-to-br from-[#56C880]/30 to-[#56C880]/10 text-[#56C880]' : 'bg-gradient-to-br from-[#56C880]/20 to-[#56C880]/5 text-[#56C880]'
                }`}>
                  1
                </div>
                <p className={`text-xl font-bold mb-3 transition-colors ${effectiveTheme === 'dark' ? 'text-gray-100 group-hover:text-[#56C880]' : 'text-gray-900 group-hover:text-[#56C880]'}`}>
                  🎮 Unlock Your Link
                </p>
                <p className={`leading-relaxed ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Trade <span className="font-bold text-[#56C880]">1,000 CROSS</span> on Forge to activate your referral superpowers
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl group ${effectiveTheme === 'dark' ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-[#56C880]/50' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#56C880]/30'}`}>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#56C880] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                  effectiveTheme === 'dark' ? 'bg-gradient-to-br from-[#56C880]/30 to-[#56C880]/10 text-[#56C880]' : 'bg-gradient-to-br from-[#56C880]/20 to-[#56C880]/5 text-[#56C880]'
                }`}>
                  2
                </div>
                <p className={`text-xl font-bold mb-3 transition-colors ${effectiveTheme === 'dark' ? 'text-gray-100 group-hover:text-[#56C880]' : 'text-gray-900 group-hover:text-[#56C880]'}`}>
                  🚀 Share & Grow
                </p>
                <p className={`leading-relaxed ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your friends get <span className="font-bold text-[#56C880]">0.1% fee discount</span> (<span className="line-through opacity-60">1.0%</span> → 0.9%) from first trade
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl group ${effectiveTheme === 'dark' ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-[#56C880]/50' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#56C880]/30'}`}>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#56C880] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                  effectiveTheme === 'dark' ? 'bg-gradient-to-br from-[#56C880]/30 to-[#56C880]/10 text-[#56C880]' : 'bg-gradient-to-br from-[#56C880]/20 to-[#56C880]/5 text-[#56C880]'
                }`}>
                  3
                </div>
                <p className={`text-xl font-bold mb-3 transition-colors ${effectiveTheme === 'dark' ? 'text-gray-100 group-hover:text-[#56C880]' : 'text-gray-900 group-hover:text-[#56C880]'}`}>
                  💰 Earn Passive
                </p>
                <p className={`leading-relaxed ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Earn <span className="font-bold text-[#56C880]">20-40%</span> of protocol fees from every trade your squad makes
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className={`max-w-md w-full p-8 border-2 ${
            effectiveTheme === 'dark' 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold mb-3 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              Create Your Code
            </h2>
            <p className={`text-sm mb-6 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose a unique code for your referral link. This can only be set once and cannot be changed later.
            </p>

            <div className="mb-6">
              <label className={`block text-sm font-bold mb-3 ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Referral Code
              </label>
              <Input
                type="text"
                value={refCodeInput}
                onChange={handleRefCodeChange}
                placeholder="YOURCODE"
                className={`text-xl font-mono font-bold uppercase text-center py-6 ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                maxLength={20}
              />
              <p className={`text-xs mt-3 ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                3-20 characters, letters and numbers only
              </p>
              {refCodeError && (
                <p className="text-sm text-red-500 mt-2 font-semibold">{refCodeError}</p>
              )}
            </div>

            {refCodeInput && (
              <div className={`p-4 rounded-xl mb-6 ${
                effectiveTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
              }`}>
                <p className={`text-xs mb-2 font-bold uppercase tracking-wider ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Your link will be:
                </p>
                <p className={`font-mono text-sm font-semibold break-all ${effectiveTheme === 'dark' ? 'text-[#56C880]' : 'text-[#56C880]'}`}>
                  https://x.crosstoken.io/forge?ref={refCodeInput}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowSetupModal(false);
                  setRefCodeInput("");
                  setRefCodeError("");
                }}
                variant="ghost"
                className={`flex-1 font-bold ${
                  effectiveTheme === 'dark'
                    ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRefCodeSubmit}
                disabled={!refCodeInput || refCodeInput.length < 3}
                className="flex-1 bg-[#56C880] hover:bg-[#45B570] text-white font-bold text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={20} className="mr-2" />
                Confirm
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}