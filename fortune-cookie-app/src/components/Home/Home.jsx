import React, { Component } from "react";
import Flexbox from "flexbox-react";
import axios from "axios";
import TweenOne from "rc-tween-one";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  firstAnswer = "";
  questionTracker = 0;

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
              fontSize: "25px",
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
        <Flexbox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
          paddingTop="5%"
        >
          {this.questionTracker === 0 && (
            <FormControl style={{ width: "40%", color: "#F0F2EF" }}>
              <InputLabel id="question1">How are you feeling today?</InputLabel>
              <Select
                labelId="question1"
                id="question1-select"
                value={this.firstAnswer}
                label="How are you feeling today?"
                onChange={this.answerRecorder}
              >
                <MenuItem value={"Good"}>Good</MenuItem>
                <MenuItem value={"Excited"}>Excited</MenuItem>
                <MenuItem value={"Tensed"}>Tensed</MenuItem>
                <MenuItem value={"Sad"}>Sad</MenuItem>
              </Select>
            </FormControl>
          )}
          <p>{this.firstAnswer}</p>
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
    if (hourOfTheDay >= 6 && hourOfTheDay <= 18) {
      return "Box-day";
    } else {
      return "Box-night";
    }
  };

  answerRecorder = (event) => {
    this.questionTracker = this.questionTracker + 1;
    this.setState(this.firstAnswer, event.target.value);
    console.log("@here", event, this.firstAnswer, this.questionTracker);
  };
}

function TimebasedAnimation(props) {
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
