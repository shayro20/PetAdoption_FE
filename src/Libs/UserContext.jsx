import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUSerContext = () => useContext(UserContext);

function UserContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState("");

  const originUrl = "http://localhost:8080";

  const handleSignUpUser = async (signUpUser) => {
    try {
      const res = await axios.post(`${originUrl}/signup`, signUpUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginUser = async (loggedInUser) => {
    try {
      const res = await axios.post(`${originUrl}/login`, loggedInUser, {
        withCredentials: true,
      });
      if (res) {
        console.log(res);
        console.log("success")
        
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <UserContext.Provider value={{handleSignUpUser, handleLoginUser}}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
