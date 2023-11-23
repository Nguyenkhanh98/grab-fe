import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const APIURL = import.meta.env.VITE_APP_API || 'http://localhost:4000';

const center = {
  lat: -3.745,
  lng: -38.523
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: '',
    googleMapsApiKey: ""
  })

  const schedule = async({
    name,
    phone,
    from,
    to,
    time
  }) => {
    return  await axios.post(`${APIURL}/schedule`, {});
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  const onSubmit = () => {
    schedule({
      name: 'Nguyen Van A',
      phone: '0123456789',
      from: 'Ha Noi',
      to: 'Ho Chi Minh',
      time: '2021-07-01 10:00:00'
    });
    window.alert('Đặt lịch thành công');
  }
  return isLoaded ? (
    <div style={{width: '100%', position: 'relative'}}>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>

      <div  style={{position: 'absolute', width: 400, height: 300, top: '50%', left: '50%', transform:'translate(-50%, -50%)', padding: 20, background: '#ffffff', borderRadius: 20}}>
        <h3 style={{marginTop: 0, textAlign: 'center'}} > Lên lịch đặt Grab </h3>
        <div style={{display: 'flex'}}>
          <label style={{width: '30%'}}>Tên</label>
          <input type = "text" style={{width: '70%'}}/>
        </div>

        <div style={{display: 'flex', marginTop:16}}>
          <label style={{width: '30%'}}>Số điện thoại </label>
          <input type = "text" style={{width: '70%'}}/>
        </div>

        <div style={{display: 'flex',  marginTop:12}}>
          <label style={{width: '30%'}}>Nhập nơi đón</label>
          <input type = "text" style={{width: '70%'}}/>
        </div>

        <div style={{display: 'flex',  marginTop:12}}> 
          <label style={{width: '30%'}}>Nhập điểm đến</label>
          <input type = "text" style={{width: '70%'}}/>
        </div>

        <div style={{display: 'flex',  marginTop:12}}>
          <label style={{width: '30%'}}>Thời gian đón</label>
          <input type = "text" style={{width: '70%'}}/>
        </div>

    <div style ={{display: 'flex', justifyContent: 'center' , marginTop:20}}>
    <button style={{background:'#69ace4' }} onClick={onSubmit}>Submit</button>
    </div>

      </div>
    </div>

  ) : <></>
}

export default App