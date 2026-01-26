export function AboutIntro() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">Beloved Cinema</h2>
        <p className="text-gray-300 mb-4">
          CineTECH aims to become a complete entertainment destination for every Vietnamese family, combining
          cinema, dining, and technology experiences.
        </p>
        <p className="text-gray-300">
          We accompany Vietnamese cinema while updating international blockbusters, delivering
          friendly service, great prices, and continuously improving service quality.
        </p>
      </div>
      <div className="h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80"
          alt="Cinema"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}


