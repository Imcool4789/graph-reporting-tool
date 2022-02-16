import * as XLSX from "xlsx";
import React from "react";
import * as Chart from "chart.js";
import Bin from "../../../util/DataObjects/Bin";
import Bins from "../../../util/DataObjects/Bins";
import HelperFunctions from "../../../util/HelperFunctions";
import html2canvas from "html2canvas";
import pdfConverter from "jspdf";

export default class InstructorFileChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { excelData: {}, disabled: true, binData: {} };
    this.checked = false;
    this.chart = {};
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
    this.setState({ excelData: data });
    this.buttonLogic();
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
    this.buttonLogic();
  }
  buttonLogic() {
    if (this.state.excelData[0] !== undefined) {
      let d = document.getElementById("error");
      if (this.checked) {
        this.setState({ disabled: false });
        d.innerHTML = "";
      } else {
        d.innerHTML = "Please agree to the terms and conditions.";
        this.setState({ disabled: true });
      }
    }
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
      .then((response) =>
        response.json().then((data) => {
          this.populateChart(data);
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  populateChart(chartData) {
    let binData2 = this.findBins(chartData);
    this.setState({ binData: binData2 });
    let buttonText = [];
    for (let prop in chartData[0]) {
      if (prop !== "program_name") {
        buttonText.push(prop);
      }
    }
    let temp = document.getElementById("buttonplaceholder");
    for (let i = 0; i < buttonText.length; i++) {
      let button = document.createElement("button");
      let text = document.createTextNode(buttonText[i]);
      button.appendChild(text);
      button.addEventListener("click", (e) => {
        this.updateChart(e);
      });
      temp.appendChild(button);
    }
  }
  updateChart(event) {
    if (this.chart instanceof Chart) {
      this.chart.destroy();
    }
    const ctx = document.getElementById("myChart").getContext("2d");
    let dataTable = [];
    for (let i = 0; i < this.state.binData.length; i++) {
      if (this.state.binData[i].getBin().getGa() === event.path[0].innerText) {
        dataTable.push({
          label: this.state.binData[i].getStream(),
          data: this.state.binData[i].getBin().getData(),
          backgroundColor: HelperFunctions.getRandomColor(),
        });
      }
    }
    const labels = [1, 2, 3, 4];
    const data = {
      labels: labels,
      datasets: dataTable,
    };
    const config = {
      type: "bar",
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: event.path[0].innerText,
          position: "bottom",
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
    this.chart = new Chart(ctx, config);
  }
  findBins(data) {
    let dataBins = [];
    for (var i = 0; i < data.length; i++) {
      var program = data[i]["program_name"];
      for (let prop in data[i]) {
        if (prop !== "program_name") {
          if (dataBins.length > 0) {
            var added = false;
            for (let bin in dataBins) {
              if (
                dataBins[bin].getStream() === program &&
                dataBins[bin].getBin().getGa() === prop
              ) {
                let temp = dataBins[bin].getBin().getData();
                temp[data[i][prop] - 1]++;
                dataBins[bin].getBin().setData(temp);
                added = true;
                break;
              }
            }
            if (!added) {
              let temp = [0, 0, 0, 0];
              temp[data[i][prop] - 1]++;
              dataBins.push(new Bins(program, new Bin(prop, temp)));
            }
          } else {
            let temp = [0, 0, 0, 0];
            temp[data[i][prop] - 1]++;
            dataBins.push(new Bins(program, new Bin(prop, temp)));
          }
        }
      }
    }
    return dataBins;
  }
  convertToPdf() {
    let chart = window.document.getElementById("myChart");
    html2canvas(chart).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new pdfConverter("l", "pt");
      pdf.addImage(
        img,
        "png",
        chart.offsetLeft,
        chart.offsetTop,
        chart.clientWidth,
        chart.clientHeight
      );
      pdf.save("chart.pdf");
    });
  }

  setCheck() {
    this.checked = !this.checked;
    this.buttonLogic();
  }
  getState() {
    let r = window.confirm("Are you sure you wish to upload this spreadsheet?");
    if (r) {
      this.grabData();
    }
  }
  render() {
    return (
      <div>
        <div>Please submit the class' graduate attributes spreadsheet:</div>
        <input
          type="file"
          onChange={this.loadFileXLSX.bind(this)}
          style={{ margin: "10px" }}
        />
        <br />
        <div style={{ margin: "10px" }}>Add a Message: </div>
        <textarea
          id="Message"
          name="Messahe"
          rows="8"
          cols="70"
          style={{ margin: "10px" }}
        />
        <br />
        <div>
          <input
            type="checkbox"
            id="agree"
            onChange={this.setCheck.bind(this)}
            style={{ margin: "10px" }}
          />
          <label htmlFor="agree">
            {" "}
            I acknowledge that any previous existing data will be{" "}
            <b>removed and replaced</b> with the new uploaded data.
          </label>
        </div>
        <br />
        <button
          disabled={this.state.disabled}
          onClick={() => this.getState()}
          style={{ margin: "10px" }}
        >
          Upload Graduate Attributes
        </button>
        <div id="error"></div>
        <div id="buttonplaceholder"></div>
        <canvas id="myChart" width="400" height="400"></canvas>
        <div>
          <button
            onClick={(e) => this.convertToPdf(e)}
            style={{ margin: "10px" }}
          >
            Export 2 PDF
          </button>
        </div>
      </div>
    );
  }
}
