import { GoogleMap,  useJsApiLoader } from '@react-google-maps/api'
import {useEffect, useState, useRef, useCallback} from 'react'

const containerStyle = {
    width: '600px',
    height: '600px'
}

const MapContainer = (p) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDMSoywE8yPatEj8e5y5NIjOc5hIuLjEmA"
    })
    const [map, setMap] = useState(null)
    const zoom = useRef(null)

    console.log(p._key)

    const getTypeName = (tp) => {
      switch(tp){
        case 'F':
          return 'Farm'
        case 'S':
          return 'Sensor'
        case 'c':
          return 'Infield Collection'
        case 'C':
          return 'Collection Point'
        case 'W':
          return 'Washing Station'
      }
    }

    const onLoad = useCallback(async function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(p.mapCenter);
        map.fitBounds(bounds);
        
        
        
        const marker = new window.google.maps.Marker({
            map: map,
            position: p.mapCenter,
            label: p.centerName,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        })
        marker.addListener('click', function() {
          // Handle the click event here
          console.log(marker.label);
        })

        console.log('loading data points')
        console.log(p.dataPoints)
        p.dataPoints.forEach(item=>{
            console.log(item)
            const dp = new window.google.maps.Marker({
              map: map,
              position: item.coords,
              label: getTypeName(item.type),
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            })
        })
        
        setMap(map)
        setTimeout(()=>{
            //if(!zoom.current){
              map.setZoom(16)
              zoom.current = 16
            //}
            
        },100)
    }, [])

    

    const handleZoomChanged = () => {
        if (map) {
          const currentZoom = map.getZoom();
          console.log('Current Zoom:', currentZoom);
          if(p.handleZoom) p.handleZoom(currentZoom).then(()=>{
            //zoom.current = currentZoom
          })
          // You can perform any action based on the current zoom level here
        }
      }

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    

    
    return (isLoaded)? (
        <GoogleMap
          key={p._key}
          mapContainerStyle={containerStyle}
          center={p.mapCenter}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapTypeId='satellite'
          onZoomChanged={handleZoomChanged}
        >
          
          
        </GoogleMap>
    ) : <div style={containerStyle}>loading</div>

}

export default MapContainer

//AIzaSyDMSoywE8yPatEj8e5y5NIjOc5hIuLjEmA