import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [idToTrackArtWorks, setIdToTrackArtWorks] = useState({});
  const [like, setLike] = useState();
  const [artWorkDetails, setArtWorkDetails] = useState();
  const [load, setLoad] = useState(false);

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

  const handleLikes = () => {
    if (artWorkDetails) {
      fetch('/api/update-likes', {
        body: JSON.stringify({
          _id: artWorkDetails._id,
          user: user.sub,
        }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setLike(true);
          } else {
            setLike(false);
          }
        });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        displaySearchBar,
        setDisplaySearchBar,
        idToTrackArtWorks,
        setIdToTrackArtWorks,
        like,
        setLike,
        handleLikes,
        artWorkDetails,
        setArtWorkDetails,
        load,
        setLoad,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
