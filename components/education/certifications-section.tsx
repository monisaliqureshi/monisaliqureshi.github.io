"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Certification } from "@/lib/types"

const certificationIcons: Record<string, string> = {
  Coursera: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/coursera/coursera-original.svg",
  "Google Cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  Microsoft: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  Kaggle: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg",
  HackerRank: "https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg",
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 pb-20 sm:pb-24 lg:pb-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
      >
        Certifications
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              {(cert.issuer_logo_url || certificationIcons[cert.issuer]) && (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Image
                    src={cert.issuer_logo_url || certificationIcons[cert.issuer] || "/placeholder.svg"}
                    alt={cert.issuer}
                    width={36}
                    height={36}
                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{cert.issuer}</p>
              </div>
            </div>

            {cert.description && (
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                {cert.description}
              </p>
            )}

            {cert.issue_date && (
              <p className="text-xs text-muted-foreground mb-4">
                Issued: {new Date(cert.issue_date).toLocaleDateString()}
              </p>
            )}

            {cert.credential_url && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40"
              >
                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                  View Credential
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
