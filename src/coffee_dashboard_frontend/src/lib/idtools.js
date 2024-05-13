import Geohash from 'latlon-geohash'
import CryptoJS from 'crypto-js'


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

function bucketToHex(str) {
   const ar = str.split(':')
   return parseInt(ar[ar.length-1]).toString(16).padStart(12,'0')
}

function hexToBucket(hex) {
    return  parseInt(hex,16)
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

const hexToBase64 = (hex) => {
    //ignoring for now as this function is temeramental
    /*
    const buffer = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
    return btoa(String.fromCharCode(...buffer))
    */
   return hex
}

export const base64ToHex = (base64) => {
    //ignoring for now as this function is temeramental
    /*
    const buffer = new Uint8Array(Array.from(atob(base64), char => char.charCodeAt(0)))
    return Array.from(buffer).map(byte => byte.toString(16).padStart(2, '0')).join('')
    */
   return base64
}

function weightToHex(w) {
    let h = w.toString().split('.')
    if(h.length===1) return parseInt(h).toString(16).padStart(6,'0')
    return parseInt(h[0]).toString(16).padStart(6,'0') + parseInt(h[1]).toString(16).padStart(6,'0')
}

function hexToWeight(h) {
    let w = [parseInt(h.substring(0,6),16).toString(),parseInt(h.substring(6),16).toString()].join('.')
    return parseFloat(w)
}

function stringToHex(str) {
    
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      hex += code.toString(16).padStart(2, '0');
    }
    return hex;
}

function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      const hexPair = hex.substr(i, 2);
      const charCode = parseInt(hexPair, 16);
      str += String.fromCharCode(charCode);
    }
    return str;
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

const infieldCollectionID = (coordinates,ts,weight,bucketID) => {
    let geohash = Geohash.encode(coordinates.latitude,coordinates.longitude,12)
    let geohex = geohashToHex(geohash)
    let tshex = ts.toString(16).padStart(14, '0')
    let weighthex = weightToHex(weight)
    let bucketHex = bucketToHex(bucketID)
    let chk = checksum(geohex)
    return hexToBase64(stringToHex('c') + chk + tshex + weighthex + bucketHex + geohex)
}

const decodeInfieldCollectionID = (id) => {
    let hex = base64ToHex(id)
    let prefix = hexToString(hex.substring(0,2))
    if(prefix!=='c') throw new Error('invalid id')
    let chk = hex.substring(2,4)
    hex = hex.substring(4)
    let geohex = hex.substring(34)    
    if(chk!==checksum(geohex)) throw new Error('checksum invalid')
    let tshex = hex.substring(0,14)
    let weighthex = hex.substring(14,20)
    let buckethex = hex.substring(20,26)
    let ts = parseInt(tshex,16)
    let weight = hexToWeight(weighthex)
    let bucketID = hexToBucket(buckethex)
    let geohash = hexToGeohash(geohex)
    let coordinates = Geohash.decode(geohash)
    return {coordinates, ts, weight, bucketID}    
}

const collectionPointID = (coordinates,ts,weight,bucketID,binID) => {
    let geohash = Geohash.encode(coordinates.latitude,coordinates.longitude,12)
    let geohex = geohashToHex(geohash)
    console.log(geohex)
    let chk = checksum(geohex)
    let tshex = ts.toString(16).padStart(14, '0')
    let weighthex = weightToHex(weight)
    let bucketHex = bucketToHex(bucketID)
    let binHex = bucketToHex(binID)
    return hexToBase64(stringToHex('C') + chk + tshex + weighthex + bucketHex + binHex + geohex)
    
}

const decodeCollectionPointID = (id) => {
    let hex = base64ToHex(id)
    let prefix = hexToString(hex.substring(0,2))
    if(prefix!=='C') throw new Error('invalid id')
    let chk = hex.substring(2,4)
    hex = hex.substring(4)
    let geohex = hex.substring(48)
    if(chk!==checksum(geohex)) throw new Error('checksum invalid')
    let tshex = hex.substring(0,14)
    let weighthex = hex.substring(14,20)
    let buckethex = hex.substring(20,34)
    let binhex = hex.substring(34,48)
    let ts = parseInt(tshex,16)
    let weight = hexToWeight(weighthex)
    let bucketID = hexToBucket(buckethex)
    let binID = hexToBucket(binhex)
    let geohash = hexToGeohash(geohex)
    let coordinates = Geohash.decode(geohash)
    return {coordinates, ts, weight, bucketID, binID}
}

const washingStationID = (coordinates,ts,weight,binID,wsBinID) => {
    let geohash = Geohash.encode(coordinates.latitude,coordinates.longitude,12)
    let geohex = geohashToHex(geohash)
    let chk = checksum(geohex)
    let tshex = ts.toString(16).padStart(14, '0')
    let weighthex = weightToHex(weight)
    let binHex = bucketToHex(binID)
    let wsBinHex = bucketToHex(wsBinID)
    return hexToBase64(stringToHex('W') + chk + tshex + weighthex + binHex + wsBinHex + geohex)
    //4 14 6 14 14
}

const decodeWashingStationID = (id) => {
    let hex = base64ToHex(id)
    let prefix = hexToString(hex.substring(0,2))
    if(prefix!=='W') throw new Error('invalid id')
    let chk = hex.substring(2,4)
    hex = hex.substring(4)
    let geohex = hex.substring(48)
    if(chk!==checksum(geohex)) throw new Error('checksum invalid')
    let tshex = hex.substring(0,14)
    let weighthex = hex.substring(14,20)
    let binhex = hex.substring(20,34)
    let wsbinhex = hex.substring(34,48)
    let ts = parseInt(tshex,16)
    let weight = hexToWeight(weighthex)
    
    let binID = parseInt(binhex,16)
    let wsBinID = parseInt(wsbinhex,16)
    let geohash = hexToGeohash(geohex)
    let coordinates = Geohash.decode(geohash)
    return {coordinates, ts, weight, binID, wsBinID}
}

const farmID = (coordinates) => {
    let geohash = Geohash.encode(coordinates.latitude,coordinates.longitude,12)
    console.log('geohash: ' + geohash)
    let geohex = geohashToHex(geohash)
    console.log('geohex: ' + geohex)
    let chk = checksum(geohex)
    console.log('checksum: ' + chk)
    console.log('hex id: ' + stringToHex('F') + chk + geohex)
    return hexToBase64(stringToHex('F') + chk + geohex)
}

const decodeFarmID = (id) => {
    let hex = base64ToHex(id)
    let prefix = hexToString(hex.substring(0,2))
    if(prefix!=='F') throw new Error('invalid id')
    let chk = hex.substring(2,4)
    let geohex = hex.substring(4)
    if(chk!==checksum(geohex)) throw new Error('checksum invalid')
    let geohash = hexToGeohash(geohex)
    return {geohash}
}

const decode = (id) => {
    let hex = base64ToHex(id)
    let prefix = hexToString(hex.substring(0,2))
    if(prefix==='c') return {id, type: 'c', data: decodeInfieldCollectionID(id)}
    if(prefix==='C') return {id, type: 'C', data: decodeCollectionPointID(id)}
    if(prefix==='W') return {id, type: 'W', data: decodeWashingStationID(id)}
    if(prefix==='F') return {id, type: 'F', data: decodeFarmID(id)}
    return {type: 'none', data: id}
}

export const ID = {
    infieldCollectionID, 
    decodeInfieldCollectionID,
    collectionPointID,
    decodeCollectionPointID,
    washingStationID,
    farmID,
    decodeFarmID,
    decodeWashingStationID,
    decode,
    base64ToHex,
    hexToBase64
}


