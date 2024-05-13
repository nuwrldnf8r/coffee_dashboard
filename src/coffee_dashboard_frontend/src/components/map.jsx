import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {IconWrapper, ShedIcon, TractorIcon, BucketIcon} from '../icons/icons'
import ReactDOMServer from 'react-dom/server'

const containerStyle = {
    width: '600px',
    height: '600px'
}



const MapContainer = (p) => {
    const mapContainerRef = useRef(null)
    //{lng: 18.381409, lat: -34.150376}

    const getMarkerTitle = (tp) => {
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

    const getMarkerColor = (tp) => {
        switch(tp){
            case 'F':
              return 'green'
            case 'S':
              return '#007bff'
            case 'c':
              return 'green'
            case 'C':
              return 'green'
            case 'W':
              return 'green'
          }
    }

    const getMarkerIcon = (tp) => {
        switch(tp){
            case 'F':
              return ReactDOMServer.renderToStaticMarkup(IconWrapper((<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{position: 'relative', top: -11, left: 3}} xmlns="http://www.w3.org/2000/svg">
              <path d="M9.92772 25.2946L3.06287 15.7732C1.93922 14.4702 1.21561 12.8804 0.976314 11.1891C0.737015 9.49774 0.991876 7.77443 1.71122 6.21985C2.43056 4.66527 3.58477 3.34341 5.03943 2.40822C6.49409 1.47302 8.18933 0.962983 9.92772 0.9375C12.3375 0.960889 14.6395 1.9213 16.3298 3.60839C18.02 5.29547 18.9606 7.57171 18.9456 9.93857C18.9465 12.0033 18.2308 14.0067 16.9166 15.6182L9.92772 25.2946ZM9.92772 3.15179C8.11496 3.17223 6.38456 3.89842 5.11648 5.17089C3.84839 6.44336 3.14629 8.15809 3.16432 9.93857C3.17187 11.5637 3.76715 13.1332 4.8439 14.3671L9.92772 21.4418L15.1468 14.2232C16.1389 13.007 16.6831 11.497 16.6911 9.93857C16.7092 8.15809 16.007 6.44336 14.739 5.17089C13.4709 3.89842 11.7405 3.17223 9.92772 3.15179Z" fill={getMarkerColor(tp)} transform="scale(1) translate(0,0)"/>
              <path d="M12.3492 0.000163171C11.7325 0.0044056 11.1236 0.0908964 10.5327 0.265178C9.94639 0.438297 9.40628 0.689216 8.91611 1.00877C9.45164 2.35143 10.8188 4.05579 12.4024 5.51074C14.0559 7.02994 15.9518 8.32067 17.1762 8.90277L17.1906 8.90961L17.2047 8.91666C18.3298 9.48699 19.1264 10.3846 19.5862 11.3748C19.8823 12.0124 20.0548 12.6802 20.1553 13.3592C21.0569 12.6653 22.0073 12.1097 22.9735 11.7065C22.9 10.4536 22.6207 9.1398 22.1119 7.8243C21.0449 5.06535 19.1811 2.84423 17.0704 1.48967C15.5533 0.516097 13.9254 -0.0106482 12.3492 0.000163171ZM7.0502 2.89494C6.69561 3.43783 6.40482 4.04313 6.18386 4.7005C5.44596 6.89521 5.50581 9.64827 6.57293 12.4074C7.21873 14.0772 8.15671 15.5495 9.26446 16.7524C10.3558 17.0746 11.4352 17.5723 12.4491 18.2477C13.2325 18.7696 13.9306 19.3669 14.5355 20.0166C14.733 20.064 14.9305 20.1044 15.1278 20.1361C15.5037 19.1687 15.9916 18.2062 16.5928 17.2725C16.9566 16.707 17.3552 16.1642 17.7863 15.6469C17.7913 15.2916 17.7884 14.9473 17.7713 14.6187C17.7248 13.7298 17.5805 12.9696 17.3163 12.4007C17.0522 11.8318 16.7081 11.4344 16.0638 11.1079L16.0923 11.1217C14.5056 10.3673 12.5243 8.98871 10.7009 7.31343C9.25142 5.98185 7.90683 4.49037 7.0502 2.89494ZM26.4514 12.1821C25.5147 12.1896 24.5237 12.4043 23.5212 12.8149C21.3824 13.6909 19.2348 15.4664 17.6464 17.933C16.8338 19.1949 16.2499 20.5106 15.8868 21.8006C17.312 24.1598 17.662 26.8698 16.6353 29.1457C16.8013 29.3796 16.9865 29.5996 17.1892 29.8034C18.6902 28.5257 20.4201 27.4672 21.6496 26.3802C22.3216 25.7863 22.8304 25.1981 23.1132 24.6381C23.3959 24.0779 23.4932 23.564 23.3462 22.8643L23.3376 22.8236L23.3319 22.7825C22.7734 18.7937 23.7532 16.4495 25.1811 15.0154C26.3293 13.8624 27.4722 13.2552 28.2607 12.4534C27.691 12.2666 27.0836 12.177 26.4514 12.1821ZM30.3868 13.8211C29.2335 15.2355 27.8116 15.8888 26.9621 16.742C25.9859 17.7224 25.312 18.9025 25.8029 22.4285C26.0392 23.6273 25.8315 24.7786 25.348 25.7363C24.8559 26.7112 24.1198 27.5039 23.3157 28.2149C22.0942 29.2948 20.6852 30.2195 19.5065 31.1216C20.8432 31.4642 22.3652 31.2984 23.9148 30.6636C26.0536 29.7878 28.2013 28.0121 29.7896 25.5455C31.3781 23.0789 32.0948 20.4063 31.99 18.1238C31.9098 16.3783 31.3634 14.8826 30.3869 13.8212L30.3868 13.8211ZM25.8029 22.4285C25.7987 22.4069 25.7954 22.3855 25.7908 22.3639L25.8052 22.4456C25.8045 22.4398 25.8038 22.4341 25.8029 22.4285H25.8029ZM6.36896 17.5412C5.09407 17.5298 3.89311 17.8056 2.88232 18.3491C2.88925 18.3493 2.89528 18.3498 2.90222 18.35C3.50072 18.3708 4.25208 18.3012 5.11717 18.4177C5.98219 18.5343 6.99555 18.9219 7.76321 19.7789C8.53093 20.6359 9.05731 21.8509 9.42397 23.5957L9.43264 23.6364L9.43832 23.6776C9.60844 24.895 10.3944 25.5993 11.757 26.2588C12.9196 26.8214 14.4123 27.2232 15.8291 27.6323C16.4637 24.8268 14.9581 21.4051 11.7506 19.2685C10.0211 18.1165 8.12529 17.5568 6.3691 17.5412H6.36896ZM0.746081 20.3772C-1.00643 23.3558 0.399046 27.7266 4.22101 30.2725C7.98159 32.7776 12.5283 32.481 14.7167 29.8825C13.4381 29.523 11.9887 29.1147 10.6575 28.4706C8.94107 27.6399 7.30507 26.244 6.97496 24.0761C6.66059 22.5912 6.24052 21.7989 5.89238 21.4102C5.54285 21.0197 5.2703 20.9247 4.77929 20.8587C4.28828 20.7925 3.61349 20.8397 2.81435 20.812C2.19157 20.7903 1.46089 20.7021 0.746081 20.3773V20.3772ZM6.97503 24.076C6.97655 24.0829 6.97808 24.0892 6.97953 24.0961L6.96518 24.0142C6.96809 24.035 6.9719 24.0553 6.97509 24.0761L6.97503 24.076Z" fill={getMarkerColor(tp)} transform="scale(0.4) translate(9,10)"/>
            </svg>), getMarkerColor(tp)))
            case 'S':
              return ReactDOMServer.renderToStaticMarkup(IconWrapper((<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{position: 'relative', top: -11, left: 3}} xmlns="http://www.w3.org/2000/svg">
              <path d="M9.92772 25.2946L3.06287 15.7732C1.93922 14.4702 1.21561 12.8804 0.976314 11.1891C0.737015 9.49774 0.991876 7.77443 1.71122 6.21985C2.43056 4.66527 3.58477 3.34341 5.03943 2.40822C6.49409 1.47302 8.18933 0.962983 9.92772 0.9375C12.3375 0.960889 14.6395 1.9213 16.3298 3.60839C18.02 5.29547 18.9606 7.57171 18.9456 9.93857C18.9465 12.0033 18.2308 14.0067 16.9166 15.6182L9.92772 25.2946ZM9.92772 3.15179C8.11496 3.17223 6.38456 3.89842 5.11648 5.17089C3.84839 6.44336 3.14629 8.15809 3.16432 9.93857C3.17187 11.5637 3.76715 13.1332 4.8439 14.3671L9.92772 21.4418L15.1468 14.2232C16.1389 13.007 16.6831 11.497 16.6911 9.93857C16.7092 8.15809 16.007 6.44336 14.739 5.17089C13.4709 3.89842 11.7405 3.17223 9.92772 3.15179Z" fill={getMarkerColor(tp)} transform="scale(1) translate(0,0)"/>
              <path d="M7.68 15.08C6.22667 13.64 5.33333 11.64 5.33333 9.42667C5.33333 7.21333 6.22667 5.21333 7.68 3.77333L9.57333 5.66667C8.6 6.62667 8 7.96 8 9.42667C8 10.8933 8.6 12.2267 9.56 13.2L7.68 15.08ZM18.9867 15.08C20.44 13.64 21.3333 11.64 21.3333 9.42667C21.3333 7.21333 20.44 5.21333 18.9867 3.77333L17.0933 5.66667C18.0667 6.62667 18.6667 7.96 18.6667 9.42667C18.6667 10.8933 18.0667 12.2267 17.1067 13.2L18.9867 15.08ZM13.3333 6.76C11.8667 6.76 10.6667 7.96 10.6667 9.42667C10.6667 10.8933 11.8667 12.0933 13.3333 12.0933C14.8 12.0933 16 10.8933 16 9.42667C16 7.96 14.8 6.76 13.3333 6.76ZM24 9.42667C24 12.3733 22.8 15.04 20.8667 16.96L22.76 18.8533C25.1733 16.44 26.6667 13.1067 26.6667 9.42667C26.6667 5.74667 25.1733 2.41333 22.76 0L20.8667 1.89333C21.8613 2.87934 22.6504 4.0529 23.1882 5.34603C23.7261 6.63915 24.002 8.02615 24 9.42667ZM5.8 1.89333L3.90667 0C1.49333 2.41333 0 5.74667 0 9.42667C0 13.1067 1.49333 16.44 3.90667 18.8533L5.8 16.96C3.86667 15.04 2.66667 12.3733 2.66667 9.42667C2.66667 6.48 3.86667 3.81333 5.8 1.89333Z" fill={getMarkerColor(tp)} transform="scale(0.5) translate(7,11)"/>
              </svg>), getMarkerColor(tp)))
            case 'c':
              return ReactDOMServer.renderToStaticMarkup(IconWrapper(<svg width="32" height="32" fill="none" viewBox="0 0 32 32" style={{position: 'relative', top: -11, left: 3}}>
              <path d="M9.92772 25.2946L3.06287 15.7732C1.93922 14.4702 1.21561 12.8804 0.976314 11.1891C0.737015 9.49774 0.991876 7.77443 1.71122 6.21985C2.43056 4.66527 3.58477 3.34341 5.03943 2.40822C6.49409 1.47302 8.18933 0.962983 9.92772 0.9375C12.3375 0.960889 14.6395 1.9213 16.3298 3.60839C18.02 5.29547 18.9606 7.57171 18.9456 9.93857C18.9465 12.0033 18.2308 14.0067 16.9166 15.6182L9.92772 25.2946ZM9.92772 3.15179C8.11496 3.17223 6.38456 3.89842 5.11648 5.17089C3.84839 6.44336 3.14629 8.15809 3.16432 9.93857C3.17187 11.5637 3.76715 13.1332 4.8439 14.3671L9.92772 21.4418L15.1468 14.2232C16.1389 13.007 16.6831 11.497 16.6911 9.93857C16.7092 8.15809 16.007 6.44336 14.739 5.17089C13.4709 3.89842 11.7405 3.17223 9.92772 3.15179Z" fill={getMarkerColor(tp)} transform="scale(1) translate(0,0)"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" transform="scale(0.5) translate(8,11)" stroke={getMarkerColor(tp)} strokeWidth={3}/>
            </svg>, getMarkerColor(tp)))
            case 'C':
              return ReactDOMServer.renderToStaticMarkup(IconWrapper((
                <svg width="32" height="32" viewBox="0 0 32 32" stroke="currentColor" fill="none" style={{position: 'relative', top: -11, left: 3}}>
                  
                  <circle cx="19" cy="17" r="2"  strokeWidth="1.5" transform="scale(1) translate(-6,-4)"/>
                  <circle cx="7" cy="15" r="4"  strokeWidth="1.5" transform="scale(0.7) translate(3,2)"/>
                  <path d="M10.5 17h6.5"  strokeWidth="1.5" transform="scale(0.5) translate(7,8)"/> 
                  <path d="M20 15.2v-4.2a1 1 0 0 0 -1 -1h-6l-2 -5h-6v6.5"  strokeWidth="1.5" transform="scale(0.6) translate(3,4)"/>
                  <path d="M18 5h-1a1 1 0 0 0 -1 1v4"  strokeWidth="1.5" transform="scale(0.7) translate(5,5)"/>
                  <path d="M9.92772 25.2946L3.06287 15.7732C1.93922 14.4702 1.21561 12.8804 0.976314 11.1891C0.737015 9.49774 0.991876 7.77443 1.71122 6.21985C2.43056 4.66527 3.58477 3.34341 5.03943 2.40822C6.49409 1.47302 8.18933 0.962983 9.92772 0.9375C12.3375 0.960889 14.6395 1.9213 16.3298 3.60839C18.02 5.29547 18.9606 7.57171 18.9456 9.93857C18.9465 12.0033 18.2308 14.0067 16.9166 15.6182L9.92772 25.2946ZM9.92772 3.15179C8.11496 3.17223 6.38456 3.89842 5.11648 5.17089C3.84839 6.44336 3.14629 8.15809 3.16432 9.93857C3.17187 11.5637 3.76715 13.1332 4.8439 14.3671L9.92772 21.4418L15.1468 14.2232C16.1389 13.007 16.6831 11.497 16.6911 9.93857C16.7092 8.15809 16.007 6.44336 14.739 5.17089C13.4709 3.89842 11.7405 3.17223 9.92772 3.15179Z" fill={getMarkerColor(tp)} transform="scale(1) translate(0,0)" strokeWidth={0.1}/>
                </svg>
              ), getMarkerColor(tp)))
            case 'W':
              return ReactDOMServer.renderToStaticMarkup(IconWrapper((
                <svg  width="32" height="32" viewBox="0 0 32 32" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{position: 'relative', top: -11, left: 3}}>  
                  <path stroke="none" d="M0 0h24v24H0z" strokeWidth="3" transform="scale(0.5) translate(7,7)"/>  
                  <path d="M3 21v-13l9-4l9 4v13" strokeWidth="3" transform="scale(0.5) translate(7,7)"/>  
                  <path d="M13 13h4v8h-10v-6h6" strokeWidth="2" transform="scale(0.5) translate(7,7)"/> 
                  <path d="M9.92772 25.2946L3.06287 15.7732C1.93922 14.4702 1.21561 12.8804 0.976314 11.1891C0.737015 9.49774 0.991876 7.77443 1.71122 6.21985C2.43056 4.66527 3.58477 3.34341 5.03943 2.40822C6.49409 1.47302 8.18933 0.962983 9.92772 0.9375C12.3375 0.960889 14.6395 1.9213 16.3298 3.60839C18.02 5.29547 18.9606 7.57171 18.9456 9.93857C18.9465 12.0033 18.2308 14.0067 16.9166 15.6182L9.92772 25.2946ZM9.92772 3.15179C8.11496 3.17223 6.38456 3.89842 5.11648 5.17089C3.84839 6.44336 3.14629 8.15809 3.16432 9.93857C3.17187 11.5637 3.76715 13.1332 4.8439 14.3671L9.92772 21.4418L15.1468 14.2232C16.1389 13.007 16.6831 11.497 16.6911 9.93857C16.7092 8.15809 16.007 6.44336 14.739 5.17089C13.4709 3.89842 11.7405 3.17223 9.92772 3.15179Z" fill={getMarkerColor(tp)} transform="scale(1) translate(0,0)" strokeWidth={0.1}/>
                </svg>
              ), getMarkerColor(tp)))
          }
    }

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibnV3cmxkbmY4ciIsImEiOiJjbHZ6YWF2b28waDJhMmpxeWRsdXE3YXI5In0.CiHTxIWFTzs6R6KNE4pxYw'
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11', // Example style, you can use any Mapbox style URL
            center: [p.mapCenter.lng, p.mapCenter.lat ], // Initial center longitude and latitude
            zoom: 12, // Initial zoom level
        })

        map.on('click',e=>{
          const {lng,lat} = e.lngLat
          console.log(lng, lat)
        })
        const el = document.createElement('div');
        el.className = 'custom-marker'
        el.innerHTML = getMarkerIcon('F')
        
        if(p.farmData){
          console.log(p.farms[p.selected])
          const popup = new mapboxgl.Popup().setHTML(`
                  <h3>${p.farms[p.selected].name}</h3>
                  <div>${p.farms[p.selected].metadata}</div>
                  <div>Total collected: ${p.farmData.collected} kg</div>
              `)
          const marker1 = new mapboxgl.Marker(el).setLngLat([p.mapCenter.lng, p.mapCenter.lat]).setPopup(popup).addTo(map)
        } else {
          const marker1 = new mapboxgl.Marker(el).setLngLat([p.mapCenter.lng, p.mapCenter.lat]).addTo(map)
        }
        
        p.dataPoints.forEach(item=>{
            if(!(item.data.coords.lng===p.mapCenter.lng && item.data.coords.lat===p.mapCenter.lat)){
              const el = document.createElement('div');
              el.className = 'custom-marker'
              el.innerHTML = getMarkerIcon(item.type)
              if(item.type!=='S'){
                const popup = new mapboxgl.Popup().setHTML(`
                    <h3>${getMarkerTitle(item.type)}</h3>
                    <div>Total collected: ${item.collected} kg</div>
                `) //<p>${marker.description}</p>
                const marker = new mapboxgl.Marker({element: el, color: getMarkerColor(item.type)}).setLngLat([item.data.coords.lng,item.data.coords.lat]).setPopup(popup).addTo(map)
              } else if(p.showSensors){
                const marker = new mapboxgl.Marker({element: el, color: getMarkerColor(item.type)}).setLngLat([item.data.coords.lng,item.data.coords.lat]).addTo(map)
                el.addEventListener('click',()=>{
                  p.onSensorClick(item.id).then()
                  //console.log('Sensor ' + item.id + ' clicked')
                })
              }
            }
        })
        return () => map.remove()
    })

    return (<div ref={mapContainerRef} style={{ width: '100%', height: 600 }} />)
}

export default MapContainer

//AIzaSyDMSoywE8yPatEj8e5y5NIjOc5hIuLjEmA