import React from "react";

export default class ReportGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      dataMap: new Map(),
    };
    this.addCourse = this.addCourse.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
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
    let button = document.createElement("button");
    button.id = "GAButton";
    button.innerHTML = "Confirm GA";
    button.onclick = function () {
      let del = document.getElementById("courseSelection");
      while (del.firstChild) {
        del.firstChild.remove();
      }
      let ga = JSON.stringify({
        GA: document.querySelector('input[name="GARad"]:checked').value,
      });
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
            let map = new Map();
            let set = new Set();
            map.set("term", set);
            for (let i = 0; i < data.length; i++) {
              let arr = data[i].table_name.split("_").filter((e) => e !== "");
              for (let j = 0; j < arr.length - 1; j++) {
                if (j === 0) {
                  let set = map.get("term");
                  set.add(arr[j]);
                  map.set("term", set);
                }
                if (typeof map.get(arr[j]) == "undefined") {
                  let set = new Set();
                  set.add(arr[j + 1]);
                  map.set(arr[j], set);
                } else {
                  let set = map.get(arr[j]);
                  set.add(arr[j + 1]);
                  map.set(arr[j], set);
                }
              }
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
    radio.appendChild(button);
  }
  populateYear(div, val, divVal) {
    let year = document.createElement("select");
    year.id = "year" + divVal;
    let optionYear = document.createElement("option");
    optionYear.selected = "true";
    optionYear.disabled = "disabled";
    optionYear.innerHTML = "Select Year";
    year.appendChild(optionYear);
    let map = this.state.dataMap;
    let arr = Array.from(map.get(val));
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
      this.populateCourse(div, document.getElementById(year.id).value, divVal);
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
    let map = this.state.dataMap;
    let arr = Array.from(map.get(val));
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
        document.getElementById(course.id).value,
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
    let map = this.state.dataMap;
    let arr = Array.from(map.get(val));
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
        document.getElementById(number.id).value,
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
    let map = this.state.dataMap;
    let arr = Array.from(map.get(val));
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
    let map = this.state.dataMap;
    let arr = Array.from(map.get("term"));
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
      this.populateYear(div, document.getElementById(term.id).value, val);
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
  parseSelect() {
    let val = [];
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
    );
  }
  render() {
    return (
      <div id="parent">
        <div id="radio">
          Graduate Attributes (Please select one to start building the report):
          <br />
        </div>
        <div id="courseSelection"></div>
        <button onClick={this.addCourse}>Add Course</button>
        <br />
        <button onClick={this.parseSelect.bind(this)}>Build Report</button>
      </div>
    );
  }
}
