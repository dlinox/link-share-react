import React, { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";

import { useAppContext } from "../../context/AppContext";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal";
import FormRegisterLink from "../../components/FormRegisterLink";
import ItemLink from "../../components/ItemLink";

import { list } from "../../services/LinkService";
import FormAvatarUpload from "../../components/FormUploadAvatar";
import FormChangePassword from "../../components/FormChangePassword";

function Home() {
  const { user, setLinks, links } = useAppContext();

  const modalRef = useRef();

  const getLinks = async () => {
    let res = await list();
    setLinks(res.data.links);
  };

  const onSuccess = () => {
    modalRef.current.closeModal();
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 md:w-lg lg:max-w-5xl xl:max-w-5xl py-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-5">
          <div className="p-4 bg-gray-100 rounded-xl shadow-sm">
            <div className="relative w-40 h-40 mx-auto">
              <img
                key={user?.id}
                loading="lazy"
                src={
                  user?.avatar
                    ? `http://localhost:8000/${user.avatar}`
                    : "https://cdn.vectorstock.com/i/preview-1x/84/89/profile-picture-placeholder-vector-38978489.webp"
                }
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-2xl font-semibold"> {user?.username} </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="mt-4">
              <Modal
                title="Actualizar Avatar"
                textButton="Actualizar Avatar"
                ref={modalRef}
              >
                <FormAvatarUpload onSubmit={onSuccess} />
              </Modal>
            </div>

            <div className="mt-4">
              <Modal
                title="Cambiar contraseña"
                textButton="Cambiar contraseña"
                ref={modalRef}
              >
                <FormChangePassword onSubmit={onSuccess} />
              </Modal>
            </div>
          </div>
          <div className="  md:col-span-2">
            <div className=" mx-auto bg-indigo-50 rounded-xl  p-6">
              <div className="flex space-x-3">
                <div className="w-3/4">
                  <TextInput placeholder="Buscar" />
                </div>
                <div className="w-1/4">
                  <Modal
                    title="Registrar nuevo link"
                    textButton="Nuevo"
                    ref={modalRef}
                  >
                    <FormRegisterLink onSubmit={onSuccess} />
                  </Modal>
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-10">
              {links.map((item) => (
                <ItemLink key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
