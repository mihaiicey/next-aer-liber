import { NextPage } from "next";
import { Dialog, Transition } from '@headlessui/react'
import { SensorArray } from "../../types/types";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface CardProps {
  sensor: SensorArray;
  isOpen: boolean;
  setCasutaSenzorVisible : (value: boolean) => void;
}

const Card: NextPage<CardProps> = ({ sensor, isOpen, setCasutaSenzorVisible }) => {
  const sensData = JSON.parse(sensor.sensordata);
  const pm25 = sensData.find((item: any) => item.sensor === "pm25");
  const pm10 = sensData.find((item: any) => item.sensor === "pm10");
  const pm1 = sensData.find((item: any) => item.sensor === "pm1");
  const cpm = sensData.find((item: any) => item.sensor === "cpm");

  function closeModal() {
    setCasutaSenzorVisible(false)
  }  
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="absolute bottom-6 left-0 right-0 mx-auto my-0 w-80 shadow-xl " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div/>
          </Transition.Child>

          <div>
            <div>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="overflow-hidden rounded-lg bg-zinc-800 p-2 shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-center text-base text-white"
                  >
                    {sensor.area}{' '}<span className="text-xs">(Ultimele 24h)</span>
                  </Dialog.Title>
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


                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-gray-300 text-black px-2 py-1 absolute top-0 right-0"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <div className="w-full text-right">
                  <Link href={`/sensor/${sensor.id}`}
                    className="text-white absolut px-2 py-1" 
                    >
                    Detalii...
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Card;
