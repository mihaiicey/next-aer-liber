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
import Card from "./Card/Card";
import { SensorArray } from "../types/types";
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };
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
  const [newData, setNewData] =  useState<any[]>([]);
  const [sensorpop, setSensorPop] = useState<SensorArray | null>(null);
  const [isCasutaSenzorVisible, setCasutaSenzorVisible] = useState(false);

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
      setSensorPop(null);
    }else{
      setNewData(data.filter((obj: { detector: string }) => obj.detector !== 'SBM20'))
      setSensorPop(null);
    }
  }

  const handleSensorChange = (sensor: SensorArray) => {
    if (sensorpop) {
      setSensorPop(null);
      const wait = () => new Promise((resolve) => setTimeout(resolve, 200));
      wait().then(() => {
        setSensorPop(sensor);
        setCasutaSenzorVisible(true)
      });
    } else {
      setSensorPop(sensor);
      setCasutaSenzorVisible(true)
    }
  };
  const handlePopUp = (value: boolean) => {
    setCasutaSenzorVisible(value)
  }

  return (
    <div className="flex h-screen relative">
      <Wrapper
        apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        render={render}
      >
        <GoogleMapInner
          center={center}
          minZoom={2}
          maxZoom={18}
          zoom={zoom}
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
            <Marker key={data.id || keyInd} sensor={data} setSelSens={handleSensorChange} />
          ))}
          {sensorpop && (
            <Card isOpen={isCasutaSenzorVisible} setCasutaSenzorVisible={setCasutaSenzorVisible} sensor={sensorpop} />
          )}
        </GoogleMapInner>
        
      </Wrapper>
    </div>
  );
};
export default CitySensors;
