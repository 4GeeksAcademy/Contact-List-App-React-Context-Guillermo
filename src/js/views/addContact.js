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
    id: "",
  });

  const userCreator = async () => {
    try {
      const respuesta = await fetch(
        `https://playground.4geeks.com/contact/agendas/${store.userName}/contacts`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContactInput),
        }
      );

      if (!respuesta.ok) {
        throw new Error(`Error en la solicitud: ${respuesta.status}`);
      } else actions.getContactList(store.userName);

      const datos = await respuesta.json();

      return datos;
    } catch (error) {
      console.error("Hubo un problema con la solicitud fetch:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContactInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setNewContactInput((prevInput) => ({
      ...prevInput,
      [id]: newContactInput.phone,
    }));

    actions.addContact(newContactInput);
    userCreator();
    console.log(newContactInput);
  };

  return (
    <div className="container">
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
          type="text"
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

      <Link to={`/`}>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="btn btn-secondary ms-2">
          Return
        </button>
      </Link>
    </div>
  );
};

export default AddContact;
