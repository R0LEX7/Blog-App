import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { FaMastodon } from "react-icons/fa";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

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

  const NavbarComp = ({ className, isAnimation }) => {
    return navItems.map((item) =>
      item.active ? (
        <motion.li
          key={item.path}
          className={`cursor-pointer mx-10 text-lg ${className}`}
          initial={isAnimation ? { scale: 0, y: -1000 } : { scale: 0 }}
          animate={isAnimation ? { scale: 1, y: 0 } : { scale: 1 }}
          transition={
            isAnimation ? { type: "tween", duration: 2 } : { type: "tween" , delay:0.2 }
          }
        >
          <Link to={item.path} onClick={handleOpen}>
            {item.name}
          </Link>
        </motion.li>
      ) : null
    );
  };

  return (
    <motion.div
      className="navbar bg-base-100 border-b border-blue-400"
      animate={{ scale: 1, y: 0 }}
      initial={{ scale: 0, y: -1000 }}
      transition={{ type: "tween", duration: 1 }}
    >
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
            <motion.ul
              tabIndex={0}
              className="menu menu-sm  border-gray-400 border dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              animate={{ scale: 1, z:1}}
              initial={{ scale: 0, z:0}}
              transition={{ type: "tween" }}
            >
              <NavbarComp className={`my-4`} isAnimation={false} />
            </motion.ul>
          )}
        </div>

        <motion.a
          className="btn btn-ghost normal-case text-xl"
          animate={{ scale: 1, y: 0 }}
          initial={{ scale: 0, y: -1000 }}
          transition={{ type: "tween", duration: 2 }}
        >
          <FaMastodon />
          Medium
        </motion.a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavbarComp isAnimation={true} />
        </ul>
      </div>
      <motion.div
        className="navbar-end"
        animate={{ scale: 1, y: 0 }}
        initial={{ scale: 0, y: -1000 }}
        transition={{ type: "tween", duration: 2 }}
      >
        {authStatus && <LogoutBtn />}
      </motion.div>
    </motion.div>
  );
};

export default Header;
