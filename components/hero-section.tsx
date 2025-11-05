"use client"

import type { About } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Youtube, Instagram, Facebook } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface HeroSectionProps {
  about: About
}

export function HeroSection({ about }: HeroSectionProps) {
  const socialLinks = [
    { name: "github", url: about.github_url, Icon: Github, color: "from-gray-700 to-gray-900" },
    { name: "linkedin", url: about.linkedin_url, Icon: Linkedin, color: "from-blue-600 to-blue-700" },
    { name: "twitter", url: about.twitter_url, Icon: Twitter, color: "from-sky-400 to-sky-600" },
  
    { name: "instagram", url: about.instagram_url, Icon: Instagram, color: "from-pink-500 to-purple-600" },
    { name: "facebook", url: about.facebook_url, Icon: Facebook, color: "from-blue-500 to-blue-700" },
  ].filter((link) => link.url)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 lg:space-y-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-balance leading-[1.05] tracking-tight"
          >
            <span className="gradient-text">{about.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/80 italic font-medium"
          >
           
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-2xl"
          >
            {about.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4 flex-wrap pt-4"
          >
            {socialLinks.map(({ name, url, Icon, color }, index) => (
              <motion.a
                key={name}
                href={url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.08,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${color} text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300`}
                aria-label={name}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="text-base sm:text-lg px-10 sm:px-14 py-6 sm:py-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 font-semibold text-white border-0"
              >
                <Github className="w-5 h-5 mr-3" />
                Star Me On Github
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square"
          >
            <Image
              src="/images/feelingProud.svg"
              alt="Developer illustration"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
