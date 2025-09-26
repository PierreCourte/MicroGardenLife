'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-3xl font-mont font-bold text-red-600 mb-4">
                Oops ! Une erreur s'est produite
              </h1>
              <p className="text-gray-600 mb-6">
                Quelque chose ne s'est pas passé comme prévu. Essaie de recharger la page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Recharger la page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}