import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { GlobalContext } from './GlobalStylesAndContext/GlobalContext';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from './AskToSignin';
import { useNavigate } from 'react-router-dom';

const UploadArtWork = () => {
  const navigate = useNavigate();
  const { v4: uuidv4 } = require('uuid');
  const { isAuthenticated } = useAuth0();

  const { idToTrackArtWorks } = useContext(GlobalContext);
  const cloudName = process.env.REACT_APP_CLOUDINARY;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESSET;
  const [artSelectStyle, setArtSelectStyle] = useState();
  const [artDescription, setArtDescription] = useState();

  const showWidget = (e) => {
    e.preventDefault();
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ['local', 'google_drive', 'instagram'],
        multiple: false,
        showAdvancedOptions: true,
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info.secure_url);
          try {
            fetch('/api/upload', {
              method: 'POST',
              body: JSON.stringify({
                data: {
                  _id: uuidv4(),
                  url: result.info.secure_url,
                  sub: idToTrackArtWorks,
                  name: artDescription,
                  style: artSelectStyle,
                  numOfLikes: [],
                  comments: [],
                },
              }),
              headers: { 'Content-Type': 'application/json' },
            })
              .then((response) => {
                response.json();
              })
              .then((data) => {
                if (data.status === 200) {
                  setArtDescription('');
                  console.log(data.message);
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
      }
    );

    myWidget.open();
  };

  return (
    <Wrapper>
      {isAuthenticated ? (
        <div>
          <form
            onSubmit={(e) => {
              showWidget(e);
            }}
          >
            <div>Describe and Upload your arts here:</div>
            <DivTextArea>
              <TextArea
                value={artDescription}
                onChange={(e) => {
                  setArtDescription(e.target.value);
                }}
                placeholder='describe your art'
                name='yourArtStory'
                rows='5'
                cols='33'
              ></TextArea>
            </DivTextArea>
            <div>select your style:</div>
            {/* <DivDropDownAndButton> */}
            <Select onChange={(e) => setArtSelectStyle(e.target.value)}>
              <option value='Abstract'>Abstract</option>
              <option value='Portrait'>Portrait</option>
              <option value='Modern'>Modern</option>
              <option value='Impressionist'> Impressionist</option>
              <option value='Pop-Art'>Pop-Art</option>
              <option value='Cubism'>Cubism</option>
              <option value='Surrealism'>Surrealism</option>
              <option value='Contemporary'>Contemporary</option>
              <option value='Fantasy'>Fantasy</option>
              <option value='Graffiti'>Graffiti</option>
              <option value='Pen-and-Ink'>Pen-and-Ink</option>
              <option value='Urban-Art'>Urban-Art</option>
              <option value='Landscape'>Landscape</option>
            </Select>

            <Button id='upload_widget' class='cloudinary-button' type='submit'>
              Upload
            </Button>
            {/* </DivDropDownAndButton> */}
          </form>
        </div>
      ) : (
        navigate('/please-signin')
      )}
    </Wrapper>
  );
};

const DivTextArea = styled.div`
  margin-top: 10px;
`;

const DivDropDownAndButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
`;

const Select = styled.select`
  width: 120px;
`;

const Button = styled.button`
  height: 25px;
  width: 55px;
  text-align: center;
  border: none;
  margin-left: 5px;
`;

const TextArea = styled.textarea`
  resize: none;
`;

const Wrapper = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default UploadArtWork;
