// import dependencies
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Padlock from "../assets/padlock.svg";
import Profile from "../assets/profile.svg";
import Background from "../assets/download.jpg";
import { sendCredentials } from "../apis/Auth_API";

const Login = ({ status }) => {
  const { isLogged } = status;

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // functions
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await sendCredentials(username, password);
      isLogged(data.valid);
      // Redirect or update UI upon successful login
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div>
      <div className="h-full w-full flex relative overflow-y-hidden">
        <div className="lg:w-[50vw] h-screen lg:pt-14 lg:bg-white bg-none flex justify-center w-full shadow-2xl lg:shadow-gray-600 z-10 pt-[6rem]">
          <div className="w-full mt-10">
            <h1 className="uppercase font-medium text-sm tracking-widest text-gray-500 text-center ml-5">
              welcome to
            </h1>
            <img
              src={Logo}
              alt="sense-sunset-logo"
              className="w-[12rem] mx-auto -mt-3"
            />
            <p className="text-gray-400 text-xs font-thin ml-2 text-center -mt-1">
              Log in as admin to view IT (Information Technology) <br /> Items
              Database
            </p>
            <form className="w-min mx-auto py-10" onSubmit={handleLogin}>
              <div className="relative">
                <img
                  src={Profile}
                  alt="profile-icon"
                  className="absolute w-[1.5rem] top-[5pt] left-5"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  className="border-2 rounded-full w-[20rem] px-12 text-sm py-2 focus:outline-none focus:border-2 focus:border-orange-500 mb-5 text-gray-500"
                />
              </div>
              <div className="relative">
                <img
                  src={Padlock}
                  alt="password-icon"
                  className="absolute w-[1.5rem] top-[4.1pt] left-5"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="border-2 rounded-full w-[20rem] px-12 text-xs py-2 focus:outline-none focus:border-2 focus:border-orange-500"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                className="text-center bg-orange-500 w-full rounded-full py-1 mt-6 shadow-md shadow-orange-600 tracking-wider font-semibold text-white"
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>
        <div className="w-[50vw] bg-black z-0 relative hidden lg:block">
          <img
            src={Background}
            alt="background"
            className="fixed h-screen -ml-[5rem] opacity-30"
          />
          <div className=" absolute w-full ml-auto mx-auto left-0 right-0 text-center h-full">
            <div className="w-[30rem] mx-auto">
              <h1 className="text-white uppercase text-3xl mt-[14.5rem] tracking-widest font-semibold font-mono">
                Sense Sunset Seminyak
              </h1>
              <p className="text-center text-white text-sm font-thin mt-4">
                Ideally situated on Sunset Road Boulevard in the trendy Seminyak
                area in Bali. Sense Sunset Hotel Seminyak is the perfect choice
                for leisure travelers, business travelers and corporate
                meetings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
