import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Result from "../Componenet/Results";
import Accordion from "react-bootstrap/Accordion";
import MultiRangeSlider from "multi-range-slider-react";
import "../Styling/SliderStyle.css";
import {usePetContext} from "../Libs/PetContext";
import "../Styling/Grid.css";

function SearchPage() {
  const {handleSearch, savedPets} = usePetContext();

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [minValueW, setMinValueW] = useState(0);
  const [maxValueW, setMaxValueW] = useState(100);
  const [searchType, setSearchType] = useState(true);
  const [searchParam, setSearchParam] = useState({
    type: "",
    adoptionStatus: [],
    name: "",
  });
  const handleChange = (e) => {
    setSearchParam({...searchParam, [e.target.name]: e.target.value});
  };

  const handleCheck = ({target}) => {
    const checkStatus = target.value;
    let currentStatus = searchParam.adoptionStatus;
    target.checked
      ? currentStatus.push(checkStatus)
      : (currentStatus = currentStatus.filter(
          (status) => status !== checkStatus
        ));
    setSearchParam({...searchParam, adoptionStatus: currentStatus});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const basicSearch = {type: searchParam.type};
    const advSearch = {
      ...searchParam,
      height: {min: minValue, max: maxValue},
      weight: {min: minValueW, max: maxValueW},
    };
    searchType ? handleSearch(basicSearch) : handleSearch(advSearch);
  };
  return (
    <div className="w-100 location">
      <div className="form-container">
        <h1>Search your Friend!</h1>
        <Form onSubmit={handleSubmit} className="w-75">
          <Form.Select name="type" onChange={handleChange}>
            <option value="">All types</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </Form.Select>
          <Accordion>
            <Accordion.Item style={{border: "none"}} eventKey="0">
              <Accordion.Header onClick={() => setSearchType(!searchType)}>
                Advanced Search
              </Accordion.Header>
              <Accordion.Body>
                <h6>Adoption Status</h6>
                <div className="d-flex justify-content-start">
                  <Form.Check
                    onChange={handleCheck}
                    name="Adopted"
                    value="Adopted"
                    id="Adopted"
                    label="Adopted"
                  />
                  <Form.Check
                    onChange={handleCheck}
                    className="mx-2"
                    name="Fostered"
                    value="Fostered"
                    id="Fostered"
                    label="Fostered"
                  />
                  <Form.Check
                    onChange={handleCheck}
                    className="mx-2"
                    name="Available"
                    value="Available"
                    id="Available"
                    label="Available"
                  />
                </div>
                <div>
                  <h6>Weight:</h6>
                  <div>
                    min:{minValueW} max:{maxValueW}
                  </div>
                  <MultiRangeSlider
                    min={0}
                    max={100}
                    step={1}
                    ruler={false}
                    barLeftColor={"white"}
                    barRightColor={"white"}
                    barInnerColor={"#74B9FF"}
                    minValue={minValueW}
                    maxValue={maxValueW}
                    onChange={(e) => {
                      setMinValueW(e.minValue);
                      setMaxValueW(e.maxValue);
                    }}
                  ></MultiRangeSlider>
                </div>
                <div>
                  <h6>Height:</h6>
                  <div>
                    min:{minValue} max:{maxValue}
                  </div>
                  <MultiRangeSlider
                    min={0}
                    max={100}
                    step={1}
                    ruler={false}
                    barLeftColor={"white"}
                    barRightColor={"white"}
                    barInnerColor={"#74B9FF"}
                    minValue={minValue}
                    maxValue={maxValue}
                    onChange={(e) => {
                      setMinValue(e.minValue);
                      setMaxValue(e.maxValue);
                    }}
                  ></MultiRangeSlider>
                </div>
                <div>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="name"
                      type="text"
                      placeholder="First Name"
                    />
                  </Form.Group>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="button-container">
            <button type="submit">Search</button>
          </div>
        </Form>
      </div>
      <Result />
    </div>
  );
}
export default SearchPage;
