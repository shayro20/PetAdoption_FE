import React from "react";
import {Navigate} from "react-router-dom";
import {useUSerContext} from "../Libs/UserContext";
function PrivateRouteAdmin({children}) {
  const {currentUser} = useUSerContext();
  if (currentUser?.isAdmin == true) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/"} />;
  }
}
export default PrivateRouteAdmin;
