import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUSerContext = () => useContext(UserContext);

function UserContextProvider({children}) {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const originUrl = "http://localhost:8080";

  async function check() {
    try {
      const res = await axios.get(`${originUrl}/verify`, {
        withCredentials: true,
      });
      console.log(res.data);
      setCurrentUser(res.data);
    } catch (error) {
      setCurrentUser(null);
      console.log(error);
    }
  }
  useEffect(() => {
    check();
  }, []);

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
        console.log(res.data);
        console.log("success");
        setCurrentUser(res.data);
        return true;
      }
    } catch (error) {
      setCurrentUser(null);
      return {failed: false}, error.response.data;
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await axios.get(`${originUrl}/login/signout`, {
        withCredentials: true,
      });
      console.log("done");
      setCurrentUser(null);
    } catch (error) {
      setCurrentUser(null);
      console.log(error);
    }
  };
  const handleGetAllUser = async () => {
    try {
      const res = await axios.get(`${originUrl}/user`, {withCredentials: true});
      console.log(res);
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetUser = async (userId) => {
    try {
      const res = await axios.get(`${originUrl}/user/${userId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateUser = async (userInfo, userId) => {
    try {
      const res = await axios.put(`${originUrl}/user/${userId}`, userInfo, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleSignUpUser,
        handleLoginUser,
        currentUser,
        handleSignOut,
        handleGetAllUser,
        userList,
        handleGetUser,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
