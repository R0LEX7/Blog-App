import React from "react";
import Button from "./../Button/Button";
import { useDispatch } from "react-redux";
import authService from "../../../Appwrite/auth";
import { logout } from "../../redux/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("Log Out");
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => console.log(err.message));
  };
  return <Button text="Log out" onClick={handleClick} />;
};

export default LogoutBtn;
