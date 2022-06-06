import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ArtByStyle = () => {
  const { artStyle } = useParams();

  const [arts, setArts] = useState();

  useEffect(() => {
    fetch(`/api/style/${artStyle}`)
      .then((res) => res.json())
      .then((data) => {
        setArts(data.data);
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, []);

  return (
    <Wrapper>
      <div>
        {arts.map((art) => {
          return <></>;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-width: 1024px;
  height: calc(100vh - 110px);
  background-color: var(--color-Sand-Tan);
`;
export default ArtByStyle;
