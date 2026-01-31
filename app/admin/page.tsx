'use client'

import { useState, useEffect } from 'react'

interface Registration {
  id: number
  name: string
  mobile: string
  email: string
  age: number
  clubName: string
  paymentScreenshot: string
  createdAt: string
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'DHAIRYAPRM') {
      setIsAuthenticated(true)
      fetchRegistrations()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchRegistrations = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/registrations')
      if (response.ok) {
        const data = await response.json()
        setRegistrations(data)
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    }
    setLoading(false)
  }

  const downloadFile = (fileName: string) => {
    window.open(`/api/admin/download/${fileName}`, '_blank')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-racing-gradient bg-speed-lines flex items-center justify-center px-4">
        <div className="glass-card p-8 w-full max-w-md animate-slide-up">
          <h1 className="text-2xl font-bold text-racing-gold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="racing-input w-full"
                required
              />
            </div>
            <button type="submit" className="racing-button w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-racing-gradient bg-speed-lines p-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 mb-6">
          <h1 className="text-3xl font-bold text-racing-gold mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">Total Registrations: {registrations.length}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-racing-gold text-xl">Loading...</div>
          </div>
        ) : (
          <div className="glass-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4 text-racing-gold font-semibold">Name</th>
                  <th className="text-left p-4 text-racing-gold font-semibold">Mobile</th>
                  <th className="text-left p-4 text-racing-gold font-semibold">Email</th>
                  <th className="text-left p-4 text-racing-gold font-semibold">Age</th>
                  <th className="text-left p-4 text-racing-gold font-semibold">Club Name</th>
                  <th className="text-left p-4 text-racing-gold font-semibold">Payment Screenshot</th>
                  <th className="text-left p-4 text-racing-gold font-semibold">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4 text-white">{reg.name}</td>
                    <td className="p-4 text-white">{reg.mobile}</td>
                    <td className="p-4 text-white">{reg.email}</td>
                    <td className="p-4 text-white">{reg.age}</td>
                    <td className="p-4 text-white">{reg.clubName}</td>
                    <td className="p-4">
                      <button
                        onClick={() => downloadFile(reg.paymentScreenshot)}
                        className="bg-racing-red text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        View/Download
                      </button>
                    </td>
                    <td className="p-4 text-gray-300">{new Date(reg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}