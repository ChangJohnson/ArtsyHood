import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [idToTrackArtWorks, setIdToTrackArtWorks] = useState({});
  const [like, setLike] = useState('');
  const [artWorkDetails, setArtWorkDetails] = useState('');
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState('');
  const [follow, setFollow] = useState(false);
  const [arts, setArts] = useState();
  const [allLikes, setAllLikes] = useState([]);

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

  const handleLikes = (artId) => {
    console.log('click');
    console.log(artId);
    // artWorkDetails._id

    fetch('/api/update-likes', {
      body: JSON.stringify({
        _id: artId,
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
          setLike(data.data);
          window.location.reload();
          console.log('+++++++', data.data);
        } else {
          setLike('');
          window.location.reload();
        }
      });
  };

  // on mount checks all the liked arts and render them on screen
  useEffect(() => {
    if (isAuthenticated) {
      console.log('hello');
      fetch(`/api/get-all-likes/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setAllLikes(data.data);
            console.log('ypypypyp', data.data);
          } else {
            setAllLikes([]);
          }
        });
    }
  }, [user]);

  const handleFollow = (artistId) => {
    const checkId = artistId
      ? artistId
      : artWorkDetails.sub && artWorkDetails.sub;

    fetch('/api/follow', {
      body: JSON.stringify({
        _id: checkId,
        // userData._id
        //   ? userData._id
        //   : artWorkDetails._id && artWorkDetails._id
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
          setFollow(true);
        } else {
          setFollow(false);
        }
      });
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
        userData,
        setUserData,
        follow,
        setFollow,
        handleFollow,
        arts,
        setArts,
        allLikes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
