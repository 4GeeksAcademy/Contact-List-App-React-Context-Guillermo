const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userName: "",
      contact: [],
    },
    actions: {
      addContact: (newContact) => {
        const store = getStore();
        setStore({ contact: [...store.contact, newContact] });
      },
      createUser: (newUser) => {
        setStore({ userName: newUser });
        console.log(newUser);
      },
      getContactList: async (newUser) => {
        try {
          const respuesta = await fetch(
            `https://playground.4geeks.com/contact/agendas/${newUser}/contacts`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
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
          console.log("GET", datos.contacts),
            setStore({ contact: datos.contacts });

          // Devuelve los datos obtenidos
          return datos;
        } catch (error) {
          // Maneja cualquier error que ocurra en el bloque try
          console.error("Hubo un problema con la solicitud fetch:", error);
        }
      },
    },
  };
};

export default getState;
