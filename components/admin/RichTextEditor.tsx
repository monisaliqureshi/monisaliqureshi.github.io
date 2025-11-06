'use client'

import { useState } from 'react'
import { FiEye, FiCode } from 'react-icons/fi'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  format?: 'html' | 'markdown'
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  label = 'Description',
  format = 'html'
}: RichTextEditorProps) {
  const [preview, setPreview] = useState(false)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-cyan-400">
          {label} ({format.toUpperCase()})
        </label>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 
                   text-purple-400 hover:bg-purple-500/20 transition-all duration-300 text-sm"
        >
          {preview ? <><FiCode className="inline mr-1" /> Edit</> : <><FiEye className="inline mr-1" /> Preview</>}
        </button>
      </div>

      {preview ? (
        <div 
          className="min-h-[300px] p-4 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                   backdrop-blur-sm text-gray-300 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={15}
          className="w-full px-4 py-3 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                   backdrop-blur-sm text-white placeholder-gray-500 focus:border-cyan-500 
                   focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-mono text-sm"
          placeholder={format === 'html' 
            ? '<p>Enter HTML content...</p>' 
            : '# Enter Markdown content...'}
        />
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>Tip: You can use {format === 'html' ? 'HTML tags' : 'Markdown syntax'} for formatting.</p>
        {format === 'html' && (
          <p>Examples: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;, &lt;img&gt;</p>
        )}
        {format === 'markdown' && (
          <p>Examples: # Heading, **bold**, *italic*, [link](url), ![image](url)</p>
        )}
      </div>
    </div>
  )
}
