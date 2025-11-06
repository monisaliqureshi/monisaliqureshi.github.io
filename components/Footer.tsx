'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getSocialMedia } from '@/lib/api';
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

export default function Footer() {
  const { data: socialMedia } = useSWR('social-media', getSocialMedia);
  const pathname = usePathname();
  const router = useRouter();

  const navigationLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Skills', href: '/home#skills' },
    { name: 'Experience', href: '/home#experience' },
    { name: 'Projects', href: '/home#projects' },
    { name: 'Education', href: '/home#education' },
    { name: 'Contact', href: '/home#contact' },
  ];

  const handleNavigation = (href: string) => {
    // Check if the link has a hash (section anchor)
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const path = href.substring(0, hashIndex);
      const hash = href.substring(hashIndex + 1);

      // If we're already on the target page, just scroll
      if (pathname === path) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to the page first, then scroll with retry mechanism
        router.push(href);
        
        // Try to scroll with retries to ensure element is rendered
        let attempts = 0;
        const maxAttempts = 10;
        const scrollInterval = setInterval(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            clearInterval(scrollInterval);
          } else if (attempts >= maxAttempts) {
            clearInterval(scrollInterval);
          }
          attempts++;
        }, 100);
      }
    } else {
      // No hash, just navigate normally
      router.push(href);
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 footer-bg" />
      
      {/* Glowing Line at Top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      <div className="relative container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-10 h-10 gradient-border rounded-lg flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="text-2xl">⚡</span>
              </motion.div>
              <span className="text-2xl font-bold gradient-text">Portfolio</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building the future with code, design, and innovation.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4 neon-text">Quick Links</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-px bg-cyan-400 group-hover:w-4 transition-all duration-300"
                    />
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4 neon-text">Connect</h3>
            <div className="flex gap-4 flex-wrap">
              {socialMedia?.map((social: any, index: number) => {
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
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                ) : null;
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()} <span className="text-cyan-400">Portfolio</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <motion.span
              className="text-red-500 text-lg"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ❤️
            </motion.span>
            <span>and</span>
            <span className="gradient-text font-semibold">Next.js</span>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-lg" />
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-purple-400/30 rounded-tr-lg" />
      </div>
    </footer>
  );
}
