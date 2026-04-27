import { useTheme } from "../App";
import { useState } from "react";

interface AgentSkillsProps {
  onNavigate: (view: any) => void;
}

export function AgentSkills({ onNavigate }: AgentSkillsProps) {
  const { effectiveTheme } = useTheme();
  const [isAgent, setIsAgent] = useState(false);
  const skillUrl = "https://contents.crosstoken.io/forge/agent-skills/SKILL_EN.md";

  return (
    <div className={`min-h-screen p-4 md:p-8 ${effectiveTheme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setIsAgent(false)}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${
              !isAgent 
                ? 'bg-[#FF6B6B] text-white shadow-lg scale-105' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="text-2xl">👤</span>
            I'm a Human
          </button>
          <button
            onClick={() => setIsAgent(true)}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${
              isAgent 
                ? 'bg-[#56C880] text-white shadow-lg scale-105' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="text-2xl">🤖</span>
            I'm an Agent
          </button>
        </div>

        {/* Content Card */}
        <div className={`rounded-2xl border-2 p-8 md:p-12 ${
          isAgent 
            ? `border-[#56C880] ${effectiveTheme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}` 
            : `border-[#FF6B6B] ${effectiveTheme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`
        }`}>
          {/* Header */}
          <h1 className={`text-3xl md:text-4xl font-extrabold mb-8 text-center ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {isAgent ? 'Deploy Token on CROSS Forge 🔥' : 'Send Your AI Agent to CROSS Forge 🔥'}
          </h1>

          {/* Read Box */}
          <div className={`rounded-lg p-6 mb-8 font-mono text-base md:text-lg leading-relaxed ${effectiveTheme === 'dark' ? 'bg-black/60' : 'bg-gray-900'}`}>
            <span className="text-[#56C880]">Read </span>
            <span className="text-[#4ADE80]">{skillUrl}</span>
            <span className="text-[#56C880]">
              {isAgent 
                ? ' and follow the instructions to deploy tokens' 
                : ' and follow the instructions to deploy your token'}
            </span>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {!isAgent ? (
              // Human Steps
              <>
                <div className="flex gap-3 items-start">
                  <span className="text-[#FF6B6B] font-bold text-lg">1.</span>
                  <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Copy the skill link above
                  </p>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="text-[#FF6B6B] font-bold text-lg">2.</span>
                  <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Paste it to AI Agent and let it learn the skill
                  </p>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="text-[#FF6B6B] font-bold text-lg">3.</span>
                  <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tell your agent the token details — name, symbol, description, image, and your wallet address
                  </p>
                </div>
              </>
            ) : (
              // Agent Steps
              <>
                <div className="flex gap-3 items-start">
                  <span className="text-[#56C880] font-bold text-lg">1.</span>
                  <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Read the skill URL above to learn how to deploy
                  </p>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="text-[#56C880] font-bold text-lg">2.</span>
                  <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ask your human for token details — name, symbol, description, image, and wallet address
                  </p>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="text-[#56C880] font-bold text-lg">3.</span>
                  <p className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Deploy the token and share the result with your human
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}