import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { sumaDePlata } from "../../lib/values";
import {HiChevronLeft} from "react-icons/hi2";
import FormularDonatie from "./FormularDonatie";
const Donatie: NextPage = () => {
  const [selectedOption, setSelectedOption] = useState("odata");
  const [selectedPrice, setSelectedPrice] = useState<number>(25);
  const [inputSelected, setInputSelected] = useState(false);
  const [changePage, setChangePage] = useState(false)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };
  const handlePriceSelected = (value: number) => {
    setSelectedPrice(value);
    setInputSelected(false);
  };


  return (
    <div className="rounded bg-white border-primary border w-full h-full p-4">
      <div id="payment" className={`${changePage === true ? 'hidden': 'block'}`}>
        <div id="paymentMeth" className="flex justify-center">
          <button
            className={`${selectedOption === "odata"
              ? "bg-primary text-white"
              : "bg-neutral-100 border-primary border text-primary"
              } text-primary text-base font-bold py-2 px-4 rounded-l`}
            onClick={() => handleOptionChange("odata")}
          >
            o dată
          </button>
          <button
            className={`${selectedOption === "lunar"
              ? "bg-primary text-white"
              : "bg-neutral-100 border-y border-primary text-primary"
              } text-primary text-base font-bold py-2 px-4`}
            onClick={() => handleOptionChange("lunar")}
          >
            lunar
          </button>
          <button
            className={`${selectedOption === "op"
              ? "bg-primary text-white"
              : "bg-neutral-100 border-primary text-primary border"
              } text-primary  text-base font-bold py-2 px-4  rounded-r`}
            onClick={() => handleOptionChange("op")}
          >
            Transfer Bancar
          </button>
        </div>
        <div id="paymentvalue" className="w-full grid grid-cols-3 gap-4 mt-6">
          {sumaDePlata.map((suma, index) => (
            <div key={index}>
              <button
                key={suma.id}
                className={`${selectedPrice === suma.value
                  ? "border border-primary shadow-lg"
                  : "bg-white border-gray-300"
                  } border text-primary text-base font-bold py-2 w-full`}
                onClick={() => handlePriceSelected(suma.value)}
              >
                {suma.title}
              </button>
            </div>
          ))}
        </div>
        <div id="customDonation" className="mt-4">
          <p className="text-base font-nor">Sumă personalizată</p>
          <input
            type="number"
            className={`w-full h-12 block border focus:outline-primary focus:rounded-[0px] px-2 ${inputSelected ? "" : "border-gray-300"
              }`}
            onChange={(event) => handlePriceSelected(parseInt(event.target.value))}
          />
        </div>
        <div id='continue' className="mt-4">
          <p className="mb-2 text-sm">Donația mea: <span className="font-semibold">{selectedPrice} Ron</span></p>
          <button
            className="w-full bg-primary text-semibold text-white py-3 rounded hover:shadow-xl"
            onClick={()=>setChangePage(true)}
            >
            {/* Donează {selectedOption == 'op' ? 'prin transfer bancar' : selectedOption == 'odata' ? 'o dată' : selectedOption} */}
            Pasul următor
          </button>
        </div>
      </div>
      <div id="paymentDetails" className={`${changePage === true ? 'block': 'hidden'}`}>
          <div className="flex cursor-pointer items-center text-black text-base"
            onClick={()=>setChangePage(false)}>
              <HiChevronLeft/> <span>Înapoi la date cart</span>
          </div>
          <FormularDonatie amount={selectedPrice} method={selectedOption} />  
      </div>
    </div>

  );
};

export default Donatie;
