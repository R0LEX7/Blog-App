import React from "react";
import Button from "./../Button/Button";
import { useDispatch } from "react-redux";
import authService from "../../../Appwrite/auth";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Log Out");
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((err) => console.log(err.message));
  };
  return <Button text="Log out" onClick={handleClick} />;
};

export default LogoutBtn;
