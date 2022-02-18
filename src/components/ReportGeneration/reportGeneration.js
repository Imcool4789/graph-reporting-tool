import React from "react";

export default class ReportGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.addCourse = this.addCourse.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addCourse = this.addCourse.bind(this);
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
            console.log(res);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    radio.appendChild(button);
    let courseSelection = document.getElementById("courseSelection");
    let div = document.createElement("div");
    div.id = "selection" + this.state.id;
    let term = this.populateTerm();
    div.appendChild(term);
    let year = this.populateYear();
    div.appendChild(year);
    let course = this.populateCourse();
    div.appendChild(course);
    let number = this.populateNumber();
    div.appendChild(number);
    let section = this.populateSection();
    div.appendChild(section);
    let but = document.createElement("button");
    but.id = "button" + this.state.id;
    but.innerHTML = "Remove Course";
    let i = this.state.id;
    but.onclick = function () {
      let div = document.getElementById("selection" + i);
      div.remove();
    };
    div.appendChild(but);
    div.appendChild(document.createElement("br"));
    courseSelection.appendChild(div);
    this.setState({
      id: this.state.id + 1,
    });
  }
  populateTerm() {
    let term = document.createElement("select");
    term.id = "term" + this.state.id;
    let optionTerm = document.createElement("option");
    optionTerm.selected = "true";
    optionTerm.disabled = "disabled";
    optionTerm.innerHTML = "Select Term";
    term.appendChild(optionTerm);
    return term;
  }
  populateYear() {
    let year = document.createElement("select");
    year.id = "year" + this.state.id;
    let optionYear = document.createElement("option");
    optionYear.selected = "true";
    optionYear.disabled = "disabled";
    optionYear.innerHTML = "Select Year";
    year.appendChild(optionYear);
    return year;
  }
  populateCourse() {
    let course = document.createElement("select");
    course.id = "course" + this.state.id;
    let optionCourse = document.createElement("option");
    optionCourse.selected = "true";
    optionCourse.disabled = "disabled";
    optionCourse.innerHTML = "Select Course";
    course.appendChild(optionCourse);
    return course;
  }
  populateNumber() {
    let number = document.createElement("select");
    number.id = "number" + this.state.id;
    let optionNumber = document.createElement("option");
    optionNumber.selected = "true";
    optionNumber.disabled = "disabled";
    optionNumber.innerHTML = "Select Course";
    number.appendChild(optionNumber);
    return number;
  }
  populateSection() {
    let section = document.createElement("select");
    section.id = "section" + this.state.id;
    let optionSection = document.createElement("option");
    optionSection.selected = "true";
    optionSection.disabled = "disabled";
    optionSection.innerHTML = "Select Course";
    section.appendChild(optionSection);
    return section;
  }
  addCourse() {
    let courseSelection = document.getElementById("courseSelection");
    let div = document.createElement("div");
    div.id = "selection" + this.state.id;
    let term = this.populateTerm();
    div.appendChild(term);
    let year = this.populateYear();
    div.appendChild(year);
    let course = this.populateCourse();
    div.appendChild(course);
    let number = this.populateNumber();
    div.appendChild(number);
    let section = this.populateSection();
    div.appendChild(section);
    let but = document.createElement("button");
    but.id = "button" + this.state.id;
    but.innerHTML = "Remove Course";
    let i = this.state.id;
    but.onclick = function () {
      let div = document.getElementById("selection" + i);
      div.remove();
    };
    div.appendChild(but);
    div.appendChild(document.createElement("br"));
    courseSelection.appendChild(div);
    this.setState({
      id: this.state.id + 1,
    });
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
        <button>Build Report</button>
      </div>
    );
  }
}
