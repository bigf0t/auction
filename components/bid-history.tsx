"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

interface Bid {
  id: string
  bidder: string
  amount: string
  timestamp: Date
}

interface BidHistoryProps {
  auctionId: string
}

export function BidHistory({ auctionId }: BidHistoryProps) {
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would fetch from your API or directly from the blockchain
    const fetchBids = async () => {
      // Placeholder data
      const mockBids = [
        {
          id: "1",
          bidder: "0x1234...5678",
          amount: "0.85",
          timestamp: new Date(Date.now() - 35 * 60 * 1000),
        },
        {
          id: "2",
          bidder: "0x8765...4321",
          amount: "0.80",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "3",
          bidder: "0x5432...8765",
          amount: "0.75",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      ]

      setBids(mockBids)
      setLoading(false)
    }

    fetchBids()
  }, [auctionId])

  if (loading) {
    return <div className="text-center py-4">Loading bid history...</div>
  }

  return (
    <div className="space-y-2 max-h-40 overflow-y-auto">
      {bids.map((bid) => (
        <div key={bid.id} className="flex justify-between text-sm py-1 border-b last:border-0">
          <div className="flex items-center gap-2">
            <span className="font-medium">{bid.bidder}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{bid.amount} ETH</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(bid.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
