import { Footer } from "@/components/homepage/Footer"
import { Header } from "@/components/homepage/Header"
import { Hero } from "@/components/homepage/Hero"
import { Partners } from "@/components/homepage/Partners"
import { PopularDestinations } from "@/components/homepage/PopularDestinations"
import { RecentReviews } from "@/components/homepage/RecentReviews"
import { TopHomestays } from "@/components/homepage/TopHomestays"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <PopularDestinations />
        <TopHomestays />
        <RecentReviews />
        <Partners />
      </main>
      <Footer />
    </div>
  )
}
