"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Users, LinkIcon } from "lucide-react"
import type { OpenSource } from "@/lib/types"

interface GitHubHeroProps {
  data: OpenSource
}

export function GitHubHero({ data }: GitHubHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
              <Image src="/professional-developer-portrait.png" alt="Profile" width={192} height={192} className="object-cover" />
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Muhammad Noman
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                Computer Systems Engineer | Full Stack Developer
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
                Passionate about building modern web applications with cutting-edge tech — building the future, one line
                of code at a time.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold text-gray-900 dark:text-white">28</span> followers ·{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">28</span> following
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>Munich, Germany</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href={data.github_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <LinkIcon className="w-4 h-4" />
                  View GitHub Profile
                </a>
                <a
                  href="mailto:noman5456318@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-purple-500 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
