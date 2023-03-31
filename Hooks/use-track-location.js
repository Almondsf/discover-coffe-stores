import { useState } from "react"
import { flushSync } from "react-dom"

const useTrackLocation = () =>{
    const [locationErrorMsg, setLocationErrorMsg] = useState('')
    const [latLong, setLatLong] = useState('')
    const [isFinding, setIsFinding] = useState(false)
    const  success = (position) =>{
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatLong(`${latitude},${longitude}`)
        setLocationErrorMsg('')
        setIsFinding(false)
    }

    const error = () =>{
        setIsFinding(false)
        setLocationErrorMsg('Unable to retrieve your location');
    }

    const handleTrackLocation = () =>{
        setIsFinding(true)
        if (!navigator.geolocation) {
            setLocationErrorMsg('Geolocation is not supported by your browser');
        setIsFinding(false) 
          } else {
            // status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
          }
        
    }
    return{
        latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFinding,
    }
}
export default useTrackLocation