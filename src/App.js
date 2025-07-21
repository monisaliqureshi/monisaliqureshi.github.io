import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { themes } from "./theme";
import { GlobalStyles } from "./global";
import { CursorProvider } from "react-cursor-custom";
import { getSettings } from "./portfolio";
import ReactGA from "react-ga";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then((res) => {
      setSettings(res);

      // Google Analytics init after settings load
      if (res.googleTrackingID && !window.location.href.includes("localhost")) {
        ReactGA.initialize(res.googleTrackingID, {
          testMode: process.env.NODE_ENV === "test",
        });
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.set({ user: 1001 });
      }
    });
  }, []);

  if (!settings) {
    return (
      <div
        style={{
          color: themes[theme].text,
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading app...
      </div>
    );
  }

  const useCursor = settings.useCustomCursor;

  return (
    <ThemeProvider theme={themes[theme]}>
      <>
        <GlobalStyles />
        <div>
          {useCursor ? (
            <CursorProvider
              color={themes[theme].secondaryText}
              ringSize={25}
              transitionTime={75}
            >
              <Main theme={themes[theme]} setTheme={setTheme} />
            </CursorProvider>
          ) : (
            <Main theme={themes[theme]} setTheme={setTheme} />
          )}
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
