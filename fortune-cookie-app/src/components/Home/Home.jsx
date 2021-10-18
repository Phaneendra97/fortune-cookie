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
    hourOfTheDay: 0,
  };

  render() {
    return (
      <Flexbox
        className={this.decideTheme(this.state.greetings)}
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        minHeight="100vh"
      >
        <Flexbox>
          <ul className="nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                style={{
                  fontSize: "25px",
                  cursor: "pointer",
                  color: "#F0F2EF",
                }}
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
          {
            <TimebasedAnimation
              timeHint={this.state.greetings}
              hourOfTheDay={this.state.hourOfTheDay}
            />
          }
          <h3 style={{ color: "#F0F2EF" }}>{this.state.greetings}</h3>
        </Flexbox>
        <Flexbox>
          <h3></h3>
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
        if (dateObject.getHours() < 23) {
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
        this.setState({
          userDetails: userDetails,
          greetings: greetings,
          hourOfTheDay: dateObject.getHours(),
        });
        console.log("@here", userDetails, greetings, dateObject.getHours());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  decideTheme = (greetings) => {
    if (greetings === "Good Morning!" || greetings === "Good Afternoon!") {
      return "Box-day";
    } else {
      return "Box-night";
    }
  };
}

function TimebasedAnimation(props) {
  console.log(props);
  if (props.timeHint == "Good Morning!" && props.hourOfTheDay >= 6) {
    return (
      <div>
        <div className="day">
          <TweenOne
            style={{ display: "inline-block" }}
            animation={{ y: -100, repeat: 0, yoyo: false }}
            className="sun"
          ></TweenOne>
          <TweenOne
            style={{ display: "inline-block" }}
            animation={{ x: -100, repeat: -1, yoyo: true, duration: 3000 }}
            className="cloud"
          ></TweenOne>
        </div>
      </div>
    );
  } else {
    return (
      <div className="night">
        <div className="star-1 animate-flicker-2"></div>
        <div className="star-2 animate-flicker"></div>
        <div className="star-3 animate-flicker-2"></div>
        <div className="star-4 animate-flicker-2"></div>
        <div className="star-5 animate-flicker"></div>
        <div className="star-6 animate-flicker-2"></div>
        <div className="star-7 animate-flicker"></div>
        <div className="star-8 animate-flicker-2"></div>
        <div>
          <TweenOne
            style={{ display: "inline-block" }}
            animation={{ y: -100, repeat: 0, yoyo: false }}
            className="moon"
          ></TweenOne>
        </div>
      </div>
    );
  }
}

export default Home;
