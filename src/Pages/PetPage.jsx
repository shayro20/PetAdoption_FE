import React, {useEffect, useState, use} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {usePetContext} from "../Libs/PetContext";
import {useUSerContext} from "../Libs/UserContext";
import Card from "react-bootstrap/Card";
import "../Styling/PetCard.css";

function PetPage() {
  const {petId} = useParams();
  useEffect(() => {
    console.log("Mounted", petId);

    getPetbyId(petId);
  }, []);
  const {getPetbyId, petPageInfo, adoptPet, returnPet, savePet, unSavePet} =
    usePetContext();
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useUSerContext();
  const pet = petPageInfo[0];
  const [status, setStatus] = useState(pet?.adoptionStatus);

  console.log(petPageInfo[0]);

  const handleStatus = (e) => {
    const status = e.target.value;
    console.log(petId);
    // adoptPet(petId, status);
    setStatus(status)
  };
  const handleReturn = () => {
    // returnPet(petId);
    setStatus("Available");
  };

  const handleSavePet = () => {
    savePet(petId);
    setCurrentUser({
      ...currentUser,
      savedPets: [...currentUser.savedPets, Number(petId)],
    });
  };
  const handleUnSavePet = () => {
    unSavePet(petId);
    console.log(petId);
    const res = currentUser.savedPets.filter((id) => id != petId);
    console.log(res);
    setCurrentUser({...currentUser, savedPets: res});
  };

  return (
    <div className="location pet-page-container">
      <div className="pet-page-container">
        <img
          style={{width: "30%", borderRadius: "50%"}}
          src={
            pet?.picture ||
            "https://i.pinimg.com/originals/22/1c/20/221c2021c91d60b1eb13ea676460a92c.png"
          }
          alt=""
        />
        <h1>{pet?.name}</h1>
      </div>
      <div className="info-setter">
        <Card className="pet-info" border="light" style={{width: "18rem"}}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Info</Card.Title>
            </Card.Header>

            <Card.Text>Type:{pet?.type}</Card.Text>
            <Card.Text>Status:{pet?.adoptionStatus}</Card.Text>
            <Card.Text>Breed:{pet?.breed}</Card.Text>
            <Card.Text>Color:{pet?.color}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="pet-info" border="light" style={{width: "18rem"}}>
          <Card.Body>
            <Card.Title>About {pet?.name}</Card.Title>
            <Card.Text>{pet?.bio}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="pet-info" border="light" style={{width: "18rem"}}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Health</Card.Title>
            </Card.Header>
            <Card.Text>
              Diet:{pet?.diet === "" ? "no specific dietaries" : pet?.diet}
            </Card.Text>
            <Card.Text>Height:{pet?.height}</Card.Text>
            <Card.Text>Weight:{pet?.weight}</Card.Text>
            <Card.Text>
              Hypoallergenic:{" "}
              {pet?.hypoallergenic === 0 ? (
                <img
                  width={"10%"}
                  src="https://toppng.com/uploads/preview/red-cross-mark-download-png-red-cross-check-mark-11562934675swbmqcbecx.png"
                  alt=""
                />
              ) : (
                <img
                  width={"10%"}
                  src="https://image.similarpng.com/very-thumbnail/2021/12/Green-check-mark-on-transparent-background-PNG.png"
                  alt=""
                />
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

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
        {currentUser?.savedPets.includes(pet?.petId) ? (
          <button onClick={handleUnSavePet}>Unsave</button>
        ) : (
          <button onClick={handleSavePet}>Save</button>
        )}
        {/* <button onClick={handleSavePet}>Save</button>
        <button onClick={handleUnSavePet}>Unsave</button> */}
        <button
          hidden={currentUser ? !currentUser.isAdmin : true}
          onClick={() => navigate(`/EditPet/${petId}`)}
        >
          Edit
        </button>
      </div>
      <div>{pet?.ownerId === currentUser?.id}</div>
    </div>
  );
}
export default PetPage;
