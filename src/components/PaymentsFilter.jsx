import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../css/react_dates_overrides.css";

function PaymentsFilter(props) {
  // const [focusedInput, setFocusedInput] = useState();
  const [startDateFocused, setStartDateFocused] = useState();
  const [endDateFocused, setEndDateFocused] = useState();
  const [displayPopup, setDisplayPopup] = useState(false);

  const FilterPanel = () => (
    <div
      className="popupContainer hide"
      style={{ display: displayPopup && "block" }}
    >
      <div
        className="popupBackdrop"
        onClick={() => setDisplayPopup(false)}
      ></div>
      <div className="popupContent">
        <div className="filterPanel">
          {/* Payment Type */}
          <div className="filterLabel">Payment Type</div>
          <select
            className="inputContainer filterInputContainer mt-2 w-100"
            onChange={(e) => {
              props.setPaymentType(e.target.value);
            }}
            defaultValue={props.paymentType}
          >
            <option value="all">Show All</option>
            <option value="offering">Offering</option>
            <option value="tithe">Tithe</option>
            <option value="prophet offering">Prophet Offering</option>
            <option value="cathedral Sacrifice">Cathedral Sacrifice</option>
            <option value="first fruit">First Fruit</option>
            <option value="thanksgiving offering">Thanksgiving Offering</option>
          </select>
          {/* start date */}
          <div className="filterLabel mt-3 mb-2">Start Date</div>
          <SingleDatePicker
            date={props.startDate}
            onDateChange={(date) => props.setStartDate(date)}
            focused={startDateFocused}
            onFocusChange={({ focused }) => setStartDateFocused(focused)}
            id="date"
            showDefaultInputIcon
            small
            showClearDate
            numberOfMonths={1}
            isOutsideRange={() => false}
            displayFormat="MMM DD, YYYY"
          />
          {/* End Date */}
          <div className="filterLabel mt-3 mb-2">End Date</div>
          <SingleDatePicker
            date={props.endDate}
            onDateChange={(date) => props.setEndDate(date)}
            focused={endDateFocused}
            onFocusChange={({ focused }) => setEndDateFocused(focused)}
            id="date"
            showDefaultInputIcon
            small
            showClearDate
            numberOfMonths={1}
            isOutsideRange={() => false}
            displayFormat="MMM DD, YYYY"
          />
          <div className="d-flex align-items-center justify-content-between mt-3">
            {/* reset button */}
            <button
              className="mainBtn filterResetBtn text-align-center d-flex align-items-center justify-content-center mt-3"
              onClick={() => {
                props.resetFilter();
                setDisplayPopup(false);
              }}
            >
              Reset
            </button>
            {/* filter button */}
            <button
              className="mainBtn text-align-center d-flex align-items-center justify-content-center mt-3"
              onClick={() => {
                props.handleFilter();
                setDisplayPopup(false);
              }}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="header">
        <div className="container px-0">
          <div className="d-flex align-items-center justify-content-between">
            {/* filter */}
            <div className="d-flex filterContainer align-items-center">
              {/* filter btn */}
              <div className="popupWrapper">
                <div
                  className={
                    props.filtered
                      ? "d-flex align-items-center filterBtnActive"
                      : "d-flex align-items-center filterBtn"
                  }
                  onClick={() => setDisplayPopup((prevState) => !prevState)}
                >
                  <MdFilterList style={{ fontSize: "1.3rem" }} />
                  {props.filtered ? (
                    <span className="ml-1 d-none d-md-flex">Filter Active</span>
                  ) : (
                    <span className="ml-1 d-none d-md-flex">Filter</span>
                  )}
                </div>

                <FilterPanel />
              </div>
              {/* vertical divider */}
              <div className="vl"></div>
              {/* search */}
              <input
                className="inputContainer filterInputContainer d-flex px-3"
                onChange={(e) => {
                  props.setPaymentReference(e.target.value);
                }}
                placeholder="Search reference"
              ></input>
            </div>
            {/* Payment Count */}
            <div className="filterContainer align-items-center filterLabel ml-3 ml-md-0">
              Total: {props.totalPayments}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentsFilter;
