import { useMemo } from "react";
import OverlayView from "../overlays/OverlayView";

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
  return (
    <>
      {map && (
        <OverlayView
          position={{
            lat: sensor.lat as number,
            lng: sensor.lng as number,
          }}
          map={map}
          zIndex={highlight ? 99 : 0}
        >
          {/* use a button as the marker */}
          <button id='sensor' className={`absolute z-[99] rounded-xl bg-white py-1.5 px-2 drop-shadow text-xs text-black"
              }`}>{sensor.detector}</button>
        </OverlayView>
      )}

    </>
  )
}
