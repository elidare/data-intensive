import { useState, useEffect } from 'react'
import apiService from '../services/api'

const TeamsTable = ({ database }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    apiService.getTeams(database).then((teams) => {
      setTeams(teams)
    })
  }, [database])

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Team Name</th>
              <th className="border px-3 py-2">Base Country</th>
              <th className="border px-3 py-2">Principal</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.team_id}>
                <td className="border px-3 py-2">{team.team_id}</td>
                <td className="border px-3 py-2">{team.team_name}</td>
                <td className="border px-3 py-2">{team.base_country}</td>
                <td className="border px-3 py-2">{team.principal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamsTable
