import React, { useEffect } from 'react';

const CloudinaryUpload = ({ onUpload }) => {
  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'mediaflows_6cabe3cc-ad4f-4b39-8254-edf5e8e4e6e9',
        uploadPreset: 'CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dqzffyx3w',
        sources: ['local', 'url', 'camera'],
        multiple: false
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          onUpload(result.info.secure_url);
        }
      }
    );

    document.getElementById('upload_widget').addEventListener('click', () => widget.open(), false);
  }, [onUpload]);

  return <button id="upload_widget" className="btn btn-primary">Subir imagen</button>;
};

export default CloudinaryUpload;
