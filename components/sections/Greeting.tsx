'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getGreeting, getSocialMedia } from '@/lib/api';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGitlab, FaEnvelope } from 'react-icons/fa';

const iconMap: any = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  gitlab: FaGitlab,
  gmail: FaEnvelope,
  email: FaEnvelope,
};

export default function Greeting() {
  const { data: greeting } = useSWR('greeting', getGreeting);
  const { data: socialMedia } = useSWR('social-media', getSocialMedia);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !greeting) {
    return null;
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-magenta-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              className="text-cyan-400 text-lg font-medium tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &lt;Monis Ali /&gt;
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 gradient-text leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {greeting.title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-6 neon-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {greeting.subtitle}
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {greeting.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href="/home#contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg overflow-hidden font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-magenta-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            <motion.a
              href={greeting.resume_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 glass rounded-lg overflow-hidden font-semibold text-cyan-400 border border-cyan-500/50 hover:border-cyan-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                See My Resume
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.span>
              </span>
            </motion.a>
          </motion.div>

          {/* Social Media Links */}
          {socialMedia && socialMedia.length > 0 && (
            <motion.div
              className="flex gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {socialMedia.map((social: any, index: number) => {
                const Icon = iconMap[social.platform?.toLowerCase()];
                return Icon ? (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-lg flex items-center justify-center hover:neon-glow transition-all duration-300 text-gray-300 hover:text-cyan-400"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                ) : null;
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Futuristic 3D Element */}
        <motion.div
          className="relative hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-full h-[500px] glass rounded-2xl overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 245, 255, 0.3)",
                "0 0 40px rgba(124, 58, 237, 0.5)",
                "0 0 20px rgba(0, 245, 255, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(0, 245, 255, 0.5)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-9xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                👨‍💻
              </motion.div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400 opacity-50" />
            <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-purple-400 opacity-50" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-purple-400 opacity-50" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400 opacity-50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
