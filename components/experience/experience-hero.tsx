"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ExperienceHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/experience.svg"
                alt="Experience Illustration"
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
              <span className="text-foreground">Experience</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80">
              Work, Internship and Volunteership
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I have worked with many evolving startups as ML and DL Developer, Designer and Software Architect. I have
              also worked with some well established companies mostly as AI Developer. I love organising events and that
              is why I am also involved with many opensource communities as a representative.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
