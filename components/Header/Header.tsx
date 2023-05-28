import React, { FC, useEffect, useState } from "react";
import Logo from "../share/Logo";
export interface HeaderProps {}
import { motion } from "framer-motion";
import Link from "next/link";

const Header: FC<HeaderProps> = () => {


  return (
    <div className="nc-Header z-40 bg-white shadow-md">
      <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between py-4">
              <div className="flex items-center lg:hidden flex-1">
                {/* aici mobile */}
              </div>
              <div className="lg:flex-1 flex items-center">
                <Logo />
              </div>
              <div className="flex-[2] hidden items-center lg:flex justify-center mx-4">
              </div>
              <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
                <Link 
                href='/sustine-ne'
                className="bg-primary py-2 px-4 rounded text-white hover:bg-secondary hover:text-primary">
                    Susține-ne
                </Link>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default Header;
