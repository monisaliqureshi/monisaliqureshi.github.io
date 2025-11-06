'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getEducation } from '@/lib/api'

export default function Education() {
  const { data: education } = useSWR('education', getEducation)

  if (!education) return null

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Education
        </motion.h2>

        <div className="space-y-8">
          {education.map((edu: any, index: number) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover-card border-2 border-purple-500/20"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  {edu.logo_filename ? (
                    <img
                      src={`/assests/images/${edu.logo_filename}`}
                      alt={`${edu.title} logo`}
                      className="w-20 h-20 rounded-lg object-contain bg-gray-800/50 p-2 border border-purple-500/30"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center text-3xl">
                      🎓
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {edu.title}
                  </h3>
                  <p className="text-xl text-purple-400 mb-2">
                    {edu.subtitle}
                  </p>
                  <p className="text-cyan-400 mb-4">
                    {edu.duration}
                  </p>
                  <ul className="space-y-2">
                    {edu.descriptions.map((desc: string, i: number) => (
                      <li key={i} className="text-gray-300 leading-relaxed">
                        • {desc}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={edu.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline mt-4 inline-block transition-colors"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
