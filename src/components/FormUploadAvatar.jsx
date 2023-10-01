import React, { useState } from "react";
import Button from "./Button";

import { updateAvatar } from "../services/AuthService";

import { useAppContext } from "../context/AppContext";

function FormAvatarUpload({ onSubmit }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const { user, setUser } = useAppContext();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    let res = await updateAvatar({ avatar: avatarFile });
    console.log(res);
    if (res.status === "ok") {
      onSubmit(res);

      setUser({
        ...user,
        avatar: res.data,
      });
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {selectedImage && (
        <div className="my-3">
          <h5 className="text-md font-semibold mb-2">Vista previa:</h5>
          <img
            src={selectedImage}
            alt="Vista previa"
            className="max-w-full h-auto mx-auto max-h-60"
          />
        </div>
      )}

      <Button type="button" onClick={handleSubmit}>
        Guardar
      </Button>
    </>
  );
}

export default FormAvatarUpload;
