import React from "react";
import {useNavigate} from "react-router-dom";
import {useUSerContext} from "../Libs//UserContext";

function PetCard({pet}) {
  // console.log(pet)
  const navigate = useNavigate();
  const {currentUser} = useUSerContext();

  return (
    <div>
      <div>{currentUser?.savedPets.includes(pet.petId) ? "saved" : ""}</div>
      <img style={{width:"50%"}} src={pet.picture}></img>
      <div>{pet.name}</div>
      <div>{pet.adoptionStatus}</div>
      <button onClick={() => navigate(`/petPage/${pet.petId}`)}>
        see more
      </button>
    </div>
  );
}

export default PetCard;
