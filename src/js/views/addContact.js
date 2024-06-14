import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const AddContact = () => {
  const { actions, store } = useContext(Context);
  const [newContactInput, setNewContactInput] = useState(() => {
    return store.editedContact
      ? store.editedContact
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
        };
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContactInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (store.editedContact.name) {
      await actions.saveEditContact(newContactInput);
    } else {
      await actions.contactCreator(newContactInput);
    }

    actions.addContact(newContactInput);

    navigate("/");
  };

  return (
    <form className="container" onSubmit={handleSave}>
      <h1 className="text-center">
        {store.editedContact ? "Edit Contact" : "Add a New Contact"}
      </h1>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          placeholder="Enter Name"
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
          placeholder="Enter Email"
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
          placeholder="Enter Phone number"
          type="tel"
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
          placeholder="Enter address"
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={newContactInput.address}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {store.editedContact.name ? "Edit" : "Save"}
      </button>

      <Link to={`/`}>
        <button
          onClick={actions.resetInput}
          type="button"
          className="btn btn-secondary ms-2"
        >
          Return
        </button>
      </Link>
    </form>
  );
};

export default AddContact;
