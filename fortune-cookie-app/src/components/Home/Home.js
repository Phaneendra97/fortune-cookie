import React from "react";
import styles from "./Home.module.css";
import Flexbox from "flexbox-react";

const Home = () => (
  <Flexbox
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
  >
    Home Component
  </Flexbox>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
