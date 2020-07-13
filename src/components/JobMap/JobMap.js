import React, { useState, useRef } from 'react'
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import './jobmap.css'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_API_KEY
});


const JobMap = ({jobs, viewJob, currentJob, acceptJob, popup, acceptedJob, togglePopup }) => {

  const jobMap = useRef(null)
  const youMarker = useRef(null)
  const [center, setCenter] = useState([-99.9018131, 31.9685988])
  const [youHere, toggleYouHere] = useState(true)

  const centreOn = (job) => {
    let newCenter = [job.$propertyLocation.coords.longitude, job.$propertyLocation.coords.latitude]
    jobMap.current.state.map.flyTo({center: newCenter})
    setCenter(newCenter)
  }

  const handleClick = (job) => {
    viewJob(job)
    centreOn(job)
  }

  const handleAccept = () => {
    acceptJob(currentJob)
    centreOn(currentJob)
  }

  return  <Map ref={jobMap}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
            center={center}
            zoom={[2]}
          >
            
            <Marker coordinates={[-103.38183449999997, 43.9685522]} anchor="center">
                <div ref={youMarker} className="marker" id="you-are-here" onClick={() => toggleYouHere(true)}>
                            <span></span>
                            </div>
              </Marker>
          {youHere && 
            <Popup coordinates={[-103.38183449999997, 43.9685522]} >
                <p>You are here</p>
                <button onClick={() => toggleYouHere(false)}>Got it</button>    
            </Popup>
          }
          {jobs.map(j => {
                return <Marker coordinates={[j.$propertyLocation.coords.longitude, j.$propertyLocation.coords.latitude]} anchor="center" >
                          <div className="marker" onClick={() => handleClick(j)}>
                            <span></span>
                            </div>
                        </Marker>
              })}
          {popup && 
            <Popup
            coordinates={[currentJob.$propertyLocation.coords.longitude, currentJob.$propertyLocation.coords.latitude]}
            onClick={() => togglePopup(!popup)}>
            <p>{currentJob.$claims[0].claimType}</p>
            {!acceptedJob ? <button onClick={handleAccept}>Accept job?</button> : <p>Job Accepted!</p>}
          </Popup>
          }
        </Map>
       
}

export default JobMap


