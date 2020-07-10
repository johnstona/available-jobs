import React, { useState, useEffect, useRef } from 'react'
import './map.css'
import mapboxgl from 'mapbox-gl';

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

const Map = ({jobs}) => {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState([40.748441, -73.985664])
  const [toggle, setToggle] = useState(false)
  const mapContainer = useRef(null);

  const jobLocations = (
    jobs.map(j => {
      return j.$propertyLocation?.coords
    })
  )

  console.log(jobLocations)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-77.005854, 38.882001],
        zoom: 11
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  const showMarker = () => {
      var marker = new mapboxgl.Marker()
      .setLngLat([-77.005854, 38.882001])
      .addTo(map);
    } 

  return <>
          <div ref={el => (mapContainer.current = el)} style={styles} />
          <button onClick={showMarker} > TOGGLE </button>
          </>
};

export default Map