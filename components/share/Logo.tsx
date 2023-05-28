import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className={`inline-block`}
    >
        <Image
          className={`block h-12 sm:h-16 w-auto`}
          src={'/aerliber-logo.webp'}
          alt={'Calitatea aerului Sibiu'}
          width={100}
          height={100}
          sizes="200px"
          priority
        />
    </Link>
  );
};

export default Logo;
