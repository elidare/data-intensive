import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'  // todo delete localhost

const getTeams = () => {
    const request = axios.get(`${baseUrl}/teams`)
    return request.then(response => response.data)
}

const updateTeam = (teamId, updateData) => {
    const request = axios.patch(`${baseUrl}/teams/${teamId}`, updateData)
    return request.then(response => response.data)
}

const createTeam = (data) => {
    const request = axios.post(`${baseUrl}/teams`, data)
    return request.then(response => response.data)
}

const getDrivers = () => {
    const request = axios.get(`${baseUrl}/drivers`)
    return request.then(response => response.data)
}

const updateDriver = (driverId, updateData) => {
    const request = axios.patch(`${baseUrl}/drivers/${driverId}`, updateData)
    return request.then(response => response.data)
}

const deleteDriver = (driverId) => {
    const request = axios.delete(`${baseUrl}/drivers/${driverId}`)
    return request.then(response => response.data)
}

const getTracks = () => {
    const request = axios.get(`${baseUrl}/tracks`)
    return request.then(response => response.data)
}

const updateTrack = (trackId, updateData) => {
    const request = axios.patch(`${baseUrl}/tracks/${trackId}`, updateData)
    return request.then(response => response.data)
}

const createTrack = (data) => {
    const request = axios.post(`${baseUrl}/tracks`, data)
    return request.then(response => response.data)
}

const getRaces = () => {
    const request = axios.get(`${baseUrl}/races`)
    return request.then(response => response.data)
}

const getResults = () => {
    const request = axios.get(`${baseUrl}/results`)
    return request.then(response => response.data)
}

const getDriverStats = () => {
    const request = axios.get(`${baseUrl}/driver-stats`)
    return request.then(response => response.data)
}

const getTeamStats = () => {
    const request = axios.get(`${baseUrl}/team-stats`)
    return request.then(response => response.data)
}

export default {
    getTeams,
    getDrivers,
    getTracks,
    getRaces,
    getResults,
    getDriverStats,
    getTeamStats,
    createTeam,
    createTrack,
    updateTeam,
    updateDriver,
    updateTrack,
    deleteDriver,
}
