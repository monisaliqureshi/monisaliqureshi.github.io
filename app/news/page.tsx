'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCalendar, FiMapPin, FiChevronRight } from 'react-icons/fi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface NewsItem {
  id: string
  title: string
  subtitle: string
  date_from: string
  date_to: string
  location: string
  thumbnail_filename: string
  photos: string[]
  description: string
  order_index: number
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      
      // Ensure we always set an array, even if there's an error or unexpected data
      if (Array.isArray(data)) {
        setNewsItems(data)
      } else {
        console.error('API returned non-array data:', data)
        setNewsItems([])
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setNewsItems([])
    } finally {
      setLoading(false)
    }
  }

  const openNews = (item: NewsItem) => {
    setSelectedNews(item)
    document.body.style.overflow = 'hidden'
  }

  const closeNews = () => {
    setSelectedNews(null)
    document.body.style.overflow = 'unset'
    setLightboxOpen(false)
  }

  // Compose the images array for the lightbox: include thumbnail first if present, then photos
  const lightboxImages = selectedNews
    ? [
        ...(selectedNews.thumbnail_filename ? [selectedNews.thumbnail_filename] : []),
        ...(Array.isArray(selectedNews.photos) ? selectedNews.photos : []),
      ]
    : []

  const openLightboxAt = (index: number) => {
    if (!selectedNews) return
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    if (!lightboxImages.length) return
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    if (!lightboxImages.length) return
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, lightboxImages.length])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full" />
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              Latest News & Updates
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay updated with my latest achievements, announcements, and milestones
            </p>
          </motion.div>

        {/* News Grid */}
        {newsItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No news available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden hover-card group cursor-pointer"
                onClick={() => openNews(item)}
              >
                {/* Thumbnail */}
                {item.thumbnail_filename ? (
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={item.thumbnail_filename && item.thumbnail_filename.startsWith('data:') ? item.thumbnail_filename : `/assests/images/${item.thumbnail_filename}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-6xl">📰</div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Date & Location */}
                  <div className="flex flex-wrap gap-3 mb-3 text-sm">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <FiCalendar className="text-xs" />
                      {item.date_from}{item.date_to && ` - ${item.date_to}`}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-purple-400">
                        <FiMapPin className="text-xs" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="text-purple-400 mb-3">{item.subtitle}</p>
                  )}

                  {/* Description Preview */}
                  <div
                    className="text-gray-400 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: item.description.replace(/<[^>]*>/g, ' ').substring(0, 150) + '...'
                    }}
                  />

                  {/* Read More */}
                  <motion.div
                    className="flex items-center gap-2 text-cyan-400 font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <FiChevronRight />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={closeNews}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="min-h-screen py-20 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={closeNews}
                  className="absolute top-8 right-8 p-3 rounded-full bg-red-500/20 border-2 border-red-500/50 
                           text-red-400 hover:bg-red-500/30 transition-all duration-300 z-10"
                >
                  <FiX className="text-2xl" />
                </button>

                {/* Header Image */}
                {selectedNews.thumbnail_filename && (
                  <button
                    type="button"
                    className="relative h-96 overflow-hidden w-full text-left"
                    onClick={() => openLightboxAt(0)}
                    aria-label="Open image gallery"
                  >
                    <img
                      src={selectedNews.thumbnail_filename && selectedNews.thumbnail_filename.startsWith('data:') ? selectedNews.thumbnail_filename : `/assests/images/${selectedNews.thumbnail_filename}`}
                      alt={selectedNews.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </button>
                )}

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Date & Location */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <span className="flex items-center gap-2 text-cyan-400 text-base">
                      <FiCalendar />
                      {selectedNews.date_from}{selectedNews.date_to && ` - ${selectedNews.date_to}`}
                    </span>
                    {selectedNews.location && (
                      <span className="flex items-center gap-2 text-purple-400 text-base">
                        <FiMapPin />
                        {selectedNews.location}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                    {selectedNews.title}
                  </h2>

                  {/* Subtitle */}
                  {selectedNews.subtitle && (
                    <p className="text-xl text-purple-400 mb-8">{selectedNews.subtitle}</p>
                  )}

                  {/* Description */}
                  <div
                    className="prose prose-invert prose-lg max-w-none mb-8
                             prose-headings:gradient-text
                             prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                             prose-strong:text-white
                             prose-code:text-purple-400 prose-code:bg-purple-500/10 prose-code:px-1 prose-code:rounded"
                    dangerouslySetInnerHTML={{ __html: selectedNews.description }}
                  />

                  {/* Photo Gallery */}
                  {selectedNews.photos && selectedNews.photos.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold gradient-text mb-6">Photo Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedNews.photos.map((photo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-square rounded-xl overflow-hidden border-2 border-cyan-500/20 
                                     hover:border-cyan-500/50 transition-all duration-300 group"
                          >
                            <button
                              type="button"
                              className="absolute inset-0"
                              onClick={() => openLightboxAt((selectedNews.thumbnail_filename ? 1 : 0) + index)}
                              aria-label={`Open image ${index + 1}`}
                            >
                              <img
                                src={photo && photo.startsWith('data:') ? photo : `/assests/images/${photo}`}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {lightboxOpen && selectedNews && lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return
              const delta = e.changedTouches[0].clientX - touchStartX
              if (Math.abs(delta) > 50) {
                if (delta < 0) nextImage()
                else prevImage()
              }
              setTouchStartX(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-5xl w-[92vw] aspect-[16/9] glass rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImages[lightboxIndex] && lightboxImages[lightboxIndex].startsWith('data:') ? lightboxImages[lightboxIndex] : `/assests/images/${lightboxImages[lightboxIndex]}`}
                alt={`Image ${lightboxIndex + 1} of ${lightboxImages.length}`}
                className="w-full h-full object-contain bg-black/50"
                draggable={false}
              />

              {/* Controls */}
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-900/50 border border-white/20 text-white hover:bg-gray-800/70"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-900/50 border border-white/20 text-white hover:bg-gray-800/70"
              >
                ›
              </button>
              <button
                onClick={closeLightbox}
                aria-label="Close gallery"
                className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 border border-red-400/40 text-red-200 hover:bg-red-500/30"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}
