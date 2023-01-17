import React, {useEffect} from "react";
import {useUSerContext} from "../Libs/UserContext";
import {usePetContext} from "../Libs/PetContext";
import PetCard from "../Componenet/PetCard";

function MyPetsPage() {
  const {currentUser} = useUSerContext();
  const {getMyPets, ownedPets, savedPets} = usePetContext();
  const handleGetPets = async () => {
   
      await getMyPets(currentUser.id);
    }
  
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      handleGetPets();
      console.log("called")
    } 
  }, [currentUser]);
  
  return (
    <div className="location">
      MyPetsPage
      <div>
        <h1>ownedPets</h1>
        {ownedPets.map((pet) => {
          return (
            <div key={pet.petId}>
              <PetCard pet={pet} />
            </div>
          );
        })}
      </div>
      <div>
        <h1>savedPets</h1>
        {savedPets.map((pet) => {
          return (
            <div key={pet.petId}>
              <PetCard pet={pet} />
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}
export default MyPetsPage;
