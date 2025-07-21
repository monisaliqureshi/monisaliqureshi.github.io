import React, { useEffect, useState } from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { getSkills } from "../../portfolio"; // API function
import { Fade } from "react-reveal";
import FullStackImg from "./FullStackImg";
import CloudInfraImg from "./CloudInfraImg";
// import DesignImg from "./DesignImg";

function GetSkillSvg(props) {
  if (props.fileName === "FullStackImg")
    return <FullStackImg theme={props.theme} />;
  else if (props.fileName === "CloudInfraImg")
    return <CloudInfraImg theme={props.theme} />;
  // return <DesignImg theme={props.theme} />;
}

function SkillSection(props) {
  const theme = props.theme;
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then((res) => setSkills(res.data || []));
  }, []);

  if (!skills.length) {
    return (
      <p style={{ color: theme.text, textAlign: "center" }}>
        Loading skills...
      </p>
    );
  }

  return (
    <div>
      {skills.map((skill, index) => {
        const isEven = index % 2 === 0;

        return (
          <div className="skills-main-div" key={skill.title}>
            {isEven && (
              <Fade left duration={2000}>
                <div className="skills-image-div">
                  <GetSkillSvg fileName={skill.fileName} theme={theme} />
                </div>
              </Fade>
            )}

            <div className="skills-text-div">
              <Fade direction={isEven ? "right" : "left"} duration={1000}>
                <h1 className="skills-heading" style={{ color: theme.text }}>
                  {skill.title}
                </h1>
              </Fade>
              <Fade direction={isEven ? "right" : "left"} duration={1500}>
                <SoftwareSkill logos={skill.softwareSkills} />
              </Fade>
              <Fade direction={isEven ? "right" : "left"} duration={2000}>
                <div>
                  {skill.skills.map((sentence, idx) => (
                    <p
                      key={idx}
                      className="subTitle skills-text"
                      style={{ color: theme.secondaryText }}
                    >
                      {sentence}
                    </p>
                  ))}
                </div>
              </Fade>
            </div>

            {!isEven && (
              <Fade right duration={2000}>
                <div className="skills-image-div">
                  <GetSkillSvg fileName={skill.fileName} theme={theme} />
                </div>
              </Fade>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SkillSection;
