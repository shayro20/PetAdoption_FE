import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Profile() {
  const [update, setUpdate] = useState({});

  const handleChange = (e) => {
    setUpdate({...update, [e.target.name]: e.target.value});
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(update);
  };
  return (
    <div>
      <h1>ProfilePage</h1>
      <div>
        {" "}
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="FirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstname"
              onChange={handleChange}
              type="text"
              placeholder="Update First Name"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="LastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastname"
              onChange={handleChange}
              type="text"
              placeholder="Update Last Name"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              onChange={handleChange}
              type="phone"
              placeholder="Phone Number"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <FloatingLabel controlId="floatingTextarea2" label="Bio">
            <Form.Control
              resize="none"
              name="bio"
              onChange={handleChange}
              as="textarea"
              placeholder="Leave a comment here"
              style={{height: "100px", resize: "none"}}
            />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Profile;
