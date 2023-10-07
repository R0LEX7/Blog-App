// import  from 'react'
import { useEffect, useState } from "react";
import authService from "../Appwrite/auth";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/authSlice";
import { Header, Footer, Button, Input, Select , PostCard } from "./components/index";
import { Outlet } from "react-router-dom";


const options = ["react" , "vue" , "angular"]

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("hyy " + err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(loading);

  return (
    !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-primary'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : null
  
  );
}

export default App;
