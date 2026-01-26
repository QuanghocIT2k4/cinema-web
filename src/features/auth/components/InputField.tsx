import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon, rightIcon, className = '', ...props }, ref) => {
    const errorClass = props['aria-invalid']
      ? 'border-red-500 bg-red-500/10 text-red-300 placeholder:text-red-300/50'
      : 'border-gray-600 bg-[#3a4553] text-white placeholder:text-gray-500 focus:border-[#648DDB]'

    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full ${icon ? 'pl-10' : 'pl-3'} ${rightIcon ? 'pr-10' : 'pr-3'} py-2.5 rounded-md border transition-colors ${errorClass} focus:outline-none focus:ring-2 focus:ring-[#648DDB]/50 ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'


