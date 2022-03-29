import React from 'react'
import NavBar from '../../components/NavBar'
import AdminFileChooser from '../../components/FileChooser/Admin'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
import ReportGeneration from "../../components/ReportGeneration/reportGeneration";

const Administrator = () => {
    return (
        <div style={{backgroundColor:"white"}}>
            <NavBar></NavBar>
            <Tabs defaultActiveKey="first">
        <Tab eventKey="first" style={{backgroundColor:"#0d6efd"}} title="Admin Submission Requirements">
          <AdminFileChooser></AdminFileChooser>
        </Tab>
        <Tab eventKey="second" title="Report Generation" style={{backgroundColor:"#0d6efd"}}>
          <CenterWrapper >
            <ReportGeneration department="admin"></ReportGeneration>
          </CenterWrapper>
        </Tab>
      </Tabs>
        </div>
    )
}

export default Administrator
