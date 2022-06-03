import React, { createContext, useState, useReducer } from 'react';

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
