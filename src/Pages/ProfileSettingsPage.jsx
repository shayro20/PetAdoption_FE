import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useUSerContext} from "../Libs/UserContext";

function Profile() {
  const [update, setUpdate] = useState({});
  const {handleGetUser, currentUser, handleUpdateUser} = useUSerContext();
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setUpdate({...update, [e.target.name]: e.target.value});
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (update.newPassword === update.rePassword) {
      console.log(update)
      handleUpdateUser(update, currentUser.id);
    } else {
      console.log("not matching passwords");
    }
  };

  const getUser = async () => {
    try {
      const user = await handleGetUser(currentUser.id);
      if (user) {
        setUserInfo(user);
        console.log(user);
      }
      console.log("mounted", currentUser.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      getUser();
      console.log("called for useredit");
    }
  }, [currentUser]);
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
              defaultValue={userInfo.email}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="old Password"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              name="newPassword"
              onChange={handleChange}
              type="password"
              placeholder="new Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRePassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              name="rePassword"
              onChange={handleChange}
              type="password"
              placeholder="New Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="FirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              onChange={handleChange}
              type="text"
              placeholder="Update First Name"
              defaultValue={userInfo.firstName}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="LastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={handleChange}
              type="text"
              placeholder="Update Last Name"
              defaultValue={userInfo.lastName}
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
              defaultValue={userInfo.phone}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              resize="none"
              name="bio"
              onChange={handleChange}
              as="textarea"
              placeholder="Leave a comment here"
              style={{height: "100px", resize: "none"}}
              // defaultValue={userInfo.bio}---add bio column
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Profile;
