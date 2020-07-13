import React from 'react'
import './info.css'

const Info = ({acceptedJob, cancel, currentJob, distance}) => {

  return <div className="info">

            {!currentJob ? 
                <p>Welcome back, please select a job</p>
              :
              !acceptedJob ?
                <p>Approx distance: {distance.toFixed(1)} miles</p>
              :
                <>
                  <p>Job accepted: {acceptedJob[0].$claims[0].claimType}</p>
                  <button onClick={cancel}>Cancel job</button>
                </>
            }

          </div>

}

export default Info