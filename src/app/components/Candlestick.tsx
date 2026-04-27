// Custom Candlestick Component for Recharts
export const Candlestick = (props: any) => {
  const { x, y, width, height, payload } = props;
  
  if (!payload) return null;
  
  const { open, high, low, close, isGreen } = payload;
  const color = isGreen ? '#22c55e' : '#ef4444';
  
  // Calculate candle body dimensions
  const maxPrice = Math.max(open, close, high, low);
  const minPrice = Math.min(open, close, high, low);
  const priceRange = maxPrice - minPrice;
  
  if (priceRange === 0) return null;
  
  // Scale function
  const scale = (price: number) => {
    return y + height - ((price - minPrice) / priceRange) * height;
  };
  
  const highY = scale(high);
  const lowY = scale(low);
  const openY = scale(open);
  const closeY = scale(close);
  
  const bodyTop = Math.min(openY, closeY);
  const bodyBottom = Math.max(openY, closeY);
  const bodyHeight = Math.max(Math.abs(closeY - openY), 2); // Minimum 2px for visibility
  
  // Candle width - make them narrower for better appearance
  const candleWidth = Math.max(width * 0.6, 4); // 60% of available space, at least 4px
  const wickX = x + width / 2;
  const bodyX = x + (width - candleWidth) / 2;
  
  return (
    <g>
      {/* High-Low Wick - thinner line */}
      <line
        x1={wickX}
        y1={highY}
        x2={wickX}
        y2={lowY}
        stroke={color}
        strokeWidth={1}
      />
      {/* Open-Close Body */}
      <rect
        x={bodyX}
        y={bodyTop}
        width={candleWidth}
        height={bodyHeight}
        fill={color}
        stroke="none"
      />
    </g>
  );
};