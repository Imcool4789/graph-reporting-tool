import React from "react";
import Cookies from 'js-cookie';
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
    console.log(Cookies.get("instructor"));
    console.log(Cookies.get("department"));
    console.log(Cookies.get("admin"));
    let nav=[];
    if(Cookies.get("instructor")){
      nav.push(<NavItem>
        <NavLinks to="/instructor">Instructor</NavLinks>
      </NavItem>);
    }
    if(Cookies.get("department")){
      nav.push(<NavItem>
        <NavLinks to="/department">Department</NavLinks>
      </NavItem>);
    }
    if(Cookies.get("admin")){
      nav.push(<NavItem>
        <NavLinks to="/admin">Administrator</NavLinks>
      </NavItem>);
    }
    this.setState({
      navItems:nav
    });
  }
}

export default NavBar;
