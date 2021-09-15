import React, { Component, useEffect } from "react";
import Flexbox from "flexbox-react";
import axios from "axios";

export class Home extends Component {
  state = {
    userDetails: {
      country: "",
      timezone: "",
      localTime: "",
      localDate: "",
    },
  };
  render() {
    return (
      <Flexbox
        flexDirection="row"
        alignItems="start"
        justifyContent="start"
        minHeight="100vh"
        marginTop="20px"
        marginLeft="20px"
      >
        <Flexbox>
          <h2>Fortune Cookie</h2>{" "}
        </Flexbox>
        <Flexbox> </Flexbox>
      </Flexbox>
    );
  }
}

// function Home() {
//   useEffect(() => {
//     getGeoInfo();
//   });
//   return (
//     <Flexbox
//       flexDirection="row"
//       alignItems="start"
//       justifyContent="center"
//       minHeight="100vh"
//       marginTop="20px"
//     >
//       <h2>Fortune Cookie</h2>
//       <Flexbox> {userDetails.country}</Flexbox>
//     </Flexbox>
//   );
// }

export default Home;

// const getGeoInfo = () => {
//   axios
//     .get("https://ipapi.co/json/")
//     .then((response) => {
//       let data = response.data;
//       let options = {
//         timeZone: data.timezone,
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         second: "numeric",
//       };
//       let greetings = "";
//       const formatter = new Intl.DateTimeFormat([], options);
//       const dateObject = new Date(formatter.format(new Date()));
//       if (dateObject.getHours() < 12) {
//         greetings = "Good Morning!";
//       } else if (dateObject.getHours() > 12 && dateObject.getHours() < 16) {
//         greetings = "Good Afternoon!";
//       } else if (dateObject.getHours() > 16) {
//         greetings = "Good Evening!";
//       }
//       userDetails = {
//         country: data.country_name,
//         timezone: data.timezone,
//         localTime: dateObject,
//         greetings: greetings,
//       };
//       console.log("@here", userDetails, greetings);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
