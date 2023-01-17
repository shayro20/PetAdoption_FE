import React, {useState, useEffect} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {useUSerContext} from "../Libs/UserContext";
import Login from "./SignInModal";
import Button from "react-bootstrap/Button";
import "../Styling/NavBar.css";

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
      <div className="nav-bar"><img style={{width:"50px",height:"50px",borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5wniqsoUMtfu84ZFOitLUw_zuQTd2YPdUUbTUZ1ZXAaH73KrvXHyQ1xXd-7eCKrYiizw&usqp=CAU" alt="" />
        <div className="links-container">
          <NavLink className="nav-link" activeclassname="" to="/">
            Home
          </NavLink>{" "}
          <NavLink className="nav-link" activeclassname="" to="/Search">
            Search
          </NavLink>{" "}
          <NavLink
            className="nav-link"
            hidden={currentUser ? !currentUser.isUser : true}
            activeclassname=""
            to="/Profile"
          >
            Profile Settings
          </NavLink>{" "}
          <NavLink
            className="nav-link"
            hidden={currentUser ? !currentUser.isUser : true}
            activeclassname=""
            to="/MyPets"
          >
            My Pets/Saved Pets
          </NavLink>{" "}
          <NavLink
            className="nav-link"
            hidden={currentUser ? !currentUser.isAdmin : true}
            activeclassname=""
            to="/Dashboard"
          >
            Dashboard
          </NavLink>{" "}
          <NavLink
            className="nav-link"
            hidden={currentUser ? !currentUser.isAdmin : true}
            activeclassname=""
            to="/AddPet"
          >
            Add Pet
          </NavLink>{" "}
        </div>
        <div>
          <NavLink className="nav-link" activeclassname="/" to="">
            <Login
              changeForm={changeForm}
              switchForm={switchForm}
              show={modalShow}
              onHide={() => {
                setModalShow(false);
                setChangeForm(false);
              }}
            />
            <button className="buttonnn"
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
            </button>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default NavBar;
