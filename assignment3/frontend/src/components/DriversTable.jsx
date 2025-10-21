import { useState, useEffect } from 'react'
import apiService from '../services/api'

const DriversTable = ({ database }) => {
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    apiService.getDrivers(database).then((teams) => {
      setDrivers(teams)
    })
  }, [database])

  return (
    <div className="table-container">
      <div className="table-wrapper">
      <h2 className="text-xl font-bold mb-4">Drivers</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Driver ID</th>
            <th className="border px-3 py-2">First Name</th>
            <th className="border px-3 py-2">Last Name</th>
            <th className="border px-3 py-2">Nationality</th>
            <th className="border px-3 py-2">Team ID</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driver_id}>
              <td className="border px-3 py-2">{driver.driver_id}</td>
              <td className="border px-3 py-2">{driver.first_name}</td>
              <td className="border px-3 py-2">{driver.last_name}</td>
              <td className="border px-3 py-2">{driver.nationality}</td>
              <td className="border px-3 py-2">{driver.team_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default DriversTable
