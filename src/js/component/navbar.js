import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="row">
      <div className="col">
        {store.userName ? (
          <h4 className="m-3">{`Lista de contactos de ${store.userName}`}</h4>
        ) : (
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
                value={store.newUserName}
                onChange={actions.inputUsername}
                onKeyDown={actions.createUserName}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
        )}
      </div>
      <div className="col d-flex justify-content-end">
        <Link to="/addContact">
          <button type="button" className="btn btn-success my-3">
            Add new contact
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
