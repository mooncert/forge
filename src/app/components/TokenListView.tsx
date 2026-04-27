import { TrendingUp, TrendingDown } from "lucide-react";
import { TokenData } from "./TokenCard";
import { useTheme } from "../App";

interface TokenListViewProps {
  tokens: TokenData[];
  onSelectToken: (token: TokenData) => void;
}

export function TokenListView({ tokens, onSelectToken }: TokenListViewProps) {
  const { effectiveTheme } = useTheme();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(6)}`;
  };

  return (
    <div className={`w-full overflow-x-auto ${effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-xl`}>
      <table className="w-full">
        <thead>
          <tr className={`border-b ${effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              #
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              Coin
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              Price
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              24h %
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              Market Cap
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              Volume (24h)
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              Holders
            </th>
            <th className={`px-4 py-3 text-left text-xs font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
              Liquidity
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr
              key={token.id}
              onClick={() => onSelectToken(token)}
              className={`border-b cursor-pointer transition-colors ${
                effectiveTheme === 'dark'
                  ? 'border-gray-800 hover:bg-gray-800/50'
                  : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              <td className="px-4 py-4">
                <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  #{index + 1}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className={`font-semibold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {token.name} | {token.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatPrice(token.price)}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className={`flex items-center gap-1 font-semibold ${
                  token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {token.priceChange24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(token.priceChange24h).toFixed(2)}%
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumber(token.marketCap)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumber(token.volume24h)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {token.holders.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`font-semibold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumber(token.liquidity)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}