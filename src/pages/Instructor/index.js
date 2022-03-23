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
      instructorBody: []
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
      instructorData: instructorData
    });
  }
  render() {
    return (
      <>
        <NavBar></NavBar>
        <div style={{backgroundColor:"white",height:"100%"}}>
        <Tabs>
          {this.state.instructorData.map((x) => (
            <Tab eventKey={x} title={x.replaceAll("_"," ").toUpperCase()} style={{ backgroundColor:"#0d6efd"}}>
               <div class="container-sm border border-light rounded-3" style={{backgroundColor:"white",height:"100%"}}>
              <CenterWrapper>
                <div class="text-center" style={{fontSize:"150%"}}><b><u>
                Enter the correct information for&nbsp;
                {x.replaceAll("_"," ").toUpperCase()}
                </u>
                </b>
                </div>
                <InstructorFileChooser course={x} table={this.props.table}></InstructorFileChooser>
              </CenterWrapper>
              </div>
            </Tab>
          ))}
          <Tab style={{backgroundColor:"#0d6efd"}} eventKey="submissions" title="View Submissions">
            <CenterWrapper style={{backgroundColor:"white",borderRadius: "5px"}}>
              <InstructorSubmissions
                submissionData={this.props.timestampData}
              ></InstructorSubmissions>
            </CenterWrapper>
          </Tab>
        </Tabs>
        </div>
      </>
    );
  }
}

export default Instructor;
