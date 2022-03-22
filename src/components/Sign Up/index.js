import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import alert from "alert";

class SignupComponent extends React.Component {
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

  render() {
    return (
      <>
      <Card className="text-center">
        <div>Please register using your email!</div>
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
        </Card>
      </>
    );
  }
}
export default SignupComponent;
