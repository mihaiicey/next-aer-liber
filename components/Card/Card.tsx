import { motion } from "framer-motion";
import { NextPage } from "next";
import { SensorArray } from "../../types/types";
import { useEffect, useRef, useState } from "react";

interface CardProps {
  sensor: SensorArray;
}
const Card: NextPage<CardProps> = ({ sensor }) => {
  const sensData = JSON.parse(sensor.sensordata);
  const pm25 = sensData.find((item: any) => item.sensor === "pm25");
  const pm10 = sensData.find((item: any) => item.sensor === "pm10");
  const pm1 = sensData.find((item: any) => item.sensor === "pm1");
  const cpm = sensData.find((item: any) => item.sensor === "cpm");
  return (
    <motion.div
      id="casutaSenzor"
      className="absolute bottom-6 left-0 right-0 mx-auto my-0 w-80"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <div className="p-2 rounded-lg shadow-xl bg-zinc-800">
        <div id="title" className="text-center">
          <h1 className="text-sm text-white">
            <strong>{sensor.area}</strong>{" "}
            <span className="text-xs">(Ultimele 24h)</span>
          </h1>
        </div>
        <div className="w-full text-white text-sm grid grid-cols-2 gap-2 mt-2">
          {pm25?.average && (
            <div>
              <strong>PM2.5: </strong>
              <span>{`${pm25.average} ${pm25.unit}`}</span><br/>
            </div>
          )}
          {pm10 && (
            <div>
              <strong>PM10: </strong>
              <span>{`${pm10.average} ${pm10.unit}`}</span><br/>
            </div>
          )}
          {pm1 && (
            <div>
              <strong>PM1.0: </strong>
              <span>{`${pm1.average} ${pm1.unit}`}</span><br/>
            </div>
          )}
          {!pm25?.average && !pm10 && !pm1 && (
            <div>
              <strong>CPM: </strong>
              <span>{`${cpm.average} ${cpm.unit}`}</span><br/>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default Card;
