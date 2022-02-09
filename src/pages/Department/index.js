import React from "react";
import NavBar from "../../components/NavBar";
import DepartmentFileChooser from "../../components/FileChooser/Department";
import AdminFileChooser from '../../components/FileChooser/Admin'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
const Department = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Instructor Submission">
          <CenterWrapper>
            Enter the required information to populate course instructors.
            <DepartmentFileChooser></DepartmentFileChooser>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="second" title="Report Generation">
          <CenterWrapper>
            Select the options to generate a report.
            <AdminFileChooser></AdminFileChooser>
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
