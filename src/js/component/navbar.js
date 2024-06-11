import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);

  const [newUserName, setNewUserName] = useState("");
  // const [userName, setUserName] = useState("")
  console.log(store.userName.length);

  // {actions.createUser(newUserName)

  const createUserName = (e) => {
    if (e.key === "Enter") {
      actions.createUser(newUserName);
      userCreator();
    }
  };

  const inputUsername = (e) => {
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
          },
        }
      );

      // Verifica si la respuesta es exitosa
      if (!respuesta.ok) {
        // Si no es exitosa, lanza un error con el estado de la respuesta
        throw new Error(`Error en la solicitud: ${respuesta.status}`);
      }

      // Convierte la respuesta a formato JSON
      const datos = await respuesta.json();

      // Devuelve los datos obtenidos
      return datos;
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
          <button type="button" className="btn btn-success m-3">
            Add new contact
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
