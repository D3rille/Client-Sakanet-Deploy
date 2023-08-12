import React, { useState } from 'react';
import { imageDelete } from '../util/imageUtils';

const CloudinaryDelete = () => {
  const [imageUrl, setImageUrl] = useState('');

    const handleImageDelete= async () => {
    try {
      const deleteImage = await imageDelete(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Cloudinary Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={handleImageDelete}>Delete</button>
      </div>
    </div>
  );
};

export default CloudinaryDelete;
