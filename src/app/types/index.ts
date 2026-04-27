// 공통 타입 정의

export type Tier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
export type View = "explore" | "token" | "create" | "portfolio" | "history" | "market" | "comparison" | "referral" | "design-system" | "agent-skills";
export type Theme = "light" | "dark" | "system";
export type Category = "Game" | "AI Agent";

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  gameTitle: string;
  image: string;
  gameImage?: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  liquidity: number;
  virtualReserve: number;
  bondingProgress: number;
  creatorAddress: string;
  replies: number;
  description: string;
  category?: Category;
}

export interface ThemeContextType {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

export interface Trade {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
  user: string;
  txHash: string;
}

export interface Holder {
  address: string;
  fullAddress: string;
  percentage: number;
}