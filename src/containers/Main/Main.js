import React, { useEffect, useState } from 'react'
import API from '../../adapters/API'
import JobMap from '../../components/JobMap/JobMap'
import Task from '../../components/Task/Task'

const Main = () => {

  const [jobs, setJobs] = useState()
  const [currentJob, setCurrentJob] = useState(null)
  const [acceptedJob, setAcceptedJob] = useState(null)

  useEffect(() => {
    API.getAllJobs()
    .then(res => setJobs(res))
  }, [])

  const viewJob = (job) => {
    setCurrentJob(job)
  }

  const acceptJob = (job) => {
    setAcceptedJob([job])
  }

  const validateCoords = (coords) => {
    return (coords.longitude <= 180 && coords.longitude >= -180) && (coords.latitude <= 90 && coords.latitude >= -90)
  }

  const jobsToShow = jobs && (acceptedJob ? acceptedJob : jobs.filter(j => validateCoords(j.$propertyLocation.coords)))

  return jobs ?
          <>
          <JobMap jobs={jobsToShow} viewJob={viewJob} currentJob={currentJob} acceptJob={acceptJob}/> 
          </>
          : 'Loading...'
}

export default Main