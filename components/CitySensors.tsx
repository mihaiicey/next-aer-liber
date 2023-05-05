import React, {
  useState,
  ReactElement,
  useEffect,
} from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapInner from "./Map/GoogleMapInner";
import Marker from "./Map/Marker";
import { sensorsType } from "./Sensors/sensorsType";
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

interface Params {
  city: string;
  lat: number;
  lng: number;
}

const CitySensors: NextPage<Params> = (context) => {
  const [zoom, setZoom] = useState<number>(12);
  const [sensor, setSensor] = useState("poluare");
  const city = context.city;
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: context.lat,
    lng: context.lng,
  });
  const [newData, setNewData] = useState([]);

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!);

    const nextCenter = map.getCenter();

    if (nextCenter) {
      setCenter(nextCenter.toJSON());
    }
  };

  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };
  const { data, error } = useSWR(
    city ? `/api/sensors/sensorsWithData?city=${city}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    setNewData(data?.filter((obj: { detector: string }) => obj.detector !== 'SBM20'))
  }, [data]);

  function handleOptionChange(event: any) {
    setSensor(event.target.value);
    if(event.target.value === 'SBM20'){
      setNewData(data.filter((obj: { detector: string; }) => obj.detector ===  'SBM20' ))
    }else{
      setNewData(data.filter((obj: { detector: string }) => obj.detector !== 'SBM20'))
    }
  }

  function onMarkerClick(data:string): void {
    console.log(data)
  }

  return (
    <div className="flex h-screen">
      <Wrapper
        apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        render={render}
      >
        <GoogleMapInner
          center={center}
          minZoom={2}
          maxZoom={18}
          zoom={zoom}
          onIdle={onIdle}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          clickableIcons={false}
          className="grow h-full"
        >
          <select
            className="absolute z-10 border-e px-4 py-2 top-4 left-4 text-sm/none rounded-md border bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
            value={sensor}
            onChange={handleOptionChange}
          >
            {sensorsType.map((data: any, key: any) => (
              <option key={key} value={data.name}>
                {data.label}
              </option>
            ))}
          </select>
          {newData?.map((data: any, keyInd: any) => (
            <Marker key={data.id || keyInd} sensor={data} />
          ))}
        </GoogleMapInner>

      </Wrapper>
    </div>
  );
};
export default CitySensors;
