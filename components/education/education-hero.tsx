"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Certification } from "@/lib/types"

const certificationIcons: Record<string, string> = {
  Coursera: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/coursera/coursera-original.svg",
  "Google Cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  Microsoft: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  Kaggle: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg",
  HackerRank: "https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg",
}

interface EducationHeroProps {
  certifications: Certification[]
}

export function EducationHero({ certifications }: EducationHeroProps) {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start order-2 lg:order-1"
        >
          <div className="relative w-full max-w-md lg:max-w-lg">
            <Image
              src="images/education1.svg"
              alt="Education"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Right: Title */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left space-y-6 order-1 lg:order-2"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
            Education
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/80">
            Basic Qualification and Certifications
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {certifications.slice(0, 6).map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:shadow-2xl transition-all"
              >
                {cert.issuer_logo_url || certificationIcons[cert.issuer] ? (
                  <Image
                    src={cert.issuer_logo_url || certificationIcons[cert.issuer] || "/placeholder.svg"}
                    alt={cert.issuer}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {cert.issuer.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
