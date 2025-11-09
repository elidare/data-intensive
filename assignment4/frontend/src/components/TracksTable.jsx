import React, { useEffect, useState } from "react";
import apiService from '../services/api'

const TracksTable = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiService.getTracks().then((tracks) => {
      setTracks(tracks)
    })
  }, [])

  const handleUpdateClick = (track) => {
    setSelectedTrack({ ...track })
    setShowModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedTrack((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const country = selectedTrack.country.trim()
    const laps = parseInt(selectedTrack.laps)
    const length = parseFloat(selectedTrack.length_km)
    const location = selectedTrack.location.trim()
    const trackName = selectedTrack.track_name.trim()

    if (!(country && location && trackName && laps && length)) {
        alert('Please fill in all the inputs')
        return
    }

    const updateData = { country: country, laps: laps, length_km: length, location: location, track_name: trackName }
    apiService.updateTrack(selectedTrack.track_id, updateData).then((track) => {
      setTracks((prevTracks) =>
          prevTracks.map((t) =>
            t.track_id === selectedTrack.track_id ? track : t
          )
      )
      setShowModal(false);
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedTrack(null)
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Tracks</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Track name</th>
              <th>Location</th>
              <th>Country</th>
              <th>Length (km)</th>
              <th>Laps</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Record lap</th>
              <th className="border px-3 py-2">Actions</th>
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
                <td>{track.lat}</td>
                <td>{track.lng}</td>
                <td>{track.record_lap_driver}</td>
                <td className="border px-3 py-2">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(track)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedTrack && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Edit track</h3>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={selectedTrack.country}
                onChange={handleChange}
              />
            </label>
            <label>
              Laps:
              <input
                type="text"
                name="laps"
                value={selectedTrack.laps}
                onChange={handleChange}
              />
            </label>
            <label>
              Length:
              <input
                type="text"
                name="length_km"
                value={selectedTrack.length_km}
                onChange={handleChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={selectedTrack.location}
                onChange={handleChange}
              />
            </label>
            <label>
              Track name:
              <input
                type="text"
                name="track_name"
                value={selectedTrack.track_name}
                onChange={handleChange}
              />
            </label>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TracksTable
