import React, { Component } from "react";
import Flexbox from "flexbox-react";
import axios from "axios";
import ReactDOM from "react-dom";
import TweenOne from "rc-tween-one";

export class Home extends Component {
  state = {
    userDetails: {
      country: "",
      timezone: "",
      localTime: "",
    },
    greetings: "",
  };

  render() {
    return (
      <Flexbox
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        minHeight="100vh"
        marginTop="20px"
        marginLeft="20px"
      >
        <Flexbox>
          <ul className="nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                style={{ fontSize: "25px" }}
                aria-current="page"
              >
                Fortune Cookie
              </a>
            </li>
          </ul>
        </Flexbox>
        <Flexbox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          {<TimebasedAnimation timeHint={this.state.greetings} />}
          <h3>{this.state.greetings}</h3>
        </Flexbox>
      </Flexbox>
    );
  }

  componentDidMount() {
    this.getGeoInfo();
  }

  getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let options = {
          timeZone: data.timezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        let greetings = "";
        const formatter = new Intl.DateTimeFormat([], options);
        const dateObject = new Date(formatter.format(new Date()));
        if (dateObject.getHours() < 12) {
          greetings = "Good Morning!";
        } else if (dateObject.getHours() >= 12 && dateObject.getHours() < 16) {
          greetings = "Good Afternoon!";
        } else if (dateObject.getHours() >= 16) {
          greetings = "Good Evening!";
        }
        let userDetails = {
          country: data.country_name,
          timezone: data.timezone,
          localTime: dateObject,
        };
        this.setState({ userDetails: userDetails, greetings: greetings });
        console.log("@here", userDetails, greetings);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function TimebasedAnimation(props) {
  console.log(props);
  if (props.timeHint == "Good Morning!") {
    return (
      <div>
        <TweenOne
          style={{ display: "inline-block" }}
          animation={{ y: -100, repeat: 0, yoyo: false }}
          className="sun"
        ></TweenOne>
        <TweenOne
          style={{ display: "inline-block" }}
          animation={{ x: -100, repeat: -1, yoyo: true, duration: 2000 }}
          className="cloud"
        ></TweenOne>
      </div>
    );
  } else {
    return (
      <div>
        <TweenOne
          style={{ display: "inline-block" }}
          animation={{ y: -100, repeat: 0, yoyo: false }}
          className="sun"
        ></TweenOne>
        <TweenOne
          style={{ display: "inline-block" }}
          animation={{ x: -100, repeat: -1, yoyo: true, duration: 2000 }}
          className="cloud"
        ></TweenOne>
      </div>
    );
  }
}

export default Home;
