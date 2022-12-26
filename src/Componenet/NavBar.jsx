import React, {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import Login from "./SignInModal";
import Button from "react-bootstrap/Button";

function NavBar() {
  const [modalShow, setModalShow] = useState(false);
  const [changeForm, setChangeForm] = useState(false);

  const switchForm = (info) => {
    setChangeForm(info);
  };

  return (
    <div className="d-flex align-items-center flex-column flex-wrap">
      <Button type="button">change</Button>
      <div>
        <NavLink activeclassname="" to="/">
          Home
        </NavLink>{" "}
        <NavLink activeclassname="" to="/Search">
          Search
        </NavLink>{" "}
        <NavLink activeclassname="" to="/Profile">
          Profile Settings
        </NavLink>{" "}
        <NavLink activeclassname="" to="/MyPets">
          My Pets/Saved Pets
        </NavLink>{" "}
        <NavLink activeclassname="" to="/Dashboard">
          Dashboard
        </NavLink>{" "}
        <NavLink activeclassname="" to="/AddPet">
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
            onClick={() => {
              setModalShow(true);
            }}
          >
            Log in
          </Button>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
export default NavBar;
