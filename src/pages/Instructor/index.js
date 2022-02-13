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
          <Tab eventKey={data["term"]+"_"+data["year"]+"_"+data["course"]+"_"+data["number"]+"_"+data["section"]} title={data["term"]+"_"+data["year"]+"_"+data["course"]+"_"+data["number"]+"_"+data["section"]}>
            <CenterWrapper>
              Enter the correct information for {data["term"]+"_"+data["year"]+"_"+data["course"]+"_"+data["number"]+"_"+data["section"]}
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
