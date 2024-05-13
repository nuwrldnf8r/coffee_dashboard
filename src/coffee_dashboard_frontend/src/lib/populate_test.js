import { coffee_dashboard_backend } from 'declarations/coffee_dashboard_backend'
import Geohash from 'latlon-geohash'
import CryptoJS from 'crypto-js'
//import {ID as IDTools} from './idtools'
import { decode, decodeGeohash, farmID, sensorID, washingStationID, collectionPointID, infieldCollectionID } from './utils'

function stringToHex(str) {
    
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      hex += code.toString(16).padStart(2, '0');
    }
    return hex;
}

function geohashToHex(geohash) {
    const base32Chars = '0123456789bcdefghjkmnpqrstuvwxyz'; // Note: Geohash uses a custom base32 encoding
    let hexString = '';
  
    for (let i = 0; i < geohash.length; i++) {
      const base32Char = geohash[i];
      const base32Value = base32Chars.indexOf(base32Char);
      hexString += base32Value.toString(16).padStart(2, '0');
    }
  
    return hexString;
}

function hexToGeohash(hex) {
    const base32Chars = '0123456789bcdefghjkmnpqrstuvwxyz';
    let geohash = '';
  
    for (let i = 0; i < hex.length; i += 2) {
      const hexPair = hex.substring(i, i + 2);
      const decimalValue = parseInt(hexPair, 16);
      const base32Char = base32Chars[decimalValue % 32];
      geohash += base32Char;
    }
  
    return geohash;
} 

function sha256(message) {
    return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex)
}

const checksum = (geohashHex) => {
    const hash = sha256(geohashHex)
    console.log('hash: ' + hash)
    return hash.substring(0,2)
    //return sha256(geohashHex).substr(0,2)
}





const getFarms = async () => {
    let farms = await coffee_dashboard_backend.get_farms()
    console.log(farms)
}

const updateWorker = async (farmName, name, id, role, image_cid) => {
    try{
      
      let roles = {
        'Scout' : {Scout: null},
        'Farmer' : {Farmer: null},
        'Harvester' : {Harvester: null},
        'ReceivingManager' : {ReceivingManager: null},
        'FarmManager' : {FarmManager: null},
        'FactoryManager' : {FactoryManager: null},
        'FieldManager' : {FieldManager: null}
      }
     
      
      
  
      await coffee_dashboard_backend.update_worker(farmName, name, id, roles[role], image_cid)
      return {success: true}
  
    } catch(e){
      console.log(e)
      return {error: e.message}
    }
}

const addFarm = async () => {
    //19.92205031832995 -34.1824173289805 riviersonderend

    //19.93361583241662 -33.7988812802648 roberston

    //19.2919141630623 -33.353578008425984 ceres


    console.log('adding Riviersonderend')
    let coordinates = {latitude: -34.1824173289805, longitude: 19.92205031832995}
    let id = farmID(coordinates)

    let ret = await coffee_dashboard_backend.add_farm(id, 'Riviersonderend Coffee', 'Farm just outside of Riviersonderend')


    console.log('adding Robertson')
    coordinates = {latitude: -33.7988812802648, longitude: 19.93361583241662}
    id = farmID(coordinates)

    ret = await coffee_dashboard_backend.add_farm(id, 'Robertson Coffee', 'Farm just outside of Robertson')


    console.log('adding Ceres')
    coordinates = {latitude: -33.353578008425984, longitude: 19.2919141630623}
    id = farmID(coordinates)

    ret = await coffee_dashboard_backend.add_farm(id, 'Ceres Coffee', 'Farm just outside of Ceres')

    console.log('done')
    
   
    
}

const addFarmData = async () => {

    
    console.log('Adding Riviersonderend Data')
    let coords = {longitude: 19.927369080812838, latitude: -34.17955694251912}
    let ts = Date.now()
    let id = infieldCollectionID(coords,ts,7,'bkt:01')
       
    
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')
    
    console.log('Adding more Riviersonderend Data')
    coords = {longitude: 19.932006649863354, latitude: -34.18156522133735}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,8,'bkt:02')
        
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')
    
    19.913123898397657 -34.18710338382621
    console.log('Adding even more Riviersonderend Data')
    coords = {longitude: 19.913123898397657, latitude: -34.18710338382621}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,6,'bkt:03')
        
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')
    
    console.log('adding Riviersonderend collection')
    coords = {longitude: 19.92874508370096, latitude: -34.18241727000092}
    ts = Date.now()
    id = collectionPointID(coords,ts,7,'bkt:01','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')

    console.log('adding more Riviersonderend collection')
    coords = {longitude: 19.92874508370096, latitude: -34.18241727000092}
    ts = Date.now()
    id = collectionPointID(coords,ts,8,'bkt:02','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')
    console.log('done')
    

    console.log('adding Riviersonderend collection')
    coords = {longitude: 19.91604214180569, latitude: -34.18696138420108}
    ts = Date.now()
    id = collectionPointID(coords,ts,6,'bkt:03','bin:02')
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')

    
    
    coords = {longitude: 19.924110226523368, latitude: -34.18710338382621}
    ts = Date.now()
    id = washingStationID(coords,ts,15,'bin:01','wsbin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')
    
    coords = {longitude: 19.924110226523368, latitude: -34.18710338382621}
    ts = Date.now()
    id = washingStationID(coords,ts,6,'bin:02','wsbin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Riviersonderend Coffee', '{}')

    
    console.log('Adding Robertson Data')
    coords = {longitude: 19.94305735573144, latitude: -33.79959457604158}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,12,'bkt:01')
    
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')
    

    //19.942370710222775 -33.80330335964347
    console.log('Adding Robertson Data')
    coords = {longitude: 19.942370710222775, latitude: -33.80330335964347}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,13,'bkt:02')
    
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')
    

    //19.9387658213071 -33.80501505171248
    console.log('Adding Robertson Data')
    coords = {longitude: 19.9387658213071, latitude: -33.80501505171248}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,6,'bkt:03')
    
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')

    

    
    //19.939280805438102 -33.79987987279435
    
    coords = {longitude: 19.939280805438102, latitude: -33.79987987279435}
    ts = Date.now()
    id = collectionPointID(coords,ts,12,'bkt:01','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')

    coords = coords = {longitude: 19.939280805438102, latitude: -33.79987987279435}
    ts = Date.now()
    id = collectionPointID(coords,ts,13,'bkt:02','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')
    
    
    coords = {longitude: 19.939280805438102, latitude: -33.79987987279435}
    ts = Date.now()
    id = collectionPointID(coords,ts,6,'bkt:03','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')

    
    
    
    
    //19.930195562223247 -33.80000007153968
    coords = {longitude: 19.930195562223247, latitude: -33.80000007153968}
    ts = Date.now()
    id = washingStationID(coords,ts,31,'bin:01','wsbin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Robertson Coffee', '{}')
    
    

    //19.29114062138413 -33.34857167035855
    
    console.log('Adding Ceres Data')
    coords = {longitude: 19.29114062138413, latitude: -33.34857167035855}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,10,'bkt:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Ceres Coffee', '{}')

    //19.291970749576137 -33.349562294210735
    coords = {longitude: 19.291970749576137, latitude: -33.349562294210735}
    ts = Date.now()
    id = infieldCollectionID(coords,ts,11,'bkt:02')
    await coffee_dashboard_backend.add_data(id,ts, 'Ceres Coffee', '{}')

    
    coords = {longitude: 19.291339929374573, latitude:  -33.35090936116896}
    ts = Date.now()
    id = collectionPointID(coords,ts,10,'bkt:01','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Ceres Coffee', '{}')

    coords = {longitude: 19.291339929374573, latitude:  -33.35090936116896}
    ts = Date.now()
    id = collectionPointID(coords,ts,11,'bkt:02','bin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Ceres Coffee', '{}')

    

    //19.292881221466445 -33.35567639242302
    coords = {longitude: 19.292881221466445, latitude: -33.35567639242302}
    ts = Date.now()
    id = washingStationID(coords,ts,21,'bin:01','wsbin:01')
    await coffee_dashboard_backend.add_data(id,ts, 'Ceres Coffee', '{}')

    console.log('done')
    
}



const addData = async () => {
    //-34.160015, 18.375691
    //19.28986353594317 -33.349006452500895
    
    let coordinates = {latitude: -33.349006452500895, longitude: 19.28986353594317}
    let id = sensorID(coordinates)
    
    let ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 64.60, Temperature: 16.20, Light: 3020
    }),Date.now() - 1000*60*60*12)
    

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 60.60, Temperature: 20.20, Light: 3420
    }),Date.now() - 1000*60*60*11)

    

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 62.60, Temperature: 22.20, Light: 3920
    }),Date.now() - 1000*60*60*10)

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 64.60, Temperature: 23.20, Light: 4220
    }),Date.now() - 1000*60*60*9)
    

    
    //19.93136475004556 -33.7969958517272
    coordinates = {latitude: -33.7969958517272, longitude: 19.93136475004556}
    id = sensorID(coordinates)
    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 64.60, Temperature: 16.20, Light: 3020
    }),Date.now() - 1000*60*60*12)
    

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 60.60, Temperature: 20.20, Light: 3420
    }),Date.now() - 1000*60*60*11)

    

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 62.60, Temperature: 22.20, Light: 3920
    }),Date.now() - 1000*60*60*10)

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 64.60, Temperature: 23.20, Light: 4220
    }),Date.now() - 1000*60*60*9)
    

    //19.929775051962878 -34.18596738013628
    coordinates = {latitude: -34.18596738013628, longitude: 19.929775051962878}
    id = sensorID(coordinates)
    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 64.60, Temperature: 16.20, Light: 3020
    }),Date.now() - 1000*60*60*12)
    

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 60.60, Temperature: 20.20, Light: 3420
    }),Date.now() - 1000*60*60*11)

    

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 62.60, Temperature: 22.20, Light: 3920
    }),Date.now() - 1000*60*60*10)

    ret = await coffee_dashboard_backend.add_sensor_data(id,JSON.stringify({
        Humidity: 64.60, Temperature: 23.20, Light: 4220
    }),Date.now() - 1000*60*60*9)
    
   console.log('done')
}

const getData = async () => {
    let coordinates = {latitude: -34.160015, longitude: 18.375691}
    let id = sensorID(coordinates)
    let ret = await coffee_dashboard_backend.get_sensor_data(id,1713953269430)
    console.log(ret)
}

const getDataWithinRadius = async () => {
    let coordinates = {latitude: -34.160015, longitude: 18.375691}
    let geohash = Geohash.encode(coordinates.latitude,coordinates.longitude,10)
    //let geohash = "k3vjfec1u6"
    let ret = await coffee_dashboard_backend.geo_search(geohash,100)
    console.log(ret)

}

const viewGeo = async () => {
    let ret = await coffee_dashboard_backend.geo_index_view()
    console.log(ret)
}

const getGeoData = async () => {
    let id = '534112031b110c11120f021d'
    let geohash = hexToGeohash(id.substring(4))
    let geohashCompare = await coffee_dashboard_backend.geohash_from_id(id)
    console.log(geohash)
    console.log(geohashCompare)
    /*
    let coordinates = Geohash.decode(geohash)
    console.log(coordinates)
    console.log({latitude: -34.160015, longitude: 18.375691})
    */

}

const geoLookup = async () => {
    let ret = await coffee_dashboard_backend.geo_lookup("467e12031b110e0d0b011a06")
    console.log(ret)
} 

const getDistance = async () => {
    let id1 = '467e12031b110e0d0b011a06'
    let geohash1 = hexToGeohash(id1.substring(4))
    let id2 = '534112031b110c11120f021d'
    let geohash2 = hexToGeohash(id2.substring(4))
    let ret = await coffee_dashboard_backend.get_distance(geohash1,geohash2)
    console.log(ret)
}

const index = async () => {
    let id1 = "534112031b110c11120f021d"
    /*
    let geohash1 = hexToGeohash(id1.substring(4))
    console.log(geohash1)
    await coffee_dashboard_backend.geoindex(geohash1,'534112031b110c11120f021d')
    */
    let ret = await coffee_dashboard_backend.geoindex_id(id1)
    console.log(ret)
}

export default {
    getFarms,
    addFarm,
    addFarmData,
    addData,
    getData,
    getDataWithinRadius,
    viewGeo,
    getGeoData,
    geoLookup,
    getDistance,
    index
}