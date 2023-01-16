import React from "react";
import {useUSerContext} from "../Libs/UserContext";

function HomePage() {
  const {currentUser} = useUSerContext();
  console.log(currentUser)
  return (
    <div>
      <h1>
        Hello {currentUser ? currentUser.firstName : "and welcome "} to{" "}
        <b>Home For Everyone</b>
      </h1>
      <p>
        Our purpose is to make sure you find your new best friend! feel free to
        browse our website and add to your family a new fluffy and cute member
      </p>
    </div>
  );
}
export default HomePage;
