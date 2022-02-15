import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";

export default class CourseSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownValue: "Select Course Code",
      dropDownValue2: "Select Year Offered",
      dropDownValue3: "Select Term and Section",
    };
  }
  changeValue(text) {
    this.setState({ dropDownValue: text });
  }
  changeValue2(text) {
    this.setState({ dropDownValue2: text });
  }
  changeValue3(text) {
    this.setState({ dropDownValue3: text });
  }
  render() {
    return (
      <InputGroup id={this.props.id} className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={this.state.dropDownValue}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue(e.target.textContent)}>
              Course Code 1
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue(e.target.textContent)}>
              Course Code 2
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue(e.target.textContent)}>
              Course Code 3
            </div>
          </Dropdown.Item>
        </DropdownButton>
        <FormControl disabled={true} />
        <DropdownButton
          variant="outline-secondary"
          title={this.state.dropDownValue2}
          id="input-group-dropdown-2"
        >
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue2(e.target.textContent)}>
              Year 1
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue2(e.target.textContent)}>
              Year 2
            </div>
          </Dropdown.Item>{" "}
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue2(e.target.textContent)}>
              Year 3
            </div>
          </Dropdown.Item>
        </DropdownButton>
        <FormControl disabled={true} />
        <DropdownButton
          variant="outline-secondary"
          title={this.state.dropDownValue3}
          id="input-group-dropdown-3"
        >
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue3(e.target.textContent)}>
              Term 1
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue3(e.target.textContent)}>
              Term 2
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div onClick={(e) => this.changeValue3(e.target.textContent)}>
              Term 3
            </div>
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    );
  }
}
