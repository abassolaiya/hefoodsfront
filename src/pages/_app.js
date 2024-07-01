import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import { SearchProvider } from "../context/SearchContext";

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SearchProvider>
      <React.Fragment>
        <Head>
          <title>HeyFood Africa</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </SearchProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
