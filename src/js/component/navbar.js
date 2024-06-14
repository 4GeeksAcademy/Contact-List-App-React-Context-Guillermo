import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);

  const checkUserName = (e) => {
    console.log(store.userName);
    if (store.newUserName && !store.userName) {
      actions.createUserName(e);
    } else return;
  };

  return (
    <div className="row p-4">
      <div className="col">
        {store.userName ? (
          <h4 className="m-3">{`Lista de contactos de ${store.userName}`}</h4>
        ) : (
          <div className="input-group">
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
        {!store.newUserName && !store.userName ? (
          <h3>Select a username</h3>
        ) : (
          <Link to="/addContact">
            <button
              type="button"
              onClick={checkUserName}
              className="btn btn-success my-3"
            >
              Add new contact
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
