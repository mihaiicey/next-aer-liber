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
import React from "react";
interface MapProps extends google.maps.MapOptions {
  className: string;
  children?: ReactNode;
  onIdle?: (map: google.maps.Map) => void;
}

const GoogleMapInner: FC<MapProps> = ({ className, children,onIdle, ...options }) => {
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
  
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onIdle]);

  return (
    <>
      <div ref={ref} className={className} style={{ height: '100%', width: '100%' }} />

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { map });
        }
      })}
      
    </>
  );
};

export default GoogleMapInner;
