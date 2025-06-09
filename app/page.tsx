import CurrentAuction from "@/components/current-auction"
import { SiteHeader } from "@/components/site-header"
import { UpcomingAuctions } from "@/components/upcoming-auctions"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CurrentAuction />
        <div className="container py-16">
          <UpcomingAuctions />
        </div>
      </main>
    </div>
  )
}
