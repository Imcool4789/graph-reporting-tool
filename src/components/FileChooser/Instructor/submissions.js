import React from "react";

export default class InstructorSubmissions extends React.Component {
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
                : "Submitted:" + data["timestamp"] + ""}
                </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
