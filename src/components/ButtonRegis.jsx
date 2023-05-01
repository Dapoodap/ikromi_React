import React from "react";
import { Button } from "react-bootstrap";
import "../styles/button.css";
import { useNavigate } from "react-router-dom/dist";

function ButtonRegis() {
  const nav = useNavigate()
  return <Button onClick={() => {
    nav(`/register`);
  }} className="button-regis">Register</Button>;
}

export default ButtonRegis;
