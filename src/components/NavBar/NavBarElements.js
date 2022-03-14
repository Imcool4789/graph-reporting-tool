import styled from "styled-components";
import { Link as LinkedRouter } from "react-router-dom";
export const Nav = styled.nav`
    background: #222;
    height:80px;
    display:flex;
    justify-content: center;
    align-items:center;
    font-size:1rem;
    position:sticky;
    top:0;
    z-index:10;
    @media screen and (max-width:960px){
        transition 0.8s all ease;
    }
`;
export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
`;
export const NavItem = styled.li`
  height: 80px;
`;
export const NavLinks = styled(LinkedRouter)`
color:white;
font-weight:500;
font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
display:flex;
align-items:center;
text-decoration:none;
padding 0 1rem;
height 100%;
cursor:pointer;
&:hover{
  color:white;
  background-color: #535353;
}
&.active{
    border-bottom:3px solid #01bf71;
}
`;
export const LogOff = styled.button`
color:white;
font-weight:500;
background: #222;
font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
display:flex;
align-items:center;
text-decoration:none;
padding 0 1rem;
height 100%;
cursor:pointer;
border:0px;
&:hover{
  color:white;
  background-color: #535353;
}
`;
