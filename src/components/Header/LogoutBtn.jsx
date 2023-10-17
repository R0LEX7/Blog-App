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

  const handleClick = async () => {
    console.log("Log Out");
    try {
      await authService.logout();
      toast.success("Logout successful");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Toaster />
      <Button text="Log out" onClick={handleClick} />
    </>
  );
};

export default LogoutBtn;
