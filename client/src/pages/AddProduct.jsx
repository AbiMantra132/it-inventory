import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { sendProduct } from "../apis/Product_API";
import { Endpoints } from "../apis/Endpoints";
import { useNavigate } from "react-router-dom";
import Camera from "../components/Camera";

const AddProduct = () => {
  // defining states and constants
  const items = ["PC", "Monitor", "UPC", "HDD/SSD", "Laptop"];
  const departements = ["IT", "ENG", "HK", "SALES", "ACC", "SEC"];
  const labels = ["Pcs", "Unit", "Box"];
  const PostURL = Endpoints.postProduct;

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

  const navigate = useNavigate();

  //functions
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = (err) => {
      console.error(err);
    };

    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const sendToServer = async (e) => {
    e.preventDefault();
    const Product = {
      item,
      departement,
      label,
      type,
      model,
      serialNumber,
      qty,
      image,
      remark,
    };

    try {
      const response = await sendProduct(Product);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {updateImageByCamera ? (
        <Camera
          setImage={setImage}
          setUpdateImageByCamera={setUpdateImageByCamera}
          updateImageByCamera={updateImageByCamera}
        />
      ) : (
        <div className="w-full -mt-10 sm:mt-0 bg-white shadow-lg min-h-[27rem] rounded-xl">
          <div className="flex justify-between items-center pt-1 pb-1 px-10 shadow-md">
            <p className="font-semibold tracking-wide text-gray-500 uppercase">
              <span className="font-bold text-orange-500">a</span>dd Item
            </p>
            <button
              className="font-mono text-2xl text-orange-500"
              onClick={() => {
                navigate("/");
              }}
            >
              X
            </button>
          </div>
          <form
            action={PostURL}
            method="post"
            enctype="multipart/form-data"
            onSubmit={sendToServer}
          >
            <div className="flex flex-col justify-center items-center sm:flex-row sm:items-start lg:justify-around sm:justify-between gap-5 px-10 py-5">
              <div className="border-2 w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] relative flex flex-col items-center justify-center border-dashed bg-gradient-to-t from-gray-100 to-white overflow-hidden">
                {!image ? (
                  <>
                    <p className="text-gray-300 scale-150">
                      <CloudUploadIcon />
                    </p>
                    <label className="mt-2 text-orange-500 font-semibold hover:underline focus:outline-none cursor-pointer">
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
                      className="text-orange-500 font-semibold hover:underline focus:outline-none"
                      onClick={() => {
                        setUpdateImageByCamera(!updateImageByCamera);
                      }}
                    >
                      Take Picture
                    </button>
                  </>
                ) : (
                  <img src={image} alt="Uploaded" />
                )}
              </div>
              <div className="h-auto sm:h-[20rem] overflow-y-scroll pr-3 overflow-x-hidden">
                <p className="border-b-[1pt] border-orange-500 text-xl font-semibold text-gray-500">
                  <span className="font-bold text-orange-500">I</span>tems
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="mb-2 col-span-2">
                    <label htmlFor="item" className="block mb-2">
                      Item
                    </label>
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
                  <div className="mb-2 col-span-2">
                    <label htmlFor="departement" className="block mb-2">
                      Departement
                    </label>
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
                  <div className="mb-2 col-span-1">
                    <label htmlFor="type" className="block mb-2">
                      Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={type}
                      className="border-[1pt] border-gray-300 p-2 rounded-md w-full"
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="model" className="block mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={model}
                      className="border-[1pt] border-gray-300 p-2 rounded-md w-full"
                      onChange={(e) => {
                        setModel(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="serial" className="block mb-2">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      name="serial"
                      value={serialNumber}
                      className="border-[1pt] border-gray-300 p-2 rounded-md w-full"
                      onChange={(e) => {
                        setSerialNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-2 relative w-full">
                    <label htmlFor="qty" className="block mb-2">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="qty"
                      value={qty}
                      className="border-[1pt] border-gray-300 p-2 w-full peer rounded-md"
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
                      className="absolute outline-none peer-focus:border-black bg-none top-[2.01rem] -right-[0rem] h-10 border-l-[1pt]"
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
                  <div className="col-span-2">
                    <label htmlFor="remark" className="block mb-2">
                      Remark
                    </label>
                    <textarea
                      name="remark"
                      className="border-2 w-full h-[10rem] resize-none"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="col-span-2 hover:bg-orange-500 rounded-full my-4 py-3 uppercase font-semibold tracking-wider shadow-md bg-orange-400 text-white transition-colors"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
