import React, { useState, useEffect } from "react";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import {
  retrieveProducts,
  retrieveProductsByDepartement,
  deleteProduct,
} from "../apis/Product_API";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [departement, setDepartement] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  const departements = ["ALL", "IT", "ENG", "HK", "SALES", "ACC", "SEC"];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await retrieveProducts();
      setProducts(data.data);
      setStatus(data.status);
    } catch (err) {
      console.error("Error retrieving products:", err);
    }
  }

  const toggleDropdown = (productId) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const filterByDepartement = async (selectedDepartement) => {
    setProducts([]);
    try {
      let data;
      if (selectedDepartement === "ALL") {
        data = await retrieveProducts();
      } else {
        data = await retrieveProductsByDepartement(selectedDepartement);
      }
      setProducts(data.data);
    } catch (err) {
      console.error("Error retrieving products:", err);
    }
  };

  const handleDeleteButton = async (id) => {
    const answer = window.confirm("Are you sure you want to delete this item?");
    if (answer) {
      try {
        await deleteProduct(id);
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        console.error("Error deleting products", err);
      }
    }
  };

  return (
    <div className="md:mr-5 lg:mr-0 mx-3 sm:mx-0">
      <div className="flex items-center justify-between">
        <div className="font-bold tracking-wider text-gray-500 sm:text-xl lg:text-2xl text-md">
          Inventory
        </div>
        <button
          className="lg:text-sm font-medium tracking-wider text-orange-500 hover:text-orange-700 transition-all cursor-pointer sm:text-sm text-xs"
          onClick={(n) => {
            navigate("/additem");
          }}
        >
          + Add product
        </button>
      </div>
      <div className="flex mt-3 flex-wrap text-gray-500 sm:scale-100 sm:ml-0 text-xs sm:text-sm">
        <select
          name="departement"
          value={departement}
          onChange={(e) => {
            setDepartement(e.target.value);
            filterByDepartement(e.target.value);
          }}
          className="border-2 text-center bg-gray-50 border-gray-200 md:w-[12rem] h-[2rem] rounded-full mr-2 font-medium lg:text-sm sm:text-xs sm:border-[1.2pt] sm:w-[10rem]"
        >
          {departements.map((dept, index) => (
            <option value={dept} key={index}>
              Departement: {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <div className="sm:grid hidden border-b-2 px-2 pb-2 grid-cols-8 gap-2 mt-10 lg:text-sm sm:text-xs text-gray-500 font-medium tracking-wide">
          <div className="col-span-1">No</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Inventory Number</div>
          <div className="col-span-1">Item</div>
          <div className="col-span-1 mx-7">Departement</div>
        </div>
        {products?.length > 0 && status ? (
          products.map((product, index) => (
            <div key={product.id}>
              <div className="sm:grid flex justify-between border-b-2 px-2 text-xs sm:px-3 pb-2 grid-cols-8 gap-2 mt-5 lg:text-sm items-center text-gray-500 font-medium tracking-wide">
                <div className="flex items-center gap-10 sm:hidden">
                  <div className="col-span-1">{index + 1}</div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex-shrink-0 flex-wrap w-12 h-14 border-[1pt] rounded-lg border-orange-500 shadow-sm">
                      <img
                        src={product.picture}
                        alt="none"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full sm:w-[10.5rem]">
                      <p className="ml-3 break-words">
                        {product.type} / {product.model}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 hidden sm:block">{index + 1}</div>
                <div className="col-span-2 sm:flex items-center hidden">
                  <div className="flex-shrink-0 flex-wrap w-12 h-14 border-[1pt] rounded-lg border-orange-500 shadow-sm">
                    <img
                      src={product.picture}
                      alt="none"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full sm:w-[10.5rem]">
                    <p className="ml-3 break-words">
                      {product.type} / {product.model}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-2 hidden sm:block">
                  {product.inventory_no}
                </div>
                <div className="sm:col-span-1 hidden sm:block">
                  <p className="break-words">{product.item}</p>
                </div>
                <div className="sm:col-span-1 hidden sm:block sm:mx-8">
                  {product.departement}
                </div>
                <div
                  className={`col-span-1 ml-14 cursor-pointer hover:text-orange-500`}
                >
                  <ArrowCircleDownOutlinedIcon
                    onClick={() => toggleDropdown(product.id)}
                    style={{
                      transform: openDropdowns[product.id]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
              </div>
              {openDropdowns[product.id] && (
                <div className="sm:grid text-xs lg:text-sm border-b-2 grid-cols-8 gap-10 pt-5 pl-2 bg-gray-100 sm:pl-8 text-gray-500 font-medium tracking-wide sm:text-xs px-2">
                  <div className="col-span-2 lg:w-[10rem] lg:h-[10rem] md:w-[6.5rem] md:h-[6.5rem] sm:w-[5rem] sm:h-[5rem] border-2 rounded-lg border-orange-500 overflow-hidden sm:flex hidden justify-center items-center">
                    <img src={product.picture} alt="" />
                  </div>
                  <div className="flex flex-col w-full px-5 sm:px-0 col-span-2 sm:-mx-7 lg:mx-0">
                    <div>
                      <p className="font-thin pt-1 text-orange-500">
                        {" "}
                        Display Name
                      </p>
                      <p className="font-bold tracking-wide mt-1 sm:mt-0 border-b-2 border-slate-500">
                        {product.type ? product.type : "..."} /{" "}
                        {product.model ? product.model : "..."}
                      </p>
                    </div>
                    <div>
                      <p className="font-thin pt-5 text-orange-500">
                        {" "}
                        Inventory Number{" "}
                      </p>
                      <p className="font-bold tracking-wide border-b-2 mt-1 sm:mt-0 border-slate-500">
                        {product.inventory_no}
                      </p>
                    </div>
                    <div>
                      <p className="font-thin pt-5 text-orange-500">Quantity</p>
                      <p className="font-bold tracking-wide border-b-2 mt-1 sm:mt-0 border-slate-500">
                        {product.qty ? product.qty : "..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full col-start-6 col-span-2 px-5 mt-2 sm:px-0 sm:mt-0">
                    <div>
                      <p className="font-thin pt-1 text-orange-500"> Item</p>
                      <p className="font-bold tracking-wide border-b-2 mt-1 sm:mt-0 border-slate-500">
                        {product.item ? product.item : "..."}
                      </p>
                    </div>
                    <div>
                      <p className="font-thin pt-5 text-orange-500">
                        {" "}
                        Serial Number{" "}
                      </p>
                      <p className="font-bold tracking-wide border-b-2 mt-1 sm:mt-0 border-slate-500">
                        {product.serial_number}
                      </p>
                    </div>
                    <div>
                      <p className="font-thin pt-5 text-orange-500">
                        {" "}
                        Departement{" "}
                      </p>
                      <p className="font-bold tracking-wide border-b-2 mt-1 sm:mt-0 border-slate-500">
                        {product.departement}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col col-start-3 mt-5 col-span-5 sm:-ml-7 sm:mt-2 lg:ml-0 px-5 sm:px-0">
                    <div>
                      <p className="font-thin pt-1 text-orange-500 ">Remark</p>
                      <p className="font-bold tracking-wide border-b-2 border-slate-500 mt-1 sm:mt-0 w-full break-words">
                        {product.remark ? product.remark : "..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row px-5 sm:px-0 mt-5 justify-between col-start-3 lg:mt-10 mb-5 gap-3 col-span-5 sm:-ml-7 sm:mt-5 lg:ml-0">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 lg:w-[11rem] text-white font-bold py-2 px-4 rounded transition duration-300 sm:w-[7rem] md:w-[7.5rem]"
                      onClick={() => {
                        navigate(`item/${product.id}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 lg:w-[11rem] text-white font-bold py-2 px-4 rounded transition duration-300 sm:w-[7rem] md:w-[7.5rem]"
                      onClick={() => {
                        navigate(`update/${product.id}`);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 lg:w-[11rem] text-white font-bold py-2 px-4 rounded transition duration-300 sm:w-[7rem] md:w-[7.5rem]"
                      onClick={(e) => {
                        handleDeleteButton(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : products?.length === 0 && status && departement !== "ALL" ? (
          <div className="flex justify-center items-center text-gray-500 text-xl sm:text-4xl mt-[5rem] md:-ml-[3rem] sm:ml-0">
            Loading...
          </div>
        ) : (
          <div className="flex justify-center items-center text-gray-500 text-xl sm:text-4xl mt-[5rem] md:-ml-[3rem] sm:ml-0">
            No Item
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
