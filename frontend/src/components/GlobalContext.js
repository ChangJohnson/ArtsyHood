import React, { createContext, useState, useReducer } from 'react';

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <GlobalContext.Provider value={{ displaySearchBar, setDisplaySearchBar }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
