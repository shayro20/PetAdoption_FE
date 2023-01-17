import React, {useState} from "react";
import NavBar from "./Componenet/NavBar";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import Profile from "./Pages/ProfileSettingsPage";
import MyPetsPage from "./Pages/MyPetsPage";
import Dashboard from "./AdminPages/Dashboard";
import AddPet from "./AdminPages/AddPet";
import UserContextProvider from "./Libs/UserContext";
import PetContextProvider from "./Libs/PetContext";
import "./Styling/SearchPage.css";
import "./Styling/Global.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PetPage from "./Pages/PetPage";
import PrivateRoute from "./Componenet/PrivateRoute";
import PrivateRouteAdmin from "./Componenet/PrivateRouteAdmin";

function App() {
  return (
    <div>
      <UserContextProvider>
        <PetContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavBar />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/Search" element={<SearchPage />} />
                <Route
                  path="/Profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/PetPage/:petId" element={<PetPage />} />

                <Route
                  path="/MyPets"
                  element={
                    <PrivateRoute>
                      <MyPetsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Dashboard"
                  element={
                    <PrivateRouteAdmin>
                      <Dashboard />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="/AddPet"
                  element={
                    <PrivateRouteAdmin>
                      <AddPet />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="/EditPet/:petId"
                  element={
                    <PrivateRouteAdmin>
                      <AddPet />
                    </PrivateRouteAdmin>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </PetContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
