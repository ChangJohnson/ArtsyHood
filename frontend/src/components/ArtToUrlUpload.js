import React, { useContext, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { GlobalContext } from './GlobalContext';
const { v4: uuidv4 } = require('uuid');
// require('dotenv').config();

const ArtToUrlUpload = () => {
  const { idToTrackArtWorks } = useContext(GlobalContext);
  const cloudName = process.env.REACT_APP_CLOUDINARY;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESSET;

  const showWidget = () => {
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
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
                  sub: idToTrackArtWorks.data,
                },
              }),
              headers: { 'Content-Type': 'application/json' },
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
    <div>
      <button id='upload_widget' class='cloudinary-button' onClick={showWidget}>
        Upload files
      </button>
    </div>
  );
};

export default ArtToUrlUpload;
