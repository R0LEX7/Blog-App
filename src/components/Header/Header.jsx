import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  console.log(open);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      path: "/signup",
      active: !authStatus,
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
  };

  const NavbarComp = ({ className }) => {
    return navItems.map((item) =>
      item.active ? (
        <li
          key={item.path}
          className={`cursor-pointer mx-10 text-lg ${className}`}
        >
          <Link to={item.path} onClick={handleOpen}>
            {item.name}
          </Link>
        </li>
      ) : null
    );
  };

  return (
    <div className="navbar bg-base-100 border-b border-blue-400">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleOpen}
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {open && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavbarComp className={`my-4`} />
            </ul>
          )}
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavbarComp />
        </ul>
      </div>
      <div className="navbar-end">
      {authStatus && (
          <LogoutBtn />
          )}
          </div>
    </div>
  );
};

export default Header;
