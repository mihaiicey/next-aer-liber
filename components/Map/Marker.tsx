import { useEffect, useMemo, useRef } from "react";
import OverlayView from "../overlays/OverlayView";
import { sensorsType } from "../Sensors/sensorsType";
interface CustomMarkerProps {
  sensor: any;
  map?: google.maps.Map;
  highlight?: boolean;
}
export default function Marker({
  sensor,
  map,
  highlight,
}: CustomMarkerProps) {

  function checkSensor1(type:string){
    if(type == 'SBM20'){
      return ' bg-red-500';
    }
    return 'rounded-lg bg-white'
  }
  return (
    <>
      {map && (
        <OverlayView
          position={{
            lat: parseFloat(sensor.lat),
            lng: parseFloat(sensor.lng),
          }}
          map={map}
          zIndex={highlight ? 99 : 0}
        >
          <button id='sensor' className={`${checkSensor1(sensor.detector)} py-1.5 px-2 drop-shadow text-xs`}>{sensor.status}</button>
        </OverlayView>
        
      )}

    </>
  )
}
