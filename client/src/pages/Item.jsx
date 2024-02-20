import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveSingleProduct, downloadXLSX } from "../apis/Product_API";
import Barcode from "react-barcode";
import domtoimage from "dom-to-image";


const Item = () => {
  // defining constants and states
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const BarcodeRef = useRef(null);
  const navigate = useNavigate();

  const [item, setItem] = useState("");
  const [departement, setDepartement] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState("");
  const [remark, setRemark] = useState("");
  const [inventoryNumber, setInventoryNumber] = useState("");


  // useEffect
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
      setQty(data.qty);
      setInventoryNumber(data.inventory_no);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleBarcodeDownload() {
    try {
      const node = BarcodeRef.current;
      const dataUrl = await domtoimage.toPng(node);
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `${product.inventory_no}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error converting SVG to PNG: ", error);
    }
  }

  async function handleDownloadXLSX() {
    const data = {item, departement, type, model, serialNumber, remark, image, qty, inventoryNumber}
    try {
      await downloadXLSX(data)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <div className="lg:w-full -mt-12 sm:mt-0 mx-auto text-xs md:text-sm pt-5 bg-white shadow-lg sm:mb-10 pb-8 min-h-[27rem] rounded-xl">
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
      <div className="lg:grid lg:grid-cols-8 lg:gap-2 lg:pt-5 px-3 lg:text-sm text-gray-500 font-medium tracking-wide flex flex-col justify-center items-center">
        <div className="col-span-2 w-[10rem] mt-10 h-[10rem] border-2 ml-5 rounded-lg border-orange-500 overflow-hidden flex justify-center items-center">
          <img src={product.picture} alt="" />
        </div>
        <div className="flex flex-col w-full col-span-2 ml-5 lg:ml-0 mt-5 pr-7 sm:pl-2 lg:pr-0 lg-pl-0">
          <div>
            <p className="font-thin pt-1 text-orange-500"> Display Name</p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500">
              {product.type ? product.type : "..."} /{" "}
              {product.model ? product.model : "..."}
            </p>
          </div>
          <div>
            <p className="font-thin pt-5 text-orange-500"> Inventory Number </p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500">
              {product.inventory_no}
            </p>
          </div>
          <div>
            <p className="font-thin pt-5 text-orange-500">Quantity</p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500">
              {product.qty ? product.qty : "..."}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full col-start-6 col-span-2 pr-5 ml-1 sm:ml-5 mt-5 lg:ml-0 pl-2 lg:pr-0 lg:pl-0">
          <div>
            <p className="font-thin pt-1 text-orange-500"> Item</p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500">
              {product.item ? product.item : "..."}
            </p>
          </div>
          <div>
            <p className="font-thin pt-5 text-orange-500"> Id</p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500">
              {product.id}
            </p>
          </div>
          <div>
            <p className="font-thin pt-5 text-orange-500"> Departement </p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500">
              {product.departement}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full sm:ml-5 ml-1 pr-5 lg:col-span-5 lg:col-start-3 mt-5 lg:ml-0 pl-2 lg:pr-0 lg-pl-0">
          <div>
            <p className="font-thin pt-1 text-orange-500">Remark</p>
            <p className="font-bold tracking-wide border-b-2 border-slate-500 w-full break-words">
              {product.remark ? product.remark : "..."}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full col-start-3 mt-5 pr-7 ml-5 md:ml-8 lg:ml-2 lg:pr-0 lg:pl-0 ">
          <div>
            <p className="font-thin pt-1 text-orange-500">Barcode</p>
            <div
              ref={BarcodeRef}
              className="font-bold tracking-wide -ml-2 border-slate-500 flex md:block"
            >
              <Barcode
                value={product.inventory_no}
                options={{ format: "CODE128" }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-initial gap-3 lg:ml-2 mt-5 w-full pr-7 ml-5 col-start-3 sm:mt-10 mb-5 min-h-[2rem]  lg:min-w-[26rem] lg:max-w-auto sm:pr-5">
          <button
            onClick={handleDownloadXLSX}
            className="bg-green-500 w-full hover:bg-green-600 lg:w-[10rem] text-white font-bold py-3 px-4 rounded transition duration-300"
          >
            Download XlSX
          </button>
          <button
            onClick={handleBarcodeDownload}
            className="bg-gray-500 w-full hover:bg-gray-600 lg:w-[10rem] text-white font-bold py-3 px-4 rounded transition duration-300"
          >
            Download Barcode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
