import React, {useEffect, useState, use} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {usePetContext} from "../Libs/PetContext";
import {useUSerContext} from "../Libs/UserContext";
import Card from "react-bootstrap/Card";
import "../Styling/PetCard.css";
import "../Styling/Grid.css";

function PetPage() {
  const {petId} = useParams();
  useEffect(() => {
    console.log("Mounted", petId);

    getPetbyId(petId);
  }, []);
  const {
    getPetbyId,
    petPageInfo,
    setPetPageInfo,
    adoptPet,
    returnPet,
    savePet,
    unSavePet,
  } = usePetContext();
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useUSerContext();
  const pet = petPageInfo;
  console.log(petPageInfo);

  const handleStatus = (e) => {
    const status = e.target.value;
    console.log(petId);
    adoptPet(petId, status);
    setPetPageInfo({
      ...petPageInfo,
      ownerId: currentUser?.id,
      adoptionStatus: e.target.value,
    });
  };
  const handleReturn = () => {
    returnPet(petId);
    setPetPageInfo({
      ...petPageInfo,
      ownerId: null,
      adoptionStatus: "Available",
    });
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
            petPageInfo?.picture ||
            "https://i.pinimg.com/originals/22/1c/20/221c2021c91d60b1eb13ea676460a92c.png"
          }
          alt=""
        />
        <h1>{petPageInfo?.name}</h1>
      </div>
      <div className="info-setter">
        <Card className="pet-info" border="light" style={{width: "18rem"}}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Info</Card.Title>
            </Card.Header>

            <Card.Text>Type:{petPageInfo?.type}</Card.Text>
            <Card.Text>Status:{petPageInfo?.adoptionStatus}</Card.Text>
            <Card.Text>Breed:{petPageInfo?.breed}</Card.Text>
            <Card.Text>Color:{petPageInfo?.color}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="pet-info" border="light" style={{width: "18rem"}}>
          <Card.Body>
            <Card.Title>About {petPageInfo?.name}</Card.Title>
            <Card.Text>{petPageInfo?.bio}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="pet-info" border="light" style={{width: "18rem"}}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Health</Card.Title>
            </Card.Header>
            <Card.Text>
              Diet:
              {petPageInfo?.diet === ""
                ? "no specific dietaries"
                : petPageInfo?.diet}
            </Card.Text>
            <Card.Text>Height:{petPageInfo?.height}</Card.Text>
            <Card.Text>Weight:{petPageInfo?.weight}</Card.Text>
            <Card.Text>
              Hypoallergenic:{" "}
              {petPageInfo?.hypoallergenic === 0 ? (
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
        {currentUser &&
          (petPageInfo?.adoptionStatus === "Adopted" ||
            petPageInfo?.adoptionStatus === "Fostered") &&
          petPageInfo?.ownerId === currentUser?.id && (
            <button className="btnn" onClick={handleReturn}>
              Return
            </button>
          )}
        {currentUser &&
          (petPageInfo?.adoptionStatus === "Fostered" ? (
            <button className="btnn" value={"Adopted"} onClick={handleStatus}>
              Adopt
            </button>
          ) : petPageInfo?.adoptionStatus === "Available" ? (
            <>
              <button
                className="btnn"
                value={"Fostered"}
                onClick={handleStatus}
              >
                Foster
              </button>
              <button className="btnn" value={"Adopted"} onClick={handleStatus}>
                Adopt
              </button>
            </>
          ) : (
            ""
          ))}
        {currentUser &&
          (currentUser?.savedPets.includes(petPageInfo?.petId) ? (
            <button className="btnn" onClick={handleUnSavePet}>
              Unsave
            </button>
          ) : (
            <button className="btnn" onClick={handleSavePet}>
              Save
            </button>
          ))}
        {/* <button onClick={handleSavePet}>Save</button>
        <button onClick={handleUnSavePet}>Unsave</button> */}
        {currentUser?.isAdmin == true && (
          <button
            className="btnn"
            hidden={currentUser ? !currentUser.isAdmin : true}
            onClick={() => navigate(`/EditPet/${petId}`)}
          >
            Edit
          </button>
        )}
      </div>
      <div>{petPageInfo?.ownerId === currentUser?.id}</div>
    </div>
  );
}
export {PetPage};
