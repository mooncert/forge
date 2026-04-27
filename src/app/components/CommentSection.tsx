import { useState } from "react";
import { Send, ThumbsUp } from "lucide-react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useTheme } from "../App";

interface Comment {
  id: string;
  user: string;
  address: string;
  message: string;
  timestamp: string;
  likes: number;
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "anon",
      address: "0x742d...35Bd",
      message: "LFG!!! 🚀🚀🚀 This is going to the moon!",
      timestamp: "2m ago",
      likes: 12
    },
    {
      id: "2",
      user: "chad_gamer",
      address: "0x8f3a...92Ec",
      message: "aped in 5 SOL, don't miss this one frens",
      timestamp: "5m ago",
      likes: 8
    },
    {
      id: "3",
      user: "degen_trader",
      address: "0x1a2b...4c5d",
      message: "dev still here? or rugged already? 😂",
      timestamp: "12m ago",
      likes: 3
    },
    {
      id: "4",
      user: "moon_boy",
      address: "0x9e8d...7f6c",
      message: "when binance listing ser?",
      timestamp: "18m ago",
      likes: 15
    },
    {
      id: "5",
      user: "anon",
      address: "0x3c4d...5e6f",
      message: "chart looking bullish af 📈",
      timestamp: "25m ago",
      likes: 6
    }
  ]);

  const [comment, setComment] = useState("");
  const { effectiveTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: "anon",
      address: "0x0000...0000",
      message: comment,
      timestamp: "just now",
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  return (
    <Card className={`p-6 border ${
      effectiveTheme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`} style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
      <h2 className={`text-xl font-bold mb-6 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Community Discussion</h2>
      
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <Textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`flex-1 min-h-[80px] ${
              effectiveTheme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
            }`}
          />
          <Button 
            type="submit"
            className="bg-[#56C880] hover:bg-[#45B570] text-white font-medium"
          >
            <Send size={16} />
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className={`p-4 rounded-lg border ${
            effectiveTheme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#56C880] to-[#45B570] flex items-center justify-center font-bold text-white text-xs">
                  {comment.user[0].toUpperCase()}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{comment.user}</p>
                  <p className={`text-xs ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{comment.address}</p>
                </div>
              </div>
              <span className={`text-xs ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{comment.timestamp}</span>
            </div>
            
            <p className={`mb-2 text-sm ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{comment.message}</p>
            
            <button className={`flex items-center gap-1 text-xs transition-colors ${
              effectiveTheme === 'dark'
                ? 'text-gray-500 hover:text-[#56C880]'
                : 'text-gray-500 hover:text-[#56C880]'
            }`}>
              <ThumbsUp size={12} />
              <span>{comment.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}