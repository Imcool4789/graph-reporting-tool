import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginComponent extends React.Component {
  /**
   * This function will be used to register all users when a spreadsheet is uploaded by the admin/faculty
   * @param {*} event 
   */
  register = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      email: event.target[0].value,
      password: event.target[1].value,
    });
    let data1 = [data];
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/auth/register"
        : "/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data1,
      }
    ).catch((error) => {
      console.error("Error:", error);
    });
  };
  login = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      email: event.target[0].value,
      password: event.target[1].value,
    });
    let data1 = [data];
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/auth/compare"
        : "/auth/compare",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data1,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data["Admin"].length > 0) {
          document.getElementById("result").innerHTML += "ROLE: Admin </br>";
        }
        if (data["Instructor"].length > 0) {
          document.getElementById("result").innerHTML +=
            "ROLE: " + data["Instructor"][0].row+"</br>";
        }
        if (data["Department Head"].length > 0) {
          document.getElementById("result").innerHTML +=
            "ROLE: " + data["Department Head"][0].dep_name+"</br>";
        }
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  render() {
    return (
      <>
        <div>REGISTER: PERSON</div>
        <Form onSubmit={this.register}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div>VERIFY ROLE</div>
        <Form onSubmit={this.login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div id="result"></div>
      </>
    );
  }
}

export default LoginComponent;
