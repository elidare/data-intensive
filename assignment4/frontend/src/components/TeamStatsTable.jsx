import { useState, useEffect } from 'react'
import apiService from '../services/api'

const TeamStatsTable = () => {
    const [teamStats, setTeamStats] = useState([]);

      useEffect(() => {
        apiService.getTeamStats().then((results) => {
          setTeamStats(results)
        })
      }, [])

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Team stats</h2>
        <table>
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team</th>
              <th>Season</th>
              <th>Average finish</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {teamStats.map((result) => (
              <tr key={result.team_id}>
                <td>{result.team_id}</td>
                <td>{result.team_name}</td>
                <td>{result.season}</td>
                <td>{result.avg_finish}</td>
                <td>{result.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamStatsTable
