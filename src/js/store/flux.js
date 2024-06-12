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

          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          // Parse the response as JSON
          const data = await response.json();
          console.log("GET", data.contacts);

          // Update the state/store with the received contacts
          setStore({ contact: data.contacts });

          // Return the obtained data
          return data;
        } catch (error) {
          console.error("Fetch request failed:", error);
        }
      },

      deleteContact: (idToDelete) => {
        const store = getStore();
        const actions = getActions();
        const updateContactList = store.contact.filter(
          (contact) => contact.id !== idToDelete
        );
        setStore({ contact: updateContactList });
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

          // Check if the response status indicates success
          if (!response.ok) {
            throw new Error(
              `Failed to delete contact. Status: ${response.status}`
            );
          }

          // Check if response body is empty
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
    },
  };
};

export default getState;
