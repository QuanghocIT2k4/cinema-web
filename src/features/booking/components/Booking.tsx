import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookingHeader, BookingStepper, ShowtimeSelector, SeatSelector, BookingSummary } from './index'

export default function Booking() {
  const { showtimeId } = useParams<{ showtimeId: string }>()
  const [step, setStep] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <BookingHeader />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingStepper currentStep={step} />
        
        {step === 1 && (
          <ShowtimeSelector
            onSelectShowtime={(_id: number | string) => {
              setStep(2)
            }}
          />
        )}

        {step === 2 && showtimeId && (
          <SeatSelector
            showtimeId={showtimeId}
            selectedSeats={selectedSeats}
            onSeatToggle={(seatId: number) => {
              setSelectedSeats((prev) =>
                prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
              )
            }}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <BookingSummary
            showtimeId={showtimeId || ''}
            selectedSeats={selectedSeats}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  )
}

