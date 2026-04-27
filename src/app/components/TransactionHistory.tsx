import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  total: number;
  address: string;
  timestamp: string;
}

interface TransactionHistoryProps {
  tokenSymbol: string;
}

export function TransactionHistory({ tokenSymbol }: TransactionHistoryProps) {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      amount: 15000,
      price: 0.000045,
      total: 0.675,
      address: "0x742d...35Bd",
      timestamp: "2 min ago"
    },
    {
      id: "2",
      type: "sell",
      amount: 8500,
      price: 0.000044,
      total: 0.374,
      address: "0x8f3a...92Ec",
      timestamp: "5 min ago"
    },
    {
      id: "3",
      type: "buy",
      amount: 25000,
      price: 0.000043,
      total: 1.075,
      address: "0x1a2b...4c5d",
      timestamp: "12 min ago"
    },
    {
      id: "4",
      type: "buy",
      amount: 10000,
      price: 0.000042,
      total: 0.42,
      address: "0x9e8d...7f6c",
      timestamp: "18 min ago"
    },
    {
      id: "5",
      type: "sell",
      amount: 5000,
      price: 0.000041,
      total: 0.205,
      address: "0x3c4d...5e6f",
      timestamp: "25 min ago"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Recent Transactions</h3>
        <Clock size={16} className="text-gray-400" />
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div 
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${tx.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                {tx.type === 'buy' ? (
                  <ArrowUpRight size={16} className="text-green-600" />
                ) : (
                  <ArrowDownRight size={16} className="text-red-600" />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={tx.type === 'buy' ? 'default' : 'destructive'} className="text-xs">
                    {tx.type.toUpperCase()}
                  </Badge>
                  <span className="font-medium">
                    {tx.amount.toLocaleString()} {tokenSymbol}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{tx.address}</span>
                  <span>•</span>
                  <span>{tx.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">{tx.total.toFixed(3)} CROSS</p>
              <p className="text-xs text-gray-500">@ {tx.price.toFixed(6)}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium">
        View All Transactions →
      </button>
    </Card>
  );
}
