'use client'

import { ReactNode, useEffect, useState } from 'react'

interface ClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Wrapper to handle client-only rendering and prevent hydration mismatches
 * Use this for components that need to access window, localStorage, or other browser APIs
 */
export default function ClientWrapper({ children, fallback = null }: ClientWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}