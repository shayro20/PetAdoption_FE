import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useUSerContext} from "../Libs/UserContext";

function FormUser({changeform, onHide}) {
  const {handleSignUpUser, handleLoginUser} = useUSerContext();
  const [error, setError] = useState("");

  const [passMatch, setPassMatch] = useState("");
  const [signUp, setSignUp] = useState({});
  const [login, setLogin] = useState({});

  const handleMatchPass = (e) => {
    setPassMatch(e.target.value);
  };

  const handleChangeSign = (e) => {
    setSignUp({...signUp, [e.target.name]: e.target.value});
  };

  const handleChangeLog = (e) => {
    setLogin({...login, [e.target.name]: e.target.value});
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (signUp.password === passMatch) {
      handleSignUpUser(signUp);
      console.log("signup", signUp);
    } else {
      return "passwords does not match";
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("")
    const logIN = await handleLoginUser(login);
    if (logIN === true) {
      onHide();
    } else {
      setError(logIN)
      console.log(logIN);
    }
  };
  return (
    <div>
      <Form onSubmit={changeform ? handleSignUp : handleLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={changeform ? handleChangeSign : handleChangeLog}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={changeform ? handleChangeSign : handleChangeLog}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group
          hidden={!changeform}
          className="mb-3"
          controlId="repassword"
        >
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            name="repassword"
            onChange={handleMatchPass}
            required={changeform}
            type="password"
            placeholder="Please Repeat Password"
          />
        </Form.Group>
        <Form.Group hidden={!changeform} className="mb-3" controlId="firstName">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            name="firstName"
            onChange={handleChangeSign}
            required={changeform}
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group hidden={!changeform} className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            onChange={handleChangeSign}
            required={changeform}
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group hidden={!changeform} className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            onChange={handleChangeSign}
            required={changeform}
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            maxLength={12}
            type="tel"
            placeholder="10 digit number"
          />
        </Form.Group>
        <div>
          <Button
            onClick={(e) => e.stopPropagation()}
            variant="primary"
            type="submit"
          >
            {changeform ? "Sign Up" : "Log in"}
          </Button>
          <div>{error}</div>
        </div>
      </Form>
    </div>
  );
}

export default FormUser;
