import React from 'react'

// Giữ type cũ để không phá props từ HomeSection, nhưng UI dùng nội dung tĩnh giống movie-ticket-web
type ContactItem = {
  id: string
  title: string
  desc: string
}

type Props = {
  items: ContactItem[]
}

const ContactSection: React.FC<Props> = () => {
  return (
    <div className="py-12 lg:py-16 bg-[#1A2232]/50 rounded-3xl">
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Contact Us</h2>
          <p className="text-gray-400 mt-2">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-[#242b3d] p-8 rounded-2xl shadow-lg border border-white/10">
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#1a2232] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FE7E32]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-[#1a2232] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FE7E32]"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full bg-[#1a2232] border border-gray-700 rounded-lg px-4 py-3 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-[#FE7E32]"
              ></textarea>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#a855f7] to-[#648DDB] text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-gray-300">
            <div className="p-6 bg-[#242b3d] rounded-2xl border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Address</h3>
              <p>470 Tran Dai Nghia, Ngu Hanh Son, Da Nang</p>
            </div>
            <div className="p-6 bg-[#242b3d] rounded-2xl border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Email</h3>
              <p>support@cinestech.me</p>
            </div>
            <div className="p-6 bg-[#242b3d] rounded-2xl border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Phone</h3>
              <p>(+84) 123 456 789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection





