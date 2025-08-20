import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Footer,
} from "./components";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until the page DOM is ready
    const timer = setTimeout(() => setLoading(false), 500); // adjust delay if needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* Loader overlay */}
      {loading && <div className="loader">Loading...</div>}

      {/* Main page content */}
      <div
        className="relative z-0 bg-primary"
        style={{ display: loading ? "none" : "block" }}
      >
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />{" "}
          {/* Hero mounts immediately, Spline inside Hero loads separately */}
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
