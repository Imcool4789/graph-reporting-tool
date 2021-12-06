import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

class LoginComponent extends React.Component {
  register=(event)=>{
    event.preventDefault();
    let data=JSON.stringify({email:event.target[0].value,password:event.target[1].value});
    let data1=[data];
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/auth/register"
        : "http://localhost:5000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:data1,
      }).catch((error) => {
        console.error("Error:", error);
      });
  }
  login=(event)=>{
    event.preventDefault();
    let data=JSON.stringify({email:event.target[0].value,password:event.target[1].value});
    let data1=[data];
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/auth/compare"
        : "http://localhost:5000/auth/compare",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:data1,
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        data.forEach(e=>document.getElementById("result").innerHTML+=JSON.stringify(e)+"</br>");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  render() {
      return (
          <><Form onSubmit={this.register}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Form onSubmit={this.login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form></>
      );
  }
}

export default LoginComponent;
