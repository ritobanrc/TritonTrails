import React, { useState } from 'react';

const ImageUploadComponent = () => {
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ width: '100px' }} />
      )}
    </div>
  );
};

export default ImageUploadComponent;
