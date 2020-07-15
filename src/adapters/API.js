const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://run.mocky.io/v3/d27b910a-4fcc-4ff6-ba34-717f9834105d'
const DIRECTIONS_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'

const getAllJobs = async () => {
  const res = await fetch(BASE_URL)
  return res.json()
}

const fetchDirections = async (coordsOne, coordsTwo) => {
  const res = await fetch(`${DIRECTIONS_URL}${coordsOne};${coordsTwo}?access_token=${process.env.REACT_APP_API_KEY}`)
  return res.json()
}

export default {
  getAllJobs,
  fetchDirections
}