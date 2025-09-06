'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

const SynopsisContainer = ({ synopsis }: { synopsis: string }) => {
  const [showMore, setShowMore] = useState(false)
  const [needsTruncation, setNeedsTruncation] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  const handleClick = () => setShowMore(!showMore)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const checkTruncation = () => {
      // Cek jika konten melebihi container
      const needsTruncate = element.scrollHeight > 80
      setNeedsTruncation(needsTruncate)
    }

    // Check initially
    checkTruncation()

    // Use ResizeObserver untuk handle responsive changes
    const resizeObserver = new ResizeObserver(checkTruncation)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [synopsis])

  if (needsTruncation) {
    return (
      <div className="w-full lg:w-[50%]">
        <p ref={contentRef} className="text-sm md:text-md text-white">
          {synopsis}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <div
        className={cn(
          "w-full overflow-hidden transition-all duration-500 ease-in-out relative",
          showMore ? "max-h-[1000px]" : "max-h-20"
        )}
      >
        <p className="text-sm md:text-md text-white">
          {synopsis}
        </p>
        
        {!showMore && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        )}
      </div>

      <button 
        className={cn(
          'pb-1 border-b border-b-orange-500 transition-all duration-300',
          'hover:opacity-80 active:scale-95'
        )}
        onClick={handleClick}
      >
        <span className="capitalize text-sm md:text-md text-orange-500">
          {showMore ? 'show less' : 'show more'}
        </span>
      </button>
    </div>
  )
}

export default SynopsisContainer