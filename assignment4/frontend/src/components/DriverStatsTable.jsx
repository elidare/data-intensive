import { useState, useEffect } from 'react'
import apiService from '../services/api'

const DriverStatsTable = () => {
    const [driverStats, setDriverStats] = useState([]);

      useEffect(() => {
        apiService.getDriverStats().then((results) => {
          setDriverStats(results)
        })
      }, [])

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Driver stats</h2>
        <table>
          <thead>
            <tr>
              <th>Driver ID</th>
              <th>Driver</th>
              <th>Season</th>
              <th>Average finish</th>
              <th>Podiums</th>
              <th>Wins</th>
              <th>DNFs</th>
            </tr>
          </thead>
          <tbody>
            {driverStats.map((result) => (
              <tr key={result.driver_id}>
                <td>{result.driver_id}</td>
                <td>{result.full_name}</td>
                <td>{result.season}</td>
                <td>{result.avg_finish}</td>
                <td>{result.podiums}</td>
                <td>{result.wins}</td>
                <td>{result.dnfs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DriverStatsTable
