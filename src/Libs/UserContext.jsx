import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUSerContext = () => useContext(UserContext);

function UserContextProvider({children}) {
  return <UserContext.Provider>{children}</UserContext.Provider>;
}
export default UserContextProvider;
