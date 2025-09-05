"use client"

import { Suspense } from "react"
import { useInView } from "react-intersection-observer"

interface Lazy3DWrapperProps {
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
  children: React.ReactNode
  className?: string
}

const LoadingSkeleton = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-lg animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export function Lazy3DWrapper({ 
  children, 
  fallback = <LoadingSkeleton />,
  threshold = 0.1,
  rootMargin = "50px",
  className = ""
}: Lazy3DWrapperProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

 