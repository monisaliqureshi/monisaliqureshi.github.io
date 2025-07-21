import React, { useEffect, useState } from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard.js";
import { getDegrees } from "../../portfolio"; // updated import
import { Fade } from "react-reveal";

function Educations(props) {
  const theme = props.theme;
  const [degrees, setDegrees] = useState(null);

  useEffect(() => {
    getDegrees().then((res) => {
      setDegrees(res.degrees || []);
    });
  }, []);

  return (
    <div className="main" id="educations">
      <div className="educations-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="educations-header" style={{ color: theme.text }}>
            Degrees Received
          </h1>
        </Fade>
      </div>
      <div className="educations-body-div">
        {degrees ? (
          degrees.map((degree) => (
            <DegreeCard key={degree.title} degree={degree} theme={theme} />
          ))
        ) : (
          <p style={{ color: theme.text }}>Loading degrees...</p>
        )}
      </div>
    </div>
  );
}

export default Educations;
