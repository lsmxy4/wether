import WeatherCard from './components/WeatherCard'
import './App.css'
import { useState, useRef, useEffect, useMemo } from 'react'
import { fetchCoordinates } from './api/geo'
import { fetchWeatherByCoords } from './api/weather'
import { getColorByWeatherId } from './.data/bgColor'
function App() {

  const [city, setCity] = useState('seoul')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const bg = useMemo(() => {
    const weatherId = weather?.weather?.[0]?.id
    return getColorByWeatherId(weatherId ?? 0)
  }, [weather])


  const handleSearch = async () => {
    const q = city.trim()
    if (!q) return

    try {
      setLoading(true)
      setErr('')
      const { lat, lon, name, country } = await fetchCoordinates(q)

      console.log(lat, lon, name, country)
      const data = await fetchWeatherByCoords(lat, lon,)
      console.log(data)
      setWeather(data)
      setCity('')

    } catch (error) {
      console.error(error)
      setErr(error.message || '날씨 정보를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }

  }
  const onChangeInput = (e) => setCity(e.target.value)
  const onKeyup = (e) => {
    if (e.key === 'Enter') handleSearch()
  }
  return (
    <div className='app' style={{ background: bg }}>
      <div className="container">
        <h1>신동환의 날씨앱</h1>
        <div className="input-wrap">
          <input
            value={city}
            onChange={onChangeInput}
            onKeyUp={onKeyup}
            ref={inputRef}
            type="text"
            placeholder='날씨를 입력하세요' />
          <button
            onClick={handleSearch}
          >검색</button>
        </div>
        <WeatherCard weather={weather} />
      </div>
    </div>
  )
}

export default App
