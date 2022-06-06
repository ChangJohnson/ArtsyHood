import React, { createContext, useState, useReducer } from 'react';

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [idToTrackArtWorks, setIdToTrackArtWorks] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        displaySearchBar,
        setDisplaySearchBar,
        idToTrackArtWorks,
        setIdToTrackArtWorks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
