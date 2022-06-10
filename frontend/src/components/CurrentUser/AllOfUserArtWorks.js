import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

const AllOfUserArtWorks = () => {
  useEffect(() => {
    // fetch(`/api/style/${artStyle}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setArts(data.data);
    //   })
    //   .catch((err) => {
    //     console.log('fetch data error: ' + err);
    //   });
  }, []);

  return (
    <Wrapper>
      <div>AllOfUserArtWorks</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80vh;
`;

export default AllOfUserArtWorks;
