import { useTheme } from "../App";
import { TokenCardOption1 } from "./TokenCardOption1";
import { TokenCardOption2 } from "./TokenCardOption2";
import { TokenCardOption3 } from "./TokenCardOption3";
import { ArrowLeft } from "lucide-react";

const sampleToken = {
  id: "1",
  name: "Cyber Quest Token",
  symbol: "CQT",
  gameTitle: "Cyber Quest: Neon City",
  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
  gameImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
  price: 0.000124,
  priceChange24h: 24.5,
  volume24h: 45600,
  marketCap: 78900,
  holders: 3420,
  liquidity: 98700,
  virtualReserve: 150000,
  bondingProgress: 65,
  description: "Explore a dystopian cyberpunk world where every choice shapes your destiny. Trade, fight, and survive in Neon City."
};

interface CardComparisonProps {
  onBack: () => void;
}

export function CardComparison({ onBack }: CardComparisonProps) {
  const { effectiveTheme } = useTheme();

  return (
    <div className={`min-h-screen py-20 px-6 ${
      effectiveTheme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors ${
            effectiveTheme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft size={20} />
          Back to Explore
        </button>

        <h1 className={`text-4xl font-bold text-center mb-4 ${
          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Card Design Comparison
        </h1>
        <p className={`text-center mb-12 ${
          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Choose your favorite card design
        </p>

        <div className="space-y-12">
          {/* Option 1: Steam Style */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#56C880] text-white font-bold">
                1
              </div>
              <h2 className={`text-2xl font-bold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Steam Style
              </h2>
              <span className={`text-sm ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                상단 이미지 배너 (16:9)
              </span>
            </div>
            <div className="max-w-md">
              <TokenCardOption1 token={sampleToken} onClick={() => {}} rank={1} />
            </div>
          </div>

          {/* Option 2: Epic Games Style */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#56C880] text-white font-bold">
                2
              </div>
              <h2 className={`text-2xl font-bold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Epic Games Style
              </h2>
              <span className={`text-sm ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                좌우 분할 (썸네일 + 정보)
              </span>
            </div>
            <div className="max-w-2xl">
              <TokenCardOption2 token={sampleToken} onClick={() => {}} rank={1} />
            </div>
          </div>

          {/* Option 3: Background + Overlay */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#56C880] text-white font-bold">
                3
              </div>
              <h2 className={`text-2xl font-bold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Background + Overlay
              </h2>
              <span className={`text-sm ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                배경 이미지 + 그라디언트 오버레이
              </span>
            </div>
            <div className="max-w-md">
              <TokenCardOption3 token={sampleToken} onClick={() => {}} rank={1} />
            </div>
          </div>
        </div>

        {/* 선택 가이드 */}
        <div className={`mt-16 p-6 rounded-2xl border ${
          effectiveTheme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${
            effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            💡 각 디자인의 특징
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-[#56C880] font-bold">Option 1 (Steam):</span>
              <span className={`ml-2 ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                게임 이미지가 가장 크고 임팩트있게 보임. 클린하고 직관적.
              </span>
            </div>
            <div>
              <span className="text-[#56C880] font-bold">Option 2 (Epic Games):</span>
              <span className={`ml-2 ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                정보를 한눈에 스캔하기 좋음. 컴팩트하고 효율적. 가로로 넓은 공간에 적합.
              </span>
            </div>
            <div>
              <span className="text-[#56C880] font-bold">Option 3 (Background):</span>
              <span className={`ml-2 ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                게임 분위기를 배경으로 느낄 수 있음. 세련되고 현대적.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}