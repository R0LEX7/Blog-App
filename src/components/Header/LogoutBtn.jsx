import React from "react";
import Button from "./../Button/Button";
import { useDispatch } from "react-redux";
import authService from "../../../Appwrite/auth";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Log Out");
    authService
      .logout()
      .then(() => {
        toast.success("Logout successful")
        dispatch(logout());
        navigate("/login");
      })
      .catch((err) => toast.error(err));
  };
  return <>
  <Toaster/>
  <Button text="Log out" onClick={handleClick} />
  </>;
};

export default LogoutBtn;
