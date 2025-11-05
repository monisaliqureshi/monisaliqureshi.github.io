'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getExperiences } from '@/lib/api'

export default function Experience() {
  const { data: experiences } = useSWR('experiences', getExperiences)

  if (!experiences) return null

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp: any, index: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl hover-card border-2 border-cyan-500/20"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  {exp.logo_filename ? (
                    <img
                      src={`/assests/images/${exp.logo_filename}`}
                      alt={`${exp.company} logo`}
                      className="w-16 h-16 rounded-lg object-contain bg-gray-800/50 p-2 border border-cyan-500/30"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-600 text-white text-2xl font-bold">
                      {exp.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <a
                    href={exp.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline text-lg mb-2 block transition-colors"
                  >
                    {exp.company}
                  </a>
                  <p className="text-purple-400 mb-4">
                    {exp.duration} • {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.descriptions.map((desc: string, i: number) => (
                      <li key={i} className="text-gray-300 leading-relaxed">
                        • {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
