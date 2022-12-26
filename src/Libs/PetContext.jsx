import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

export const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

function PetContextProvider({children}) {
  const [petDB, setPetDB] = useState([]);

  const originUrl = "http://localhost:8080";

  // const fetchPets = async () => {
  //   try {
  //     const res = await axios.get(`${originUrl}/pets`);
  //     setPetDB(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSearch = async (searchParam) => {
    try {
      const res = await axios.get(`${originUrl}/pets`,{params: searchParam});
      setPetDB(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(searchParam);
  };

  const addPet = (newPet) => {
    const newPetsArray = [...petDB, newPet];
    setPetDB(newPetsArray);
  };

  const deletePet = async (petId) => {
    // const res = await axios.delete(`${baseURL}/pets`);
    const newPetList = petDB.filter((pet) => pet.id !== petId);
    setPetDB(newPetList);
  };

  // useEffect(() => {
  //   fetchPets();
  // }, []);

  return (
    <PetContext.Provider value={{petDB, addPet, deletePet, handleSearch}}>
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
