import React from "react";
import Image from "next/image";

interface PageBannerProps {
    title: string;
  }
  const PageBanner: React.FC<PageBannerProps> = ({ title }) => {
  return (
    <div className=" bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(/banner-pages.webp)" }}>
       <div id='overlay' className="bg-black bg-opacity-50 w-full py-8 md:py-24">
       <div className="max-w-6xl mx-4 md:mx-auto">
            <h1 className="font-bold md:text-4xl text-white drop-shadow-md shadow-black">{title}</h1>
        </div>
       </div>
    </div>
  );
};

export default PageBanner;
