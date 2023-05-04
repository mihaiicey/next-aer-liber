import {
  FC,
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";
import mapStyle from './mapStyle';
interface MapProps extends google.maps.MapOptions {
  className: string;
  children?: ReactNode;
}

const GoogleMapInner: FC<MapProps> = ({ className, children, ...options }) => {
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

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
      
    </>
  );
};

export default GoogleMapInner;
