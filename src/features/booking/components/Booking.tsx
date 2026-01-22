import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookingHeader, BookingStepper, ShowtimeSelector, SeatSelector, RefreshmentSelector, BookingSummary } from './index'

export default function Booking() {
  const { showtimeId } = useParams<{ showtimeId: string }>()
  // Nếu đã có showtimeId trong URL thì bắt đầu từ step 2 (chọn ghế), không cần step 1 (chọn showtime)
  const [step, setStep] = useState(showtimeId ? 2 : 1)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [selectedRefreshments, setSelectedRefreshments] = useState<Array<{ refreshmentId: number; quantity: number }>>([])
  const [currentShowtimeId, setCurrentShowtimeId] = useState<string | undefined>(showtimeId)

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <BookingHeader />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingStepper currentStep={step} />
        
        {step === 1 && (
          <ShowtimeSelector
            onSelectShowtime={(id: number | string) => {
              setCurrentShowtimeId(String(id))
              setStep(2)
            }}
          />
        )}

        {step === 2 && currentShowtimeId && (
          <SeatSelector
            showtimeId={currentShowtimeId}
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
          <RefreshmentSelector
            selectedRefreshments={selectedRefreshments}
            onRefreshmentToggle={(refreshmentId: number, quantity: number) => {
              setSelectedRefreshments((prev) => {
                const existing = prev.find((r) => r.refreshmentId === refreshmentId)
                if (quantity === 0) {
                  return prev.filter((r) => r.refreshmentId !== refreshmentId)
                }
                if (existing) {
                  return prev.map((r) =>
                    r.refreshmentId === refreshmentId ? { ...r, quantity } : r
                  )
                }
                return [...prev, { refreshmentId, quantity }]
              })
            }}
            onSkip={() => setStep(4)}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && currentShowtimeId && (
          <BookingSummary
            showtimeId={currentShowtimeId}
            selectedSeats={selectedSeats}
            selectedRefreshments={selectedRefreshments}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </div>
  )
}

