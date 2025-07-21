import React, { useEffect, useState } from "react";
import "./Project.css";
import ProjectCard from "../../components/ProjectCard/";
import { getProjects } from "../../portfolio"; // 🧠 Import your API fetcher

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res.data || []);
    });
  }, []);

  return (
    <div className="main" id="opensource">
      <h1 className="project-title">Open Source Projects</h1>
      <div className="repo-cards-div-main">
        {projects.map((project, i) => (
          <ProjectCard repo={project} key={project.name + i} />
        ))}
      </div>
      <a
        className="resume-btn"
        href="https://github.com/monisaliqureshi"
        target="_blank"
        rel="noopener noreferrer"
      >
        More Projects (GitHub)
      </a>
    </div>
  );
}
