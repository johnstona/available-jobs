import React, { useState, useRef } from 'react'
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import './jobmap.css'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_API_KEY
});


const JobMap = ({jobs, viewJob, currentJob, acceptJob }) => {

  const jobMap = useRef(null)

  const handleClick = (job) => {
    jobMap.current.state.map.flyTo({center: [job.$propertyLocation.coords.longitude, job.$propertyLocation.coords.latitude]})
    viewJob(job)
  }

  const handleAccept = () => {
    acceptJob(currentJob)
  } 

  return  <Map ref={jobMap}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
            center={[-99.9018131, 31.9685988]}
            zoom={[2]}
          >

          {jobs.map(j => {
                return <Marker coordinates={[j.$propertyLocation.coords.longitude, j.$propertyLocation.coords.latitude]} anchor="center" >
                          <div className="marker" onClick={() => handleClick(j)}>
                            <span></span>
                            {/* <img src="http://www.clker.com/cliparts/g/R/z/I/u/o/map-pin-hi.png"/> */}
                            </div>
                        </Marker>
              })}
          {currentJob && 
            <Popup
            coordinates={[currentJob.$propertyLocation.coords.longitude, currentJob.$propertyLocation.coords.latitude]}
           >
            <p>{currentJob.$claims[0].claimType}</p>
            <button onClick={handleAccept}>Accept job?</button>
          </Popup>
          }
        </Map>
       
}

export default JobMap


