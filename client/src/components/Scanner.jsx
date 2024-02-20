import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { getItemByInventoryNo } from "../apis/Product_API";

const Scanner = () => {
  const [scanner, setScanner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 240,
        height: 240,
      },
      fps: 10,
    });
    setScanner(newScanner);

    newScanner.render(success, error);

    return () => {
      if (newScanner) {
        newScanner.clear();
      }
    };
  }, []);

  const stopScanner = () => {
    if (scanner) {
      scanner.clear();
    }
    navigate("/");
  };

  const success = async (result) => {
    try {
      const id = await getItemByInventoryNo(result);
      if(id === "") {
        navigate("/");
      } else {
        navigate(`/item/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const error = (err) => {
    console.error(err);
  };

  return (
    <div class="w-full pt-5 bg-white shadow-lg mb-10 pb-5 min-h-[27rem] rounded-xl">
      <div class="flex justify-end px-5 sm:px-10">
        <button
          class="font-mono text-xl sm:text-2xl text-orange-500 hover:text-orange-700"
          onClick={stopScanner}
        >
          X
        </button>
      </div>
      <div class="text-center uppercase font-bold text-2xl sm:text-3xl border-b-2 pb-3 mx-2 sm:mx-4 text-gray-500">
        Scan Barcode
      </div>
      <div class="w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] my-8 mx-auto border-2 rounded-lg border-orange-500">
        <div
          id="reader"
          class="flex justify-center w-full h-full flex-col items-center bg-gray-100 text-center rounded-xl"
        ></div>
      </div>
    </div>
  );
};

export default Scanner;
