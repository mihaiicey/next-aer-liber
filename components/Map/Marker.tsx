import { useCallback, useState } from "react";
import OverlayView from "../overlays/OverlayView";
import GoogleMapsMarker from "./GoogleMapsMarker";
import Card from "../Card/Card";
interface CustomMarkerProps {
  sensor: any;
  map?: google.maps.Map;
}
export default function Marker({ sensor, map }: CustomMarkerProps) {
  const [selSens, setSelSens ] = useState('')
  const getColor = (value: any) => {
    if (value < 10) {
      return "bg-[#6ab04c]";
    } else if (value < 20) {
      return "bg-[#badc58]";
    } else if (value < 30) {
      return "bg-[#f9ca24]";
    } else if (value < 40) {
      return "bg-[#f0932b]";
    } else if (value < 100) {
      return "bg-[#ea2027]";
    } else {
      return "bg-[#8854d0]";
    }
  };

  function returnPM(data: string, type: string) {
    const sData = JSON.parse(data);
    if (type == "SBM20") {
      const pol = sData.filter(
        (obj: { sensor: string }) => obj.sensor === "cpm"
      );
      return `${pol[0].average / 100}`;
    }
    const pm25 = sData.filter(
      (obj: { sensor: string }) => obj.sensor === "pm25"
    );
    return `${pm25[0].average}`;
  }

  function setDesignSensor(type: string, data: string) {
    if (type == "SBM20") {
      return "bg-red-500";
    }
    const sData = JSON.parse(data);
    const pm25 = sData.filter(
      (obj: { sensor: string }) => obj.sensor === "pm25"
    );
    return `rounded-full ${getColor(pm25[0].average)}`;
  }

    const handleClick = (detector:string) => {
      setSelSens(detector)
    }
  
  return (
    <>
      {map && (
        <>
                <OverlayView
          position={{
            lat: parseFloat(sensor.lat),
            lng: parseFloat(sensor.lng),
          }}
          map={map}
          zIndex={99}
        >
          <button
            id="sensor"
            className={`${setDesignSensor(
              sensor.detector,
              sensor.sensordata
            )} py-1.5 px-2 drop-shadow text-xs cursor-pointer z-20`}
            onClick={()=>handleClick(sensor.detector)}
          >
            {returnPM(sensor.sensordata, sensor.detector)}
          </button>
        </OverlayView>
        </>

      )}
    </>
  );
}
