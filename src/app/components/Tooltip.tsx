import { useState, ReactNode } from 'react';
import { useTheme } from '../App';

interface TooltipProps {
  children: ReactNode;
  text: string | ReactNode;
  dotted?: boolean;
}

export function Tooltip({ children, text, dotted = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { effectiveTheme } = useTheme();

  return (
    <span className="relative inline-block">
      <span
        className={`cursor-help border-b border-dotted ${
          effectiveTheme === 'dark'
            ? 'border-[#555555]'
            : 'border-[#D1D5DB]'
        }`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      
      {isVisible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none block">
          <span
            className={`px-3 py-2 text-xs rounded-lg shadow-lg block whitespace-nowrap ${
              effectiveTheme === 'dark'
                ? 'bg-[#1A1A1A] text-white border border-[#555555]'
                : 'bg-white text-[#1A1A1A] border border-[#D1D5DB] shadow-md'
            }`}
          >
            {text}
            {/* Arrow */}
            <span
              className={`absolute top-full left-1/2 -translate-x-1/2 -mt-px block`}
            >
              <span
                className={`w-2 h-2 rotate-45 block ${
                  effectiveTheme === 'dark'
                    ? 'bg-[#1A1A1A] border-r border-b border-[#555555]'
                    : 'bg-white border-r border-b border-[#D1D5DB]'
                }`}
              />
            </span>
          </span>
        </span>
      )}
    </span>
  );
}