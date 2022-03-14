import React from "react";

export default class InstructorSubmissions extends React.Component {
  constructor(){
    super();
    this.state={
      submissionData:[]
    }
  }
  componentDidMount(){
    this.setState({
      submissionData:this.props.submissionData
    });
    console.log(this.props.submissionData);
  }
  render() {
    return (
      <div>
        <style>{`table{border:1px solid black;}`}</style>
        <table>
          <tr>
            <th>Course</th>
            <th>Date Submitted</th>
          </tr>
          {this.props.submissionData.map((data) => (
            <tr>
              <td>{data["coursename"]}</td>
              <td>
              {data["timestamp"] == null
                ? "Not submitted"
                : "Submitted:" + new Date(parseInt(data["timestamp"]))}
                </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
