import React, {useEffect} from "react";
import {useUSerContext} from "../Libs/UserContext";
import UserCard from "../Componenet/userCard";
import {usePetContext} from "../Libs/PetContext";
import "../Styling/Dashboard.css";

function Dashboard() {
  const {handleGetAllUser, userList} = useUSerContext();
  const {getMyPets} = usePetContext();
  // const {getMyPets, ownedPets} = usePetContext();
  useEffect(() => {
    handleGetAllUser();
  }, []);

  const handleClick = async (id) => {
    console.log(`Button clicked for item ${id}`);

    const res = await getMyPets(id);
    if (res) {
      console.log("pets", res);
      return {pets: res, id: id};
    }
  };

  return (
    <div className="dash-container">
      <h1>Dashboard</h1>
      <div>
        {userList.map((user) => {
          return (
            <div key={user.userId}>
              <UserCard user={user} handleClick={handleClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Dashboard;
