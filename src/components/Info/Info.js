import React from 'react'
import './info.css'

const Info = ({acceptedJob, cancel}) => {

  return <div className="info">

            {!acceptedJob ? 
                <p>Welcome back, please select a job</p>
              :
                <>
                  <p>Job accepted: {acceptedJob[0].$claims[0].claimType}</p>
                  <button onClick={cancel}>Cancel job</button>
                </>
            }

          </div>

}

export default Info