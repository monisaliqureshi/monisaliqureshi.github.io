import React, { useEffect, useState } from "react";
import "./Certifications.css";
import { Fade } from "react-reveal";
import { getCertifications } from "../../portfolio"; // updated import
import CertificationCard from "../../components/certificationCard/CertificationCard";

function Certifications(props) {
  const theme = props.theme;
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    getCertifications().then((res) => {
      setCerts(res.certifications || []);
    });
  }, []);

  return (
    <div className="main" id="certs">
      <div className="certs-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="certs-header" style={{ color: theme.text }}>
            Certifications
          </h1>
        </Fade>
      </div>
      <div className="certs-body-div">
        {certs.length > 0 ? (
          certs.map((cert) => (
            <CertificationCard
              key={cert.title}
              certificate={cert}
              theme={theme}
            />
          ))
        ) : (
          <p style={{ color: theme.text }}>Loading certifications...</p>
        )}
      </div>
    </div>
  );
}

export default Certifications;
