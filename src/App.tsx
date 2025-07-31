import { Routes, Route } from "react-router-dom";
import {useState} from 'react';
import React from "react";
import Nav from './components/Nav';
import Hero from './components/Hero'
import Stats from './components/stats'
import Featured from './components/Featured'; 
import Legacy from './components/Legacy';
import Footer from './components/Footer'
import Shows from './components/Shows'
import About from './components/about'
import Contact from './components/contactus';
import Sighnup from './components/SignUp';
import LogIn from './components/LogIn';
import Dashboard from "./components/Dashboard";
function App() {
  const [uid, setUid] = useState<string | null>(() => {
    return localStorage.getItem("uid");
  });
  const [active, setActive] = useState(() => {
      return localStorage.getItem("navActive") || "Home";
  });
  return (
    <>
      <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero setActive={setActive}/>
              <Stats />
              <Featured  setActive={setActive}/>
              <Legacy setActive={setActive}/>
              <Footer />
            </>
          }
        />
        <Route
          path="/shows"
          element={
            <>
              <Shows/>
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About/>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Contact/>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <LogIn setUid={setUid}/>
            </>
          }
          />
          <Route
          path="/signup"
          element={
            <>
              <Sighnup setUid={setUid}/>
            </>
          }
          />
          <Route
          path="/dashboard"
          element={
            <>
              <Dashboard uid={uid}/>
              <Footer />
            </>
          }
          />
      </Routes>
      
    </>
  );
}


export default App
