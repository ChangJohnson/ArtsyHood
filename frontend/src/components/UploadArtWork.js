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
  const { isAuthenticated, user } = useAuth0();

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
                  authorNickname: user.nickname,
                  authorPicture: user.picture,
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

  console.log('hello', user);
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
              ></TextArea>
            </DivTextArea>
            <Div2>
              <Div>select your style:</Div>
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

              <Button
                id='upload_widget'
                class='cloudinary-button'
                type='submit'
              >
                Upload
              </Button>
            </Div2>
          </form>
        </div>
      ) : (
        navigate('/please-signin')
      )}
    </Wrapper>
  );
};

const Div2 = styled.div`
  margin-left: 25px;
`;

const Div = styled.div`
  width: fit-content;
  margin-top: 25px;
`;

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
  cursor: pointer;
`;

const Button = styled.button`
  /* height: 25px;
  width: 55px;
  text-align: center;
  border: none;
  margin-left: 5px; */

  align-items: center;
  appearance: none;
  background-color: #12343b;

  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #2d545e 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fcfcfd;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 35px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 12px;
  width: 60px;

  margin-left: 25px;
`;

const TextArea = styled.textarea`
  /* border: none; */
  display: block;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  overflow-y: hidden;

  /* optional CSS */
  border: 1px solid #2d545e;
  outline: 0;
  background: white;
  border-radius: 20px;
  padding: 20px;
  font-weight: bold;
  font-size: 1.4em;
  color: #343434;
  min-width: 300px;
  min-height: 80px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  position: relative;
  background: #fff;
`;

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: var(--color-Sand-Tan);
`;

export default UploadArtWork;
