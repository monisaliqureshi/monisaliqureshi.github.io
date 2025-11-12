'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getCertifications } from '@/lib/api'

export default function Certifications() {
  const { data: certifications } = useSWR('certifications', getCertifications)

  if (!certifications) return null

  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Certifications
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert: any, index: number) => (
            <motion.a
              key={cert.id}
              href={cert.certificate_link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block p-6 rounded-2xl hover-card glass border-2 border-cyan-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                {cert.logo_filename ? (
                  <img
                    src={cert.logo_filename && cert.logo_filename.startsWith('data:') ? cert.logo_filename : `/assests/images/${cert.logo_filename}`}
                    alt={`${cert.title} logo`}
                    className="w-12 h-12 rounded-lg object-contain bg-gray-800/50 p-1 border border-cyan-500/30"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                    📜
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cert.title}</h3>
                  <p className="text-sm text-cyan-400">{cert.subtitle}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
