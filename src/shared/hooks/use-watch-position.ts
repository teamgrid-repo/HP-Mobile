import { Geolocation, Position } from '@capacitor/geolocation';
import { useState, useEffect } from 'react';
import { ILatLng } from '../models';

const useWatchPosition = () => {
  const [watcher, setWatcher] = useState<string>('');
  const [currentLocation, setPosition] = useState<ILatLng | null>(null);
  const [error, setError] = useState(null);

  const onChange = (coordinates: Position) => {
    setPosition({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    });
  };

  useEffect(() => {
    Geolocation.checkPermissions().then(permission => {
      if (permission.location === "denied") {
        Geolocation.requestPermissions({ permissions: ['location'] });
      }
    });

    Geolocation.watchPosition({}, (coordinates, error) => {
      if (coordinates) onChange(coordinates);
      if (error) setError(error)
    }).then(id => { setWatcher(id) });

    return () => {
      if (watcher)
        Geolocation.clearWatch({ id: watcher });
    }
  }, []);

  return { currentLocation, error };
}

export default useWatchPosition;