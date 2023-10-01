import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { changePassword } from "../services/AuthService";

function FormChangePassword({ onSubmit }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleOldPassChange = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    setNewPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await changePassword({ oldPass, newPass });
    onSubmit(res);
    console.log(res);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-3">
        <TextInput
          label="Contraseña actual"
          value={oldPass}
          id="update-oldPass"
          name="update-oldPass"
          onChange={handleOldPassChange}
          placeholder="Contraseña actual"
        />

        <TextInput
          label="Contraseña nueva"
          value={newPass}
          id="update-newPass"
          name="update-newPass"
          onChange={handleNewPassChange}
          placeholder="Contraseña nueva"
        />
      </div>
      <div>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}

export default FormChangePassword;
