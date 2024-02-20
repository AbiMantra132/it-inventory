import { useState } from "react";
import React from "react";
import Logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { getItemByInventoryNo } from "../apis/Product_API";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  // defining states and constants
  const [inventory, setInventoryNumber] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  // functions
  const itemByInventoryNumber = async () => {
    const inventorynumber = inventory.trim();
    if(inventorynumber === "") {
      navigate("/")
    } else {
      try {
        const id = await getItemByInventoryNo(inventorynumber);
  
        navigate(`/item/${id}`)
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }

  return (
    <div className="fixed bg-white w-screen mb-10 bg-none sm:bg-white px-5 py-2 sm:flex items-center justify-between shadow-sm">
      <div className="flex justify-between items-center">
        <img src={Logo} alt="sense-logo" className="w-[6rem] sm:mx-0 sm:mb-0" />
        <p className="sm:hidden scale-90 text-gray-500 cursor-pointer hover:scale-105 transition-all" onClick={(e) => {
          setMenu(!menu);
        }}><MenuIcon /></p>
      </div>
      <div className={`${menu ? "flex" : "hidden"} sm:flex mb-3 gap-3 mt-5 flex-col sm:flex-row sm:w-[30rem] items-center justify-evenly sm:justify-between sm:ml-20 sm:px-2`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            itemByInventoryNumber();
          }}
          className="relative group"
        >
          <input
            type="text"
            placeholder="Inventory Number"
            value={inventory}
            onChange={(e) => {
              setInventoryNumber(e.target.value);
            }}
            className="peer sm:w-[14.5rem] border-2 text-center md:text-start focus:outline-none border-slate-100 md:pl-9 py-1 rounded-full placeholder:text-sm placeholder:font-thin focus:border-orange-400"
          />
          <div
            className="absolute cursor-pointer top-[50%] -translate-y-[50%] px-2 text-slate-200 peer-focus:text-orange-500"
            onClick={(e) => {
              e.preventDefault();
              itemByInventoryNumber();
            }}
          >
            <SearchIcon />
          </div>
        </form>
        <p class="text-gray-500 sm:hidden md:block">or</p>
        <button class="bg-orange-500 font-thin hover:bg-orange-600 text-white py-1 px-5 rounded transition-colors duration-300 ease-in-out" onClick={() => {
          setMenu(!menu)
          navigate("/scan")
        }}>
          scan barcode
        </button>
      </div>
    </div>
  );
};

export default Navbar;
