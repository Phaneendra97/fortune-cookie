import React, { Component } from "react";
import Flexbox from "flexbox-react";
import axios from "axios";
import TweenOne from "rc-tween-one";
import Divider from "@mui/material/Divider";
import { getDatabase, ref, child, get } from "firebase/database";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export class Home extends Component {
  state = {
    userDetails: {
      country: "",
      timezone: "",
      localTime: new Date(),
    },
    greetings: "",
    hourOfTheDay: 0,
    fortuneText: "",
    buttonClicked: false,
  };

  render() {
    return (
      <Flexbox
        className={this.decideTheme(this.state.hourOfTheDay)}
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        minHeight="100vh"
      >
        <Flexbox>
          <div
            style={{
              fontSize: "18px",
              cursor: "pointer",
              color: "#F0F2EF",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            Fortune Cookie
          </div>
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
        <Divider />
        <Flexbox
          marginTop="4%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          {!this.state.buttonClicked ? (
            <Button
              color="secondary"
              style={{ color: "white" }}
              onClick={() => {
                this.fetchFortune();
              }}
              variant="outlined"
            >
              Reveal Fortune
            </Button>
          ) : (
            <CircularProgress color="secondary" />
          )}

          <div
            style={{
              fontSize: "25px",
              cursor: "pointer",
              color: "#F0F2EF",
              marginLeft: "20px",
              marginTop: "20px",
              paddingRight: "20px",
            }}
          >
            {this.state.fortuneText}
          </div>
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
        this.setState({
          userDetails: userDetails,
          greetings: greetings,
          hourOfTheDay: dateObject.getHours(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  decideTheme = (hourOfTheDay) => {
    if (hourOfTheDay >= 6 && hourOfTheDay < 18) {
      return "Box-day";
    } else {
      return "Box-night";
    }
  };

  fetchFortune = () => {
    this.setState({ buttonClicked: true });
    this.setState({ fortuneText: "" });
    const dbRef = ref(getDatabase());
    // const date = new Date(this.state.userDetails.localTime);
    const day = this.getDay(this.state.userDetails.localTime.getDay());
    setTimeout(() => {
      get(child(dbRef, `/${day}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const random = Math.floor(Math.random() * snapshot.val().length);
            this.setState({ fortuneText: snapshot.val()[random] });
          } else {
            console.log("No data available");
          }
          this.setState({ buttonClicked: false });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 550);
  };

  getDay = (dayInNumber) => {
    const weekday = new Array(7);
    weekday[0] = "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";

    let day = weekday[dayInNumber];
    return day;
  };
}

function TimebasedAnimation(props) {
  if (props.hourOfTheDay >= 6 && props.hourOfTheDay < 18) {
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
