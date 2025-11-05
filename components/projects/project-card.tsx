"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden bg-muted">
          {project.image_url ? (
            <Image
              src={project.image_url || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <span className="text-6xl">📁</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Created on{" "}
              {new Date(project.created_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Technologies */}
          {project.project_technologies && project.project_technologies.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.project_technologies.map((tech) => (
                <motion.div key={tech.id} whileHover={{ scale: 1.1, rotate: 5 }} className="relative group/tech">
                  {tech.technology_icon_url ? (
                    <div className="relative w-10 h-10 rounded-lg bg-background border border-border p-2 hover:border-blue-500/50 transition-colors">
                      <Image
                        src={tech.technology_icon_url || "/placeholder.svg"}
                        alt={tech.technology_name}
                        fill
                        className="object-contain p-1"
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {tech.technology_name}
                      </div>
                    </div>
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-600 rounded-full border border-blue-500/20">
                      {tech.technology_name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {project.code_url && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 hover:bg-foreground hover:text-background transition-colors bg-transparent"
                asChild
              >
                <a href={project.code_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </Button>
            )}
            {project.demo_url && (
              <Button
                size="sm"
                className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                asChild
              >
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
