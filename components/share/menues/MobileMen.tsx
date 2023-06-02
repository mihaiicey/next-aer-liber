import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { HeaderMenuRo } from "../../../lib/menues";
import { Menu, Transition } from "@headlessui/react";
import { HiBars3BottomLeft, HiXMark } from "react-icons/hi2";
const MobileMenu: NextPage = () => {
  const router = useRouter();
  const [buttonactv, setButtonactv] = useState(false);

  const handleToggleActive = () => {
    setButtonactv(!buttonactv);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  px-2 py-2 text-sm font-medium text-primary border-primary border-2 focus:outline-none"
            onClick={handleToggleActive}
        >
        {buttonactv ? (
            <HiXMark className="text-2xl" />
          ) : (
            <HiBars3BottomLeft className="text-2xl" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-4 w-[96vw] z-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MobileMenu;
