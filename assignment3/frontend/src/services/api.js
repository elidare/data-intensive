import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'  // TODO

const getTeams = (database) => {
    const request = axios.get(`${baseUrl}/teams?database=${database}`)
    return request.then(response => response.data)
}

const updateTeam = (database, teamId, updateData) => {
    const request = axios.patch(`${baseUrl}/teams/${teamId}?database=${database}`, updateData)
    return request.then(response => response.data)
}

const getDrivers = (database) => {
    const request = axios.get(`${baseUrl}/drivers?database=${database}`)
    return request.then(response => response.data)
}

const updateDriver = (database, driverId, updateData) => {
    const request = axios.patch(`${baseUrl}/drivers/${driverId}?database=${database}`, updateData)
    return request.then(response => response.data)
}

const getTracks = (database) => {
    const request = axios.get(`${baseUrl}/tracks?database=${database}`)
    return request.then(response => response.data)
}

const updateTrack = (database, trackId, updateData) => {
    const request = axios.patch(`${baseUrl}/tracks/${trackId}?database=${database}`, updateData)
    return request.then(response => response.data)
}

const getRaces = (database) => {
    const request = axios.get(`${baseUrl}/races?database=${database}`)
    return request.then(response => response.data)
}

const getResults = (database) => {
    const request = axios.get(`${baseUrl}/results?database=${database}`)
    return request.then(response => response.data)
}

export default {
    getTeams,
    getDrivers,
    getTracks,
    getRaces,
    getResults,
    updateTeam,
    updateDriver,
    updateTrack,
}
