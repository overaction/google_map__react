import React, { useCallback } from 'react';
import { faCompass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MyLocation = ({panTo}) => {

  const moveToLocate = useCallback((position) => {
    panTo({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  },[panTo]);

  return <button className="myLocate" onClick={() => {
    navigator.geolocation.getCurrentPosition(moveToLocate,() => null)
  }}>
    <FontAwesomeIcon icon={faCompass} size="2x" />
    </button>
}

export default MyLocation;