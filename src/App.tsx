import { Routes, Route } from "react-router-dom";
import {useState} from 'react';
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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cancel from './components/cancel';
import Scucess from './components/success';
const stripePromise = loadStripe('pk_test_51Rr7G0PVYDJualBmFDvbfJdxsjFcVX8zL0v1HpQ83gSvgWaVhqFMR5FxuMyDZ2jDFEuPXqFfcUIxKhBPzgqmwfOq00rUHauLBq');
  

function App() {
  const [uid, setUid] = useState<string | null>(() => {
    return localStorage.getItem("uid");
  });
  const [active, setActive] = useState(() => {
      return localStorage.getItem("navActive") || "Home";
  });
  return (
    <>
    <Elements stripe={stripePromise}>
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
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
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
              <Shows uid={uid}/>
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
              <About/>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
              <Contact/>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
              <LogIn setUid={setUid}/>
            </>
          }
          />
          <Route
          path="/signup"
          element={
            <>
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
              <Sighnup setUid={setUid}/>
            </>
          }
          />
          <Route
          path="/dashboard"
          element={
            <>
              <Nav uid={uid} setUid={setUid} active={active} setActive={setActive}/>
              <Dashboard uid={uid}/>
              <Footer />
            </>
          }
          />
        <Route
          path="/cancel"
          element={
            <>
              <Cancel />
            </>
          } />
          <Route
          path="/success"
          element={
            <>
              <Scucess />
            </>
          } />
      </Routes>
      </Elements>
    </>
  );
}


export default App
