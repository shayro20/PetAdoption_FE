import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FormUser({changeform}) {
  const [signUp, setSignUp] = useState({});
  const [login, setLogin] = useState({});

  const handleChangeSign = (e) => {
    setSignUp({...signUp, [e.target.name]: e.target.value});
  };

  const handleChangeLog = (e) => {
    setLogin({...login, [e.target.name]: e.target.value});
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("signup", signUp);
    setSignUp({});
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login", login);
    setLogin({});
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
            onChange={handleChangeSign}
            // required={changeform}
            type="password"
            placeholder="Please Repeat Password"
          />
        </Form.Group>
        <Form.Group hidden={!changeform} className="mb-3" controlId="firstName">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            name="firstName"
            onChange={handleChangeSign}
            // required={changeform}
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group hidden={!changeform} className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            onChange={handleChangeSign}
            // required={changeform}
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group hidden={!changeform} className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            onChange={handleChangeSign}
            // required={changeform}
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            maxLength={12}
            type="tel"
            placeholder="10 digit number"
          />
        </Form.Group>

        <Button
          onClick={(e) => e.stopPropagation()}
          variant="primary"
          type="submit"
        >
          {changeform ? "Sign Up" : "Log in"}
        </Button>
      </Form>
    </div>
  );
}

export default FormUser;
