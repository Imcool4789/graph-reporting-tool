import * as XLSX from "xlsx";
import React from "react";
export default class DepartmentFileChooser extends React.Component {
  constructor(props) {
    super(props);
    this.s = [];
    this.state = { excelData: {} };
  }

  getState() {
    let tmp = document.getElementById("contents");
    tmp.innerHTML = this.state.excelData[0];
  }


  excelToJson(reader) {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: "binary" });
    var data = {};
    for (let i = 0; i < wb.SheetNames.length; i++) {
      var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets["Sheet1"]);
      console.log(rowObj);
      this.formatArray(rowObj);
      var rowString = JSON.stringify(rowObj);
      data[i] = rowString;
    }
    this.setState({ excelData: data });
    console.log(this.state.excelData[0]);
    this.grabData();
  }


  csvToJson(reader) {
    var fileData = reader.result;
    var lines = fileData.split("\n");
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }
    var result = [];
    var headers = lines[0].split(",");
    var data = {};
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    this.formatArray(result);
    data[0] = JSON.stringify(result);
    this.setState({ excelData: data });
    this.grabData();
  }

  formatArray(arr) {
    let temp =[];
    for (let i = 0; i < arr.length; i++) {
      for (let key in arr[i]) {
        if (key.toLowerCase().includes("year")) {
          temp.push(arr[i][key]);
          console.log(temp[0]);
        } else if (key.toLowerCase().includes("applicable gas")) {
          temp.push(arr[i][key]);
          let newKey = key.toLowerCase().replace("applicable gas", "GA").replace(".","_");
          arr[i][newKey] = arr[i][key];
          delete arr[i][key];
        } else if (key.toLowerCase().includes("course")){
          temp.push(arr[i][key]);
          console.log(temp[1]);
        }
      }
    }
    var year = temp[0];
    var course = temp[1];
    temp.shift();
    temp.shift();
    temp.unshift(year + "_" + course);
    this.s = temp;
   // console.log(temp);
  }

  loadFileXLSX(event) {
    var input = event.target;
    var reader = new FileReader();
    if (input.files[0] !== undefined) {
      switch (input.files[0].name.split(".")[1]) {
        case "xlsx":
        case "xls":
          reader.onload = this.excelToJson.bind(this, reader);
          reader.readAsBinaryString(input.files[0]);
          break;
        case "csv":
          reader.onload = this.csvToJson.bind(this, reader);
          reader.readAsBinaryString(input.files[0]);
          break;
        default:
          break;
      }
    }
  }

  grabData() {
    console.log(this.state.excelData[0]);
    fetch(
      process.env.NODE_ENV === "production"
      ? "https://graphing-report-tool.herokuapp.com/departmentSubmission"
      : "http://localhost:5000/departmentSubmission",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: this.state.excelData[0],
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div>
        <label for="avatar">Instructor Submission: </label>
        <input type="file" id="1" onChange={this.loadFileXLSX.bind(this)} />
        <br />
        <p id="demo"></p>
        <br />
        <button onClick={() => this.getState()}>Show Json</button>
        <div id="contents"></div>
      </div>
    );
  }
}