import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { sumaDePlata } from "../../lib/values";
const Donatie: NextPage = () => {
  const [selectedOption, setSelectedOption] = useState("odata");
  const [selectedPrice, setSelectedPrice] = useState(25);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };
  const handlePriceSelected = (value: number) => {
    setSelectedPrice(value);
  };

  return (
    <div className="rounded bg-neutral-100 h-full p-4">
      <div id="paymentMeth" className="flex justify-center">
        <button
          className={`${
            selectedOption === "odata"
              ? "bg-primary"
              : "bg-neutral-100 border-primary border text-primary"
          } text-white text-base font-bold py-2 px-4 rounded-l`}
          onClick={() => handleOptionChange("odata")}
        >
          o dată
        </button>
        <button
          className={`${
            selectedOption === "lunar"
              ? "bg-primary"
              : "bg-neutral-100 border-y border-primary text-primary"
          } text-white text-base font-bold py-2 px-4`}
          onClick={() => handleOptionChange("lunar")}
        >
          lunar
        </button>
        <button
          className={`${
            selectedOption === "op"
              ? "bg-primary"
              : "bg-neutral-100 border-primary text-primary border"
          } text-white  text-base font-bold py-2 px-4  rounded-r`}
          onClick={() => handleOptionChange("op")}
        >
          Transfer Bancar
        </button>
      </div>
      <div id="paymentvalue" className="grid grid-cols-2 gap-2 mx-auto w-10 ">
        {sumaDePlata.map((suma) => (
          <div>
            <button
              key={suma.id}
              className={`${
                selectedPrice === suma.value
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-white hover:bg-gray-200"
              } text-white text-base font-bold py-2 px-4 rounded-l`}
              onClick={() => handlePriceSelected(suma.value)}
            >
              {suma.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donatie;
