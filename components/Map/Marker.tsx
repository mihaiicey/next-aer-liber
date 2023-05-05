import { useState } from "react";
import OverlayView from "../overlays/OverlayView";
import { sensorsList } from "../Sensors/sensorsType";
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
  const [selMeas, setSelMeas ] = useState('pm25')

  function checkSensor1(type:string){
    if(type == 'SBM20'){
      return ' bg-red-500';
    }
    return 'rounded-lg bg-white'
  }
  
  function returnPM(data: string, type:string){
    const sData = JSON.parse(data);
    if(type == 'SBM20'){
      const pol = sData.filter((obj: { sensor: string; }) => obj.sensor === 'cpm')
      return `${pol[0].average} ${pol[0].unit}`
    }
    const pm25 = sData.filter((obj: { sensor: string; }) => obj.sensor === 'pm25')
    return `${pm25[0].label}: ${pm25[0].average}${pm25[0].unit}`
  }

  function returnSelectedVal(data:string){
    const sData = JSON.parse(data);
    const selectedVals = sData.filter((obj: { sensor: string; }) => obj.sensor === selMeas )
    console.log(sData)
    return 'ok';

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
          <button id='sensor' className={`${checkSensor1(sensor.detector)} py-1.5 px-2 drop-shadow text-xs`}>{returnPM(sensor.sensordata, sensor.detector)}</button>
        </OverlayView>
        
      )}

    </>
  )
}
