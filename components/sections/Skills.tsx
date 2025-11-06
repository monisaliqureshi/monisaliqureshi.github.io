'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getSkills } from '@/lib/api'

export default function Skills() {
  const { data: skills } = useSWR('skills', getSkills)

  if (!skills) return null

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          What I Do
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill: any, index: number) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover-card border-2 border-cyan-500/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                {skill.title}
              </h3>
              <ul className="space-y-2 mb-6">
                {skill.skills_list.map((item: string, i: number) => (
                  <li key={i} className="text-gray-300 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {skill.software_skills.map((sw: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-colors"
                    style={{ color: sw.style?.color || '#00f5ff' }}
                  >
                    <i className={sw.fontAwesomeClassname}></i>
                    <span className="text-sm text-gray-300">{sw.skillName}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
