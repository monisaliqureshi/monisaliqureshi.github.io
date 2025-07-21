import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import { getGreeting } from "../../portfolio.js";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  const [greeting, setGreeting] = useState({});

  useEffect(() => {
    getGreeting().then(setGreeting);
  }, []);

  return (
    <div className="footer-div">
      <Fade>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by {greeting.title2 || "Monis"}
        </p>
      </Fade>
    </div>
  );
}
