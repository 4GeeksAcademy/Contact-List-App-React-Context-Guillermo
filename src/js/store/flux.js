const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      newUserName: "",
      userName: "",
      contact: [],
    },
    actions: {
      addContact: (newContact) => {
        const store = getStore();
        setStore({ contact: [...store.contact, newContact] });
      },
      getContactList: async (newUser) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${newUser}/contacts`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          const data = await response.json();
          console.log("GET", data.contacts);
          setStore({ contact: data.contacts });
          return data;
        } catch (error) {
          console.error("Fetch request failed:", error);
        }
      },
      deleteContact: (idToDelete) => {
        const store = getStore();
        const actions = getActions();
        const updatedContactList = store.contact.filter(
          (contact) => contact.id !== idToDelete
        );
        setStore({ contact: updatedContactList });
        actions.deleteContactAPI(idToDelete);
      },
      deleteContactAPI: async (idToDelete) => {
        const store = getStore();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.userName}/contacts/${idToDelete}`,
            {
              method: "DELETE",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to delete contact. Status: ${response.status}`
            );
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            return {}; // Return an empty object indicating success
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Fetch request failed:", error);
          throw error; // Rethrow the error for the caller to handle
        }
      },
      userCreator: async () => {
        const store = getStore();
        const actions = getActions();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.userName}`,
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log("Response data:", data);
          if (data.detail === `Agenda "${store.userName}" already exists.`) {
            alert(
              `El usuario ${store.userName} ya existe, cargando lista de contactos`
            );
            actions.getContactList(store.userName);
          }
        } catch (error) {
          console.error("Hubo un problema con la solicitud fetch:", error);
        }
      },
      inputUsername: (e) => {
        setStore({ newUserName: e.target.value });
      },
      createUserName: (e) => {
        const store = getStore();
        const actions = getActions();
        if (e.key === "Enter") {
          setStore({ userName: store.newUserName });
          console.log(store.userName);
          actions.userCreator();
        }
      },
    },
  };
};

export default getState;
