import React from "react";
import ContactDisplay from "../component/contactCard";
import NavBar from "../component/navBar";
export const Contact = () => {
  return (
    <div className="container">
      <NavBar />
      <ContactDisplay />
    </div>
  );
};
