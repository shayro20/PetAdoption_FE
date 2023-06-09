import React from "react";
import {Navigate} from "react-router-dom";
import {useUSerContext} from "../Libs/UserContext";

function PrivateRoute({children}) {
  const {currentUser} = useUSerContext();
  if (currentUser?.isUser == true) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/"} />;
  }
}
export default PrivateRoute;
