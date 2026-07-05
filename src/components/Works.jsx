import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Tilt } from "react-tilt";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const AUTO_SCROLL_MS = 2000;

const CarouselDots = ({ count, currentIndex, variant = "tertiary" }) => (
  <div className="flex gap-1.5 pointer-events-none">
    {Array.from({ length: count }, (_, dotIndex) => (
      <span
        key={dotIndex}
        className={`h-1.5 rounded-full transition-all duration-200 ${
          dotIndex === currentIndex
            ? variant === "light"
              ? "w-4 bg-white"
              : "w-4 bg-tertiary"
            : variant === "light"
              ? "w-1.5 bg-white/40"
              : "w-1.5 bg-tertiary/50"
        }`}
      />
    ))}
  </div>
);

const ProjectImage = ({ images, name, onOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(interval);
  }, [hasMultipleImages, isPaused, images.length]);

  const openViewer = () => {
    onOpen(currentIndex);
  };

  return (
    <div
      className="relative w-full h-[180px] overflow-hidden rounded-2xl cursor-pointer group"
      onClick={openViewer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openViewer();
        }
      }}
      aria-label={`Open ${name} screenshots${hasMultipleImages ? `, showing ${currentIndex + 1} of ${images.length}` : ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover object-top rounded-2xl select-none bg-[#050816]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-0 flex items-start justify-start m-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center">
          <FiMaximize2 className="text-white text-[18px]" />
        </div>
      </div>

      {hasMultipleImages && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <CarouselDots count={images.length} currentIndex={currentIndex} />
        </div>
      )}
    </div>
  );
};

const ProjectViewer = ({ name, images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!hasMultipleImages) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, images.length, onClose]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (!hasMultipleImages || touchStartX.current === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (deltaX > 50) {
      goToPrevious();
    } else if (deltaX < -50) {
      goToNext();
    }
  };

  return createPortal(
    <div
      className="certificate-viewer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} screenshots`}
      onClick={onClose}
    >
      <div
        className="certificate-viewer project-viewer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="certificate-viewer-header">
          <div>
            <span>Project Screenshots</span>
            <h3>{name}</h3>
          </div>
          <div className="certificate-viewer-actions">
            {hasMultipleImages && (
              <span className="project-viewer-counter">
                {currentIndex + 1} / {images.length}
              </span>
            )}
            <button
              type="button"
              className="certificate-viewer-close"
              onClick={onClose}
              aria-label="Close project viewer"
            >
              x
            </button>
          </div>
        </div>

        <div
          className="certificate-viewer-canvas project-viewer-canvas"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${name} screenshot ${currentIndex + 1}`}
              className="project-modal-image"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              draggable={false}
            />
          </AnimatePresence>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="project-viewer-nav project-viewer-nav-prev"
                onClick={goToPrevious}
                aria-label="Previous screenshot"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="project-viewer-nav project-viewer-nav-next"
                onClick={goToNext}
                aria-label="Next screenshot"
              >
                <FiChevronRight />
              </button>
              <div className="project-viewer-dots">
                <CarouselDots
                  count={images.length}
                  currentIndex={currentIndex}
                  variant="light"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  images,
  source_code_Link,
  onOpenViewer,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full"
      >
        <div className="relative w-full h-[180px]">
          <ProjectImage
            images={images}
            name={name}
            onOpen={(startIndex) => onOpenViewer({ name, images, startIndex })}
          />

          <div className="absolute inset-0 flex justify-end m-1 card-img_hover pointer-events-none">
            <div
              onClick={(event) => {
                event.stopPropagation();
                window.open(source_code_Link, "_blank");
              }}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] text-justify">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 ">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color} `}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My Work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-2 text-secondary text-[16px] max-w-5xl leading-[30px] text-justify"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described . It
          reflects my ability to solve complex problems, work with different
          technologies,and manage projects effectively.
        </motion.p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onOpenViewer={setActiveProject}
          />
        ))}
      </div>

      {activeProject && (
        <ProjectViewer
          name={activeProject.name}
          images={activeProject.images}
          initialIndex={activeProject.startIndex}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
};

export default SectionWrapper(Works, "Projects");
