import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ExperienceAccordion from "../../containers/experienceAccordion/ExperienceAccordion.js";
import "./Experience.css";
import { getExperience } from "../../portfolio.js";
import { Fade } from "react-reveal";
import ExperienceImg from "./ExperienceImg";

function Experience(props) {
  const theme = props.theme;
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    getExperience().then(setExperience);
  }, []);

  if (!experience) {
    return (
      <div className="experience-main">
        <Header theme={theme} setTheme={props.setTheme} />
        <div className="basic-experience">
          <p style={{ color: theme.text, textAlign: "center" }}>
            Loading experience...
          </p>
        </div>
        <Footer theme={props.theme} onToggle={props.onToggle} />
      </div>
    );
  }

  return (
    <div className="experience-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-experience">
        <Fade bottom duration={2000} distance="40px">
          <div className="experience-heading-div">
            <div className="experience-heading-img-div">
              <ExperienceImg theme={theme} />
            </div>
            <div className="experience-heading-text-div">
              <h1
                className="experience-heading-text"
                style={{ color: theme.text }}
              >
                {experience.title}
              </h1>
              {experience.subtitle && (
                <h3
                  className="experience-heading-sub-text"
                  style={{ color: theme.text }}
                >
                  {experience.subtitle}
                </h3>
              )}
              {experience.description && (
                <p
                  className="experience-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {experience.description}
                </p>
              )}
            </div>
          </div>
        </Fade>
      </div>
      <ExperienceAccordion sections={experience.sections} theme={theme} />
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Experience;
