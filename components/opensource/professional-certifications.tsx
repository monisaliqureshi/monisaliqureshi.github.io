"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Award } from "lucide-react"
import type { ProfessionalCertification } from "@/lib/types"

interface ProfessionalCertificationsProps {
  certifications: ProfessionalCertification[]
}

export function ProfessionalCertifications({ certifications }: ProfessionalCertificationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white dark:bg-gray-900 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Professional Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative bg-gray-50 dark:bg-gray-800/90 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={cert.cert_image_url || "/placeholder.svg"}
                    alt={cert.cert_name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
                  {cert.cert_name}
                </h3>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-3">
                  Issued by <span className="font-semibold text-blue-600 dark:text-blue-400">{cert.issuer}</span>
                </p>
                {cert.cert_description && (
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {cert.cert_description}
                  </p>
                )}
                {cert.issued_date && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-500 mb-3">
                    Issued:{" "}
                    {new Date(cert.issued_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                )}
                {cert.verification_link && (
                  <a
                    href={cert.verification_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
