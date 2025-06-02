import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city)
      setCity('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center 
                      bg-white/5 backdrop-blur-md rounded-2xl p-2
                      hover:bg-white/10 transition-colors duration-300">
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-6 py-3 bg-white/10 rounded-xl sm:rounded-full
                     text-white placeholder-white/50
                     border border-white/10 focus:border-white/20
                     focus:outline-none focus:ring-2 focus:ring-white/10
                     transition-all duration-300"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff]
                     text-white font-medium rounded-xl sm:rounded-full
                     hover:shadow-lg hover:shadow-blue-500/25
                     transform hover:scale-[1.02] active:scale-[0.98]
                     transition-all duration-300"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
