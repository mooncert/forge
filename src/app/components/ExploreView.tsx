import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  DollarSign,
  Flame,
  BarChart3,
  Clock,
  MessageCircle,
  Star,
  Loader2,
  Trophy,
} from "lucide-react";
import { TokenCard } from "./TokenCard";
import { TokenListView } from "./TokenListView";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "../App";
import { Hero } from "./Hero";
import type { TokenData } from "../types";

interface ExploreViewProps {
  tokens: TokenData[];
  onSelectToken: (token: TokenData) => void;
  onCreateClick?: () => void;
  onAgentSkillsClick?: () => void;
}

export function ExploreView({
  tokens,
  onSelectToken,
  onCreateClick,
  onAgentSkillsClick,
}: ExploreViewProps) {
  const { effectiveTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    | "marketcap"
    | "volume"
    | "trending"
    | "new"
    | "favorites"
    | "hof"
  >("marketcap");
  const [viewType, setViewType] = useState<"grid" | "list">(
    "grid",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<
    "All" | "Game" | "AI Agent"
  >("All");
  const ITEMS_PER_PAGE = 20;

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      token.symbol
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      token.gameTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      (categoryFilter === "Game" &&
        (!token.category || token.category === "Game")) ||
      (categoryFilter === "AI Agent" &&
        token.category === "AI Agent");

    return matchesSearch && matchesCategory;
  });

  const sortedTokens = useMemo(() => {
    // First, filter for graduation if that's selected
    let tokensToSort =
      sortBy === "hof"
        ? filteredTokens.filter(
            (token) => token.bondingProgress >= 100,
          )
        : filteredTokens;

    // Helper function to get tier order (lower number = higher priority)
    const getTierOrder = (progress: number) => {
      if (progress >= 100) return 1; // Graduation
      if (progress >= 80) return 2; // Diamond
      if (progress >= 70) return 3; // Platinum
      if (progress >= 50) return 4; // Gold
      if (progress >= 20) return 5; // Silver
      if (progress >= 5) return 6; // Bronze
      return 7; // Inactive
    };

    // Then sort the filtered tokens
    return [...tokensToSort].sort((a, b) => {
      switch (sortBy) {
        case "marketcap":
          return b.marketCap - a.marketCap;
        case "volume":
          return b.volume24h - a.volume24h;
        case "trending":
          return b.priceChange24h - a.priceChange24h;
        case "new":
          return b.id.localeCompare(a.id);
        case "hof":
          // Sort graduated tokens by market cap
          return b.marketCap - a.marketCap;
        default:
          // Default: Sort by tier (Graduation > Diamond > Platinum > Gold > Silver > Bronze)
          const tierDiff =
            getTierOrder(a.bondingProgress || 0) -
            getTierOrder(b.bondingProgress || 0);
          if (tierDiff !== 0) return tierDiff;
          // Within same tier, sort by market cap
          return b.marketCap - a.marketCap;
      }
    });
  }, [sortBy, filteredTokens]);

  // Reset currentPage when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, searchQuery, categoryFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(
    sortedTokens.length / ITEMS_PER_PAGE,
  );
  const paginatedTokens = sortedTokens.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div
      className={`min-h-screen ${effectiveTheme === "dark" ? "bg-gray-950" : "bg-gray-50"}`}
    >
      {/* Hero Section */}
      <Hero
        onLaunchClick={() => onCreateClick && onCreateClick()}
        featuredTokens={tokens}
        onSelectToken={onSelectToken}
        onAgentSkillsClick={onAgentSkillsClick}
      />

      {/* Category Tabs */}
      <div className="w-full px-4 pt-6 pb-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {(["All", "Game", "AI Agent"] as const).map(
            (category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-lg ${
                  categoryFilter === category
                    ? effectiveTheme === "dark"
                      ? "bg-[#56C880]/20 text-[#56C880] border border-[#56C880]/40"
                      : "bg-[#56C880]/20 text-[#56C880] border border-[#56C880]/40"
                    : effectiveTheme === "dark"
                      ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="w-full px-4 py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {/* HOF Filter - Special Highlight */}
            <button
              onClick={() => setSortBy("hof")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm relative overflow-hidden ${
                sortBy === "hof"
                  ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : effectiveTheme === "dark"
                    ? "bg-gradient-to-r from-purple-600/20 via-purple-500/20 to-purple-600/20 text-purple-400 hover:from-purple-600/30 hover:via-purple-500/30 hover:to-purple-600/30 border border-purple-500/30"
                    : "bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-500/20 text-purple-600 hover:from-purple-500/30 hover:via-purple-400/30 hover:to-purple-500/30 border border-purple-500/40"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>HOF</span>
              {sortBy === "hof" && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></span>
              )}
            </button>

            {/* Divider */}
            <div
              className={`text-2xl font-light ${effectiveTheme === "dark" ? "text-gray-600" : "text-gray-400"}`}
            >
              |
            </div>

            <button
              onClick={() => setSortBy("marketcap")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm ${
                sortBy === "marketcap"
                  ? "bg-[#56C880]/20 text-[#56C880]"
                  : effectiveTheme === "dark"
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">
                Market Cap
              </span>
              <span className="sm:hidden">MC</span>
            </button>
            <button
              onClick={() => setSortBy("trending")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm ${
                sortBy === "trending"
                  ? "bg-[#56C880]/20 text-[#56C880]"
                  : effectiveTheme === "dark"
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Trending</span>
            </button>
            <button
              onClick={() => setSortBy("volume")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm ${
                sortBy === "volume"
                  ? "bg-[#56C880]/20 text-[#56C880]"
                  : effectiveTheme === "dark"
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Volume</span>
            </button>
            <button
              onClick={() => setSortBy("new")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm ${
                sortBy === "new"
                  ? "bg-[#56C880]/20 text-[#56C880]"
                  : effectiveTheme === "dark"
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">
                Recently Added
              </span>
              <span className="sm:hidden">New</span>
            </button>
            <button
              onClick={() => setSortBy("favorites")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm ${
                sortBy === "favorites"
                  ? "bg-[#56C880]/20 text-[#56C880]"
                  : effectiveTheme === "dark"
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">
                Favorites
              </span>
            </button>
          </div>

          {/* View Type Toggle */}
          <div
            className={`flex items-center rounded-lg flex-shrink-0 ${effectiveTheme === "dark" ? "bg-gray-800" : "bg-white border border-gray-200"}`}
          >
            <button
              onClick={() => setViewType("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewType === "grid"
                  ? "bg-[#56C880] text-white"
                  : effectiveTheme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewType === "list"
                  ? "bg-[#56C880] text-white"
                  : effectiveTheme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tokens Grid */}
      <div className="w-full px-4 pb-8">
        {sortedTokens.length === 0 ? (
          <div className="text-center py-16">
            <p
              className={`text-lg ${effectiveTheme === "dark" ? "text-gray-500" : "text-gray-600"}`}
            >
              No tokens found
            </p>
          </div>
        ) : (
          <>
            {viewType === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {paginatedTokens.map((token, index) => (
                  <TokenCard
                    key={token.id}
                    token={token}
                    onClick={() => onSelectToken(token)}
                    rank={index + 1}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {paginatedTokens.map((token, index) => (
                  <TokenCard
                    key={token.id}
                    token={token}
                    onClick={() => onSelectToken(token)}
                    rank={index + 1}
                    viewMode="list"
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedTokens.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center py-8 gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1),
                    )
                  }
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    effectiveTheme === "dark"
                      ? "bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {getPageNumbers().map((page, idx) => (
                  <button
                    key={`${page}-${idx}`}
                    onClick={() =>
                      typeof page === "number" &&
                      setCurrentPage(page)
                    }
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-[#56C880] text-white"
                        : typeof page === "number"
                          ? effectiveTheme === "dark"
                            ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                          : effectiveTheme === "dark"
                            ? "text-gray-600 cursor-default"
                            : "text-gray-400 cursor-default"
                    }`}
                    disabled={typeof page !== "number"}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages),
                    )
                  }
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    effectiveTheme === "dark"
                      ? "bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                  disabled={currentPage >= totalPages}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}