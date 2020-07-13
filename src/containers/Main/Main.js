import React, { useEffect, useState } from 'react'
import API from '../../adapters/API'
import JobMap from '../../components/JobMap/JobMap'
import Info from '../../components/Info/Info'

const Main = () => {

  const [jobs, setJobs] = useState()
  const [currentJob, setCurrentJob] = useState(null)
  const [acceptedJob, setAcceptedJob] = useState(null)
  const [popup, togglePopup] = useState(false)

  useEffect(() => {
    API.getAllJobs()
    .then(res => setJobs(res))
  }, [])

  const viewJob = (job) => {
    setCurrentJob(job)
    togglePopup(true)
  }

  const acceptJob = (job) => {
    setAcceptedJob([job])
    togglePopup(!popup)
  }

  const cancelJob = () => {
    setAcceptedJob(null)
  }

  //spoof user location as mount rushmore

  const userLocation = [-103.38183449999997, 43.9685522]

  const validateCoords = (coords) => {
    return (coords.longitude <= 180 && coords.longitude >= -180) && (coords.latitude <= 90 && coords.latitude >= -90)
  }

  const jobsToShow = jobs && (acceptedJob ? acceptedJob : jobs.filter(j => validateCoords(j.$propertyLocation.coords)))

  return jobs ?
          <>
          <Info acceptedJob={acceptedJob} cancel={cancelJob}/>
          <JobMap jobs={jobsToShow} viewJob={viewJob} currentJob={currentJob} acceptJob={acceptJob} popup={popup} togglePopup={togglePopup} acceptedJob={acceptedJob} userLocation={userLocation}/> 
          </>
          : 'Loading...'
}

export default Main