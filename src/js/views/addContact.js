import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
  const { actions, store } = useContext(Context);
  const [newContactInput, setNewContactInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContactInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    actions.addContact(newContactInput);
    await actions.contactCreator(newContactInput);
  };

  return (
    <form className="container" onSubmit={handleSave}>
      <h1 className="text-center">Add a new contact</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={newContactInput.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={newContactInput.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="number"
          className="form-control"
          id="phone"
          name="phone"
          value={newContactInput.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={newContactInput.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <Link to={`/`}>
        <button type="button" className="btn btn-secondary ms-2">
          Return
        </button>
      </Link>
    </form>
  );
};

export default AddContact;
