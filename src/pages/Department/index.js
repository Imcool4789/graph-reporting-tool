import React from "react";
import NavBar from "../../components/NavBar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
import DepartmentInstructorSubmission from "../../components/FileChooser/Department";
import ReportGeneration from "../../components/ReportGeneration/reportGeneration";
const Department = () => {
  return (
    <>
      <NavBar></NavBar>
      <div class="reportGen" style={{backgroundColor:"white",height:"100%"}}>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" style={{backgroundColor:"#0d6efd"}} title="Instructor Submission">
          <CenterWrapper style={{backgroundColor:"white"}}>
            <div class="text-center" style={{fontSize:"150%"}}><b><u>
            Enter the required information to populate course instructors.
            </u>
            </b>
            </div>
            <div class="container text-center border border-01">
            <DepartmentInstructorSubmission></DepartmentInstructorSubmission>
            </div>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="second" title="Report Generation" style={{backgroundColor:"#0d6efd"}}>
          <CenterWrapper >
            <ReportGeneration></ReportGeneration>
          </CenterWrapper>
        </Tab>
        <Tab eventKey="third" title="View Submitted Courses">
          <CenterWrapper></CenterWrapper>
        </Tab>
      </Tabs>
      </div>
    </>
  );
};

export default Department;
