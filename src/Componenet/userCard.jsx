import React, {useState} from "react";
import {usePetContext} from "../Libs/PetContext";
import PetCard from "./PetCard";

function UserCard({user}) {
  const {getMyPets, ownedPets, dashboardPets} = usePetContext();
  const [show, setShow] = useState(false);

  const handleOwnedPets = async () => {
    if (show === true) {
      getMyPets(user.userId, true);
      setShow(!show);
    } else {
    }
    setShow(!show);
  };
  console.log(user.userId);
  console.log(dashboardPets);
  return (
    <div>
      userinfo{user.userId}
      <div>
        <button onClick={handleOwnedPets}>ownedpets</button>
        <div hidden={show}>
          {user.userId === ownedPets[0]?.ownerId &&
            dashboardPets.map((pet) => {
              return (
                <div key={pet.petId}>
                  <PetCard pet={pet} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
