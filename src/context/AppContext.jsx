import { createContext, useContext, useEffect, useState } from "react";

import { currentUser, singOut } from "../services/AuthService";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        let res = await currentUser();

        if (res.status === "error") {
          setIsLoggedIn(false);
          singOut();
          return;
        }

        setUser({ ...res.data });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        links,
        setLinks,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
