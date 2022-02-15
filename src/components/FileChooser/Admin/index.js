import * as XLSX from "xlsx";
import React from "react";
import CourseSelection from "./courseSelection";

export default class AdminFileChooser extends React.Component {
  constructor(props) {
    super(props);
    this.s = [];
    this.state = {
      excelData: {},
      id: 0,
      courseSelection: [],
    };
    this.addCourse();
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

  excelToJson1(reader) {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: "binary" });
    var data = {};
    for (let i = 0; i < wb.SheetNames.length; i++) {
      var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets["Sheet1"]);
      this.formatArray(rowObj);
      var rowString = JSON.stringify(rowObj);
      data[i] = rowString;
    }
    this.setState({ excelData: data });
    this.grabData1();
  }

  showGA() {
    console.log("sadsd");
    var x = document.querySelector('input[name="GAS"]:checked').value;

    //  var x = document.getElementById("Ga").value;
    //   if(x.includes(".")){
    //    x = x.replace(".", "_");
    //    x = "_" + x;
    //
    //  } else{
    //    x = "_" + x + "_";
    //  }
    x = "_" + x + "_";

    let obj = {};
    obj["GA"] = x;
    let c = "[" + JSON.stringify(obj) + "]";
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/adminGA"
        : "http://localhost:5000/adminGA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: c,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        data.forEach(
          (e) =>
            (document.getElementById("coursesWithGa").innerHTML +=
              e["table_name"] + "</br>")
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  showYear() {
    var x = document.getElementById("Year").value;
    x = "_" + x;
    let obj = {};
    obj["Year"] = x;

    let c = "[" + JSON.stringify(obj) + "]";
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/adminShowYear"
        : "http://localhost:5000/adminShowYear",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: c,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        data.forEach(
          (e) =>
            (document.getElementById("coursesWithyears").innerHTML +=
              e["table_name"] + "</br>")
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  showCourse() {
    var x = document.getElementById("Course").value;
    let obj = {};
    obj["Course"] = x;

    let c = "[" + JSON.stringify(obj) + "]";
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/adminShowCourses"
        : "http://localhost:5000/adminShowYearCourses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: c,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        data.forEach(
          (e) =>
            (document.getElementById("courses").innerHTML +=
              e["table_name"] + "</br>")
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  showProgram() {
    var x = document.getElementById("Program").value;
    var temp = x.split(",");
    let obj = {};
    obj["Year"] = "_" + temp[0];
    obj["Course"] = "_" + temp[1];
    obj["Program"] = temp[2];

    let c = "[" + JSON.stringify(obj) + "]";
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/adminShowProgram"
        : "http://localhost:5000/adminShowProgram",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: c,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        data.forEach(
          (e) =>
            (document.getElementById("program").innerHTML +=
              JSON.stringify(e) + "</br>")
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      for (let key in arr[i]) {
        if (key.toLowerCase().includes("year")) {
          temp.push(arr[i][key]);
        } else if (key.toLowerCase().includes("applicable gas")) {
          temp.push(arr[i][key]);
          let newKey = key
            .toLowerCase()
            .replace("applicable gas", "GA")
            .replace(".", "_");
          arr[i][newKey] = arr[i][key];
          delete arr[i][key];
        } else if (key.toLowerCase().includes("course")) {
          temp.push(arr[i][key]);
        }
      }
    }
    var year = temp[0];
    var course = temp[1];
    temp.shift();
    temp.shift();
    temp.unshift(year + "_" + course);
    this.s = temp;
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

  loadFileXLSX1(event) {
    var input = event.target;
    var reader = new FileReader();
    if (input.files[0] !== undefined) {
      switch (input.files[0].name.split(".")[1]) {
        case "xlsx":
        case "xls":
          reader.onload = this.excelToJson1.bind(this, reader);
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
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/adminSubmission"
        : "http://localhost:5000/adminSubmission",
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

  grabData1() {
    console.log(this.state.excelData[0]);
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/adminDepartmentSubmission"
        : "http://localhost:5000/adminDepartmentSubmission",
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
  addCourse() {
    let currState = this.state.courseSelection;
    currState.push(<CourseSelection id={this.state.id}></CourseSelection>);
    let newId = this.state.id + 1;
    this.setState({
      courseSelection: currState,
      id: newId,
    });
    //let parent = document.getElementById("courseSelection");
    //parent.appendChild(<CourseSelection id={this.state.id}></CourseSelection>);
  }
  render() {
    return (
      <div>
        <label htmlFor="1">Course Submission: </label>
        <br />
        <label htmlFor="2">Select Term: </label>
        <select name="term" id="2">
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>
        <br />
        <label htmlFor="3">Select Year: </label>
        <select name="year" id="3">
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <br />
        <label htmlFor="4">Select Section: </label>
        <select name="section" id="4">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
          <option value="e">e</option>
          <option value="f">f</option>
          <option value="g">g</option>
        </select>
        <br />
        <input type="file" id="1" onChange={this.loadFileXLSX.bind(this)} />
        <br />
        <br />
        <label htmlFor="2">Department Submission: </label>
        <input type="file" id="2" onChange={this.loadFileXLSX1.bind(this)} />
        <br />
        <br />
        <label htmlFor="Year">Search Year: </label>
        <br />
        <input type="text" id="Year" />
        <br />
        <button onClick={this.showYear} id="yearButton">
          Search
        </button>
        <br />
        <div id="coursesWithyears"></div>
        <br />
        <label htmlFor="Course">Search Courses: </label>
        <br />
        <input type="text" id="Course" />
        <br />
        <button onClick={this.showCourse} id="courseButton">
          Search
        </button>
        <br />
        <div id="courses"></div>
        <br />
        <label htmlFor="Ga">Search GA: </label>
        <br />
        <input type="text" id="Ga" />
        <br />
        <button onClick={this.showGA} id="gaButton">
          Search
        </button>
        <br />
        <input type="radio" id="GA1" name="GAS" value="GAS" /> {" "}
        <label htmlFor="html">GA 1</label>
        <br></br>
        <input type="radio" id="GA2" name="GAS" value="2" /> {" "}
        <label htmlFor="html">GA 2</label>
        <br></br>
        <input type="radio" id="GA3" name="GAS" value="3" /> {" "}
        <label htmlFor="html">GA 3</label>
        <br></br>
        <input type="radio" id="GA4" name="GAS" value="4" /> {" "}
        <label htmlFor="html">GA 4</label>
        <br></br>
        <input type="radio" id="GA5" name="GAS" value="5" /> {" "}
        <label htmlFor="html">GA 5</label>
        <br></br>
        <input type="radio" id="GA6" name="GAS" value="6" /> {" "}
        <label htmlFor="html">GA 6</label>
        <br></br>
        <input type="radio" id="GA7" name="GAS" value="7" /> {" "}
        <label htmlFor="html">GA 7</label>
        <br></br>
        <input type="radio" id="GA8" name="GAS" value="8" /> {" "}
        <label htmlFor="html">GA 8</label>
        <br></br>
        <input type="radio" id="GA9" name="GAS" value="9" /> {" "}
        <label htmlFor="html">GA 9</label>
        <br></br>
        <input type="radio" id="GA10" name="GAS" value="10" /> {" "}
        <label htmlFor="html">GA 10</label>
        <br></br>
        <input type="radio" id="GA11" name="GAS" value="11" /> {" "}
        <label htmlFor="html">GA 11</label>
        <br></br>
        <input type="radio" id="GA12" name="GAS" value="12" /> {" "}
        <label htmlFor="html">GA 12</label>
        <br></br>
        <br />
        <div id="coursesWithGa"></div>
        <br />
        <label htmlFor="Program">Search program: </label>
        <br />
        <input type="text" id="Program" />
        <br />
        <button onClick={this.showProgram} id="programButton">
          Search
        </button>
        <br />
        <div id="program"></div>
        <div id="courseSelection">{this.state.courseSelection}</div>
        <button onClick={() => this.addCourse()}>Add additional course</button>
      </div>
    );
  }
}
