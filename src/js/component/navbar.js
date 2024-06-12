import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);

  const [newUserName, setNewUserName] = useState("");

  console.log("Length of store.userName:", store.userName.length);

  const createUserName = (e) => {
    if (e.key === "Enter") {
      console.log("Creating user with name:", newUserName);
      actions.createUser(newUserName);
      userCreator();
    }
  };

  const inputUsername = (e) => {
    console.log("Updating newUserName with:", e.target.value);
    setNewUserName(e.target.value);
  };

  const userCreator = async () => {
    try {
      const respuesta = await fetch(
        `https://playground.4geeks.com/contact/agendas/${store.userName}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const datos = await respuesta.json();
      console.log("Response data:", datos); // Imprime los datos obtenidos
      datos.detail == `Agenda "${store.userName}" already exists.`
        ? (alert(
            `El usuario ${store.userName} ya existe, cargando lista de contactos`
          ),
          actions.getContactList(newUserName))
        : null;
    } catch (error) {
      // Maneja cualquier error que ocurra en el bloque try
      console.error("Hubo un problema con la solicitud fetch:", error);
    }
  };

  return (
    <div className="row">
      <div className="col">
        {store.userName.length === 0 ? (
          <div className="input-group m-3">
            <span className="input-group-text" id="username-addon">
              @
            </span>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="username-addon"
                value={newUserName}
                onChange={inputUsername}
                onKeyDown={createUserName}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
        ) : (
          <h4 className="m-3">{`Lista de contactos de ${store.userName}`}</h4>
        )}
      </div>
      <div className="col d-flex justify-content-end">
        <Link to="/contactcreator">
          <button type="button" className="btn btn-success my-3">
            Add new contact
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
