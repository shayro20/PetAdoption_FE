import React, {useEffect, useState} from "react";
import {useUSerContext} from "../Libs/UserContext";
import {usePetContext} from "../Libs/PetContext";
import PetCard from "../Componenet/PetCard";
import "../Styling/PetCard.css"

function MyPetsPage() {
  const [show, setShow] = useState(true);
  const {currentUser} = useUSerContext();
  const {getMyPets, ownedPets, savedPets} = usePetContext();
  const handleGetPets = async () => {
    await getMyPets(currentUser.id);
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      handleGetPets();
      console.log("called");
    }
  }, [currentUser]);

  return (
    <div className="location">
      <h1
        style={{
          marginTop: "8%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        MyPetsPage
      </h1>
      <button className="btnn" onClick={() => setShow(!show)}>
        {show ? "SavedPets" : "OwnedPets"}
      </button>
      {show ? (
        <div>
          <h1>ownedPets</h1>
          <div style={{width: "100vw"}} className="main-container">
            <div className="grid-wrapper">
              {ownedPets.map((pet) => {
                return (
                  <div key={pet.petId}>
                    <PetCard pet={pet} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>savedPets</h1>
          <div style={{width: "100vw"}} className="main-container">
            <div className="grid-wrapper">
              {savedPets.map((pet) => {
                return (
                  <div key={pet.petId}>
                    <PetCard pet={pet} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MyPetsPage;
