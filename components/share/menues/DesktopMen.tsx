import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { HeaderMenuRo } from "../../../lib/menues";

const DesktopMenu: NextPage = () => {
    const router = useRouter();

    return (
      <nav>
        <ul className="flex">
        {HeaderMenuRo.map((item, index) => (
          <li key={index} className={`px-1.5 hover:border-b-2 border-orange  ${
            router.pathname === item.url ? 'border-b-2' : ''
          }`}>
            <Link href={item.url} 
                className={`px-2 font-semibold text-primary`}
              >
                {item.title}
            </Link>
          </li>
        ))}
      </ul>
      </nav>
    );
  };
  
  export default DesktopMenu;