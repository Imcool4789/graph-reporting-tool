import React from "react";
import NavBar from "../../components/NavBar";
import InstructorFileChooser from "../../components/FileChooser/Instructor";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
import InstructorSubmissions from "../../components/FileChooser/Instructor/submissions";
class Instructor extends React.Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <Tabs>
        {this.props.instructorData.map((data)=>(
          <Tab eventKey={data["course"].toUpperCase()+" "+data["number"]+" "+data["section"].toUpperCase()+" "+data["year"]} title={data["course"].toUpperCase()+" "+data["number"]+" "+data["section"].toUpperCase()+" "+data["year"]}>
            <CenterWrapper>
              Enter the correct information for {data["course"].toUpperCase()+" "+data["number"]+" "+data["section"].toUpperCase()+" "+data["year"]}
              <InstructorFileChooser></InstructorFileChooser>
            </CenterWrapper>
          </Tab>
        ))}
          <Tab eventKey="submissions" title="View Submissions">
            <CenterWrapper>
              <InstructorSubmissions></InstructorSubmissions>
            </CenterWrapper>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Instructor;
