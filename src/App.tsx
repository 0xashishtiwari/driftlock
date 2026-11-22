import './index.css'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
import Features from './sections/Features'
import Pricing from './sections/Pricing'
import FAQ from './sections/FAQ'
import CTA from './sections/CTA'
import Footer from './components/Footer'
import NetworkBackground from './components/NetworkBackground'

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <NetworkBackground />

      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
