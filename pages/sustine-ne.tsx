import Image from "next/image";
import PageBanner from "../components/share/PageBanner";
import Donatie from "../components/Donatie/Donatie";
export default function Sustinene() {
  return (
    <>
      <PageBanner title="Susține-ne" />
      <div className="max-w-6xl mx-2 md:mx-auto mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-4/6 mr-4">
            <h2 className="text-3xl font-bold mb-2 text-primary">Donează</h2>
            <p className="text-thirt text-base">
              Ca orice proiect aflat la început de drum, dar a cărei strategie
              de dezvoltare este bine stabilită și în care primează sănătatea
              cetățenilor, avem nevoie de susținere. Pentru a sprijini
              activitatea comunității AerLiber, poți contribui prin donație la
              dezvoltarea rețelei, AerLiber.ro fiind un proiect care sprijină
              dezvoltarea comunității. Doar împreună putem susține și obține
              schimbările benefice care asigură sănătatea și bunăstarea tuturor.
            </p>
          </div>
          <div className="w-full md:w-1/3 mt-4">
            <Donatie/>
          </div>
        </div>
      </div>
    </>
  );
}
