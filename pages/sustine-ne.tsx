import Image from "next/image";
import PageBanner from "../components/share/PageBanner";
import Donatie from "../components/Donatie/Donatie";
export default function Sustinene() {
  return (
    <>
      <PageBanner title="Susține-ne" />
      <div className="max-w-6xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
          <div>
            <Donatie/>
          </div>
        </div>
      </div>
    </>
  );
}
