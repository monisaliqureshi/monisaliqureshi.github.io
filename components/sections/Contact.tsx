'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getContact } from '@/lib/api'

export default function Contact() {
  const { data: contact } = useSWR('contact', getContact)

  if (!contact) return null

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {contact.title}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {contact.description}
          </p>

          <div className="glass p-8 md:p-12 rounded-2xl border-2 border-cyan-500/30 hover-card">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{contact.blog_title}</h3>
            <p className="text-lg text-gray-300 mb-8">{contact.blog_subtitle}</p>
            <a
              href={contact.blog_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 
                       text-white font-semibold rounded-lg hover:shadow-lg 
                       hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Hire Me on Upwork
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
