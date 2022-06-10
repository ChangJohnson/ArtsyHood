import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Comments from './Comments';
import styled from 'styled-components';

const ArtDetails = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [artInfo, setArtInfo] = useState();
  const [checkState, setCheckState] = useState(false);
  const [like, setLike] = useState(false);
  // const [numOflikes, setNumOfLikes] = useState(false);
  const [loading, setLoading] = useState(false);
  let { _id } = useParams();

  useEffect(() => {
    setCheckState(false);
    fetch(`/api/art-by/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setArtInfo(data.data);
          console.log(data.message);
          setCheckState(true);
        }
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, [_id]);

  const handleLikes = () => {
    // setLoading(false);
    // if (like) {
    //   setLike(false);
    // } else {
    //   setLike(true);
    // }
    // setLoading(true);
    // if (loading) {
    fetch('/api/update-likes', {
      body: JSON.stringify({
        _id: artInfo._id,
        user: user.sub,
        setLike: like,
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('test');
    // }
  };

  return (
    <div>
      {checkState && (
        <>
          <Img src={artInfo.url}></Img>
          <div>{artInfo.name}</div>
          <div>{artInfo.style}</div>
          <div>Comments:{artInfo.numOfComments}</div>
          <div onClick={() => handleLikes()}>Likes:{artInfo.numOfLikes}</div>
          <Comments artInfo={artInfo} />
        </>
      )}
    </div>
  );
};

const Img = styled.img`
  width: 250px;
  height: 250px;
`;

export default ArtDetails;
