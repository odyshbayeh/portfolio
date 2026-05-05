import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { FiMaximize2 } from "react-icons/fi";

import { styles } from "../styles";
import { certificates } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const pdfSource = (file, options) => `${file}#${options}`;

const CertificatePreview = ({ certificate, isModal = false }) => {
  if (certificate.type === "pdf") {
    const thumb = certificate.thumbnail;
    if (!isModal && thumb) {
      return (
        <img
          src={thumb}
          alt={certificate.title}
          className="certificate-card-image"
        />
      );
    }

    const pdfParams = "page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH";
    const iframe = (
      <iframe
        className={isModal ? "certificate-modal-pdf" : "certificate-card-pdf"}
        src={pdfSource(certificate.file, pdfParams)}
        title={certificate.title}
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
      src={certificate.file}
      alt={certificate.title}
      className={isModal ? "certificate-modal-image" : "certificate-card-image"}
    />
  );
};

const Certificates = () => {
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    if (!activeCertificate) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setActiveCertificate(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeCertificate]);

  const openCertificate = (certificate) => {
    setActiveCertificate(certificate);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Credentials</p>
        <h2 className={styles.sectionHeadText}>Certificates</h2>
      </motion.div>

      <div className="certificates-grid">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.title}
            variants={fadeIn("up", "spring", index * 0.16, 0.75)}
          >
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="certificate-card-shell"
            >
              <div className="certificate-card">
                <div className="certificate-card-preview">
                  <CertificatePreview certificate={certificate} />
                  <div className="certificate-card-action-layer">
                    <button
                      type="button"
                      className="certificate-card-open black-gradient"
                      onClick={() => openCertificate(certificate)}
                      aria-label={`Open ${certificate.title}`}
                    >
                      <FiMaximize2 />
                    </button>
                  </div>
                </div>
                <div className="certificate-card-copy">
                  <span>{certificate.issuer}</span>
                  <h3>{certificate.title}</h3>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {activeCertificate &&
        createPortal(
          <div
            className="certificate-viewer-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={activeCertificate.title}
            onClick={() => setActiveCertificate(null)}
          >
            <div
              className="certificate-viewer"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="certificate-viewer-header">
                <div>
                  <span>{activeCertificate.issuer}</span>
                  <h3>{activeCertificate.title}</h3>
                </div>
                <div className="certificate-viewer-actions">
                  <a
                    className="certificate-viewer-download"
                    href={activeCertificate.file}
                    download
                    aria-label={`Download ${activeCertificate.title}`}
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    className="certificate-viewer-close"
                    onClick={() => setActiveCertificate(null)}
                    aria-label="Close certificate viewer"
                  >
                    x
                  </button>
                </div>
              </div>
              <div className="certificate-viewer-canvas">
                <CertificatePreview certificate={activeCertificate} isModal />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default SectionWrapper(Certificates, "certificates");
