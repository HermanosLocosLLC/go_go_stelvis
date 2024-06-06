import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  // 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

function SimpleMap() {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}

export default SimpleMap;
