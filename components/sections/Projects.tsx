'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getProjects } from '@/lib/api'

export default function Projects() {
  const { data: projects } = useSWR('projects', getProjects)

  if (!projects) return null

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
        >
          Projects
        </motion.h2>
        <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto text-lg">
          My projects make use of a vast variety of latest technology tools. Below are some of my baseline projects.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover-card border-2 border-purple-500/20"
            >
              {project.thumbnail_filename && (
                <div className="mb-4 -mx-6 -mt-6">
                  <img
                    src={`/assests/images/${project.thumbnail_filename}`}
                    alt={`${project.name} thumbnail`}
                    className="w-full h-48 object-cover rounded-t-2xl border-b-2 border-purple-500/20"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-4 text-white">
                {project.name}
              </h3>
              <ul className="space-y-2 mb-6">
                {project.descriptions.map((desc: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 leading-relaxed">
                    • {desc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.languages.map((lang: any, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-medium"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
              {project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  View Project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
