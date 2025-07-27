import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Hero from './components/Hero'
import Stats from './components/stats'
import Featured from './components/Featured'; 
import Legacy from './components/Legacy';
import Footer from './components/Footer'
import Shows from './components/Shows'
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
            </>
          }
        />
        <Route
          path="/shows"
          element={
            <>
              <Shows/>
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}


export default App
