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
    },
  };
};

export default getState;
