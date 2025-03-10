import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import WeatherDashboard from './assets/weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <WeatherDashboard/>
  )
}

export default App
