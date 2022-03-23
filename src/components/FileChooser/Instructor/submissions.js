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
        <table class="table">
          <tr>
            <th scope="row">Course</th>
            <th scope="row">Date Submitted</th>
          </tr>
          {this.props.submissionData.map((data) => (
            <tr>
              <td>{data["coursename"].replaceAll("_"," ").toUpperCase()}</td>
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
