import React from "react";
import Cookies from "js-cookie";
import {
  Nav,
  NavBarContainer,
  NavMenu,
  NavItem,
  NavLinks,
  LogOff
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
  logOff(){
    document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Cookie deleted");
    window.location.href="/";
  }
  render() {
    return (
        <Nav>
          <NavBarContainer>
            <NavMenu>{this.state.navItems}</NavMenu>
          </NavBarContainer>
          {this.state.navItems.length > 0 &&
        <LogOff onClick={this.logOff.bind(this)}>
         Sign out
        </LogOff>
      }
        </Nav>
    );
  }
  navLoad() {
    if (Cookies.get("sessionID")) {
      let nav = [];
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
            if (obj["Admin"].length > 0) {
              nav.push(
                <NavItem>
                  <NavLinks key="admin" to="/admin">Administrator</NavLinks>
                </NavItem>
              );
            }
            if (obj["Instructor"].length > 0) {
              nav.push(
                <NavItem>
                  <NavLinks key="instructor" to="/instructor">Instructor</NavLinks>
                </NavItem>
              );
            }
            if (obj["Department Head"].length > 0) {
              nav.push(
              <NavItem>
                <NavLinks key="department" to="/department">Department</NavLinks>
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
