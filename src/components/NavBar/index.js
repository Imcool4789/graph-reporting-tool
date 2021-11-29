import React from "react";
import {
  Nav,
  NavBarContainer,
  NavMenu,
  NavItem,
  NavLinks,
} from "./NavBarElements";
const NavBar = () => {
  return (
    <>
      <Nav>
        <NavBarContainer>
          <NavMenu>
            <NavItem>
              <NavLinks to="/instructor">Instructor</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/department">Department</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/admin">Administrator</NavLinks>
            </NavItem>
          </NavMenu>
        </NavBarContainer>
      </Nav>
    </>
  );
};

export default NavBar;
