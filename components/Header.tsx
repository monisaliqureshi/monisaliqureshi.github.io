'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/home', icon: '🏠' },
    { name: 'Skills', href: '/home#skills', icon: '⚡' },
    { name: 'Experience', href: '/home#experience', icon: '💼' },
    { name: 'Projects', href: '/home#projects', icon: '🚀' },
    { name: 'Education', href: '/home#education', icon: '🎓' },
    { name: 'News', href: '/news', icon: '📰' },
    { name: 'Contact', href: '/home#contact', icon: '📬' },
  ];

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-2xl border-b border-cyan-500/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ opacity: scrolled ? headerOpacity : 1 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/home" className="flex items-center gap-2">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-10 h-10 gradient-border rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </motion.div>
              <span className="text-2xl font-bold gradient-text">
                Portfolio
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: -1 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Active Indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />

                  <span className="relative z-10 flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-10 h-10 glass rounded-lg hover:neon-glow transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="text-xl text-yellow-400" />
              ) : (
                <FiMoon className="text-xl text-purple-600" />
              )}
            </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 glass rounded-lg flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="flex flex-col gap-1.5"
              animate={mobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
              />
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden glass border-t border-cyan-500/20"
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-4 py-4 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className="w-full block px-4 py-3 rounded-lg glass hover:neon-glow transition-all duration-300 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: mobileMenuOpen ? 1 : 0,
                x: mobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="flex items-center gap-3 text-gray-300">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </span>
            </motion.button>
          ))}
          
            {/* Theme Toggle for Mobile */}
            <motion.button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg glass hover:neon-glow transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: mobileMenuOpen ? 1 : 0,
                x: mobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: menuItems.length * 0.05 }}
            >
              {theme === 'dark' ? (
                <>
                  <FiSun className="text-xl text-yellow-400" />
                  <span className="font-medium text-gray-300">Light Mode</span>
                </>
              ) : (
                <>
                  <FiMoon className="text-xl text-purple-600" />
                  <span className="font-medium text-gray-300">Dark Mode</span>
                </>
              )}
            </motion.button>
        </div>
      </motion.div>

      {/* Animated Border Bottom */}
      {scrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </motion.header>
  );
}
