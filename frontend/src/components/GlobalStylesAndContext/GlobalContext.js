import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [idToTrackArtWorks, setIdToTrackArtWorks] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/add/user', {
        body: JSON.stringify({
          user,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setIdToTrackArtWorks(data.data);
          } else if (data.status === 404) {
            setIdToTrackArtWorks(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

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
