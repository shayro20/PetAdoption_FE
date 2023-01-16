import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {usePetContext} from "../Libs/PetContext";
import InputGroup from "react-bootstrap/InputGroup";
import {useParams} from "react-router-dom";

function PetForm() {
  const {petId} = useParams();

  const {addPet, updatePet, getPetbyId} = usePetContext();
  const [petInfo, setPetInfo] = useState({
    type: "Dog",
    adoptionStatus: "Available",
    bio: "",
    breed: "",
    diet: "",
    height: 1,
    weight: 1,
    name: "",
    picture: "",
    color: "",
    hypoallergenic: false,
  });
  const [updatePetInfo, setUpdatePetInfo] = useState();
  const [petStat, setPetStat] = useState({
    type: "Dog",
    adoptionStatus: "Available",
    bio: "",
    breed: "",
    diet: "",
    height: 1,
    weight: 1,
    name: "",
    color: "",
    hypoallergenic: false,
  });

  useEffect(() => {
    if (petId) {
      getPet();
    }
  }, [petId]);

  const getPet = async () => {
    const res = await getPetbyId(petId);
    if (res) {
      const pet = res.data[0];
      console.log(pet);
      setPetStat({...pet});
      setUpdatePetInfo({...pet});
    } else {
      console.log("no such pet");
    }
  };

  const infoForm = () => {
    const dataForm = new FormData();
    console.log("Update", updatePet);
    if (petId) {
      const {created_at, ownerId, petId, adoptionStatus, ...pet} =
        updatePetInfo;
        console.log(pet)
      for (const key in pet) {
        console.log(pet[key])
        dataForm.append(key, pet[key]);
      }

      updatePet(dataForm, petId);
    } else {
      for (const key in petInfo) {
        dataForm.append(key, petInfo[key]);
      }
      addPet(dataForm);
    }
  };

  const handleChange = (e) => {
    if (petId) {
      setUpdatePetInfo({...updatePetInfo, [e.target.name]: e.target.value});
    } else {
      setPetInfo({...petInfo, [e.target.name]: e.target.value});
    }
  };
  const handleFile = (e) => {
    if (petId) {
      setUpdatePetInfo({...updatePetInfo, [e.target.name]: e.target.files[0]});
    } else {
      setPetInfo({...petInfo, [e.target.name]: e.target.files[0]});
    }
  };
  const handleSwitch = ({target}) => {
    if (petId) {
      setUpdatePetInfo({...updatePetInfo, hypoallergenic: target.checked});
    } else {
      setPetInfo({...petInfo, hypoallergenic: target.checked});
    }
  };

  const handleSub = (e) => {
    e.preventDefault();
    infoForm();
  };
  return (
    <div>
      <Form onSubmit={handleSub}>
        <Form.Label>Type</Form.Label>
        <Form.Select
          required={petId ? false : true}
          onChange={handleChange}
          name="type"
          value={petId ? petStat?.type : petInfo.type}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </Form.Select>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required={petId ? false : true}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Friend's name"
          value={petId ? updatePetInfo?.name : petInfo.name}
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
            required={petId ? false : true}
            onChange={handleChange}
            name="height"
            type="number"
            placeholder="insert height"
            aria-describedby="basic-addon2"
            value={petId ? updatePetInfo?.height : petInfo.height}
          />
          <InputGroup.Text id="basic-addon2">Cm</InputGroup.Text>
        </InputGroup>
        <Form.Label>Weight</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            required={petId ? false : true}
            onChange={handleChange}
            name="weight"
            placeholder="insert Weight"
            aria-describedby="basic-addon2"
            value={petId ? updatePetInfo?.weight : petInfo.weight}
          />
          <InputGroup.Text id="basic-addon2">Kg</InputGroup.Text>
        </InputGroup>
        <Form.Label>Color</Form.Label>
        <Form.Control
          required={petId ? false : true}
          type="text"
          placeholder="insert Color"
          value={petId ? updatePetInfo?.color : petInfo.color}
        />
        <Form.Label>Bio</Form.Label>
        <Form.Control
          required={petId ? false : true}
          resize="none"
          onChange={handleChange}
          name="bio"
          as="textarea"
          placeholder="Tell us about your friend"
          style={{height: "100px", resize: "none"}}
          value={petId ? updatePetInfo?.bio : petInfo.bio}
        />
        <Form.Group>
          <Form.Check
            onChange={handleSwitch}
            type="switch"
            id="custom-switch"
            label="Hypoallergenic?"
            checked={
              petId ? updatePetInfo?.hypoallergenic : petInfo.hypoallergenic
            }
          />
        </Form.Group>
        <Form.Label>Dietary restrictions</Form.Label>
        <Form.Control
          name="diet"
          onChange={handleChange}
          type="text"
          placeholder="Please share"
          value={petId ? updatePetInfo?.diet : petInfo.diet}
        />
        <Form.Label>Breed</Form.Label>
        <Form.Control
          required={petId ? false : true}
          name="breed"
          placeholder="Insert Here"
          onChange={handleChange}
          type="text"
          value={petId ? updatePetInfo?.breed : petInfo.breed}
        />

        <Button variant="primary" type="submit">
          {petId ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default PetForm;
