import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Contact = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="d-flex flex-column align-items-center">
      {store.contact.length === 0 ? (
        <p className="text-center">No hay contactos.</p>
      ) : (
        store.contact.map((contact) => (
          <div
            key={contact.id}
            className="d-flex justify-content-between px-5 col-8 border py-3 my-2"
          >
            <div className="d-flex">
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                <img
                  src={contact.photo}
                  alt={`${contact.name}'s photo`}
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="ms-5">
                <p>{contact.name}</p>
                <ul className="list-unstyled">
                  <li>{contact.address}</li>
                  <li>{contact.phone}</li>
                  <li>{contact.email}</li>
                </ul>
              </div>
            </div>
            <div>
              <span className="me-3 text-primary cursor-pointer">Edit</span>
              <span className="text-danger cursor-pointer">Delete</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Contact;
