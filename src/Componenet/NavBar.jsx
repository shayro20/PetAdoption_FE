import React, {useState, useEffect} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {useUSerContext} from "../Libs/UserContext";
import Login from "./SignInModal";
import Button from "react-bootstrap/Button";

function NavBar() {
  const [modalShow, setModalShow] = useState(false);
  const [changeForm, setChangeForm] = useState(false);
  const {currentUser, handleSignOut} = useUSerContext();
  const switchForm = (info) => {
    setChangeForm(info);
  };
  console.log(currentUser ? "true" : "false");
  const signoutUser = () => {
    try {
      handleSignOut();
      console.log("signout");
    } catch (error) {}
  };

  return (
    <div className="d-flex align-items-center flex-column flex-wrap">
      <div>
        <NavLink activeclassname="" to="/">
          Home
        </NavLink>{" "}
        <NavLink activeclassname="" to="/Search">
          Search
        </NavLink>{" "}
        <NavLink
          hidden={currentUser ? !currentUser.isUser : true}
          activeclassname=""
          to="/Profile"
        >
          Profile Settings
        </NavLink>{" "}
        <NavLink
          hidden={currentUser ? !currentUser.isUser : true}
          activeclassname=""
          to="/MyPets"
        >
          My Pets/Saved Pets
        </NavLink>{" "}
        <NavLink
          hidden={currentUser ? !currentUser.isAdmin : true}
          activeclassname=""
          to="/Dashboard"
        >
          Dashboard
        </NavLink>{" "}
        <NavLink
          hidden={currentUser ? !currentUser.isAdmin : true}
          activeclassname=""
          to="/AddPet"
        >
          Add Pet
        </NavLink>{" "}
        <NavLink activeclassname="/" to="">
          <Login
            changeForm={changeForm}
            switchForm={switchForm}
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setChangeForm(false);
            }}
          />
          <Button
            variant="primary"
            onClick={
              currentUser
                ? signoutUser
                : () => {
                    setModalShow(true);
                  }
            }
          >
            {currentUser ? "Sign Out" : "Log in"}
          </Button>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
export default NavBar;
