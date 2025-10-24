import { useState, useEffect } from 'react'
import apiService from '../services/api'

const TeamsTable = ({ database }) => {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiService.getTeams(database).then((teams) => {
      setTeams(teams)
    })
  }, [database])

  const handleUpdateClick = (team) => {
    setSelectedTeam({ ...team })
    setShowModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedTeam((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const teamName = selectedTeam.team_name.trim()
    const baseCountry = selectedTeam.base_country.trim()
    const principal = selectedTeam.principal.trim()

    if (!(teamName && baseCountry && principal)) {
        alert('Please fill in all the inputs')
        return
    }

    const updateData = { team_name: teamName, base_country: baseCountry, principal: principal }
    apiService.updateTeam(database, selectedTeam.team_id, updateData).then((team) => {
      setTeams((prevTeams) =>
          prevTeams.map((t) =>
            t.team_id === selectedTeam.team_id ? team : t
          )
      )
      setShowModal(false);
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedTeam(null)
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Team name</th>
              <th className="border px-3 py-2">Base country</th>
              <th className="border px-3 py-2">Principal</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.team_id}>
                <td className="border px-3 py-2">{team.team_id}</td>
                <td className="border px-3 py-2">{team.team_name}</td>
                <td className="border px-3 py-2">{team.base_country}</td>
                <td className="border px-3 py-2">{team.principal}</td>
                <td className="border px-3 py-2">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(team)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedTeam && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Edit team</h3>
            <label>
              Team name:
              <input
                type="text"
                name="team_name"
                value={selectedTeam.team_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Base country:
              <input
                type="text"
                name="base_country"
                value={selectedTeam.base_country}
                onChange={handleChange}
              />
            </label>
            <label>
              Principal:
              <input
                type="text"
                name="principal"
                value={selectedTeam.principal}
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

export default TeamsTable
