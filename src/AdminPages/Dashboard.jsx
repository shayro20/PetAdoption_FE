import React, {useEffect} from "react";
import {useUSerContext} from "../Libs/UserContext";
import UserCard from "../Componenet/userCard";
import {usePetContext} from "../Libs/PetContext";
function Dashboard() {
  const {handleGetAllUser, userList} = useUSerContext();
  // const {getMyPets, ownedPets} = usePetContext();
  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <div style={{paddingTop: "20%"}}>
      Dashboard
      <div>
        {userList.map((user) => {
          return (
            <div key={user.userId}>
              <UserCard user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Dashboard;
