import React from "react";
import {useNavigate} from "react-router-dom";
import {useUSerContext} from "../Libs//UserContext";
import "../Styling/PetCard.css";
import Card from "react-bootstrap/Card";

function PetCard({pet}) {
  // console.log(pet)
  const navigate = useNavigate();
  const {currentUser} = useUSerContext();

  return (
    <div>
      <Card className="card-pet" style={{width: "18rem", position: "unset"}}>
        <Card.Img
          variant="top"
          src={
            pet.picture ||
            "https://i.pinimg.com/originals/22/1c/20/221c2021c91d60b1eb13ea676460a92c.png"
          }
        />
        <div>{currentUser?.savedPets.includes(pet.petId) ? "saved" : ""}</div>
        <Card.Body style={{background: "#1DFEDE"}}>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>Stauts:{pet.adoptionStatus}</Card.Text>
          <button
            className="btnn"
            variant="primary"
            onClick={() => navigate(`/petPage/${pet.petId}`)}
          >
            See More
          </button>
        </Card.Body>
      </Card>
      {/* <div>{currentUser?.savedPets.includes(pet.petId) ? "saved" : ""}</div>
      <img style={{width:"50%"}} src={pet.picture}></img>
      <div>{pet.name}</div>
      <div>{pet.adoptionStatus}</div>
      <button onClick={() => navigate(`/petPage/${pet.petId}`)}>
        see more
      </button> */}
    </div>
  );
}

export default PetCard;
