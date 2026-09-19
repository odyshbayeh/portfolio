import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";
import { FiChevronRight, FiMaximize2 } from "react-icons/fi";

import { styles } from "../styles";
import { certificates } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const CAROUSEL_INTERVAL_MS = 5000;

const pdfSource = (file, options) => `${file}#${options}`;

const CertificatePreview = ({ document, isModal = false }) => {
  if (document.type === "pdf") {
    const thumb = document.thumbnail;
    if (!isModal && thumb) {
      return (
        <img
          src={thumb}
          alt={document.title}
          className="certificate-card-image"
        />
      );
    }

    const pdfParams = "page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH";
    const iframe = (
      <iframe
        className={isModal ? "certificate-modal-pdf" : "certificate-card-pdf"}
        src={pdfSource(document.file, pdfParams)}
        title={document.title}
        loading={isModal ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
      />
    );

    if (isModal) {
      return iframe;
    }

    return <div className="certificate-card-pdf-clip">{iframe}</div>;
  }

  return (
    <img
      src={document.file}
      alt={document.title}
      className={isModal ? "certificate-modal-image" : "certificate-card-image"}
    />
  );
};

const CertificateGroupCard = ({ group, index, onExpand, isViewerOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const documents = group.documents;
  const hasMultiple = documents.length > 1;
  const activeDocument = documents[activeIndex];

  useEffect(() => {
    if (!hasMultiple || isPaused || isViewerOpen) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % documents.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [documents.length, hasMultiple, isPaused, isViewerOpen]);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.16, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="certificate-card-shell"
      >
        <div
          className="certificate-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="certificate-card-preview">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${group.id}-${activeDocument.title}`}
                className="certificate-card-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <CertificatePreview document={activeDocument} />
              </motion.div>
            </AnimatePresence>

            <div className="certificate-card-action-layer">
              <button
                type="button"
                className="certificate-card-open black-gradient"
                onClick={() => onExpand(group, activeIndex)}
                aria-label={`Open ${group.issuer} certificates`}
              >
                <FiMaximize2 />
              </button>
            </div>

            {hasMultiple && (
              <div
                className="certificate-card-dots"
                role="tablist"
                aria-label={`${group.issuer} documents`}
              >
                {documents.map((document, documentIndex) => (
                  <button
                    key={document.title}
                    type="button"
                    role="tab"
                    aria-selected={documentIndex === activeIndex}
                    className={`certificate-card-dot${
                      documentIndex === activeIndex
                        ? " certificate-card-dot-active"
                        : ""
                    }`}
                    onClick={() => setActiveIndex(documentIndex)}
                    aria-label={`Show ${document.title}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="certificate-card-copy">
            <span>{group.issuer}</span>
            <h3>{activeDocument.title}</h3>
            {hasMultiple && (
              <p className="certificate-card-count">
                {activeIndex + 1} / {documents.length}
              </p>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Certificates = () => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(0);

  const activeDocument = activeGroup?.documents[viewerIndex] ?? null;
  const hasMultipleDocuments = (activeGroup?.documents.length ?? 0) > 1;

  useEffect(() => {
    if (!activeGroup) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setActiveGroup(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeGroup]);

  const openGroup = (group, startIndex = 0) => {
    setActiveGroup(group);
    setViewerIndex(startIndex);
  };

  const showNextDocument = () => {
    if (!activeGroup) {
      return;
    }

    setViewerIndex((current) => (current + 1) % activeGroup.documents.length);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Credentials</p>
        <h2 className={styles.sectionHeadText}>Certificates</h2>
      </motion.div>

      <div className="certificates-grid">
        {certificates.map((group, index) => (
          <CertificateGroupCard
            key={group.id}
            group={group}
            index={index}
            onExpand={openGroup}
            isViewerOpen={Boolean(activeGroup)}
          />
        ))}
      </div>

      {activeGroup &&
        activeDocument &&
        createPortal(
          <div
            className="certificate-viewer-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={activeGroup.issuer}
            onClick={() => setActiveGroup(null)}
          >
            <div
              className="certificate-viewer"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="certificate-viewer-header">
                <div>
                  <span>{activeGroup.issuer}</span>
                  <h3>{activeDocument.title}</h3>
                  {hasMultipleDocuments && (
                    <p className="certificate-viewer-count">
                      {viewerIndex + 1} / {activeGroup.documents.length}
                    </p>
                  )}
                </div>
                <div className="certificate-viewer-actions">
                  {hasMultipleDocuments && (
                    <button
                      type="button"
                      className="certificate-viewer-next"
                      onClick={showNextDocument}
                      aria-label="Show next certificate"
                    >
                      Next
                      <FiChevronRight />
                    </button>
                  )}
                  <a
                    className="certificate-viewer-download"
                    href={activeDocument.file}
                    download
                    aria-label={`Download ${activeDocument.title}`}
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    className="certificate-viewer-close"
                    onClick={() => setActiveGroup(null)}
                    aria-label="Close certificate viewer"
                  >
                    x
                  </button>
                </div>
              </div>
              <div className="certificate-viewer-canvas">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeGroup.id}-${activeDocument.title}`}
                    className="certificate-viewer-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CertificatePreview document={activeDocument} isModal />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default SectionWrapper(Certificates, "certificates");
