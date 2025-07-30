import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Hero from './components/Hero'
import Stats from './components/stats'
import Featured from './components/Featured'; 
import Legacy from './components/Legacy';
import Footer from './components/Footer'
import Shows from './components/Shows'
import About from './components/about'
import Contact from './components/contactus';
import SignIn from './components/SignUp';
import LogIn from './components/LogIn';
function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Stats />
              <Featured />
              <Legacy />
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
              <LogIn />
            </>
          }
          />
          <Route
          path="/signin"
          element={
            <>
              <SignIn />
            </>
          }
          />
      </Routes>
      
    </>
  );
}


export default App
