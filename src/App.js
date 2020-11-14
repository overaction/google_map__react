import { useLoadScript } from '@react-google-maps/api';
import React, { useCallback, useRef } from 'react';
import MapComponent, {panTo} from './components/mapComponent';
import SearchComponent from './components/SearchComponent';

const libraries = ['places'];
const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  // map 정보 저장 , useRef를 통해 re rendering 없이 정보를 저장
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  },[]);
  // 
  const panTo = useCallback(({lat,lng}) => {
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(14);
  }, []);

  return (
    <>
    <h1>
      Rabbit Map
    </h1>
      {isLoaded ? ( <>
      <SearchComponent panTo={panTo}/>
      <MapComponent mapRef={mapRef} onMapLoad={onMapLoad}/>
      </>
      ) : <div>Now Loading...</div>}
    </>
  )
}

export default App;
