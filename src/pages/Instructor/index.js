import React from "react";
import NavBar from "../../components/NavBar";
import InstructorFileChooser from "../../components/FileChooser/Instructor";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
const Instructor = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="SYSC 4101">
          <CenterWrapper>
            Enter the correct information for SYSC 4101
            <InstructorFileChooser></InstructorFileChooser>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="second" title="SYSC 2006">
          <CenterWrapper>
            Enter the correct information for SYSC 2006
            <InstructorFileChooser></InstructorFileChooser>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="third" title="View Submissions">
          <CenterWrapper>
          </CenterWrapper>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Instructor;
