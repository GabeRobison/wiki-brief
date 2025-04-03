import React from "react";
import LogoImage from "../assets/Hourglass.png";
import SiteLogo from "../assets/logo.png";
import { motion } from "framer-motion";

const NavBar = () => {
  const fadeInLeftVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRightVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="bg-slate-900 bg-opacity-40 backdrop-blur-md text-white shadow-xl sticky top-0 z-10 border-b border-indigo-500/20 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <motion.div
            className="flex items-center"
            initial="hidden"
            animate="visible"
            variants={fadeInLeftVariant}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              src={LogoImage}
              alt="Hourglass Logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            />
            <motion.span
              className="font-bold text-lg sm:text-xl md:text-2xl ml-2 sm:ml-3 gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Wiki-Brief
            </motion.span>
          </motion.div>

          <div className="flex-grow" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRightVariant}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              href="https://gaberobison.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <img
                src={SiteLogo}
                alt="Personal Site Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain p-1 transition duration-300"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
