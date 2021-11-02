import * as XLSX from "xlsx";
import React from "react";
export default class InstructorFileChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { excelData: {} };
  }
  getState() {
    let tmp=document.getElementById("contents");
    tmp.innerHTML=this.state.excelData["Sheet1"];
  }
  excelToJson(reader) {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: "binary" });
    var data = {};
    wb.SheetNames.forEach(function (sheetName) {
      var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
      var rowString = JSON.stringify(rowObj);
      data[sheetName] = rowString;
    });
    this.setState({ excelData: data });
    console.log(data["Sheet1"])
  }

  loadFileXLSX(event) {
    var input = event.target;
    var reader = new FileReader();
    switch(input.files[0].name.split(".")[1]){
      case "xlsx":
        reader.onload = this.excelToJson.bind(this, reader);
        reader.readAsBinaryString(input.files[0]);
        break;
    default:
      break;
    }
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.loadFileXLSX.bind(this)} />
        <br />
        <button onClick={()=>this.getState()}>Show Json</button>
        <div id="contents"></div>
      </div>
    );
  }
}
