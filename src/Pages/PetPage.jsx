import React, {useEffect, useState, use} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {usePetContext} from "../Libs/PetContext";
import {useUSerContext} from "../Libs/UserContext";

function PetPage() {
  const {getPetbyId, petPageInfo, adoptPet, returnPet, savePet, unSavePet} =
    usePetContext();
  const {petId} = useParams();
  const navigate = useNavigate();
  const {currentUser} = useUSerContext();

  useEffect(() => {
    console.log("Mounted", petId);

    getPetbyId(petId);
  }, []);
  console.log(petPageInfo[0]);
  const pet = petPageInfo[0];

  const handleStatus = (e) => {
    const status = e.target.value;
    console.log(petId);
    adoptPet(petId, status);
  };
  const handleReturn = () => {
    returnPet(petId);
  };

  const handleSavePet = () => {
    savePet(petId);
  };
  const handleUnSavePet = () => {
    unSavePet(petId);
  };

  return (
    <div>
      {pet?.name}
      {pet?.adoptionStatus}
      {pet?.bio}
      {pet?.breed}
      {pet?.color}
      {pet?.diet}
      {pet?.height}
      {pet?.hypoallergenic}
      {pet?.type}
      {pet?.weight}
      <div>
        {(pet?.adoptionStatus === "Adopted" ||
          pet?.adoptionStatus === "Fostered") &&
          pet?.ownerId === currentUser?.id && (
            <button onClick={handleReturn}>Return</button>
          )}
        {pet?.adoptionStatus === "Fostered" ? (
          <button value={"Adopted"} onClick={handleStatus}>
            Adopt
          </button>
        ) : pet?.adoptionStatus === "Available" ? (
          <>
            <button value={"Fostered"} onClick={handleStatus}>
              Foster
            </button>
            <button value={"Adopted"} onClick={handleStatus}>
              Adopt
            </button>
          </>
        ) : (
          ""
        )}

        <button onClick={handleSavePet}>Save</button>
        <button onClick={handleUnSavePet}>Unsave</button>
        <button
          hidden={currentUser ? !currentUser.isAdmin : true}
          onClick={() => navigate(`/EditPet/${petId}`)}
        >
          Edit
        </button>
      </div>
      <div>{pet?.ownerId===currentUser?.id}</div>
    </div>
  );
}
export default PetPage;
