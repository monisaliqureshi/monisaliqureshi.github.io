'use client'

import Header from '@/components/Header'
import Greeting from '@/components/sections/Greeting'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Education from '@/components/sections/Education'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Greeting />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
