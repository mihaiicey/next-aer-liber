import React, { Component, useState, useRef, ReactElement, useEffect } from 'react';
import ReactDOM from "react-dom";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapInner from './Map/GoogleMapInner';
import CustomMarker from './Map/Marker';
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

  interface Params{
    city: string;
    lat: number;
    lng: number;
  }

const CitySensors: NextPage<Params> = (context) => {
  const [zoom, setZoom] = useState<number>(15);
  const city = context.city
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: context.lat, lng:context.lng});

  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

  const { data, error } = useSWR(
    city
      ? `https://aerliber.ro/wp-json/aerliberApi/beta/allsensorsloc?city=${city}`
      : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading</div>;

  return (
  
    <div className="flex h-screen">
    <Wrapper apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`} render={render}>
      <GoogleMapInner 
        center={center}
        minZoom={2}
        maxZoom={18}
        zoom={12}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
        zoomControl={false}
        clickableIcons={false}
        className="grow h-full"
      />
      {data?.map((data:any, keyInd: any) => (
            <CustomMarker
              key={data.id || keyInd}
              sensor={data}
              // highlight={data.id === highlightedMarkerId}
            />
          ))}
    </Wrapper>
  </div>
    );
};
export default CitySensors;