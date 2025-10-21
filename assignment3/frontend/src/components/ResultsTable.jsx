import { useState, useEffect } from 'react'
import apiService from '../services/api'

const ResultsTable = ({ database }) => {
    const [results, setResults] = useState([]);

      useEffect(() => {
        apiService.getResults(database).then((results) => {
          setResults(results)
        })
      }, [database])

    return (
        <div className="table-container">
          <div className="table-wrapper">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Track Name</th>
                  <th>Position</th>
                  <th>Driver</th>
                  <th>Team Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {results.map((resItem, index) => (
                  <tr key={index}>
                    <td>{resItem.date}</td>
                    <td>{resItem.track_name}</td>
                    <td>{resItem.position}</td>
                    <td>{resItem.first_name}&nbsp;{resItem.last_name}</td>
                    <td>{resItem.team_name}</td>
                    <td>{resItem.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default ResultsTable
