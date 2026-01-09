import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  footer?: ReactNode
}

export default function Card({ 
  children, 
  className = '', 
  title, 
  description,
  footer 
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm',
        className
      )}
    >
      {(title || description) && (
        <div className="px-6 pb-0">
          {title && (
            <h3 className="text-lg font-semibold leading-none mb-1.5">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="px-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 pt-0 flex items-center border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  )
}

// Sub-components để linh hoạt hơn
export function CardHeader({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('px-6 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('text-lg font-semibold leading-none', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardDescription({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn('text-sm text-gray-600 mt-1.5', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('px-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('px-6 pt-0 flex items-center border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  )
}
