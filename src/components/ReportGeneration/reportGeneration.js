import React from "react";
import * as Chart from "chart.js";
import ProgramGAMapping from "../../util/DataObjects/ProgramGAMapping";
import HelperFunctions from "../../util/HelperFunctions";
import jsPDF from "jspdf";
import font1 from "../../util/fonts/Lato-Light-normal";
import font2 from "../../util/fonts/Lato-Regular-normal";
import ChartDataLabels from "chartjs-plugin-datalabels";
export default class ReportGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      dataMap: new Map(),
      pdf: null,
    };
    this.addCourse = this.addCourse.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  createRadioButtons() {
    let radio = document.getElementById("radio");
    for (let i = 1; i <= 12; i++) {
      let input = document.createElement("input");
      input.type = "radio";
      input.name = "GARad";
      input.id = " GA " + i;
      input.value = i;
      radio.appendChild(input);
      let label = document.createElement("label");
      label.htmlFor = " GA " + i;
      label.innerHTML = " GA " + i;
      radio.appendChild(label);
      radio.appendChild(document.createElement("br"));
    }
    return radio;
  }
  createCheckBox() {
    let checkBox = document.getElementById("checkBox");
    let allCourses = HelperFunctions.getCourseMapping();
    let keys = Object.keys(allCourses);
    let button = document.createElement("button");
    button.id = "selectAll";
    button.innerHTML = "Select All";
    button.onclick = function () {
      let checkboxes = document.querySelectorAll('input[type="checkbox"]');
      for (var i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          checkboxes[i].checked = true;
        }
      }
    };
    checkBox.append(button);
    checkBox.append(document.createElement("br"));
    for (let i = 0; i < keys.length; i++) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.name = "programName";
      input.id = allCourses[keys[i]];
      input.value = allCourses[keys[i]];
      checkBox.appendChild(input);
      let label = document.createElement("label");
      label.htmlFor = allCourses[keys[i]];
      label.innerHTML = keys[i];
      checkBox.appendChild(label);
      checkBox.appendChild(document.createElement("br"));
    }
    return checkBox;
  }
  componentDidMount() {
    this.createRadioButtons();
    let checkBox = this.createCheckBox();
    let button = document.createElement("button");
    button.id = "GAButton";
    button.innerHTML = "Confirm GA and Programs";
    button.onclick = function () {
      let del = document.getElementById("courseSelection");
      while (del.firstChild) {
        del.firstChild.remove();
      }
      let courses = document.querySelectorAll('input[type="checkbox"]:checked');
      let arr = [];
      courses.forEach((e) => {
        arr.push(e.value);
      });
      let GA = document.querySelector('input[name="GARad"]:checked').value;
      console.log(arr);
      let ga = JSON.stringify({
        GA: GA,
        programs: arr,
      });
      console.log(ga);
      fetch(
        process.env.NODE_ENV === "production"
          ? "https://graphing-report-tool.herokuapp.com/queryGA"
          : "/queryGA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: ga,
        }
      )
        .then((res) => {
          res.json().then((data) => {
            let map = [];
            for (let i = 0; i < data.length; i++) {
              let arr = data[i].table_name.split("_").filter((e) => e !== "");
              map.push(arr);
            }
            this.setState({
              dataMap: map,
            });
            this.addCourse();
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }.bind(this);
    checkBox.appendChild(button);
  }
  getUniqueVals(arr) {
    let set = new Set();
    if (arr.length === 0) {
      for (let i = 0; i < this.state.dataMap.length; i++) {
        set.add(this.state.dataMap[i][0]);
      }
    } else {
      for (let i = 0; i < this.state.dataMap.length; i++) {
        if (arr.every((r) => this.state.dataMap[i].includes(r))) {
          set.add(this.state.dataMap[i][arr.length]);
        }
      }
    }
    return Array.from(set);
  }
  populateYear(div, val, divVal) {
    let year = document.createElement("select");
    year.id = "year" + divVal;
    let optionYear = document.createElement("option");
    optionYear.selected = "true";
    optionYear.disabled = "disabled";
    optionYear.innerHTML = "Select Year";
    year.appendChild(optionYear);
    let arr = this.getUniqueVals(val);
    for (let i = 0; i < arr.length; i++) {
      let optionYear = document.createElement("option");
      optionYear.value = arr[i];
      optionYear.innerHTML = arr[i];
      year.appendChild(optionYear);
    }
    year.onchange = function () {
      this.remove("course" + divVal);
      this.remove("number" + divVal);
      this.remove("section" + divVal);
      this.populateCourse(
        div,
        [val[0], document.getElementById(year.id).value],
        divVal
      );
    }.bind(this);
    div.insertBefore(year, div.lastChild);
  }
  populateCourse(div, val, divVal) {
    let course = document.createElement("select");
    course.id = "course" + divVal;
    let optionCourse = document.createElement("option");
    optionCourse.selected = "true";
    optionCourse.disabled = "disabled";
    optionCourse.innerHTML = "Select Course";
    course.appendChild(optionCourse);
    let arr = this.getUniqueVals(val);
    for (let i = 0; i < arr.length; i++) {
      let optionCourse = document.createElement("option");
      optionCourse.value = arr[i];
      optionCourse.innerHTML = arr[i];
      course.appendChild(optionCourse);
    }
    course.onchange = function () {
      this.remove("number" + divVal);
      this.remove("section" + divVal);
      this.populateNumber(
        div,
        [val[0], val[1], document.getElementById(course.id).value],
        divVal
      );
    }.bind(this);
    div.insertBefore(course, div.lastChild);
  }
  populateNumber(div, val, divVal) {
    let number = document.createElement("select");
    number.id = "number" + divVal;
    let optionNumber = document.createElement("option");
    optionNumber.selected = "true";
    optionNumber.disabled = "disabled";
    optionNumber.innerHTML = "Select Number";
    let arr = this.getUniqueVals(val);
    number.appendChild(optionNumber);
    for (let i = 0; i < arr.length; i++) {
      let optionNumber = document.createElement("option");
      optionNumber.value = arr[i];
      optionNumber.innerHTML = arr[i];
      number.appendChild(optionNumber);
    }
    number.onchange = function () {
      this.remove("section" + divVal);
      this.populateSection(
        div,
        [val[0], val[1], val[2], document.getElementById(number.id).value],
        divVal
      );
    }.bind(this);
    div.insertBefore(number, div.lastChild);
  }
  populateSection(div, val, divVal) {
    let section = document.createElement("select");
    section.id = "section" + divVal;
    let optionSection = document.createElement("option");
    optionSection.selected = "true";
    optionSection.disabled = "disabled";
    optionSection.innerHTML = "Select Section";
    section.appendChild(optionSection);
    let arr = this.getUniqueVals(val);
    for (let i = 0; i < arr.length; i++) {
      let optionSection = document.createElement("option");
      optionSection.value = arr[i];
      optionSection.innerHTML = arr[i];
      section.appendChild(optionSection);
    }
    div.insertBefore(section, div.lastChild);
  }
  populate(div, val) {
    let term = document.createElement("select");
    term.id = "term" + val;
    let optionTerm = document.createElement("option");
    optionTerm.selected = "true";
    optionTerm.disabled = "disabled";
    optionTerm.innerHTML = "Select Term";
    term.appendChild(optionTerm);
    let val2 = [];
    let arr = this.getUniqueVals(val2);
    for (let i = 0; i < arr.length; i++) {
      let optionTerm = document.createElement("option");
      optionTerm.value = arr[i];
      optionTerm.innerHTML = arr[i];
      term.appendChild(optionTerm);
    }
    term.onchange = function () {
      this.remove("year" + val);
      this.remove("course" + val);
      this.remove("number" + val);
      this.remove("section" + val);
      this.populateYear(div, [document.getElementById(term.id).value], val);
    }.bind(this);
    div.appendChild(term);
  }
  remove(x) {
    let temp = document.getElementById(x);
    if (temp !== null) {
      temp.remove();
    }
  }
  addCourse() {
    let courseSelection = document.getElementById("courseSelection");
    let div = document.createElement("div");
    div.id = "selection" + this.state.id;
    let val = this.state.id;
    this.populate(div, val);
    let but = document.createElement("button");
    but.id = "button" + this.state.id;
    but.innerHTML = "Remove Course";
    let i = this.state.id;
    but.onclick = function () {
      let div = document.getElementById("selection" + i);
      div.remove();
    };
    div.appendChild(but);
    courseSelection.appendChild(div);
    this.setState({
      id: this.state.id + 1,
    });
  }
  parseSelect(flag) {
    let val = [];
    let programs = document.querySelectorAll('input[type="checkbox"]:checked');
    let arr = [];
    programs.forEach((e) => {
      arr.push(e.value);
      val.push({ program: e.value });
    });
    //val["program"] = arr;

    //val.push({ program: programs });
    console.log(val);
    val.push({
      GA: document.querySelector('input[name="GARad"]:checked').value,
    });
    for (let i = 0; i < this.state.id; i++) {
      let selectionDiv = document.getElementById("selection" + i);
      if (selectionDiv !== null) {
        if (selectionDiv.childElementCount === 6) {
          let term = document.getElementById("term" + i).value;
          let year = document.getElementById("year" + i).value;
          let course = document.getElementById("course" + i).value;
          let number = document.getElementById("number" + i).value;
          let section = document.getElementById("section" + i).value;
          if (section !== "Select Section") {
            let tname =
              "_" +
              term +
              "_" +
              year +
              "_" +
              course +
              "_" +
              number +
              "_" +
              section +
              "_";
            val.push({ tablename: tname });
          }
        }
      }
    }
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://graphing-report-tool.herokuapp.com/courseSubmission"
        : "/courseSubmission",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }
    ).then((res) => {
      res.json().then((data) => {
        let dataMapping = [];
        let gas = data.GAS;
        let courses = data.Courses;
        for (let i in courses) {
          let program = new ProgramGAMapping(courses[i]);
          for (let j in data[courses[i]]) {
            let arr = data[courses[i]][j];
            let programName = arr.program_name;
            for (let ga in gas) {
              if (Object.keys(arr).includes(gas[ga])) {
                program.addlabels(programName, gas[ga], arr[gas[ga]]);
              }
            }
          }
          dataMapping.push(program);
        }
        let gaMapping = new Map();
        for (let ga in gas) {
          for (let course in dataMapping) {
            for (let c in dataMapping[course].getMapping()) {
              if (dataMapping[course].getMapping()[c].getGA() === gas[ga]) {
                if (typeof gaMapping.get(gas[ga]) !== "undefined") {
                  let set = gaMapping.get(gas[ga]);
                  set.add(dataMapping[course].getCourseCode());
                } else {
                  let set = new Set();
                  set.add(dataMapping[course].getCourseCode());
                  gaMapping.set(gas[ga], set);
                }
              }
            }
          }
        }
        this.configureChart(gaMapping, dataMapping, flag);
      });
    });
  }
  configureChart(gaMapping, dataMapping, flag) {
    if (flag) {
      this.createTitlePage();
    }
    let keys = Array.from(gaMapping.keys());
    for (let i = 0; i < keys.length; i++) {
      if (flag) {
        this.state.pdf.text("GA " + keys[i], 14.2, 21.4);
      }
      let arr = Array.from(gaMapping.get(keys[i]));
      for (let j = 0; j < arr.length; j++) {
        let val = arr[j];
        for (let k = 0; k < dataMapping.length; k++) {
          if (dataMapping[k].getCourseCode() === val) {
            for (let l = 0; l < dataMapping[k].getMapping().length; l++) {
              if (dataMapping[k].getMapping()[l].getGA() === keys[i]) {
                if (j % 2 === 0) {
                  this.updateChart(
                    dataMapping[k].getMapping()[l],
                    dataMapping[k].getCourseCode(),
                    14.3,
                    27.5,
                    flag
                  );
                } else {
                  this.updateChart(
                    dataMapping[k].getMapping()[l],
                    dataMapping[k].getCourseCode(),
                    14.3,
                    155.6,
                    flag
                  );
                  if (j !== arr.length - 1 && flag) {
                    this.state.pdf.addPage();
                  }
                }
              }
            }
          }
        }
      }
      if (i !== keys.length - 1 && flag) {
        this.state.pdf.addPage();
      }
    }
    if (flag) {
      this.state.pdf.save("chart.pdf");
    }
  }
  configureDataSet(data) {
    let fixedData = [];
    data.forEach((val, key) => {
      fixedData.push({
        label: key,
        backgroundColor: HelperFunctions.getReportColour(key),
        data: val,
      });
    });
    return fixedData;
  }
  createTitlePage() {
    font1();
    font2();
    let pdf = new jsPDF("p", "mm", "a4");
    let image = new Image();
    image.src = process.env.PUBLIC_URL + "/carletonLogo.png";
    pdf.addImage(image, "png", 21.8, 45, 163, 53);
    pdf.setFont("Lato-Regular", "normal");
    pdf.setFontSize(28);
    pdf.text("Faculty of Engineering", 57.4, 108.5);
    pdf.setFontSize(18);
    pdf.text("Department of Systems and Computer Engineering", 34.9, 127);
    pdf.text("Month Year", 87.3, 140);
    pdf.text("Graduate Attribute Report", 68.8, 177.3);
    pdf.addPage();
    this.setState({
      pdf: pdf,
    });
  }
  updateChart(dataMapping, courseCode, x, y, flag) {
    const ctx = document.createElement("canvas");
    ctx.width = 681;
    ctx.height = 388;
    const labels = ["1", "2", "3", "4"];
    let fixedData = this.configureDataSet(dataMapping.getData());
    const data = {
      labels: labels,
      datasets: fixedData,
    };
    let c = new Chart(ctx, {
      type: "bar",
      data: data,
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets;
              for (let i = 0; i < dataArr.length; i++) {
                sum += dataArr[i].data[ctx.dataIndex];
              }
              let percentage = ((value * 100) / sum).toFixed(2);
              if (percentage > 0) {
                return percentage + "%";
              } else {
                return "";
              }
            },
          },
        },
        maintainAspectRatio: false,
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: courseCode + " GA " + dataMapping.getGA(),
        },
        animation: false,
        responsive: false,
        scales: {
          yAxes: [
            {
              stacked: true,
            },
          ],
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
    if (flag) {
      this.addImage(c, x, y);
    } else {
      document.getElementsByTagName("body")[0].appendChild(ctx);
    }
  }
  addImage(c, x, y) {
    this.state.pdf.addImage(c.toBase64Image(), "PNG", x, y, 180.2, 102.7);
  }
  removeCharts() {
    document.querySelectorAll("canvas").forEach((e) => e.remove());
  }
  render() {
    return (
      <div id="parent">
        <div id="radio">
          Graduate Attributes (Please select one to start building the report):
          <br />
        </div>
        <div id="checkBox">
          Presented Programs (Please select one to start building the report):
          <br />
        </div>
        <div id="courseSelection"></div>
        <button onClick={this.addCourse}>Add Course</button>
        <br />
        <button onClick={this.parseSelect.bind(this, true)}>
          Build PDF Report
        </button>
        <br />
        <button onClick={this.parseSelect.bind(this, false)}>
          View Charts in Browser
        </button>
        <br />
        <button onClick={this.removeCharts.bind(this)}>
          Remove all Charts
        </button>
      </div>
    );
  }
}
