import React from "react";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";

import Home from "../Home";
import Instructor from "../Instructor";
import Administrator from "../Administrator";
import Department from "../Department";
import SignupComponent from "../../components/Sign Up";
import LoginComponent from "../../components/Login";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: false,
      department: false,
      admin: false,
      instructorData:[],
      departmentData:[],
      timeStampData:[],
      table:[],
    };
  }
 componentDidMount(){
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
            console.log(obj["timestamp"]);
            if (obj["Admin"].length > 0) {
              this.setState({
                admin: true,
              });
            }
            if (obj["Instructor"].length > 0) {
              this.setState({
                instructor: true,
                instructorData: obj["Instructor"],
                timeStampData: obj["timestamp"],
                table:obj["table"],
              });
            }
            if (obj["Department Head"].length > 0) {
              this.setState({
                department: true,
                departmentData: obj["Department Head"],
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
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/signup" element={<SignupComponent/>}></Route>
        {this.state.instructor && 
          <Route exact path="/instructor" element={<Instructor instructorData={this.state.instructorData} timestampData={this.state.timeStampData} table={this.state.table}/>} ></Route>}
        {this.state.department &&
          <Route exact path="/department" element={<Department/>}></Route>}
        {this.state.admin &&
          <Route exact path="/admin" element={<Administrator/>}></Route>}
      </Routes>
    );
  }
}

export default Main;
