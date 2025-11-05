"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import type { Experience } from "@/lib/types"

interface ExperienceTimelineProps {
  experiences: Experience[]
  type: "work" | "internship" | "volunteer"
}

export function ExperienceTimeline({ experiences, type }: ExperienceTimelineProps) {
  const filteredExperiences = experiences
    .filter((exp) => exp.experience_type === type)
    .sort((a, b) => b.order_index - a.order_index)

  if (filteredExperiences.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No {type} experiences added yet.</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500" />

      <div className="space-y-8">
        {filteredExperiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-12"
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-blue-500 border-4 border-background"
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />

            {/* Experience card */}
            <div className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {/* Company logo */}
                  {experience.company_logo_url && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-background border border-border/50 p-2 flex items-center justify-center">
                      <Image
                        src={experience.company_logo_url || "/placeholder.svg"}
                        alt={experience.company_name}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-2 text-foreground/80 mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{experience.company_name}</span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date range */}
                <div className="flex items-center gap-2 text-muted-foreground bg-background/50 px-4 py-2 rounded-lg border border-border/50 whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(experience.start_date)} -{" "}
                    {experience.is_current ? "Present" : formatDate(experience.end_date!)}
                  </span>
                </div>
              </div>

              {/* Description */}
              {experience.description && <p className="text-muted-foreground mb-4">{experience.description}</p>}

              {/* Experience items (bullet points) */}
              {experience.experience_items.length > 0 && (
                <ul className="space-y-2">
                  {experience.experience_items
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((item) => (
                      <li key={item.id} className="flex items-start gap-2 text-foreground/80">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span>{item.content}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
