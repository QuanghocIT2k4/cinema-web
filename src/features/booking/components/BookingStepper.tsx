interface BookingStepperProps {
  currentStep: number
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  const steps = [
    { number: 1, label: 'Choose showtime' },
    { number: 2, label: 'Choose seats' },
    { number: 3, label: 'Choose refreshment' },
    { number: 4, label: 'Confirm' },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number
                    ? 'bg-[#fe7e32] text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step.number}
              </div>
              <div
                className={`mt-2 text-sm ${
                  currentStep >= step.number ? 'text-white' : 'text-gray-400'
                }`}
              >
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step.number ? 'bg-[#fe7e32]' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


