"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Youtube, Mail, Twitter, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Contact } from "@/lib/types"

interface ContactHeroProps {
  contact: Contact
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  mail: Mail,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
}

const colorMap = {
  github: "hover:bg-gray-800 dark:hover:bg-gray-700",
  linkedin: "hover:bg-blue-600",
  youtube: "hover:bg-red-600",
  mail: "hover:bg-red-500",
  twitter: "hover:bg-black dark:hover:bg-gray-800",
  facebook: "hover:bg-blue-500",
  instagram: "hover:bg-pink-600",
}

export function ContactHero({ contact }: ContactHeroProps) {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 -right-40 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-75 animate-pulse" />
              <div className="relative w-96 h-96 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                <Image src="/images/nom.jpeg?height=500&width=500" alt="Profile" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">{contact.heading}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{contact.description}</p>

            {/* Social Links */}
            {contact.social_links && contact.social_links.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                {contact.social_links.map((link, index) => {
                  const Icon = iconMap[link.icon_name as keyof typeof iconMap] || Mail
                  const colorClass = colorMap[link.icon_name as keyof typeof colorMap] || "hover:bg-gray-600"

                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className={`p-3 rounded-full bg-gray-800 dark:bg-gray-700 text-white transition-all duration-300 ${colorClass} hover:scale-110`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            )}

            {/* Resume Button */}
            {contact.resume_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  <a href={contact.resume_url} target="_blank" rel="noopener noreferrer">
                    See My Resume
                  </a>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
