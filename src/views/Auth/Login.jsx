import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import { Link, Navigate } from "react-router-dom";
import Button from "../../components/Button";

import { singIn } from "../../services/AuthService";

import { useAppContext } from "../../context/AppContext";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/user", { replace: true });
  }, [isLoggedIn]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await singIn({ email, password });

    if (res.status === "ok") {
      console.log(res);
      setUser(res.data);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-3">
            <TextInput
              label="Dirección de correo electrónico"
              value={email}
              id="login-email"
              name="login-email"
              onChange={handleEmailChange}
              placeholder="Ingresa tu correo electrónico"
            />

            <TextInput
              id="login-password"
              name="login-password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Aun no tengo una cuenta
              </Link>
            </div>
          </div>

          <div>
            <Button color={"indigo"} dark={false} type="submit">
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
