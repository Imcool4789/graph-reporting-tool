import * as XLSX from "xlsx";
import React from "react";
import * as Chart from "chart.js";
export default class InstructorFileChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { excelData: {}, disabled: true };
  }
  getState() {
    this.grabData();
  }
  excelToJson(reader) {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: "binary" });
    var data = {};
    for (let i = 0; i < wb.SheetNames.length; i++) {
      var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets["Sheet1"]);
      this.formatArray(rowObj);
      var rowString = JSON.stringify(rowObj);
      data[i] = rowString;
    }
    this.setState({ excelData: data, disabled: false });
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
    this.setState({ excelData: data, disabled: false });
  }
  formatArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      delete arr[i]["First Name"];
      delete arr[i]["Last Name"];
      for (let key in arr[i]) {
        if (key.toLowerCase().includes("student id")) {
          arr[i]["student_id"] = arr[i][key];
          delete arr[i][key];
        } else if (key.toLowerCase().includes("ga")) {
          let newKey = key.toLowerCase().replace(/\s/g, "").replace(".", "_");
          arr[i][newKey] = arr[i][key];
          delete arr[i][key];
        }
      }
    }
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
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/courseData"
        : "http://localhost:5000/courseData",
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
        this.populateChart(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  populateChart(chartData) {
    const ctx = document.getElementById("myChart").getContext("2d");
    const labels = ["ga1","ga2","ga3","ga4","ga5","ga6","ga7"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "areo",
          data:[3,2,5,7,4,2,8],
          backgroundColor: "#ff0000",
          stack: "Stack 0",
        },
        {
          label: "areo",
          data: [3,2,5,7,4,2,8],
          backgroundColor: "#ff0000",
          stack: "Stack 1",
        },
        {
          label: "areo",
          data: [3,2,5,7,4,2,8],
          backgroundColor: "#ff0000",
          stack: "Stack 2",
        },
      ],
    };
    const config = {
      type: "bar",
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Chart.js Bar Chart - Stacked",
          },
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };
    const myChart=new Chart(ctx,config);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.loadFileXLSX.bind(this)} />
        <br />
        <button disabled={this.state.disabled} onClick={() => this.getState()}>
          Upload Graduate Attributes
        </button>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    );
  }
}
