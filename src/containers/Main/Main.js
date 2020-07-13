import React, { useEffect, useState } from 'react'
import API from '../../adapters/API'
import JobMap from '../../components/JobMap/JobMap'
import Info from '../../components/Info/Info'

const Main = () => {

  const [jobs, setJobs] = useState()
  const [currentJob, setCurrentJob] = useState(null)
  const [acceptedJob, setAcceptedJob] = useState(null)
  const [popup, togglePopup] = useState(false)
  const [directions, setDirections] = useState(null)

  useEffect(() => {
    API.getAllJobs()
    .then(res => setJobs(res))
  }, [])

  const viewJob = (job) => {
    setCurrentJob(job)
    togglePopup(true)
    getDirections(job)
  }

  const acceptJob = (job) => {
    setAcceptedJob([job])
    togglePopup(!popup)
  }

  const cancelJob = () => {
    setAcceptedJob(null)
    setCurrentJob(null)
  }

  //spoof user location as mount rushmore

  const userLocation = [-103.38183449999997, 43.9685522]

  const getDirections = (job) => {
    const coordsOne = `${userLocation[0].toFixed(2)},${userLocation[1].toFixed(2)}`
    const coordsTwo = `${job.$propertyLocation.coords.longitude.toFixed(2)},${job.$propertyLocation.coords.latitude.toFixed(2)}`
    API.fetchDirections(coordsOne, coordsTwo)
    .then(res => setDirections(res.routes[0]))
  }

  const validateCoords = (coords) => {
    return (coords.longitude <= 180 && coords.longitude >= -180) && (coords.latitude <= 90 && coords.latitude >= -90)
  }

  const jobsToShow = jobs && (acceptedJob ? acceptedJob : jobs.filter(j => validateCoords(j.$propertyLocation.coords)))
  const distanceInMetres = directions?.distance
  const distanceInMiles = distanceInMetres / 1600

  return jobs ?
          <>
          <Info acceptedJob={acceptedJob} cancel={cancelJob} currentJob={currentJob} distance={distanceInMiles} />
          <JobMap jobs={jobsToShow} viewJob={viewJob} currentJob={currentJob} acceptJob={acceptJob} popup={popup} togglePopup={togglePopup} acceptedJob={acceptedJob} userLocation={userLocation}/> 
          </>
          : 'Loading...'
}

export default Main