import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import vector from '../imgs/rabbit.svg';
import {formatRelative} from 'date-fns';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 37.727392,
  lng: 127.060996,
};
const options = {
  styles: [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#444444',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#46bcec',
        },
        {
          visibility: 'on',
        },
      ],
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const iconMarker = {
  url: vector,
};

const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  },[])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        options={options}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers
          ? markers.map((marker) => (
              <Marker
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{...iconMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))
          : null}
        {selected ? (
          <InfoWindow onCloseClick={() => {setSelected(null)}} position={{lat: selected.lat, lng: selected.lng}}>
            <div>
              <h2>Rabbit Spot!</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
