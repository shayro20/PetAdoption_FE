import React, {useEffect} from "react";
import {usePetContext} from "../Libs/PetContext";
import PetCard from "./PetCard";
function Result() {
  const {petDB} = usePetContext();
  return (
    <div>
      {petDB.map((pet) => {
        return (
          <div key={pet.petId}>
            <PetCard pet={pet} />
          </div>
        );
      })}
    </div>
  );
}

export default Result;
