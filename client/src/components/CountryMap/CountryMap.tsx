// import { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import styles from './CountryMap.module.scss';

// mapboxgl.accessToken =
//   'pk.eyJ1Ijoic2VhbnRva3V6byIsImEiOiJjbHd6eWtwMjMwZG82MmtwdDZ1YmthemwzIn0.ioGCBIHwUtSdqqY9HP_VHA';

const CountryMap = () => {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(5);
  // const [lat, setLat] = useState(46);
  // const [zoom, setZoom] = useState(9);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v12',
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // }, [map]);

  return (
    <div>
      {/* <div ref={mapContainer} className={styles.mapContainer} /> */}
    </div>
  );
};

export default CountryMap;
