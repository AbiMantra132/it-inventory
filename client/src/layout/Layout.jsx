import React from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import Camera from "../components/Camera";
import Scanner from "../components/Scanner";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="relative z-10">
        <Navbar />
      </div>
      <div className="z-0 hidden md:block">
        <LeftSidebar />
      </div>
      <div>
        <div className="w-screen min-h-screen bg-gray-50">
          <div className="lg:pl-[15rem] md:pl-[14rem] md:pr-[6rem] pt-[7.03rem] sm:mx-10 md:-mx-20 lg:-mx-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
