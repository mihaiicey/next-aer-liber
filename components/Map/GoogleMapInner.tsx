import { FC, useEffect, useRef, useState } from 'react';
import mapStyle from './mapStyle';
interface MapProps extends google.maps.MapOptions {
  className: string;
}

const GoogleMapInner: FC<MapProps> = ({ className, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && map === undefined) {
      const googleMap = new window.google.maps.Map(ref.current, {
        styles: mapStyle,
      });
      setMap(googleMap);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} className={className} style={{ height: '100%', width: '100%' }} />
    </>
  );
};

export default GoogleMapInner;
