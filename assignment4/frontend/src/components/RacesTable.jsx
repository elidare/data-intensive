import { useState, useEffect } from 'react'
import apiService from '../services/api'

const RacesTable = () => {
    const [races, setRaces] = useState([]);

      useEffect(() => {
        apiService.getRaces().then((races) => {
          setRaces(races)
        })
      }, [])

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Races</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Track Name</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <tr key={race.race_id}>
                <td>{race.race_id}</td>
                <td>{race.date}</td>
                <td>{race.track_name}</td>
                <td>{race.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RacesTable
