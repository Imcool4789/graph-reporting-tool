import React from "react";
import NavBar from "../../components/NavBar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
import DepartmentFileChooser from "../../components/FileChooser/Department/departmentFileChooser";
import DepartmentInstructorSubmission from "../../components/FileChooser/Department";
const Department = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Instructor Submission">
          <CenterWrapper>
            Enter the required information to populate course instructors.
            <DepartmentInstructorSubmission></DepartmentInstructorSubmission>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="second" title="Report Generation">
          <CenterWrapper>
            <DepartmentFileChooser></DepartmentFileChooser>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="third" title="View Submitted Courses">
          <CenterWrapper></CenterWrapper>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Department;
