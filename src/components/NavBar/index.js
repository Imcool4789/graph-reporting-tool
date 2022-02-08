import React from "react";
import Cookies from "js-cookie";
import {
  Nav,
  NavBarContainer,
  NavMenu,
  NavItem,
  NavLinks,
} from "./NavBarElements";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [],
    };
    this.navLoad = this.navLoad.bind(this);
  }
  componentDidMount() {
    this.navLoad();
  }
  render() {
    return (
      <>
        <Nav>
          <NavBarContainer>
            <NavMenu>{this.state.navItems}</NavMenu>
          </NavBarContainer>
        </Nav>
      </>
    );
  }
  navLoad() {
    if (Cookies.get("sessionID")) {
      let nav = [];
      let data = JSON.stringify({
        sessionID: Cookies.get("sessionID"),
      });
      let data1 = [data];
      console.log(data1);
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
            if (obj["Admin"].length > 0) {
              nav.push(
                <NavItem>
                  <NavLinks to="/admin">Administrator</NavLinks>
                </NavItem>
              );
            }
            if (obj["Instructor"].length > 0) {
              nav.push(
                <NavItem>
                  <NavLinks to="/instructor">Instructor</NavLinks>
                </NavItem>
              );
            }
            if (obj["Department Head"].length > 0) {
              nav.push(
              <NavItem>
                <NavLinks to="/department">Department</NavLinks>
              </NavItem>
              );
            }
          };
          getResponse().then(()=>{
            this.setState({
              navItems: nav,
            });
          });
        })

        .then((data) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

export default NavBar;
