import React, { useEffect, useState } from "react";
import apiService from '../services/api'

const TracksTable = ({ database }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    apiService.getTracks(database).then((tracks) => {
      setTracks(tracks)
    })
  }, [database])

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Tracks</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Track Name</th>
              <th>Location</th>
              <th>Country</th>
              <th>Length (km)</th>
              <th>Laps</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr key={track.track_id}>
                <td>{track.track_id}</td>
                <td>{track.track_name}</td>
                <td>{track.location}</td>
                <td>{track.country}</td>
                <td>{track.length_km}</td>
                <td>{track.laps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TracksTable
