import React, {useState} from "react";
import NavBar from "./Componenet/NavBar";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import Profile from "./Pages/ProfileSettingsPage";
import MyPetsPage from "./Pages/MyPetsPage";
import Dashboard from "./AdminPages/Dashboard";
import AddPet from "./AdminPages/AddPet";
import UserContext from "./Libs/UserContext";
import PetContextProvider from "./Libs/PetContext";
import "./Styling/SearchPage.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PetPage from "./Pages/PetPage";

function App() {
  return (
    <div>
      <PetContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<HomePage />} />
              <Route path="/Search" element={<SearchPage />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/MyPets" element={<MyPetsPage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/AddPet" element={<AddPet />}></Route>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PetContextProvider>
    </div>
  );
}

export default App;
