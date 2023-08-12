import React, { useState } from 'react';
import { uploadImage } from '../util/imageUtils'; 



const TestUpload = () => {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async () => {
    try {
      const uploadedImageUrl = await uploadImage(image);
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleImageUpload}>Upload</button>
      </div>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default TestUpload;
