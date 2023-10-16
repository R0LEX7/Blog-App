import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMastodon } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../redux/authSlice";
import authService from "../../../Appwrite/auth";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createAccount = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      toast.success("Account created successfully");
      navigate("/");
      if (userData) {
        const userDetails = await authService.getCurrentUser();

        if (userDetails) {
          dispatch(authLogin(userDetails));
        }
      }
    } catch (error) {
      setError(error);
      toast.error(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden px-4">
      <Toaster />
      <div className="w-full p-6 m-auto bg-primary grid  border-gray-400 place-content-center border rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-secondary flex justify-center gap-1 items-center">
          <FaMastodon /> Medium
        </h1>
        <p className=" text-base text-center mt-2 ">
          {" "}
          Already have an Account ?
          <Link
            to="/login"
            className="font-medium  text-secondary , transition-all duration-200 hover:underline"
          >
            {" "}
            Log in
          </Link>
        </p>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}

        <form className="space-y-4 mt-8" onSubmit={handleSubmit(createAccount)}>
          <Input
            placeholder="Username"
            type="text"
            label="Username :"
            {...register("name", {
              required: true,
            })}
          ></Input>
          <Input
            placeholder="Email Address"
            type="email"
            label="Email :"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) ||
                    "Please enter a valid email address";
                },
              },
            })}
          ></Input>

          <Input
            type="password"
            placeholder="Enter Password"
            label="Password :"
            {...register("password", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                    value
                  ) || "Please enter a Strong Password";
                },
              },
            })}
          ></Input>

          <div>
            <Button type="submit" text="Create Account" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
