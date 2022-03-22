import React from "react";
import NavBar from "../../components/NavBar";
import LoginComponent from "../../components/Login";

const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      <div style={{ padding: 25 + "px"}}>
        <LoginComponent></LoginComponent>
      </div>
    </>
  );
};

export default Home;
