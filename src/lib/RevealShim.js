import React from 'react'
import { motion } from 'framer-motion'

const Fade = ({ children, duration = 0.6, distance = 20, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

const Flip = ({ children, duration = 0.6, ...rest }) => {
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration }}
      style={{ transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export { Fade, Flip }
