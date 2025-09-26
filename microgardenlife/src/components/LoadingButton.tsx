import { ButtonHTMLAttributes, ReactNode } from 'react'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function LoadingButton({ 
  loading = false, 
  children, 
  variant = 'primary',
  className = '',
  disabled,
  ...props 
}: LoadingButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${baseClass} ${className} ${
        loading || disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading && <div className="loading-spinner mr-2" />}
      {children}
    </button>
  )
}