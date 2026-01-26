import { type ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {children}
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  )
}


