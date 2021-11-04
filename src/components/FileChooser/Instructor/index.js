import * as XLSX from "xlsx";
import * as csvToJson from "convert-csv-to-json";
import React from "react";
export default class InstructorFileChooser extends React.Component {
  constructor(props) {
    super(props);
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
    for(let i=0;i<wb.SheetNames.length;i++){
      var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets["Sheet1"]);
      var rowString = JSON.stringify(rowObj);
      data[i] = rowString;
    }
    this.setState({ excelData: data });
  }
  csvToJson(reader){
    var fileData = reader.result;
    var lines=fileData.split("\n")
    var result = [];
    var headers=lines[0].split(",");
    var data = {};
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    data[0]=JSON.stringify(result)
    this.setState({ excelData: data });
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
        default:
          break;
      }
    }
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.loadFileXLSX.bind(this)} />
        <br />
        <button onClick={() => this.getState()}>Show Json</button>
        <div id="contents"></div>
      </div>
    );
  }
}
