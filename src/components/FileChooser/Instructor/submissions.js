import React from "react";


export default class InstructorSubmissions extends React.Component {

    render() {
        return (
          <div>
            <style>{
            `table{border:1px solid black;}`
            
            }</style>
            <table>
                <tr>
                    <th>Course</th>
                    <th>Date Submitted</th>
                </tr>
            </table>
          </div>
        );
      }
}