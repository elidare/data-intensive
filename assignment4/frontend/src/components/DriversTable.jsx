import { useState, useEffect } from 'react'
import apiService from '../services/api'

const DriversTable = () => {
  const [drivers, setDrivers] = useState([])
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiService.getDrivers().then((teams) => {
      setDrivers(teams)
    })
  }, [])

  const handleUpdateClick = (driver) => {
    setSelectedDriver({ ...driver })
    setShowModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedDriver((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const fullName = selectedDriver.full_name.trim()
    const nationality = selectedDriver.nationality.trim()
    const socialMedia = selectedDriver.social_media.trim()
    const position = parseInt(selectedDriver.championship_position.toString().trim())

    if (!(fullName && nationality && socialMedia && !isNaN(position))) {
        alert('Please fill in all the inputs')
        return
    }

    if (position < 0) {
        alert('Please use positive numbers')
        return
    }

    const updateData = {
        full_name: fullName,
        nationality: nationality,
        social_media: socialMedia,
        championship_position: position
    }
    apiService.updateDriver(selectedDriver.driver_id, updateData).then((driver) => {
      setDrivers((prevDrivers) =>
          prevDrivers.map((d) =>
            d.driver_id === selectedDriver.driver_id ? driver : d
          )
      )
      setShowModal(false);
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedDriver(null)
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
      <h2 className="text-xl font-bold mb-4">Drivers</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Driver ID</th>
            <th className="border px-3 py-2">Driver</th>
            <th className="border px-3 py-2">Nationality</th>
            <th className="border px-3 py-2">Team ID</th>
            <th className="border px-3 py-2">Social media</th>
            <th className="border px-3 py-2">Position</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driver_id}>
              <td className="border px-3 py-2">{driver.driver_id}</td>
              <td className="border px-3 py-2">{driver.full_name}</td>
              <td className="border px-3 py-2">{driver.nationality}</td>
              <td className="border px-3 py-2">{driver.team_id}</td>
              <td className="border px-3 py-2">
                  <a href={`https://www.instagram.com/${driver.social_media.replaceAll("@", "")}`} target="_blank">{driver.social_media}</a>
              </td>
              <td className="border px-3 py-2">{driver.championship_position}</td>
              <td className="border px-3 py-2">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(driver)}
                  >
                    Update
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showModal && selectedDriver && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Edit driver</h3>
            <label>
              Name:
              <input
                type="text"
                name="full_name"
                value={selectedDriver.full_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Nationality:
              <input
                type="text"
                name="nationality"
                value={selectedDriver.nationality}
                onChange={handleChange}
              />
            </label>
            <label>
              Social media:
              <input
                type="text"
                name="social_media"
                value={selectedDriver.social_media}
                onChange={handleChange}
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                name="championship_position"
                value={selectedDriver.championship_position}
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

export default DriversTable
