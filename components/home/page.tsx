"use client";

import { useAuth } from "@/contexts/authContext";
import "./home.style.css";

const HomePage = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-base-300 rounded-box p-5 ">
        <h1 className="text-5xl font-bold text-center">LOADING...</h1>
      </div>
    );
  }

  return (
    <div className="bg-base-300 rounded-box p-5 ">
      <h1 className="text-5xl font-bold text-center">
        WELCOME,{" "}
        <span className="bg-yellow-400 p-2 rounded-box">
          {currentUser ? currentUser.displayName : "GUEST"}
        </span>
      </h1>
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="avatar">
          <div className="w-96 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={
                currentUser
                  ? currentUser.photoURL
                  : `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`
              }
            />
          </div>
        </div>
        <div className="mt-5 text-2xl font-semibold">
          <h1>
            Display Name:{" "}
            <span className="font-normal">
              {currentUser ? currentUser.displayName : "guest"}
            </span>
          </h1>
          <h1>
            Email:{" "}
            <span className="font-normal">
              {currentUser ? currentUser.email : "email"}
            </span>
          </h1>
          <h1>
            Phone:{" "}
            <span className="font-normal">
              {currentUser ? currentUser.phoneNumber : "phone"}
            </span>
          </h1>
          <h1>
            Provider:{" "}
            <span className="font-normal">
              {currentUser ? currentUser.providerId : "provider"}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
