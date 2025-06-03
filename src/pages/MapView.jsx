import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from '../api/axios';

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBbHXzV6YpQd9uqSyuFZKccSIcqkyvHoNA',
  });

  useEffect(() => {
    axios.get('/stations').then(res => setStations(res.data));
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      center={{ lat: 20, lng: 78 }}
      zoom={5}
    >
      {stations.map(s => (
        <Marker
          key={s._id}
          position={{ lat: s.location.lat, lng: s.location.lng }}
          onClick={() => setSelected(s)}
        />
      ))}
      {selected && (
        <InfoWindow
          position={{ lat: selected.location.lat, lng: selected.location.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h4>{selected.name}</h4>
            <p>Status: {selected.status}</p>
            <p>{selected.powerOutput} kW | {selected.connectorType}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}