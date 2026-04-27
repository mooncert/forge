import { useState } from "react";
import { Clock, ExternalLink, Search, X, ArrowUpRight, ArrowDownLeft, ArrowRight, ChevronUp, ChevronDown, ArrowLeft, RefreshCw, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useTheme } from "../App";
import crossIcon from "figma:asset/310adedabfd22f48a397c51de763ba1bc687b3ca.png";
import fbfTokenImage from "figma:asset/c66235bc62b378efff9e754ca0700cc536db5a51.png";

interface Transaction {
  id: string;
  type: "swap" | "bridge";
  timestamp: string;
  fromToken: {
    symbol: string;
    amount: string;
  };
  toToken: {
    symbol: string;
    amount: string;
  };
  status: "completed" | "pending" | "failed";
  txHash: string;
  route?: string;
  fees?: {
    validator?: string;
    network?: string;
    swap?: string;
  };
  gasUsed?: string;
  gasPrice?: string;
}

interface PoolTransaction {
  id: string;
  txHash: string;
  type: string;
  token1?: {
    symbol: string;
    amount: string;
    icon?: string;
  };
  token2?: {
    symbol: string;
    amount: string;
    icon?: string;
  };
  dateTime: string;
}

interface TransferTransaction {
  id: string;
  action: "TransferIn" | "TransferOut";
  from: string;
  to: string;
  amount: string;
  tokenSymbol: string;
  date: string;
  txHash: string;
  blockNumber: string;
  status: "completed" | "pending" | "failed";
  txFee?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "swap",
    timestamp: "2025-03-01 14:59:51",
    fromToken: { symbol: "CROSS", amount: "100.1234" },
    toToken: { symbol: "NBD", amount: "100.1234" },
    status: "completed",
    txHash: "0xd69...1234",
    fees: { swap: "0.0001" },
    gasUsed: "120966",
    gasPrice: "3 Gwei",
  },
  {
    id: "2",
    type: "swap",
    timestamp: "2025-03-01 14:55:31",
    fromToken: { symbol: "CROSS", amount: "100.1234" },
    toToken: { symbol: "NBD", amount: "100.1234" },
    status: "pending",
    txHash: "0xd69...5678",
    fees: { swap: "0.0001" },
  },
  {
    id: "3",
    type: "swap",
    timestamp: "2025-03-01 14:28:45",
    fromToken: { symbol: "NBD", amount: "100.1234" },
    toToken: { symbol: "CROSS", amount: "100.1234" },
    status: "failed",
    txHash: "0xd69...9012",
    route: "BSC > CROSS",
    fees: {
      validator: "0.1234",
      network: "0.1234",
    },
  },
];

const mockPoolTransactions: PoolTransaction[] = [
  {
    id: "1",
    txHash: "0x7a1f...2af3",
    type: "Add Liquidity",
    token1: { symbol: "FBF", amount: "1,651" },
    token2: { symbol: "FBF", amount: "1,651" },
    dateTime: "2026-01-19 02:12:02"
  },
  {
    id: "2",
    txHash: "0x7a1f...2af3",
    type: "Add Liquidity",
    token1: { symbol: "FBF", amount: "1,651" },
    token2: { symbol: "FBF", amount: "1,651" },
    dateTime: "2026-01-19 02:12:02"
  },
  {
    id: "3",
    txHash: "0x7a1f...2af3",
    type: "Add Liquidity",
    token1: { symbol: "FBF", amount: "1,651" },
    token2: { symbol: "FBF", amount: "1,651" },
    dateTime: "2026-01-19 02:12:02"
  },
  {
    id: "4",
    txHash: "0x7a1f...2af3",
    type: "Remove Liquidity",
    token1: { symbol: "FBF", amount: "1,651" },
    token2: { symbol: "FBF", amount: "1,651" },
    dateTime: "2026-01-19 02:12:02"
  },
  {
    id: "5",
    txHash: "0x7a1f...2af3",
    type: "Add Liquidity",
    token1: { symbol: "FBF", amount: "1,651" },
    token2: { symbol: "FBF", amount: "1,651" },
    dateTime: "2026-01-19 02:12:02"
  }
];

const mockTransferTransactions: TransferTransaction[] = [
  {
    id: "t1",
    action: "TransferIn",
    from: "0x3748...0eEB",
    to: "0x7a2f...9c4D",
    amount: "500.0000",
    tokenSymbol: "CROSS",
    date: "2025-03-15 09:23:41",
    txHash: "0xd69a...1234",
    blockNumber: "18,234,567",
    status: "completed",
    txFee: "0.00036289",
  },
  {
    id: "t2",
    action: "TransferOut",
    from: "0x7a2f...9c4D",
    to: "0x91bC...3fA1",
    amount: "1,200.0000",
    tokenSymbol: "CROSS",
    date: "2025-03-14 15:47:12",
    txHash: "0xa3f1...5678",
    blockNumber: "18,234,102",
    status: "completed",
    txFee: "0.00041523",
  },
  {
    id: "t3",
    action: "TransferIn",
    from: "0xfE29...7dB2",
    to: "0x7a2f...9c4D",
    amount: "250.5000",
    tokenSymbol: "FBF",
    date: "2025-03-13 22:11:05",
    txHash: "0xb8e2...9abc",
    blockNumber: "18,233,890",
    status: "completed",
    txFee: "0.00028714",
  },
  {
    id: "t4",
    action: "TransferOut",
    from: "0x7a2f...9c4D",
    to: "0x44aD...eC08",
    amount: "75.0000",
    tokenSymbol: "CROSS",
    date: "2025-03-12 08:35:29",
    txHash: "0xc7d4...def0",
    blockNumber: "18,233,451",
    status: "pending",
    txFee: "0.00033100",
  },
  {
    id: "t5",
    action: "TransferIn",
    from: "0x12eF...8aB3",
    to: "0x7a2f...9c4D",
    amount: "3,000.0000",
    tokenSymbol: "MOLTZ",
    date: "2025-03-11 14:02:58",
    txHash: "0xe5f6...1122",
    blockNumber: "18,232,998",
    status: "completed",
    txFee: "0.00039876",
  },
];

export function History({ onBack }: { onBack: () => void }) {
  const { effectiveTheme } = useTheme();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isTxFeeExpanded, setIsTxFeeExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"buysell" | "pool" | "transfer">("buysell");
  const [selectedTransfer, setSelectedTransfer] = useState<TransferTransaction | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(id);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className={`min-h-screen pb-8 ${effectiveTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className={`mb-6 md:mb-8 ${
            effectiveTheme === 'dark'
              ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("buysell")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "buysell"
                ? effectiveTheme === 'dark'
                  ? 'bg-[#56C880] text-white'
                  : 'bg-[#56C880] text-white'
                : effectiveTheme === 'dark'
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Buy & Sell
          </button>
          <button
            onClick={() => setActiveTab("pool")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "pool"
                ? effectiveTheme === 'dark'
                  ? 'bg-[#56C880] text-white'
                  : 'bg-[#56C880] text-white'
                : effectiveTheme === 'dark'
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Pool
          </button>
          <button
            onClick={() => setActiveTab("transfer")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "transfer"
                ? effectiveTheme === 'dark'
                  ? 'bg-[#56C880] text-white'
                  : 'bg-[#56C880] text-white'
                : effectiveTheme === 'dark'
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Transfer
          </button>
        </div>

        {/* Buy & Sell Tab Content */}
        {activeTab === "buysell" && (
          <Card 
            className={`border ${
              effectiveTheme === 'dark' 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-gray-200'
            }`}
            style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}
          >
            {/* Refresh Button */}
            <div className={`px-4 py-3 border-b ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <RefreshCw size={16} />
                <span className="text-sm font-medium">Refresh</span>
              </button>
            </div>

            {/* Table Wrapper with Horizontal Scroll */}
            <div className="overflow-x-auto">
              {/* Table Container with min-width for scroll */}
              <div className="min-w-[720px]">
                {/* Table Header */}
                <div className={`grid grid-cols-[1.2fr_1.2fr_1fr_0.8fr_1.2fr] gap-4 px-4 py-3 border-b ${
                  effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <div className={`text-sm font-medium ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    From
                  </div>
                  <div className={`text-sm font-medium ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    To
                  </div>
                  <div className={`text-sm font-medium text-right ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    USD Value
                  </div>
                  <div className={`text-sm font-medium text-center ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Side
                  </div>
                  <div className={`text-sm font-medium ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Date(UTC+0)
                  </div>
                </div>

                {/* Table Rows */}
                <div>
                  {mockTransactions.map((tx, index) => {
                    const isLast = index === mockTransactions.length - 1;
                    // Calculate USD value based on CROSS amount
                    const crossAmount = tx.fromToken.symbol === "CROSS" 
                      ? parseFloat(tx.fromToken.amount.replace(/,/g, ''))
                      : parseFloat(tx.toToken.amount.replace(/,/g, ''));
                    const usdValue = crossAmount * 2.5;
                    
                    return (
                      <div
                        key={tx.id}
                        className={`grid grid-cols-[1.2fr_1.2fr_1fr_0.8fr_1.2fr] gap-4 px-4 py-4 cursor-pointer transition-colors ${
                          !isLast ? 'border-b' : ''
                        } ${
                          effectiveTheme === 'dark' 
                            ? `${!isLast ? 'border-gray-800' : ''} hover:bg-gray-800/50`
                            : `${!isLast ? 'border-gray-200' : ''} hover:bg-gray-50`
                        }`}
                        onClick={() => setSelectedTx(tx)}
                      >
                        {/* From */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#56C880] to-[#45B570] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {tx.fromToken.symbol === "CROSS" ? (
                              <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white text-xs font-bold">
                                {tx.fromToken.symbol.slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${
                              effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                            }`}>
                              {tx.fromToken.symbol}
                            </div>
                            <div className={`text-xs ${
                              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {tx.fromToken.amount}
                            </div>
                          </div>
                        </div>

                        {/* To */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {tx.toToken.symbol === "CROSS" ? (
                              <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white text-xs font-bold">
                                {tx.toToken.symbol.slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${
                              effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                            }`}>
                              {tx.toToken.symbol}
                            </div>
                            <div className={`text-xs ${
                              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {tx.toToken.amount}
                            </div>
                          </div>
                        </div>

                        {/* USD Value */}
                        <div className="flex items-center justify-end">
                          <div className={`text-sm font-medium ${
                            effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                          }`}>
                            ${usdValue.toFixed(2)}
                          </div>
                        </div>

                        {/* Side */}
                        <div className="flex items-center justify-center">
                          <Badge
                            className={
                              tx.fromToken.symbol === "CROSS" && tx.toToken.symbol === "NBD"
                                ? "bg-[#56C880]/20 text-[#56C880]"
                                : tx.fromToken.symbol === "NBD" && tx.toToken.symbol === "CROSS"
                                ? "bg-red-500/20 text-red-500"
                                : "bg-blue-500/20 text-blue-500"
                            }
                          >
                            {tx.fromToken.symbol === "CROSS" && tx.toToken.symbol === "NBD"
                              ? "Buy"
                              : tx.fromToken.symbol === "NBD" && tx.toToken.symbol === "CROSS"
                              ? "Sell"
                              : "Bridge"}
                          </Badge>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col justify-center">
                          <div className={`text-sm font-medium ${
                            effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                          }`}>
                            {tx.timestamp.split(" ")[0]}
                          </div>
                          <div className={`text-xs ${
                            effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {tx.timestamp.split(" ")[1]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Pool Tab Content */}
        {activeTab === "pool" && (
          <Card 
            className={`border ${
              effectiveTheme === 'dark' 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-gray-200'
            }`}
            style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}
          >
            {/* Refresh Button */}
            <div className={`px-4 py-3 border-b ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <RefreshCw size={16} />
                <span className="text-sm font-medium">Refresh</span>
              </button>
            </div>

            {/* Table Wrapper with Horizontal Scroll */}
            <div className="overflow-x-auto">
              {/* Table Container with min-width for scroll */}
              <div className="min-w-[600px]">
                {/* Table Header */}
                <div className={`grid grid-cols-[1fr_0.8fr_0.8fr_1fr] gap-4 px-4 py-3 border-b ${
                  effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <div className={`text-sm font-medium ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    TxHash
                  </div>
                  <div className={`text-sm font-medium ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Type
                  </div>
                  <div className={`text-sm font-medium text-center ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Amount
                  </div>
                  <div className={`text-sm font-medium ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Date(UTC+0)
                  </div>
                </div>

                {/* Table Rows */}
                <div>
                  {mockPoolTransactions.map((tx, index) => {
                    const isLast = index === mockPoolTransactions.length - 1;
                    
                    return (
                      <div
                        key={tx.id}
                        className={`grid grid-cols-[1fr_0.8fr_0.8fr_1fr] gap-4 px-4 py-4 transition-colors ${
                          !isLast ? 'border-b' : ''
                        } ${
                          effectiveTheme === 'dark' 
                            ? `${!isLast ? 'border-gray-800' : ''} hover:bg-gray-800/50`
                            : `${!isLast ? 'border-gray-200' : ''} hover:bg-gray-50`
                        }`}
                      >
                        {/* TxHash */}
                        <div className="flex items-center gap-1">
                          <a
                            href={`https://explorer.crosstoken.io/612055/tx/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-mono hover:underline ${
                              effectiveTheme === 'dark' ? 'text-[#56C880]' : 'text-[#56C880]'
                            }`}
                          >
                            {tx.txHash}
                          </a>
                          <button
                            onClick={() => handleCopy(tx.txHash, `hash-${tx.id}`)}
                            className={`flex-shrink-0 transition-colors ${
                              effectiveTheme === 'dark'
                                ? 'text-gray-500 hover:text-gray-300'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            <ExternalLink size={14} />
                          </button>
                        </div>

                        {/* Type */}
                        <div className="flex items-center">
                          <span className={`text-sm ${
                            effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                          }`}>
                            {tx.type}
                          </span>
                        </div>

                        {/* Amount - Show two tokens side by side */}
                        <div className="flex items-center justify-center gap-6">
                          {tx.token1 && (
                            <div className="flex items-center gap-1">
                              {tx.token1.symbol === "CROSS" && (
                                <img 
                                  src={crossIcon} 
                                  alt="CROSS" 
                                  className="w-5 h-5 object-cover"
                                />
                              )}
                              {tx.token1.symbol === "FBF" && (
                                <img 
                                  src={fbfTokenImage} 
                                  alt="FBF" 
                                  className="w-5 h-5 object-cover"
                                />
                              )}
                              <span className={`text-sm font-medium ${
                                tx.token1.amount.startsWith("-") 
                                  ? 'text-red-500' 
                                  : tx.token1.amount.startsWith("+")
                                  ? 'text-[#56C880]'
                                  : effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                              }`}>
                                {tx.token1.amount}
                              </span>
                            </div>
                          )}
                          {tx.token2 && (
                            <div className="flex items-center gap-1">
                              {tx.token2.symbol === "CROSS" && (
                                <img 
                                  src={crossIcon} 
                                  alt="CROSS" 
                                  className="w-5 h-5 object-cover"
                                />
                              )}
                              {tx.token2.symbol === "FBF" && (
                                <img 
                                  src={fbfTokenImage} 
                                  alt="FBF" 
                                  className="w-5 h-5 object-cover"
                                />
                              )}
                              <span className={`text-sm font-medium ${
                                tx.token2.amount.startsWith("-") 
                                  ? 'text-red-500' 
                                  : tx.token2.amount.startsWith("+")
                                  ? 'text-[#56C880]'
                                  : effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                              }`}>
                                {tx.token2.amount}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Date - Show on one line */}
                        <div className="flex flex-col justify-center">
                          <div className={`text-sm ${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {tx.dateTime.split(" ")[0]}
                          </div>
                          <div className={`text-xs ${
                            effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {tx.dateTime.split(" ")[1]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Transfer Tab Content */}
        {activeTab === "transfer" && (
          <Card
            className={`border ${
              effectiveTheme === 'dark'
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}
            style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}
          >
            <div className={`flex items-center justify-between p-4 border-b ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <h3 className={`font-semibold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Transfer History
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className={effectiveTheme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}
              >
                <RefreshCw size={16} />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <div style={{ minWidth: '860px' }}>
                {/* Header */}
                <div className={`grid grid-cols-[1fr_1fr_1.2fr_0.8fr_1fr] gap-4 px-4 py-3 text-xs font-medium border-b ${
                  effectiveTheme === 'dark'
                    ? 'text-gray-500 border-gray-800 bg-gray-800/50'
                    : 'text-gray-500 border-gray-200 bg-gray-50'
                }`}>
                  <div>From</div>
                  <div>To</div>
                  <div>Amount</div>
                  <div className="text-center">Action</div>
                  {/* <div>TxHash</div> */}
                  <div>Date(UTC+0)</div>
                </div>

                {/* Rows */}
                {mockTransferTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => setSelectedTransfer(tx)}
                    className={`grid grid-cols-[1fr_1fr_1.2fr_0.8fr_1fr] gap-4 px-4 py-3 items-center border-b cursor-pointer transition-colors ${
                      effectiveTheme === 'dark'
                        ? 'border-gray-800 hover:bg-gray-800/50'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {/* From */}
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-mono ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tx.from}
                      </span>
                      <a
                        href={`https://explorer.crosstoken.io/612055/address/${tx.from}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} className={effectiveTheme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} />
                      </a>
                    </div>

                    {/* To */}
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-mono ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tx.to}
                      </span>
                      <a
                        href={`https://explorer.crosstoken.io/612055/address/${tx.to}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} className={effectiveTheme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} />
                      </a>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#56C880] to-[#45B570] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {tx.tokenSymbol === "CROSS" ? (
                          <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover" />
                        ) : tx.tokenSymbol === "MOLTZ" ? (
                          <img src="https://console-contents.crosstoken.io/builder/mcp/019c9e85-44af-7290-a561-46418aa9d605/019c9e85-44d1-740e-8774-17b16c8a5bf5.png" alt="MOLTZ" className="w-full h-full object-cover" />
                        ) : (
                          <img src={fbfTokenImage} alt={tx.tokenSymbol} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {tx.tokenSymbol}
                        </div>
                        <div className={`text-xs ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          {tx.amount}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex justify-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.action === "TransferIn"
                          ? 'bg-[#56C880]/20 text-[#56C880]'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {tx.action === "TransferIn" ? "Transfer In" : "Transfer Out"}
                      </span>
                    </div>

                    {/* TxHash */}
                    {/* <div className="flex items-center gap-1">
                      <a
                        href={`https://explorer.crosstoken.io/612055/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#56C880] hover:underline font-mono"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tx.txHash}
                      </a>
                      <ExternalLink size={12} className="text-[#56C880] flex-shrink-0" />
                    </div> */}

                    {/* Date */}
                    <div>
                      <div className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tx.date.split(' ')[0]}
                      </div>
                      <div className={`text-xs ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {tx.date.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {((activeTab === "buysell" && mockTransactions.length === 0) ||
          (activeTab === "pool" && mockPoolTransactions.length === 0) ||
          (activeTab === "transfer" && mockTransferTransactions.length === 0)) && (
          <div className="text-center py-16">
            <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              No transactions found
            </p>
          </div>
        )}
      </div>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
        <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
          effectiveTheme === 'dark' 
            ? 'bg-gray-900 border-gray-800 text-gray-100' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          {selectedTx && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Transaction Details</DialogTitle>
                <DialogDescription className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedTx.timestamp}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                {/* Transaction Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#56C880] to-[#45B570] flex items-center justify-center overflow-hidden">
                        {selectedTx.fromToken.symbol === "CROSS" ? (
                          <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-bold">
                            {selectedTx.fromToken.symbol.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className={`font-semibold ${
                          effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedTx.fromToken.symbol}</p>
                        <p className={`text-sm ${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{selectedTx.fromToken.amount}</p>
                      </div>
                    </div>
                    <ArrowRight size={20} className={`${
                      effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center overflow-hidden">
                        {selectedTx.toToken.symbol === "CROSS" ? (
                          <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-bold">
                            {selectedTx.toToken.symbol.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className={`font-semibold ${
                          effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{selectedTx.toToken.symbol}</p>
                        <p className={`text-sm ${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{selectedTx.toToken.amount}</p>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      selectedTx.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : selectedTx.status === "pending"
                        ? "bg-orange-500/20 text-orange-500"
                        : "bg-red-500/20 text-red-500"
                    }
                  >
                    {selectedTx.status.charAt(0).toUpperCase() + selectedTx.status.slice(1)}
                  </Badge>
                </div>

                {/* Transaction Hash */}
                <div className={`rounded-lg p-4 ${
                  effectiveTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Transaction Hash</span>
                    <a
                      href="#"
                      className="text-[#56C880] hover:underline flex items-center gap-1 font-mono text-sm break-all"
                    >
                      {selectedTx.txHash}
                      <ExternalLink size={14} className="flex-shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Bridge Info */}
                {selectedTx.type === "bridge" && selectedTx.route && (
                  <div className={`rounded-lg p-4 ${
                    effectiveTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}>
                    <h4 className={`font-semibold mb-3 ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Bridge Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Route</span>
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}>{selectedTx.route}</span>
                      </div>
                      {selectedTx.fees?.validator && (
                        <div className="flex justify-between">
                          <span className={`${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Validator Fee</span>
                          <span className={`${
                            effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                          }`}>{selectedTx.fees.validator}</span>
                        </div>
                      )}
                      {selectedTx.fees?.network && (
                        <div className="flex justify-between">
                          <span className={`${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Network Fee</span>
                          <span className={`${
                            effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                          }`}>{selectedTx.fees.network}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Swap Info */}
                {selectedTx.type === "swap" && (
                  <div className={`rounded-lg p-4 ${
                    effectiveTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}>
                    <h4 className={`font-semibold mb-3 ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Swap Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Route</span>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#56C880] to-[#45B570]" />
                          <ArrowRight size={12} className={`${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <div className="w-5 h-5 rounded-full bg-gray-600" />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>In Amount</span>
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}>{selectedTx.fromToken.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Swap Fee (0.01%)</span>
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}>{selectedTx.fees?.swap || "0.0001"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Out Amount</span>
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}>{selectedTx.toToken.amount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tx Fee */}
                <div className={`rounded-lg p-4 ${
                  effectiveTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                }`}>
                  <h4 className={`font-semibold mb-3 ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Transaction Fee</h4>
                  <div className="space-y-2 text-sm">
                    <button
                      onClick={() => setIsTxFeeExpanded(!isTxFeeExpanded)}
                      className={`w-full flex justify-between items-center p-2 rounded transition-colors ${
                        effectiveTheme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-200/50'
                      }`}
                    >
                      <span className={`${
                        effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Tx Fee</span>
                      <div className="flex items-center gap-2">
                        <img 
                          src={crossIcon} 
                          alt="CROSS" 
                          className="w-4 h-4"
                        />
                        <span className={`${
                          effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}>0.00036289 CROSS</span>
                        {isTxFeeExpanded ? (
                          <ChevronUp size={16} className={`${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        ) : (
                          <ChevronDown size={16} className={`${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        )}
                      </div>
                    </button>
                    
                    {isTxFeeExpanded && (
                      <div className={`pl-4 space-y-2 border-l-2 ml-2 ${
                        effectiveTheme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                      }`}>
                        {selectedTx.gasPrice && (
                          <div className="flex justify-between">
                            <span className={`${
                              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                            }`}>Effective Gas Price</span>
                            <span className={`${
                              effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                            }`}>{selectedTx.gasPrice}</span>
                          </div>
                        )}
                        {selectedTx.gasUsed && (
                          <div className="flex justify-between">
                            <span className={`${
                              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                            }`}>Gas Used</span>
                            <span className={`${
                              effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                            }`}>{selectedTx.gasUsed}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-2">
                      <span className={`${
                        effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Status</span>
                      <span
                        className={
                          selectedTx.status === "completed"
                            ? "text-green-500"
                            : selectedTx.status === "pending"
                            ? "text-orange-500"
                            : "text-red-500"
                        }
                      >
                        {selectedTx.status === "completed"
                          ? "Success"
                          : selectedTx.status === "pending"
                          ? "Pending"
                          : "Bridge Failed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Transfer Detail Dialog */}
      <Dialog open={!!selectedTransfer} onOpenChange={() => setSelectedTransfer(null)}>
        <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
          effectiveTheme === 'dark'
            ? 'bg-gray-900 border-gray-800 text-gray-100'
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          {selectedTransfer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Transaction Details</DialogTitle>
                <DialogDescription className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedTransfer.date}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Transfer Summary */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {selectedTransfer.tokenSymbol === "CROSS" ? (
                        <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover" />
                      ) : selectedTransfer.tokenSymbol === "MOLTZ" ? (
                        <img src="https://console-contents.crosstoken.io/builder/mcp/019c9e85-44af-7290-a561-46418aa9d605/019c9e85-44d1-740e-8774-17b16c8a5bf5.png" alt="MOLTZ" className="w-full h-full object-cover" />
                      ) : (
                        <img src={fbfTokenImage} alt={selectedTransfer.tokenSymbol} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div className={`font-bold text-lg ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {selectedTransfer.tokenSymbol}
                      </div>
                      <div className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedTransfer.amount}
                      </div>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedTransfer.status === "completed"
                      ? 'bg-[#56C880]/20 text-[#56C880]'
                      : selectedTransfer.status === "pending"
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedTransfer.status === "completed" ? "Completed" : selectedTransfer.status === "pending" ? "Pending" : "Failed"}
                  </span>
                </div>

                {/* Transaction Hash */}
                <div className={`rounded-lg p-4 ${
                  effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Transaction Hash
                    </span>
                    <a
                      href={`https://explorer.crosstoken.io/612055/tx/${selectedTransfer.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#56C880] hover:underline flex items-center gap-1 break-all"
                    >
                      {selectedTransfer.txHash}
                      <ExternalLink size={14} className="flex-shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Transfer Info */}
                <div className={`rounded-lg p-4 space-y-4 ${
                  effectiveTheme === 'dark' ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <h4 className={`font-bold text-lg ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Transfer Info
                  </h4>
                  <div className="flex justify-between">
                    <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Block Number
                    </span>
                    <span className={effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>
                      #{selectedTransfer.blockNumber.replace(/,/g, '')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      From
                    </span>
                    <span className={`font-mono text-sm ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {selectedTransfer.from}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      To
                    </span>
                    <span className={`font-mono text-sm ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {selectedTransfer.to}
                    </span>
                  </div>
                </div>

                {/* Transaction Fee */}
                <div className={`rounded-lg p-4 ${
                  effectiveTheme === 'dark' ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <h4 className={`font-bold text-lg mb-3 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Transaction Fee
                  </h4>
                  <div className="space-y-2 text-sm">
                    <button
                      onClick={() => setIsTxFeeExpanded(!isTxFeeExpanded)}
                      className={`w-full flex justify-between items-center p-2 rounded transition-colors ${
                        effectiveTheme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-200/50'
                      }`}
                    >
                      <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Tx Fee
                      </span>
                      <div className="flex items-center gap-2">
                        <img src={crossIcon} alt="CROSS" className="w-4 h-4" />
                        <span className={effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>
                          {selectedTransfer.txFee || "0.00036289"} CROSS
                        </span>
                        {isTxFeeExpanded ? (
                          <ChevronUp size={16} className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        ) : (
                          <ChevronDown size={16} className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        )}
                      </div>
                    </button>
                    {isTxFeeExpanded && (
                      <div className={`pl-4 space-y-2 border-l-2 ml-2 ${
                        effectiveTheme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                      }`}>
                        <div className="flex justify-between">
                          <span className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                            Effective Gas Price
                          </span>
                          <span className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            3 Gwei
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                            Gas Used
                          </span>
                          <span className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            120966
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between pt-2">
                      <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Status
                      </span>
                      <span className={
                        selectedTransfer.status === "completed"
                          ? 'text-[#56C880] font-semibold'
                          : selectedTransfer.status === "pending"
                          ? 'text-orange-400 font-semibold'
                          : 'text-red-400 font-semibold'
                      }>
                        {selectedTransfer.status === "completed" ? "Success" : selectedTransfer.status === "pending" ? "Pending" : "Failed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}