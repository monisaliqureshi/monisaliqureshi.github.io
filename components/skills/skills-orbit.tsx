"use client"

import type { Skill } from "@/lib/types"
import { motion } from "framer-motion"
import Image from "next/image"

interface SkillsOrbitProps {
  skills: Skill[]
  centerImageUrl: string
}

export function SkillsOrbit({ skills, centerImageUrl }: SkillsOrbitProps) {
  // Calculate positions for skills in orbital pattern
  const getOrbitPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  // Create multiple orbital rings for better distribution
  const skillsPerRing = Math.ceil(skills.length / 2)
  const innerRadius = 280
  const outerRadius = 420

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center">
      {/* Animated gradient blobs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute w-[560px] h-[560px] border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute w-[840px] h-[840px] border border-primary/10 rounded-full"
        />
      </div>

      {/* Central illustration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 backdrop-blur-sm p-4 shadow-2xl"
      >
        <div className="relative w-full h-full">
          <Image src={centerImageUrl || "/placeholder.svg"} alt="Skills illustration" fill className="object-contain" />
        </div>
      </motion.div>

      {/* Orbiting skill icons */}
      {skills.map((skill, index) => {
        const isInnerRing = index < skillsPerRing
        const ringIndex = isInnerRing ? index : index - skillsPerRing
        const ringTotal = isInnerRing ? skillsPerRing : skills.length - skillsPerRing
        const radius = isInnerRing ? innerRadius : outerRadius
        const position = getOrbitPosition(ringIndex, ringTotal, radius)

        return (
          <motion.div
            key={skill.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.05,
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
            className="z-20"
          >
            <motion.div
              animate={{
                x: position.x,
                y: position.y,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
              }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              className="relative"
            >
              {/* Connection line to center */}
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{
                  width: Math.abs(position.x) * 2,
                  height: Math.abs(position.y) * 2,
                  left: position.x < 0 ? position.x : -position.x,
                  top: position.y < 0 ? position.y : -position.y,
                }}
              >
                <motion.line
                  x1={position.x < 0 ? Math.abs(position.x) : 0}
                  y1={position.y < 0 ? Math.abs(position.y) : 0}
                  x2={position.x < 0 ? 0 : Math.abs(position.x)}
                  y2={position.y < 0 ? 0 : Math.abs(position.y)}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                />
              </svg>

              {/* Skill icon */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative w-20 h-20 rounded-full bg-background shadow-lg border-2 border-primary/20 flex items-center justify-center group cursor-pointer overflow-hidden"
              >
                {skill.skill_icon_url ? (
                  <Image
                    src={skill.skill_icon_url || "/placeholder.svg"}
                    alt={skill.skill_name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary">{skill.skill_name.charAt(0)}</span>
                )}

                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-3 py-1 rounded-md text-sm whitespace-nowrap pointer-events-none">
                  {skill.skill_name}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
