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
              <NavLinks to="/instructors">Instructors</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/faculty">Faculties</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/admin">Administrators</NavLinks>
            </NavItem>
          </NavMenu>
        </NavBarContainer>
      </Nav>
    </>
  );
};

export default NavBar;
