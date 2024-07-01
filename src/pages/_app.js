import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import { SearchProvider } from "../context/SearchContext";

export default function MyApp({ Component, pageProps }) {
  // Cleanup JSS styles injected by Material-UI's SSR
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    // Wrap the entire app with SearchProvider for managing search state
    <SearchProvider>
      <React.Fragment>
        {/* Set up document head with title and viewport */}
        <Head>
          <title>HeyFood Africa</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        {/* ThemeProvider to apply Material-UI theme */}
        <ThemeProvider theme={theme}>
          {/* Apply global CSS resets */}
          <CssBaseline />
          {/* Render the main component of the app */}
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </SearchProvider>
  );
}

// PropTypes validation for MyApp props
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
