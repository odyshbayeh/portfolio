import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import OdyImage from "../assets/OdyShbayeh.jpeg";
import { CiLinkedin } from "react-icons/ci";
import { BsGithub } from "react-icons/bs";

const Hero = () => {
  const splineViewerRef = useRef(null);
  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@splinetool/viewer").then(() => {
      if (!cancelled) setSplineReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!splineReady) return undefined;

    const host = splineViewerRef.current;
    if (!host) return undefined;

    const hideLogo = () => {
      const logo = host.shadowRoot?.getElementById("logo");
      if (!logo) return false;
      logo.style.display = "none";
      return true;
    };

    if (hideLogo()) return undefined;

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (hideLogo() || attempts > 160) {
        window.clearInterval(intervalId);
      }
    }, 125);

    return () => window.clearInterval(intervalId);
  }, [splineReady]);

  return (
    <section className="hero-section relative w-full h-screen min-h-[100svh] mx-auto overflow-hidden">
      <div className="hero-spline" aria-hidden="true">
        {splineReady ? (
          <spline-viewer
            ref={splineViewerRef}
            className="hero-spline-viewer"
            url="https://prod.spline.design/URgoojG4g3ItzDOk/scene.splinecode"
            events="none"
          ></spline-viewer>
        ) : null}
      </div>

      <div
        className={`hero-content absolute inset-x-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Left vertical line */}
        <div className="hero-line flex flex-col justify-center items-center mt-10">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="hero-line-stem w-1 violet-gradient" />
        </div>

        {/* Right side: Text + Image + Links */}
        <div className="flex flex-col">
          {/* Hero Text */}
          <div>
            <h1 className={`${styles.heroHeadText} hero-title text-white`}>
              Hi, I&apos;m{" "}
              <span className="text-[#915eff]">Eng-Ody Shbayeh</span>
            </h1>
            <p
              className={`${styles.heroSubText} hero-subtitle mt-2 text-white-100`}
            >
              I am a Computer Engineer Graduate{" "}
              <br className="sm:block hidden" /> from Birzeit University
            </p>
          </div>

          <div className="hero-socials mt-6 w-[150px] h-[38px] flex flex-wrap items-center justify-center bg-tertiary gap-8 p-[12px] rounded-xl">
            <a
              className="scale-[2]"
              href="https://www.linkedin.com/in/ody-shbayeh-080833311/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textShadow: "0 0 8px rgba(145,94,255,0.8)" }}
            >
              <CiLinkedin />
            </a>
            <a
              className="scale-[2]"
              href="https://github.com/odyshbayeh"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textShadow: "0 0 8px rgba(145,94,255,0.8)" }}
            >
              <BsGithub />
            </a>
          </div>

          {/* Image under text */}
          <div className="mt-8 flex flex-col items-start">
            <div className="image-frame relative">
              <img
                src={OdyImage}
                alt="Ody Shbayeh"
                className="rounded-full image-inner"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[30px] h-[60px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
