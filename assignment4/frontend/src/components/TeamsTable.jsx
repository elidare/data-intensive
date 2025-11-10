import { useState, useEffect } from 'react'
import apiService from '../services/api'

const TeamsTable = () => {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiService.getTeams().then((teams) => {
      setTeams(teams)
    })
  }, [])

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
    const staffNumber = parseInt(selectedTeam.staff_number.toString().trim())
    const position = parseInt(selectedTeam.championship_position.toString().trim())

    if (!(teamName && baseCountry && principal && !isNaN(staffNumber) && !isNaN(position))) {
        alert('Please fill in all the inputs')
        return
    }

    if (staffNumber < 0 || position < 0) {
        alert('Please use positive numbers')
        return
    }

    const data = {
        team_name: teamName,
        base_country: baseCountry,
        principal: principal,
        staff_number: staffNumber,
        championship_position: position
    }
    if (selectedTeam.team_id) {
        apiService.updateTeam(selectedTeam.team_id, data).then((team) => {
          setTeams((prevTeams) =>
              prevTeams.map((t) =>
                t.team_id === selectedTeam.team_id ? team : t
              )
          )
          setShowModal(false);
        })
    } else {
        apiService.createTeam(data).then((newTeam) => {
          setTeams((prevTeams) => [...prevTeams, newTeam])
          setShowModal(false)
        })
    }
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
              <th className="border px-3 py-2">Staff number</th>
              <th className="border px-3 py-2">Position</th>
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
                <td className="border px-3 py-2">{team.staff_number}</td>
                <td className="border px-3 py-2">{team.championship_position}</td>
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
        <button
          className="create-btn mt-4"
          onClick={() => {
            setSelectedTeam({
              team_name: '',
              base_country: '',
              principal: '',
              staff_number: '',
              championship_position: '',
            })
            setShowModal(true)
          }}
        >
          Create new team
        </button>
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
            <label>
              Staff number:
              <input
                type="text"
                name="staff_number"
                value={selectedTeam.staff_number}
                onChange={handleChange}
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                name="championship_position"
                value={selectedTeam.championship_position}
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
