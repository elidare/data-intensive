import { useState, useEffect } from 'react'
import apiService from '../services/api'

const DriversTable = ({ database }) => {
  const [drivers, setDrivers] = useState([])
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiService.getDrivers(database).then((teams) => {
      setDrivers(teams)
    })
  }, [database])

  const handleUpdateClick = (driver) => {
    setSelectedDriver({ ...driver })
    setShowModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedDriver((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const firstName = selectedDriver.first_name.trim()
    const lastName = selectedDriver.last_name.trim()
    const nationality = selectedDriver.nationality.trim()

    if (!(firstName && lastName && nationality)) {
        alert('Please fill in all the inputs')
        return
    }

    const updateData = { first_name: firstName, last_name: lastName, nationality: nationality }
    apiService.updateDriver(database, selectedDriver.driver_id, updateData).then((driver) => {
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
            <th className="border px-3 py-2">First name</th>
            <th className="border px-3 py-2">Last name</th>
            <th className="border px-3 py-2">Nationality</th>
            <th className="border px-3 py-2">Team ID</th>
            <th className="border px-3 py-2">Actions</th>
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
              First name:
              <input
                type="text"
                name="first_name"
                value={selectedDriver.first_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Last name:
              <input
                type="text"
                name="last_name"
                value={selectedDriver.last_name}
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
