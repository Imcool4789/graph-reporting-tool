import React from "react";
import Cookies from "js-cookie";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../Home";
import Instructor from "../Instructor";
import Administrator from "../Administrator";
import Department from "../Department";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: false,
      department: false,
      admin: false,
    };
    this.onLoad = this.onLoad.bind(this);
    this.onLoad();
  }
  onLoad() {
    if (Cookies.get("sessionID")) {
      let data = JSON.stringify({
        sessionID: Cookies.get("sessionID"),
      });
      let data1 = [data];
      fetch(
        process.env.NODE_ENV === "production"
          ? "https://graphing-report-tool.herokuapp.com/auth/access"
          : "/auth/access",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data1,
        }
      )
        .then((response) => {
          const getResponse = async () => {
            const obj = await response.json();
            console.log(obj);
            if (obj["Admin"].length > 0) {
              this.setState({
                admin: true,
              });
            }
            if (obj["Instructor"].length > 0) {
              this.setState({
                instructor: true,
              });
            }
            if (obj["Department Head"].length > 0) {
              this.setState({
                department: true,
              });
            }
          };
          getResponse();
        })
        .then((data) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {this.state.instructor ? (
          <Route exact path="/instructor" component={Instructor}></Route>
        ) : (
          <Redirect to="/" />
        )}
        {this.state.department ? (
          <Route exact path="/department" component={Department}></Route>
        ) : (
          <Redirect to="/" />
        )}
        {this.state.admin ? (
          <Route exact path="/admin" component={Administrator}></Route>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    );
  }
}

export default Main;
