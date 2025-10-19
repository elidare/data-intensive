import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'  // TODO

const getTeams = (database) => {
    const request = axios.get(`${baseUrl}/teams?database=${database}`)
    return request.then(response => response.data)
}

const getDrivers = (database) => {
    const request = axios.get(`${baseUrl}/drivers?database=${database}`)
    return request.then(response => response.data)
}

const getTracks = (database) => {
    const request = axios.get(`${baseUrl}/tracks?database=${database}`)
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
}
