"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CountdownTimer } from "@/components/countdown-timer"
import { BidHistory } from "@/components/bid-history"
import { useWallet } from "@/contexts/wallet-context"
import { WalletFallback } from "@/components/wallet-fallback"

export default function CurrentAuction() {
  const [bidAmount, setBidAmount] = useState("")
  const [showBidHistory, setShowBidHistory] = useState(false)
  const { isConnected, connectWallet } = useWallet()

  // Placeholder auction data
  const auction = {
    id: "1",
    title: "Ethereal Dimensions",
    artist: "Digital Visionary",
    description:
      "A mesmerizing exploration of digital landscapes that blur the boundaries between reality and imagination.",
    imageUrl: "/placeholder.svg?height=800&width=1200",
    currentBid: "0.85",
    minimumBid: "0.9",
    bidCount: 12,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  }

  const handleBid = async () => {
    if (!isConnected) {
      await connectWallet()
      return
    }

    if (!bidAmount || Number.parseFloat(bidAmount) < Number.parseFloat(auction.minimumBid)) {
      alert(`Minimum bid is ${auction.minimumBid} ETH`)
      return
    }

    try {
      console.log(`Placing bid of ${bidAmount} ETH`)
      alert(`Bid of ${bidAmount} ETH placed successfully! (Demo mode)`)
      setBidAmount("")
    } catch (error) {
      console.error("Error placing bid:", error)
      alert("Failed to place bid. Please try again.")
    }
  }

  if (typeof window !== "undefined" && !window.ethereum) {
    return (
      <div className="container py-8">
        <WalletFallback />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={auction.imageUrl || "/placeholder.svg"}
              alt={auction.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{auction.title}</h1>
            <p className="text-lg text-muted-foreground">by {auction.artist}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="text-muted-foreground">Current Bid</div>
                  <div className="font-bold text-xl">{auction.currentBid} ETH</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{auction.bidCount} bids</span>
                  </div>
                  <Button variant="link" onClick={() => setShowBidHistory(!showBidHistory)}>
                    {showBidHistory ? "Hide history" : "View history"}
                  </Button>
                </div>

                {showBidHistory && <BidHistory auctionId={auction.id} />}

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Auction ends in:</span>
                </div>

                <CountdownTimer targetDate={auction.endTime} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full gap-2">
                <Input
                  type="number"
                  placeholder={`Min bid: ${auction.minimumBid} ETH`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  step="0.01"
                  min={auction.minimumBid}
                />
                <Button onClick={handleBid}>{isConnected ? "Place Bid" : "Connect Wallet to Bid"}</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By placing a bid, you agree to our terms of service and that your bid is binding.
              </p>
            </CardFooter>
          </Card>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">About this piece</h2>
            <p className="text-muted-foreground">{auction.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
