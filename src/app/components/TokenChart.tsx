import { useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "../App";
import { ArrowUp, ArrowDown } from "lucide-react";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import type { TokenData } from "./TokenCard";

interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
}

interface TokenChartProps {
  token?: TokenData;
}

export function TokenChart({ token }: TokenChartProps) {
  const { effectiveTheme } = useTheme();
  const [timeframe, setTimeframe] = useState<"1H" | "24H" | "7D" | "30D">("24H");
  const [activeTab, setActiveTab] = useState<'marketcap' | 'price'>('price');

  // Mock data - in production this would come from an API
  const generateMockData = (points: number): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    let basePrice = 0.000045;
    
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.48) * 0.000002;
      basePrice += change;
      
      data.push({
        time: i.toString(),
        price: Math.max(0.00001, basePrice),
        volume: Math.random() * 10000 + 5000
      });
    }
    
    return data;
  };

  const chartData = generateMockData(timeframe === "1H" ? 60 : timeframe === "24H" ? 24 : timeframe === "7D" ? 168 : 720);

  const formatTime = (value: string) => {
    const num = parseInt(value);
    if (timeframe === "1H") return `${num}m`;
    if (timeframe === "24H") return `${num}h`;
    if (timeframe === "7D") return `D${Math.floor(num / 24)}`;
    return `D${Math.floor(num / 24)}`;
  };

  const timeframes = ["1H", "24H", "7D", "30D"] as const;

  return (
    <Card className="p-6">
      {/* Price Header - Top Left Aligned */}
      {token && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {activeTab === 'price' && (
            <img src={crossCoin} alt="CROSS" className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
          <span className={`font-bold text-xl sm:text-2xl lg:text-3xl ${
            effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {activeTab === 'marketcap' 
              ? `$${(token.marketCap / 1000000).toFixed(2)}M`
              : (token.price / 0.25).toFixed(8)
            }
          </span>
          <div className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${
            token.priceChange24h >= 0
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {token.priceChange24h >= 0 ? <ArrowUp size={12} className="sm:w-3.5 sm:h-3.5" /> : <ArrowDown size={12} className="sm:w-3.5 sm:h-3.5" />}
            <span className="text-xs sm:text-sm font-bold">
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </span>
          </div>
          {activeTab === 'price' && (
            <span className={`text-xs sm:text-sm ${
              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              ≈${token.price.toFixed(6)}
            </span>
          )}
        </div>
      )}

      {/* Tab Buttons (Left) + Timeframe Buttons (Right) */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Tab Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('marketcap')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'marketcap'
                ? effectiveTheme === 'dark'
                  ? 'bg-[#56C880]/10 text-[#56C880]'
                  : 'bg-[#56C880]/10 text-[#56C880]'
                : effectiveTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Market Cap<span className="hidden md:inline"> (USD)</span>
          </button>
          <button
            onClick={() => setActiveTab('price')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'price'
                ? effectiveTheme === 'dark'
                  ? 'bg-[#56C880]/10 text-[#56C880]'
                  : 'bg-[#56C880]/10 text-[#56C880]'
                : effectiveTheme === 'dark'
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Price<span className="hidden md:inline"> (CROSS)</span>
          </button>
        </div>

        {/* Right: Timeframe Buttons (Desktop) / Select Box (Mobile) */}
        {/* Desktop - Buttons */}
        <div className="hidden md:flex gap-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant="outline"
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={`h-8 px-3 text-xs font-medium ${
                timeframe === tf 
                  ? 'bg-[#56C880] text-white hover:bg-[#45B570] border-[#56C880]' 
                  : effectiveTheme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tf}
            </Button>
          ))}
        </div>

        {/* Mobile - Select Box */}
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as typeof timeframe)}
          className={`md:hidden px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            effectiveTheme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-gray-300'
              : 'bg-white border-gray-300 text-gray-700'
          }`}
        >
          {timeframes.map((tf) => (
            <option key={tf} value={tf}>
              {tf}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={280} className="hidden md:block">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#56C880" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#56C880" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={effectiveTheme === 'dark' ? '#374151' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="time" 
            tickFormatter={formatTime}
            stroke={effectiveTheme === 'dark' ? '#6b7280' : '#9ca3af'}
            tick={{ fontSize: 12, fill: effectiveTheme === 'dark' ? '#9ca3af' : '#6b7280' }}
          />
          <YAxis 
            stroke={effectiveTheme === 'dark' ? '#6b7280' : '#9ca3af'}
            tick={{ fontSize: 12, fill: effectiveTheme === 'dark' ? '#9ca3af' : '#6b7280' }}
            tickFormatter={(value) => value.toFixed(6)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: effectiveTheme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${effectiveTheme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              padding: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
            formatter={(value: number) => [value.toFixed(6) + ' CROSS', 'Price']}
            labelStyle={{ color: effectiveTheme === 'dark' ? '#e5e7eb' : '#1f2937', fontWeight: '600' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#56C880" 
            strokeWidth={2}
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Mobile Chart - 2/3 Height */}
      <ResponsiveContainer width="100%" height={187} className="md:hidden">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPriceMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#56C880" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#56C880" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={effectiveTheme === 'dark' ? '#374151' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="time" 
            tickFormatter={formatTime}
            stroke={effectiveTheme === 'dark' ? '#6b7280' : '#9ca3af'}
            tick={{ fontSize: 12, fill: effectiveTheme === 'dark' ? '#9ca3af' : '#6b7280' }}
          />
          <YAxis 
            stroke={effectiveTheme === 'dark' ? '#6b7280' : '#9ca3af'}
            tick={{ fontSize: 12, fill: effectiveTheme === 'dark' ? '#9ca3af' : '#6b7280' }}
            tickFormatter={(value) => value.toFixed(6)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: effectiveTheme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${effectiveTheme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              padding: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
            formatter={(value: number) => [value.toFixed(6) + ' CROSS', 'Price']}
            labelStyle={{ color: effectiveTheme === 'dark' ? '#e5e7eb' : '#1f2937', fontWeight: '600' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#56C880" 
            strokeWidth={2}
            fill="url(#colorPriceMobile)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}