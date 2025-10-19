import { useState, useEffect } from 'react'
import apiService from './services/api'


function App() {
  const [database, setDatabase] = useState('database1')
  const [teams, setTeams] = useState([])
  const [drivers, setDrivers] = useState([])
  const [tracks, setTracks] = useState([])
  const [races, setRaces] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    apiService.getTeams(database).then((teams) => {
      setTeams(teams)
    })
  }, [])

  return (

  )
}

export default App