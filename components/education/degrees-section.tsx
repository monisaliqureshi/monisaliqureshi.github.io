"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Zap } from "lucide-react"
import type { Degree } from "@/lib/types"

interface DegreesSectionProps {
  degrees: Degree[]
}

export function DegreesSection({ degrees }: DegreesSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
      >
        Degrees Received
      </motion.h2>

      <div className="space-y-12 lg:space-y-16 max-w-6xl mx-auto">
        {degrees.map((degree, index) => (
          <motion.div
            key={degree.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-8 items-start"
          >
            {/* University Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white dark:bg-gray-800 shadow-2xl flex items-center justify-center p-6 sm:p-8 border-4 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                {degree.institution_logo_url ? (
                  <Image
                    src={degree.institution_logo_url || "/placeholder.svg"}
                    alt={degree.institution_name}
                    width={180}
                    height={180}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {degree.institution_name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Degree Details */}
            <div className="space-y-4">
              {/* Header Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-2xl p-6 sm:p-8 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {degree.institution_name}
                    </h3>
                    <p className="text-base sm:text-lg text-white/90 mt-2">
                      {degree.degree_name}
                      {degree.field_of_study && ` in ${degree.field_of_study}`}
                    </p>
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-white lg:text-right whitespace-nowrap">
                    {degree.start_year} - {degree.end_year || "Present"}
                  </div>
                </div>
              </motion.div>

              {/* Description Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                {degree.degree_items && degree.degree_items.length > 0 ? (
                  <ul className="space-y-3 sm:space-y-4">
                    {degree.degree_items
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((item, itemIndex) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                          className="flex gap-3 text-foreground/80 leading-relaxed text-sm sm:text-base"
                        >
                          <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>{item.content}</span>
                        </motion.li>
                      ))}
                  </ul>
                ) : (
                  degree.description && (
                    <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{degree.description}</p>
                  )
                )}

                {degree.website_url && (
                  <motion.div whileHover={{ scale: 1.05 }} className="mt-6 flex justify-end">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <a href={degree.website_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                        Visit Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
