import React from "react";
import NavBar from "../../components/NavBar";
import InstructorFileChooser from "../../components/FileChooser/Instructor";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { CenterWrapper } from "../AllElements";
import InstructorSubmissions from "../../components/FileChooser/Instructor/submissions";
class Instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructorData: [],
      instructorBody: [],
    };
  }
  componentDidMount() {
    let instructorData = [];
    for (let i = 0; i < this.props.instructorData.length; i++) {
      let data = this.props.instructorData[i];
      instructorData.push(
        data["term"] +
          "_" +
          data["year"] +
          "_" +
          data["course"] +
          "_" +
          data["number"] +
          "_" +
          data["section"]
      );
    }
    this.setState({
      instructorData: instructorData,
    });
  }
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <Tabs>
          {this.state.instructorData.map((x) => (
            <Tab eventKey={x} title={x}>
              <CenterWrapper>
                Enter the correct information for
                {x}
                <InstructorFileChooser course={x} table={this.props.table}></InstructorFileChooser>
              </CenterWrapper>
            </Tab>
          ))}
          <Tab eventKey="submissions" title="View Submissions">
            <CenterWrapper>
              <InstructorSubmissions
                submissionData={this.props.timestampData}
              ></InstructorSubmissions>
            </CenterWrapper>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Instructor;
