import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer'

    const variants = {
      default: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800',
      secondary: 'bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 active:bg-gray-400',
      outline: 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100',
      destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
      ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
      link: 'text-blue-600 underline-offset-4 hover:underline active:text-blue-700',
    }

    const sizes = {
      sm: 'h-8 rounded-md gap-1.5 px-3 text-sm',
      default: 'h-9 px-4 py-2',
      lg: 'h-10 rounded-md px-6 text-base',
    }

    return (
      <button
        ref={ref}
        data-slot="button"
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export default Button
