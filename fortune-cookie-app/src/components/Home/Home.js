import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Flexbox from "flexbox-react";
import axios from "axios";

var userDetails = {
  country: "",
  timezone: "",
  localTime: "",
  localDate: "",
};

function Home() {
  useEffect(() => {
    getGeoInfo();
  });
  return (
    <Flexbox
      flexDirection="row"
      alignItems="start"
      justifyContent="center"
      minHeight="100vh"
      marginTop="20px"
    >
      <h2>Fortune Cookie</h2>
      <Flexbox></Flexbox>
    </Flexbox>
  );
}

export default Home;

const getGeoInfo = () => {
  axios
    .get("https://ipapi.co/json/")
    .then((response) => {
      let data = response.data;
      const now = new Date();
      //now.timezone = data.timezone;
      let options = {
          timeZone: data.timezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        },
        formatter = new Intl.DateTimeFormat([], options);
      console.log(formatter.format(new Date()));
      console.log("@here@@", new Date(formatter.format(new Date())));
      userDetails = {
        country: data.country_name,
        timezone: data.timezone,
        localTime: now,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};
