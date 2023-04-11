import { Geolocation, Position } from '@capacitor/geolocation';
import { useState, useEffect } from 'react';
import { ILatLng } from '../models';

const useMyPosition = () => {
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

    Geolocation.getCurrentPosition().then((coordinates) => {
      onChange(coordinates);
    }).catch(error => {
      setError(error);
    });

    return () => {
      if (watcher)
        Geolocation.clearWatch({ id: watcher });
    }
  }, []);

  return { currentLocation, error };
}

export default useMyPosition;