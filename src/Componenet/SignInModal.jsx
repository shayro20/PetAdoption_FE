import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormUser from "./FormUser";
import React from "react";

function Login({onHide, show, switchForm, changeForm}) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {changeForm ? "Sign up Form" : "Login form"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormUser changeform={changeForm} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <button
          onClick={() => switchForm(!changeForm)}
          style={{border: "none", backgroundColor: "white"}}
        >
          {changeForm ? "Already have a user??" : "Dont have an account?"}
        </button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Login;
