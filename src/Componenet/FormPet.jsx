import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {usePetContext} from "../Libs/PetContext";
import InputGroup from "react-bootstrap/InputGroup";
// const ket in petinfo
function PetForm() {
  const [petInfo, setPetInfo] = useState({
    type: "Dog",
    adoptionStatus: "Available",
  });

  const infoForm = (petInfo) => {
    const dataForm = new FormData();
    for (const key in petInfo) {
      dataForm.append(key, petInfo[key]);
    }
    setPetInfo({dataForm});
  };

  const handleChange = (e) => {
    setPetInfo({...petInfo, [e.target.name]: e.target});
  };
  const handleFile = (e) => {
    setPetInfo({...petInfo, [e.target.name]: e.target.files[0]});
  };
  const handleSwitch = ({target}) => {
    console.log(target.checked);
    setPetInfo({...petInfo, hypoallergenic: target.checked});
  };

  const handleSub = (e) => {
    e.preventDefault();
    infoForm();
    console.log(petInfo);
  };
  return (
    <div>
      <Form onSubmit={handleSub}>
        <Form.Label>Type</Form.Label>
        <Form.Select onChange={handleChange} name="type">
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </Form.Select>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Friend's name"
        />
        {/* <Form.Label>Status</Form.Label>
        <Form.Check
          className="mx-2"
          name="Adopted"
          value="Adopted"
          id="Adopted"
          label="Adopted"
        />
        <Form.Check
          className="mx-2"
          name="Fostered"
          value="Fostered"
          id="Fostered"
          label="Fostered"
        />
        <Form.Check
          className="mx-2"
          name="Available"
          value="Available"
          id="Available"
          label="Available"
        /> */}
        <Form.Label>Upload image</Form.Label>
        <Form.Control
          name="picture"
          onChange={handleFile}
          type="file"
          placeholder="Password"
          accept=".jpg,.jpeg,.jfif ,.pjpeg ,.pjp,.png,.svg"
        />
        <Form.Label>Height</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={handleChange}
            name="height"
            type="number"
            placeholder="insert height"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
        </InputGroup>
        <Form.Label>Weight</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={handleChange}
            name="weight"
            placeholder="insert Weight"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
        </InputGroup>
        <Form.Label>Color</Form.Label>
        <Form.Control type="text" placeholder="insert Color" />
        <Form.Label>Bio</Form.Label>
        <Form.Control
          resize="none"
          onChange={handleChange}
          name="bio"
          as="textarea"
          placeholder="Tell us about your friend"
          style={{height: "100px", resize: "none"}}
        />
        <Form.Group>
          <Form.Check
            onChange={handleSwitch}
            type="switch"
            id="custom-switch"
            label="Hypoallergenic?"
          />
        </Form.Group>
        <Form.Label>Dietary restrictions</Form.Label>
        <Form.Control
          name="diet"
          onChange={handleChange}
          type="text"
          placeholder="Please share"
        />
        <Form.Label>Breed</Form.Label>
        <Form.Control name="breed" onChange={handleChange} type="text" />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PetForm;
