const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://run.mocky.io/v3/d27b910a-4fcc-4ff6-ba34-717f9834105d'

const getAllJobs = async () => {
  const res = await fetch(BASE_URL)
  return res.json()
}

export default {
  getAllJobs
}