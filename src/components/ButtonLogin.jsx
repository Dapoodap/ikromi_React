import React from "react";
import { Button } from "react-bootstrap";
import "../styles/button.css";
import { useNavigate } from "react-router-dom/dist";

function ButtonLogin() {
  const nav = useNavigate()
  return <Button onClick={() => {
    nav(`/login`);
  }} className="button-login">Login</Button>;
}

export default ButtonLogin;
