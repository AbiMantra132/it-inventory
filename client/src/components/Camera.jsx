import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Camera = ({setImage, setUpdateImageByCamera, updateImageByCamera}) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [imageCapture, setImageCapture] = useState(null);
  
  const turnOnCamera = async () => {
    setImageCapture(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      const video = videoRef.current;
      video.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the data URL of the drawn image
      const imageDataURL = canvas.toDataURL();
      stopCamera(); // Stop the camera after taking the snapshot
      setImageCapture(true);
      setImage(imageDataURL);
      setUpdateImageByCamera(!updateImageByCamera);
      return imageDataURL;
    }
  };

  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  return (
    <div className="w-full pt-5 bg-white shadow-lg mb-10 pb-8 min-h-[27rem] rounded-xl">
      <div className="flex justify-end px-10">
        <button
          className="font-mono text-2xl text-orange-500 hover:text-orange-700"
          onClick={() => {
            stopCamera();
           setUpdateImageByCamera(!updateImageByCamera);
          }}
        >
          X
        </button>
      </div>
      <div className="text-center uppercase font-bold text-3xl border-b-2 pb-2 text-gray-500">
        Take Picture
      </div>
      <div className="scale-75 flex justify-center -mt-5">
        <canvas
          ref={canvasRef}
          width={640}
          className={`${
            imageCapture ? "border-2 border-orange-400 mb-4 h-[25rem]" : "hidden"
          }`}
        ></canvas>
        <video
          ref={videoRef}
          width={640}
          autoPlay
          muted
          playsInline
          height={480}
          className={`${
            !imageCapture ? "border-2 border-orange-400 mb-4 h-[25rem]" : "hidden"
          }`}
        ></video>
      </div>
      <div className="w-[30rem] -mt-[1rem] mx-auto">
        <button
          onClick={turnOnCamera}
          className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full rounded-full text-white py-2 px-4 cursor-pointer mb-4 transition duration-300 ease-in-out"
        >
          Turn On
        </button>
        <button
          onClick={takeSnapshot}
          className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-full text-white py-2 px-4 cursor-pointer transition duration-300 ease-in-out"
        >
          Take Snapshot
        </button>
      </div>
    </div>
  );
};

export default Camera;
