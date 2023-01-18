import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import {useUSerContext} from "./UserContext";

export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

function PetContextProvider({children}) {
  const [petDB, setPetDB] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [petPageInfo, setPetPageInfo] = useState({});
  const [dashboardPets, setDashboardPets] = useState([]);
  const originUrl = "http://localhost:8080";
  const {currentUser, setCurrentUser} = useUSerContext();
  const [petStatus, setPetStatus] = useState("");

  // const fetchPets = async () => {
  //   try {
  //     const res = await axios.get(`${originUrl}/pets`);
  //     setPetDB(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const savePet = async (petId) => {
    console.log(petId);
    try {
      const res = await axios.post(
        `${originUrl}/pets/${petId}/save`,
        {},
        {withCredentials: true}
      );
    } catch (error) {
      console.log(error);
    }
  };
  const unSavePet = async (petId) => {
    console.log(petId);
    try {
      const res = await axios.delete(`${originUrl}/pets/${petId}/save`, {
        withCredentials: true,
      });
    } catch (error) {
      setCurrentUser(null);
      console.log(error);
    }
  };

  const adoptPet = async (petId, status) => {
    console.log(petId, status);
    try {
      const res = await axios.post(
        `${originUrl}/pets/${petId}/adopt`,
        {adoptionStatus: status},
        {
          withCredentials: true,
        }
      );
      if (res) {
        console.log("success");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log(error);
      setCurrentUser(null);
    }
  };

  const returnPet = async (petId) => {
    console.log(petId);
    try {
      const res = await axios.post(
        `${originUrl}/pets/${petId}/return`,
        {adoptionStatus: "Available"},
        {
          withCredentials: true,
        }
      );
      if (res) {
        console.log("Available");
      } else {
        console.log("failed");
      }
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const getPetbyId = async (petInfo) => {
    console.log(petInfo);
    try {
      const res = await axios.get(`${originUrl}/pets/${petInfo}`);
      setPetPageInfo(res.data[0]);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      setCurrentUser(null);
    }
  };
  const getMyPets = async (userId) => {
    console.log(userId);
    try {
      const res = await axios.get(`${originUrl}/pets/user/${userId}`, {
        withCredentials: true,
      });
      setOwnedPets(res.data.owned);
      setSavedPets(res.data.saved);
      return res.data.owned;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePet = async (petInfo, petId) => {
    console.log(petInfo);
    try {
      axios.put(`${originUrl}/pets/${petId}`, petInfo, {withCredentials: true});
    } catch (error) {
      console.log(error);
    }
  };

  const addPet = async (petInfo) => {
    console.log(petInfo);
    try {
      axios.post(`${originUrl}/pets`, petInfo, {withCredentials: true});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (searchParam) => {
    try {
      const res = await axios.get(`${originUrl}/pets`, {
        params: searchParam,
      });
      console.log(res.data);
      setPetDB(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(searchParam);
  };
  // --------add to handleaddpet------
  // const addPet = (newPet) => {
  //   const newPetsArray = [...petDB, newPet];
  //   setPetDB(newPetsArray);
  // };
  // -----------------------------------------
  // const deletePet = async (petId) => {
  //   // const res = await axios.delete(`${baseURL}/pets`);
  //   const newPetList = petDB.filter((pet) => pet.id !== petId);
  //   setPetDB(newPetList);
  // };

  // useEffect(() => {
  //   fetchPets();
  // }, []);

  return (
    <PetContext.Provider
      value={{
        addPet,
        updatePet,
        petDB,
        // deletePet,
        handleSearch,
        petPageInfo,
        setPetPageInfo,
        getPetbyId,
        adoptPet,
        returnPet,
        savePet,
        unSavePet,
        getMyPets,
        savedPets,
        ownedPets,
        dashboardPets,
        petStatus,
        setPetStatus,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
