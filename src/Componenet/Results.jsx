import React from "react";
import {usePetContext} from "../Libs/PetContext";

function Result() {
  const {petDB} = usePetContext();
  return (
    <div>
      {petDB.map((item) => {
        return (
          <div key={item.petId}>
            <div>{item.name}</div>
            <div>{item.adoptionStatus}</div>
            <div>{item.picture}</div>
            <button>see more</button>
          </div>
        );
      })}
    </div>
  );
}

export default Result;
