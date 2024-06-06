// import { useEffect, useRef, useState } from 'react';
// import mapboxgl, { Map } from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import styles from './CountryMap.module.scss';

// const CountryMap = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, _setLng] = useState(5);
//   const [lat, _setLat] = useState(46);
//   const [zoom, _setZoom] = useState(2);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       accessToken: '',
//       container: mapContainer.current || '',
//       style: 'mapbox://styles/seantokuzo/clx2jpkg701i701ppa5j951yb/draft',
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   }, [map]);

//   return (
//     <div>
//       <div ref={mapContainer} className={styles.mapContainer} />
//     </div>
//   );
// };

// export default CountryMap;
