export default function Success() {
  return (
    <div className="min-h-screen bg-racing-gradient bg-speed-lines flex items-center justify-center px-4">
      <div className="glass-card p-12 text-center animate-slide-up max-w-2xl">
        <div className="text-8xl mb-6">😊</div>
        <h1 className="text-4xl md:text-6xl font-bold text-racing-gold mb-8">
          Registration Successfully
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-12">
          ROTARACT CLUB OF MUMBAI ANCHORS
        </h2>

        <div className="bg-white/5 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-racing-red mb-4">Any Queries</h3>
          <div className="space-y-2 text-left">
            <p className="text-lg"><strong>Dhairya Unadkat</strong></p>
            <p>Mobile: <span className="text-racing-gold">9987734211</span></p>
            <p>Email: <span className="text-racing-gold">rtr.dhairyaunadkat@gmail.com</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}