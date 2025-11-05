"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ContributedOrganization } from "@/lib/types"

interface OrganizationsOrbitProps {
  organizations: ContributedOrganization[]
}

export function OrganizationsOrbit({ organizations }: OrganizationsOrbitProps) {
  // Calculate positions in a circular/orbital layout
  const getOrbitPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative mb-12"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Contributed Organizations
        </h2>

        {/* Desktop: Orbital layout */}
        <div className="hidden md:block relative h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Center circle */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">OS</span>
            </div>

            {/* Orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full border-2 border-dashed border-blue-300/30 dark:border-blue-700/30" />
            </div>

            {/* Organization icons */}
            {organizations.map((org, index) => {
              const pos = getOrbitPosition(index, organizations.length, 200)
              return (
                <motion.a
                  key={org.id}
                  href={org.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative w-20 h-20 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-purple-500 transition-all duration-300">
                      <Image
                        src={org.logo_url || "/placeholder.svg"}
                        alt={org.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-1 rounded-lg">
                        {org.name}
                      </div>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Mobile: Grid layout */}
        <div className="md:hidden grid grid-cols-3 gap-6">
          {organizations.map((org, index) => (
            <motion.a
              key={org.id}
              href={org.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-purple-500 transition-all duration-300">
                <Image src={org.logo_url || "/placeholder.svg"} alt={org.name} fill className="object-contain p-3" />
              </div>
              <div className="text-center mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">{org.name}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
