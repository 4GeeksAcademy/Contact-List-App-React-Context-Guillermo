import React from "react";
import "../../styles/home.css";
import ContactDisplay from "../component/contactDisplay";
import NavBar from "../component/navBar";

export const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <ContactDisplay />
    </div>
  );
};
