import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components";
import Hero from "./components/Hero.jsx";
import SEO from "./components/SEO.jsx";
import { getRouterBasename } from "./seo/siteMeta.js";

const About = lazy(() => import("./components/About.jsx"));
const Experience = lazy(() => import("./components/Experience.jsx"));
const Tech = lazy(() => import("./components/Tech.jsx"));
const Certificates = lazy(() => import("./components/Certificates.jsx"));
const Works = lazy(() => import("./components/Works.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

const sectionFallback = null;

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoading(false));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <BrowserRouter basename={getRouterBasename()}>
      <SEO />
      {loading && <div className="loader">Loading...</div>}

      <div
        className="relative z-0 bg-primary"
        style={{ display: loading ? "none" : "block" }}
      >
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <Suspense fallback={sectionFallback}>
          <About />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Experience />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Tech />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Certificates />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Works />
        </Suspense>
        <div className="relative z-0">
          <Suspense fallback={sectionFallback}>
            <Contact />
          </Suspense>
          <Suspense fallback={sectionFallback}>
            <StarsCanvas />
          </Suspense>
        </div>
        <Suspense fallback={sectionFallback}>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
