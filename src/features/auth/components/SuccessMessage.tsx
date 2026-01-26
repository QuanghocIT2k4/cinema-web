interface SuccessMessageProps {
  message: string
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="p-4 bg-emerald-500/20 border border-emerald-400/60 text-emerald-200 rounded-lg backdrop-blur-sm text-sm">
      {message}
    </div>
  )
}


