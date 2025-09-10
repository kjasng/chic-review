import { Footer } from '@/components/homepage/Footer'
import { Header } from '@/components/homepage/Header'
import { HeroSection } from '@/components/homepage/HeroSection'
import { MissionSection } from '@/components/homepage/MissionSection'

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-grow'>
        <HeroSection />
        <MissionSection />
      </main>
      <Footer />
    </div>
  )
}
