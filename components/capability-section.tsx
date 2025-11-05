"use client"

import type { HomeSection } from "@/lib/types"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import Image from "next/image"

interface CapabilitySectionProps {
  section: HomeSection
  index: number
  illustrationUrl: string
}

export function CapabilitySection({ section, index, illustrationUrl }: CapabilitySectionProps) {
  const isEven = index % 2 === 0

  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute ${isEven ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${
            index === 0
              ? "from-blue-400/10 to-cyan-400/10"
              : index === 1
                ? "from-purple-400/10 to-pink-400/10"
                : index === 2
                  ? "from-orange-400/10 to-red-400/10"
                  : "from-green-400/10 to-emerald-400/10"
          } rounded-full blur-3xl`}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {index === 0 && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-20 lg:mb-28 gradient-text"
          >
            What I Do?
          </motion.h2>
        )}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}
        >
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`relative flex items-center justify-center ${isEven ? "" : "lg:col-start-2"}`}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
              className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-square"
            >
              <Image
                src={illustrationUrl || "/images/data_science.svg"}
                alt={section.title}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`space-y-8 lg:space-y-10 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
          >
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-[1.1] tracking-tight">
              {section.title}
            </h3>

            {section.skills.length > 0 && (
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {section.skills
                  .filter((skill) => skill.skill_icon_url)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + skillIndex * 0.05,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -8,
                        transition: { duration: 0.2 },
                      }}
                      className="group relative"
                      title={skill.skill_name}
                    >
                      <Image
                        src={skill.skill_icon_url || "/placeholder.svg"}
                        alt={skill.skill_name}
                        width={48}
                        height={48}
                        className="object-contain w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg"
                      />
                    </motion.div>
                  ))}
              </div>
            )}

            <div className="space-y-5 sm:space-y-6">
              {section.section_items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + itemIndex * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="flex gap-4 items-start group"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 15,
                      transition: { duration: 0.2 },
                    }}
                    className="flex-shrink-0 mt-1.5"
                  >
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 drop-shadow-lg" fill="currentColor" />
                  </motion.div>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/90 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
