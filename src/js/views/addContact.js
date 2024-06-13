import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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
      // Si editedContact tiene un nombre, significa que se está editando un contacto existente
      await actions.saveEditContact(newContactInput);
    } else {
      // Si editedContact no tiene un nombre, significa que se está creando un nuevo contacto
      await actions.contactCreator(newContactInput);
    }
  
    // Agregar el nuevo contacto creado o editado a la lista de contactos en el store
    actions.addContact(newContactInput);
  
    // Resetear el formulario o realizar otras acciones necesarias después de guardar
    // Por ejemplo, limpiar los campos del formulario
  };
  

  return (
    <form className="container" onSubmit={handleSave}>
      {store.editedContact.name ? (
        <h1 className="text-center">Edit contact</h1>
      ) : (
        <h1 className="text-center">Add a new contact</h1>
      )}

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
