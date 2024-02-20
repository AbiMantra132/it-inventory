// importing dependencies
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const LeftSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveItem("Item");
    } else if (location.pathname === "/account") {
      setActiveItem("Account");
    }
  }, [location]);

  return (
    <div className="fixed h-screen lg:w-[8.5rem] md:w-[7rem] sm:text-xs lg:text-sm shadow-sm bg-white mt-[4.4rem] text-gray-500 py-10 text-center">
      <Link to="/">
        <div
          className={`${
            activeItem === "Item"
              ? "bg-gray-200 py-5 flex justify-center my-5 items-center"
              : "py-5 flex justify-center my-5 items-center"
          }`}
        >
          <CategoryIcon />
          <p className="px-2">Items</p>
        </div>
      </Link>
    </div>
  );
};

export default LeftSidebar;
