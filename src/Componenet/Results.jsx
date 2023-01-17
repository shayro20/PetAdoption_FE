import React, {useEffect} from "react";
import {usePetContext} from "../Libs/PetContext";
import PetCard from "./PetCard";
import "../Styling/Grid.css";

function Result() {
  const {petDB} = usePetContext();
  return (
    <div className="main-container">
      <div className="grid-wrapper">
        {petDB.map((pet) => {
          return (
            <div key={pet.petId}>
              <PetCard pet={pet} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result;
