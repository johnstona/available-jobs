import React, { useEffect, useState } from 'react'
import API from '../../adapters/API'
import Map from '../../components/Map/Map'

const Main = () => {

  const [jobs, setJobs] = useState()

  useEffect(() => {
    API.getAllJobs()
    .then(res => setJobs(res))
  }, [])

  return jobs ? <Map jobs={jobs} /> : 'Loading...'
}

export default Main