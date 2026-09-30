import { useState } from 'react'
import AnimatedBackdrop from './components/AnimatedBackdrop.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Plans from './components/Plans.jsx'
import Process from './components/Process.jsx'
import CtaBand from './components/CtaBand.jsx'
import Portfolio from './components/Portfolio.jsx'
import Marketing from './components/Marketing.jsx'
import Team from './components/Team.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import WhatsAppWidget from './components/WhatsAppWidget.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Plan elegido en "Solicitar plan"; preselecciona el servicio en el formulario
  const [selectedService, setSelectedService] = useState('')

  function handleSelectPlan(plan) {
    setSelectedService(plan)
    document.getElementById('contactar')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => document.getElementById('form-nombre')?.focus({ preventScroll: true }), 600)
  }

  return (
    <>
      {/* Tema oscuro: un único fondo animado, fijo detrás de toda la página */}
      <AnimatedBackdrop fixed className="hidden dark:block" />
      <Header />
      <main className="w-full pt-20 bg-surface dark:bg-transparent min-h-screen">
        <Hero />
        <Plans onSelectPlan={handleSelectPlan} />
        <Process />
        <CtaBand onSelectService={handleSelectPlan} />
        <Portfolio />
        <Marketing onSelectService={handleSelectPlan} />
        <Team />
        <Faq />
        <Contact selectedService={selectedService} onServiceChange={setSelectedService} />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
