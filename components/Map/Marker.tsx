import { useMemo } from "react";
import OverlayView from "../overlays/OverlayView";

interface CustomMarkerProps {
  sensor: any;
  map?: google.maps.Map;
  highlight?: boolean;
}
export default function CustomMarker({
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
          <button id='sensor' className={`rounded-full bg-zinc-600 py-1.5 px-2 drop-shadow text-xs text-white ${
                highlight && "text-black bg-zinc-50 font-bold py-2 px-2.5"
              }`}>{sensor.detector}</button>
        </OverlayView>
      )}

    </>
  )
}
