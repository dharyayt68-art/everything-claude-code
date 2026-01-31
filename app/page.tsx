'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: '',
    clubName: '',
  })
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value)
    })
    if (paymentScreenshot) {
      submitData.append('paymentScreenshot', paymentScreenshot)
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        window.location.href = '/success'
      } else {
        alert('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-racing-gradient bg-speed-lines">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="glass-card inline-block p-6 mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-racing-gold mb-2">
            ROTARACT CLUB OF MUMBAI ANCHORS
          </h1>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 animate-slide-up">
          GO KARTING TOURNAMENT REGISTRATION
        </h2>
      </header>

      {/* Main Form */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        <div className="glass-card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-racing-gold font-semibold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="racing-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-racing-gold font-semibold mb-2">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="racing-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-racing-gold font-semibold mb-2">Email ID *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="racing-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-racing-gold font-semibold mb-2">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="racing-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-racing-gold font-semibold mb-2">Club Name (If non-RTR then write N/A) *</label>
              <input
                type="text"
                name="clubName"
                value={formData.clubName}
                onChange={handleInputChange}
                className="racing-input w-full"
                required
              />
            </div>

            {/* Payment QR Section */}
            <div className="bg-white/5 rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-racing-red mb-4">Payment Details</h3>
              <p className="text-gray-300 mb-4">Please scan the QR code below to make payment:</p>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-yellow-400">[Payment QR Code Placeholder]</p>
                <p className="text-sm text-gray-400 mt-2">Upload your payment screenshot below</p>
              </div>
            </div>

            <div>
              <label className="block text-racing-gold font-semibold mb-2">Upload Payment Successful Screenshot *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="racing-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-racing-gold file:text-racing-black hover:file:bg-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="racing-button w-full text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Register Now'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}