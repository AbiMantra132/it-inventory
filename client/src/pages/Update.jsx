import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveSingleProduct, updateSingleProduct } from "../apis/Product_API";
import Camera from "../components/Camera";

const Update = () => {
  // defining states and constants
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const items = ["PC", "Monitor", "UPS", "HDD/SSD", "Laptop"];
  const departements = ["IT", "ENG", "HK", "SALES", "ACC", "SEC"];
  const labels = ["Pcs", "Unit", "Box"];

  const [item, setItem] = useState("");
  const [departement, setDepartement] = useState("");
  const [label, setLabel] = useState("Pcs");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState("");
  const [remark, setRemark] = useState("");
  const [updateImageByCamera, setUpdateImageByCamera] = useState(false);

  useEffect(() => {
    fetchItemData(id);
  }, []);

  // function
  async function fetchItemData(item_id) {
    try {
      const data = await retrieveSingleProduct(item_id);

      setProduct(data);
      setItem(data.item);
      setDepartement(data.departement);
      setType(data.type);
      setModel(data.model);
      setSerialNumber(data.serial_number);
      setRemark(data.remark);
      setImage(data.picture);
      setQty(data.qty.split(" ")[0]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = (err) => {
      console.error(err);
    };

    reader.onload = () => {
      setImage(reader.result);
    };
  }

  async function sendDatatoUpdate() {
    const updatedData = {
      item,
      departement,
      label,
      type,
      model,
      serialNumber,
      qty: `${qty} ${label}`,
      image,
      remark,
      id: product.id,
    };
    try {
      await updateSingleProduct(updatedData);
      // Handle success, for example, navigate to a different page
      navigate("/");
    } catch (err) {
      console.log(err);
      // Handle error, for example, show an error message to the user
    }
  }

  return (
    <div>
      {updateImageByCamera ? (
        <Camera
          setImage={setImage}
          setUpdateImageByCamera={setUpdateImageByCamera}
          updateImageByCamera={updateImageByCamera}
        />
      ) : (
        <div className="w-full -mt-10 sm:mt-0 pt-5 bg-white shadow-lg sm:mb-10 pb-8 min-h-[27rem] rounded-xl">
          <div className="flex justify-end px-10">
            <button
              className="font-mono text-2xl text-orange-500 hover:text-orange-700"
              onClick={() => {
                navigate("/");
              }}
            >
              X
            </button>
          </div>
          <div className="grid-cols-8 mt-10 sm:mt-0 gap-2 pt-5 px-3 text-sm text-gray-500 font-medium tracking-wide flex flex-col lg:grid lg:grid-cols-8 lg:gap-2 justify-center items-center lg:justify-normal lg:items-start">
            <div className="col-span ml-5 w-[10rem] h-[10rem] border-2 rounded-lg border-orange-500 overflow-hidden flex justify-center items-center">
              <img src={image} alt="" />
            </div>
            <div className="row-start-2 lg:-mt-[7rem] mt-0 mx-5 col-span-2 flex flex-col justify-center items-center lg:w-[10rem] w-full px-[2rem] sm:px-[8rem] lg:px-0">
              <label className="mt-2 text-orange-500 border border-orange-500 rounded-full py-2 px-3 font-semibold w-full text-center hover:bg-orange-500 hover:text-white focus:outline-none cursor-pointer transition duration-300">
                Upload Image
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
              <p className="my-2 text-gray-500 font-semibold">Or</p>
              <button
                className="text-orange-500 border border-orange-500 rounded-full py-2 px-3 font-semibold w-full text-center hover:bg-orange-500 hover:text-white focus:outline-none cursor-pointer transition duration-300"
                onClick={() => {
                  setUpdateImageByCamera(!updateImageByCamera);
                }}
              >
                Take Picture
              </button>
            </div>
            <div className="flex flex-col mt-5 col-span-2 ml-5 lg:col-start-3 lg:mt-0 w-full pr-6">
              <div>
                <p className="font-thin pt-1 text-orange-500">Type</p>
                <input
                  className="font-bold tracking-wide border-b-2 border-slate-500 p-1  w-full"
                  type="text"
                  value={`${type ? type : "..."}`}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div>
                <p className="font-thin pt-5 text-orange-500"> Model</p>
                <input
                  className="font-bold tracking-wide border-b-2 border-slate-500 p-1 w-full"
                  type="text"
                  value={`${model ? model : "..."}`}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <p className="font-thin pt-5 text-orange-500 pb-2">
                  {" "}
                  Inventory Number
                </p>
                <input
                  value={product.inventory_no}
                  disabled
                  className="font-bold tracking-wide border-b-2 border-slate-500 p-1 bg-white w-full"
                />
              </div>
              <div>
                <p className="font-thin pt-5 text-orange-500 mt-[.6rem]">
                  {" "}
                  Serial Number
                </p>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="font-bold tracking-wide border-b-2 border-slate-500 p-1 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:col-start-6 col-span-2 mt-5 lg:mt-0 w-full px-2">
              <div>
                <p className="font-thin pt-1 text-orange-500"> Item</p>
                <select
                  name="item"
                  value={item}
                  onChange={(e) => {
                    setItem(e.target.value);
                  }}
                  className="border-[1pt] border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  {items.length > 0 &&
                    items.map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <p className="font-thin pt-5 text-orange-500"> Departement </p>
                <select
                  name="departement"
                  value={departement}
                  onChange={(e) => {
                    setDepartement(e.target.value);
                  }}
                  className="border-[1pt] w-full border-gray-300 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Select Departement
                  </option>
                  {departements.length > 0 &&
                    departements.map((departement, index) => {
                      return (
                        <option value={departement} key={index}>
                          {departement}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-2 relative">
                <p className="font-thin pt-5 text-orange-500"> Quantity </p>
                <input
                  type="text"
                  name="qty"
                  value={qty}
                  className="border-[1pt] border-gray-300 p-2 peer w-full rounded-md"
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                />
                <select
                  name="label"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                  className="absolute outline-none peer-focus:border-black bg-none top-[2.55rem] right-[.04rem] h-9 border-l-[1pt]"
                >
                  {labels.length > 0 &&
                    labels.map((label, index) => {
                      return (
                        <option value={label} key={index}>
                          {label}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="flex flex-col ml-5 mt-5 col-start-3 col-span-5 lg:col-start-3 lg:mt-5 w-full pr-6">
              <div>
                <p className="font-thin pt-1 text-orange-500">Remark</p>
                <input
                  type="text"
                  value={remark ? remark : "..."}
                  onChange={(e) => setRemark(e.target.value)}
                  className="font-bold tracking-wide border-b-2 border-slate-500 w-full p-1"
                />
              </div>
            </div>
            <div className="flex ml-5 mt-10 mb-5 col-start-3 col-span-5 w-full pr-5">
              <button
                className="bg-orange-500 hover:bg-orange-600 lg:w-[10rem] w-full text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={sendDatatoUpdate}
              >
                Update Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
