import React, {useState} from "react";
import {usePetContext} from "../Libs/PetContext";
import PetCard from "./PetCard";

function UserCard({user, handleClick}) {
  const {ownedPets} = usePetContext();
  const [show, setShow] = useState(true);
  const [pets, setPets] = useState([]);
  console.log(pets);
  console.log(user);

  const handleUse = async () => {
    const res = await handleClick(user.userId);
    if (res) {
      console.log("child result", res);
      if (show) {
        setPets(res.pets);
        setShow(false);
      } else {
        setPets([]);
        setShow(true);
      }
    }
  };
  return (
    // <table>
    //   <tr>
    //     <th>{user.userId}</th>
    //     <th>{user.email}</th>
    //     <th>{user.firstName+""+user.lastName}</th>
    //     <th>{user.phone}</th>
    //     <th></th>
    //     <th></th>
    //   </tr>
    // </table>
    <div>
      userinfo{user.userId}
      <div>
        <p>{user.userId}</p>
        <button onClick={() => handleUse(user.userId)}>Click me</button>
        <div>
          {pets.map((pet) => {
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
