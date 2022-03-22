import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import alert from "alert";

class LoginComponent extends React.Component {
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
      .then((response) => {
        console.log(response.status);
        if (response.status === 403) {
          alert("Incorrect Email or Password!");
        }
      })
      .then(() => {
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  render() {
    return (
      <>
      <div class="container-sm border border-primary" style={{borderRadius: "25px", backgroundColor:"white"}}>
        <div class="text-center" style={{fontSize:"175%"}}><b>Sign In</b></div>
        <div style={{padding:"4em"}}>
        <Form onSubmit={this.login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Email address</b></Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><b>Password</b></Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div style={{paddingTop:"1em"}}class="text-center">
          <Button style={{paddingLeft:"4em",paddingRight:"4em",fontSize:"125%"}}variant="primary" type="submit">
            Submit
          </Button>
          </div>
        </Form>
        </div>
        </div>
      </>
    );
  }
}

export default LoginComponent;