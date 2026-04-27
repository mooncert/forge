import { useState } from "react";
import { 
  ChevronRight, TrendingUp, Settings,
  Maximize2, Plus, Edit3, Type, Circle, Square, 
  Crosshair, Activity, BarChart2, Menu, Copy, Info, X
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "../App";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Cell, Line } from "recharts";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import type { TokenData } from "../types";
import { Candlestick } from "./Candlestick";

interface MarketProps {
  tokens: TokenData[];
  onNavigate?: (view: string, tokenId?: string) => void;
}

// Generate realistic candlestick data
const generateCandlestickData = () => {
  const data = [];
  let basePrice = 0.1036;
  
  for (let i = 0; i < 100; i++) {
    // Much smaller candle bodies to match reference image
    const bodySize = Math.random() * 0.0008 + 0.0001; // Very small bodies: 0.0001 to 0.0009
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    const open = basePrice;
    const close = open + (bodySize * direction);
    
    // Very short wicks - only 10-25% of body size
    const bodyRange = Math.abs(close - open);
    const wickMultiplier = Math.random() * 0.15 + 0.05; // 5-20% of body
    
    const bodyMax = Math.max(open, close);
    const bodyMin = Math.min(open, close);
    const high = bodyMax + (bodyRange * wickMultiplier * Math.random());
    const low = bodyMin - (bodyRange * wickMultiplier * Math.random());
    
    const volume = Math.random() * 50000 + 10000;
    const isGreen = close >= open;
    
    data.push({
      time: i,
      open,
      high,
      low,
      close,
      volume,
      price: close,
      isGreen,
      candleColor: isGreen ? '#22c55e' : '#ef4444'
    });
    
    // Very gradual price movement
    basePrice = close + (Math.random() - 0.5) * 0.0003;
  }
  
  // Calculate moving averages
  for (let i = 0; i < data.length; i++) {
    // MA(7)
    if (i >= 6) {
      let sum = 0;
      for (let j = 0; j < 7; j++) {
        sum += data[i - j].close;
      }
      data[i].ma7 = sum / 7;
    }
    
    // MA(25)
    if (i >= 24) {
      let sum = 0;
      for (let j = 0; j < 25; j++) {
        sum += data[i - j].close;
      }
      data[i].ma25 = sum / 25;
    }
    
    // MA(99)
    if (i >= 98) {
      let sum = 0;
      for (let j = 0; j < 99; j++) {
        sum += data[i - j].close;
      }
      data[i].ma99 = sum / 99;
    }
  }
  
  // Calculate volume moving average
  for (let i = 0; i < data.length; i++) {
    if (i >= 9) {
      let sum = 0;
      for (let j = 0; j < 10; j++) {
        sum += data[i - j].volume;
      }
      data[i].volumeMA = sum / 10;
    }
  }
  
  return data;
};

// Generate orderbook data
const generateOrderbook = () => {
  const asks = [];
  const bids = [];
  let basePrice = 0.1036;
  
  for (let i = 0; i < 30; i++) {
    const askPrice = basePrice * (1 + (i + 1) * 0.001);
    const bidPrice = basePrice * (1 - (i + 1) * 0.001);
    
    asks.push({
      price: askPrice.toFixed(4),
      amount: (Math.random() * 10000 + 1000).toFixed(0),
      change: ((Math.random() * 20 + 5) * -1).toFixed(2),
      volume: Math.floor(Math.random() * 10000 + 1000)
    });
    
    bids.push({
      price: bidPrice.toFixed(4),
      amount: (Math.random() * 10000 + 1000).toFixed(0),
      change: (Math.random() * 20 - 10).toFixed(2),
      volume: Math.floor(Math.random() * 10000 + 1000)
    });
  }
  
  return { asks: asks.reverse(), bids };
};

export function Market({ tokens, onNavigate }: MarketProps) {
  const { effectiveTheme } = useTheme();
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [buySell, setBuySell] = useState<'buy' | 'sell'>('buy');
  const [bottomTab, setBottomTab] = useState<'open' | 'closed' | 'history'>('open');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [topRightTab, setTopRightTab] = useState<'trades' | 'days' | 'orderbook'>('orderbook');
  
  // Get graduated tokens
  const graduatedTokens = tokens.filter(token => token.bondingProgress >= 90);
  const [selectedToken, setSelectedToken] = useState<TokenData>(graduatedTokens[0] || tokens[0]);
  
  if (!selectedToken) return null;
  
  const chartData = generateCandlestickData();
  const { asks, bids } = generateOrderbook();
  const intervals = ['1m', '5m', '10m', '15m', '1h', '4h', '1D', '1W', '1M'];

  return (
    <div className="h-screen flex flex-col bg-[#0d1117] text-gray-200 overflow-hidden relative">
      {/* Token List Drawer */}
      {showDrawer && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowDrawer(false)}
          />
          
          {/* Drawer */}
          <div className="fixed left-0 top-0 bottom-0 w-96 bg-[#161b22] z-50 shadow-2xl border-r border-gray-700">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h3 className="text-lg font-bold">Trading Pairs</h3>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Token List Header */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 text-xs font-semibold text-gray-400 border-b border-gray-700">
              <div>Token Name</div>
              <div className="text-right">Price</div>
              <div className="text-right">Change</div>
              <div className="text-right">Volume</div>
            </div>
            
            {/* Token List */}
            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
              {graduatedTokens.map(token => (
                <button
                  key={token.id}
                  onClick={() => {
                    setSelectedToken(token);
                    setShowDrawer(false);
                  }}
                  className={`w-full grid grid-cols-4 gap-2 px-4 py-3 text-xs hover:bg-gray-700/50 transition-colors ${
                    selectedToken.id === token.id ? 'bg-gray-700/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={token.image} alt={token.symbol} className="w-6 h-6 rounded-full" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-200">{token.symbol}</div>
                      <div className="text-gray-500 text-[10px]">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-gray-300">{token.price.toFixed(4)}</div>
                  <div className={`text-right font-semibold ${
                    token.priceChange24h >= 0 ? 'text-[#3fb950]' : 'text-red-500'
                  }`}>
                    {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                  </div>
                  <div className="text-right text-gray-400">
                    {(token.volume24h / 1000).toFixed(1)}K
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
        {/* Left: Token Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDrawer(true)}
              className="p-1.5 hover:bg-[#e2a53a]/20 rounded bg-[#e2a53a]/10 border border-[#e2a53a]/30"
            >
              <ChevronRight size={18} className="text-[#e2a53a]" />
            </button>
          </div>
          
          {/* Token Name and Pair */}
          <div className="flex items-center gap-3">
            <img src={selectedToken.image} alt={selectedToken.symbol} className="w-10 h-10 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-gray-100">{selectedToken.symbol}</span>
                <Copy size={12} className="text-gray-500 cursor-pointer hover:text-gray-300" />
              </div>
              <div className="text-xs text-gray-500">{selectedToken.symbol}/CROSS</div>
            </div>
          </div>
          
          {/* Price Display */}
          <div className="flex items-center gap-3 ml-2">
            <div>
              <div className={`text-2xl font-bold ${selectedToken.priceChange24h >= 0 ? 'text-[#3fb950]' : 'text-red-500'}`}>
                {selectedToken.price.toFixed(4)} <span className="text-sm font-normal text-gray-500">CROSS</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">${(selectedToken.price * 2.5).toFixed(4)}</span>
                {' '}
                <span className={selectedToken.priceChange24h >= 0 ? 'text-[#3fb950]' : 'text-red-500'}>
                  {selectedToken.priceChange24h >= 0 ? '+' : ''}{selectedToken.priceChange24h.toFixed(2)}%
                </span>
              </div>
            </div>
            
            {/* Mini Sparkline Chart */}
            <div className="w-20 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.slice(-20)}>
                  <defs>
                    <linearGradient id="miniSparkline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={selectedToken.priceChange24h >= 0 ? '#3fb950' : '#ef4444'} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={selectedToken.priceChange24h >= 0 ? '#3fb950' : '#ef4444'} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke={selectedToken.priceChange24h >= 0 ? '#3fb950' : '#ef4444'}
                    strokeWidth={1.5}
                    fill="url(#miniSparkline)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-6 text-xs ml-4">
            <div>
              <div className="text-gray-500 mb-0.5">High</div>
              <div className="font-semibold text-gray-300">{(selectedToken.price * 1.05).toFixed(4)}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Low</div>
              <div className="font-semibold text-gray-300">{(selectedToken.price * 0.95).toFixed(4)}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Vol(CROSS)</div>
              <div className="font-semibold text-gray-300">{selectedToken.volume24h.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Vol({selectedToken.symbol})</div>
              <div className="font-semibold text-gray-300">{(selectedToken.volume24h * selectedToken.price).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</div>
            </div>
          </div>
        </div>
        
        {/* Right: Tab Controls */}
        <div className="flex items-center gap-1 bg-[#21262d] rounded-lg p-1" style={{ minWidth: '320px' }}>
          <button
            onClick={() => setTopRightTab('trades')}
            className={`flex-1 px-6 py-1.5 text-sm font-medium rounded transition-colors ${
              topRightTab === 'trades'
                ? 'bg-[#0d1117] text-gray-200'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Trades
          </button>
          <button
            onClick={() => setTopRightTab('days')}
            className={`flex-1 px-6 py-1.5 text-sm font-medium rounded transition-colors ${
              topRightTab === 'days'
                ? 'bg-[#0d1117] text-gray-200'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Days
          </button>
          <button
            onClick={() => setTopRightTab('orderbook')}
            className={`flex-1 px-6 py-1.5 text-sm font-medium rounded transition-colors ${
              topRightTab === 'orderbook'
                ? 'bg-[#0d1117] text-gray-200'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Orderbook
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-12 bg-[#0d1117] border-r border-gray-800 flex flex-col items-center py-4 gap-4">
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Crosshair size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Activity size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <TrendingUp size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Edit3 size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Type size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Circle size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Square size={18} />
          </button>
          <div className="flex-1" />
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <BarChart2 size={18} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200">
            <Settings size={18} />
          </button>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex flex-col">
          {/* Chart Controls */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-gray-800">
            <div className="flex items-center gap-1">
              {intervals.map(interval => (
                <button
                  key={interval}
                  onClick={() => setSelectedInterval(interval)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    selectedInterval === interval
                      ? 'bg-[#21262d] text-gray-200'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {interval}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-800 rounded text-gray-400">
                <TrendingUp size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-800 rounded text-gray-400">
                <Edit3 size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-800 rounded text-gray-400">
                <Maximize2 size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-800 rounded text-gray-400">
                <Settings size={16} />
              </button>
            </div>
          </div>

          {/* Chart Title */}
          <div className="px-4 py-2 bg-[#0d1117] border-b border-gray-800">
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-400">
                <span className="text-[#3fb950] font-semibold">+{selectedToken.symbol}/CROSS - 1D - DEX</span>
                <span className="ml-3">O</span>
                <span className="text-[#3fb950] ml-1">{selectedToken.price.toFixed(4)}</span>
                <span className="ml-3">H</span>
                <span className="text-[#3fb950] ml-1">{(selectedToken.price * 1.05).toFixed(4)}</span>
                <span className="ml-3">L</span>
                <span className="text-red-500 ml-1">{(selectedToken.price * 0.95).toFixed(4)}</span>
                <span className="ml-3">C</span>
                <span className="text-[#3fb950] ml-1">{selectedToken.price.toFixed(4)}</span>
                <span className="ml-3 text-[#3fb950]">+{selectedToken.priceChange24h.toFixed(2)}%</span>
              </span>
            </div>
          </div>

          {/* Main Chart */}
          <div className="flex-1 relative bg-[#0d1117]">
            {/* Candlestick Chart */}
            <div className="h-[70%] w-full relative px-4 py-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 50, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1f2937" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#1f2937" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3fb950" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3fb950" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  <XAxis 
                    dataKey="time" 
                    stroke="#374151"
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    stroke="#374151"
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={false}
                    tickFormatter={(value) => value.toFixed(4)}
                    orientation="right"
                  />
                  
                  {/* Area under the line */}
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="none"
                    fill="url(#areaGradient)"
                  />
                  
                  {/* Price Line */}
                  <Line 
                    type="monotone"
                    dataKey="close"
                    stroke="#3fb950"
                    strokeWidth={2}
                    dot={false}
                    name="Price"
                  />
                  
                  {/* MA(99) Line */}
                  <Line 
                    type="monotone"
                    dataKey="ma99"
                    stroke="#06b6d4"
                    strokeWidth={1.5}
                    dot={false}
                    connectNulls
                    name="MA(99)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div className="absolute top-3 left-6 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-[#3fb950]" />
                  <span className="text-gray-400">Price</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-cyan-500" />
                  <span className="text-gray-400">MA(99)</span>
                </div>
              </div>
            </div>

            {/* Volume Chart */}
            <div className="h-[30%] px-4">
              <div className="text-xs text-gray-500 mb-1">
                <span className="text-cyan-400">▼</span> Vol({selectedToken.symbol}) <span className="font-semibold text-red-400">{(selectedToken.volume24h / 1000000).toFixed(3)}M</span>
                {' '}Vol(CROSS) <span className="font-semibold text-gray-300">{((selectedToken.volume24h * selectedToken.price) / 1000000).toFixed(3)}M</span>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <ComposedChart data={chartData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#30363d"
                    tick={{ fill: '#6e7681', fontSize: 10 }}
                    axisLine={{ stroke: '#30363d' }}
                    tickLine={{ stroke: '#30363d' }}
                  />
                  <Bar 
                    dataKey="volume"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.candleColor} opacity={0.7} />
                    ))}
                  </Bar>
                  <Line 
                    type="monotone"
                    dataKey="volumeMA"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    dot={false}
                    connectNulls
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="bg-[#0d1117] border-t border-gray-800">
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setBottomTab('open')}
                className={`px-4 py-2 text-sm ${
                  bottomTab === 'open'
                    ? 'text-gray-200 border-b-2 border-[#3fb950]'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Open Orders
              </button>
              <button
                onClick={() => setBottomTab('closed')}
                className={`px-4 py-2 text-sm ${
                  bottomTab === 'closed'
                    ? 'text-gray-200 border-b-2 border-[#3fb950]'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Closed
              </button>
              <button
                onClick={() => setBottomTab('history')}
                className={`px-4 py-2 text-sm ${
                  bottomTab === 'history'
                    ? 'text-gray-200 border-b-2 border-[#3fb950]'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Trades History
              </button>
              <div className="flex-1" />
              <button className="px-4 py-2 text-xs text-gray-500 hover:text-gray-300">
                <span className="flex items-center gap-1">
                  <input type="checkbox" className="rounded" />
                  Show this pair only
                </span>
              </button>
            </div>
            
            {/* Empty State */}
            <div className="h-48 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                <BarChart2 size={24} className="text-gray-600" />
              </div>
              <div className="text-sm text-gray-500">No data</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Orderbook & Trading */}
        <div className="w-96 bg-[#0d1117] border-l border-gray-800 flex flex-col">
          {/* Orderbook Header */}
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="text-sm font-semibold">Orderbook</div>
            <div className="flex items-center gap-2">
              <select className="bg-[#161b22] border border-gray-700 rounded px-2 py-1 text-xs">
                <option>0.0001</option>
              </select>
              <button className="p-1 hover:bg-gray-800 rounded">
                <Menu size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Orderbook Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-1/2 overflow-y-auto">
              {/* Orderbook Headers */}
              <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs text-gray-500 border-b border-gray-800 sticky top-0 bg-[#0d1117]">
                <div>Price (CROSS)</div>
                <div className="text-right">Change</div>
                <div className="text-right">Amount</div>
              </div>
              
              {/* Asks (Red) */}
              <div className="px-4">
                {asks.slice(0, 15).map((ask, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 py-0.5 text-xs hover:bg-gray-900/50">
                    <div className="text-red-500 font-mono">{ask.price}</div>
                    <div className="text-right text-red-500">{ask.change}%</div>
                    <div className="text-right text-gray-400">{ask.volume.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Price */}
            <div className="px-4 py-2 bg-[#161b22] border-y border-gray-800">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-[#3fb950]">{selectedToken.price.toFixed(4)} ▲</div>
                <div className="text-xs text-gray-500">≈ ${(selectedToken.price * 2.5).toFixed(4)}</div>
              </div>
            </div>

            {/* Bids (Green) */}
            <div className="h-1/2 overflow-y-auto px-4">
              {bids.slice(0, 15).map((bid, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 py-0.5 text-xs hover:bg-gray-900/50">
                  <div className="text-[#3fb950] font-mono">{bid.price}</div>
                  <div className="text-right text-[#3fb950]">{bid.change}%</div>
                  <div className="text-right text-gray-400">{bid.volume.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Far Right - Trading Panel */}
        <div className="w-80 bg-[#0d1117] border-l border-gray-800">
          {/* Buy/Sell Tabs */}
          <div className="grid grid-cols-2">
            <button
              onClick={() => setBuySell('buy')}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
                buySell === 'buy'
                  ? 'border-[#3fb950] text-[#3fb950] bg-[#3fb950]/5'
                  : 'border-gray-800 text-gray-500'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setBuySell('sell')}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
                buySell === 'sell'
                  ? 'border-red-500 text-red-500 bg-red-500/5'
                  : 'border-gray-800 text-gray-500'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Order Type */}
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setOrderType('limit')}
                className={`flex items-center gap-2 flex-1 justify-center px-3 py-2 rounded text-sm transition-colors ${
                  orderType === 'limit'
                    ? 'bg-[#21262d] text-gray-200'
                    : 'bg-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                <input type="radio" checked={orderType === 'limit'} readOnly />
                Limit
              </button>
              <button
                onClick={() => setOrderType('market')}
                className={`flex items-center gap-2 flex-1 justify-center px-3 py-2 rounded text-sm transition-colors ${
                  orderType === 'market'
                    ? 'bg-[#21262d] text-gray-200'
                    : 'bg-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                <input type="radio" checked={orderType === 'market'} readOnly />
                Market
              </button>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-500">Price (CROSS)</label>
                <button className="text-xs text-gray-500 hover:text-gray-300">
                  <Plus size={12} className="inline" />
                </button>
              </div>
              <Input
                type="number"
                defaultValue={selectedToken.price.toFixed(4)}
                className="bg-[#161b22] border-gray-700 text-sm"
              />
            </div>

            {/* Total */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-500">Total (CROSS)</label>
                <div className="text-xs text-gray-500">GTC</div>
              </div>
              <Input
                type="number"
                placeholder="0"
                className="bg-[#161b22] border-gray-700 text-sm"
              />
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-500">Amount</label>
                <div className="text-xs text-gray-500">0 {selectedToken.symbol}</div>
              </div>
              <Input
                type="number"
                placeholder="0"
                className="bg-[#161b22] border-gray-700 text-sm"
              />
            </div>

            {/* Advanced Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
            >
              Advanced <Info size={12} />
            </button>

            {/* Stats */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Total (CROSS)</span>
                <span>0.0000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span>0.0000</span>
              </div>
            </div>

            {/* Trading Rules */}
            <div className="pt-2 border-t border-gray-800">
              <div className="text-xs font-semibold mb-2">Trading Rules</div>
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Tick Size</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span>Tick Size</span>
                  <span>0.0001</span>
                </div>
                <div className="flex justify-between">
                  <span>Maker: 1%</span>
                </div>
                <div className="flex justify-between">
                  <span>Taker: 1%</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Order Size</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Order Size</span>
                  <span>4 CROSS</span>
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <Button
              className={`w-full font-bold ${
                buySell === 'buy'
                  ? 'bg-[#3fb950] hover:bg-[#2ea043] text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {buySell === 'buy' ? 'Buy' : 'Sell'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}