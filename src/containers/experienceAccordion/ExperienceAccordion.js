import React, { useEffect, useState } from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { Accordion, Panel } from "baseui/accordion";
import { DarkTheme, LightTheme, ThemeProvider } from "baseui";
import { getExperience } from "../../portfolio"; // ✅ API import

function ExperienceAccordion(props) {
  const theme = props.theme;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getExperience().then((data) => {
      setSections(data.sections || []);
    });
  }, []);

  return (
    <div className="experience-accord">
      <ThemeProvider theme={theme.name === "light" ? LightTheme : DarkTheme}>
        <Accordion onChange={({ expanded }) => console.log(expanded)}>
          {sections.map((section) => {
            return (
              <Panel
                className="accord-panel"
                title={section["title"]}
                key={section["title"]}
              >
                {section["experiences"].map((experience) => {
                  return (
                    <ExperienceCard
                      key={experience.title}
                      experience={experience}
                      theme={theme}
                    />
                  );
                })}
              </Panel>
            );
          })}
        </Accordion>
      </ThemeProvider>
    </div>
  );
}

export default ExperienceAccordion;
