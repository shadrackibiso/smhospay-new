import React, { useState } from "react";
// import { MdTune } from "react-icons/md";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../css/react_dates_overrides.css";

function UsersFilter(props) {
  const [focusedInput, setFocusedInput] = useState();

  return (
    <>
      <div className="header d-none d-md-flex">
        <div className="container px-0">
          <div className="d-flex align-items-center justify-content-between">
            {/* filter */}
            <div className="d-flex filterContainer align-items-center">
              <div className="filterLabel">
                {/* <MdTune /> */}
                <span className="ml-1">Search</span>
              </div>

              {/* search */}
              <input
                className="inputContainer filterInputContainer d-flex mx-3"
                onChange={(e) => {
                  props.setUserEmail(e.target.value);
                }}
                placeholder="User Email..."
              ></input>

              {/* date filter */}
              <DateRangePicker
                startDate={props.startDate}
                startDateId="start-date"
                endDate={props.endDate}
                endDateId="end-date"
                onDatesChange={({ startDate, endDate }) => {
                  props.setStartDate(startDate);
                  props.setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                isOutsideRange={() => false}
                showClearDates
                showDefaultInputIcon
                small
                numberOfMonths={1}
                displayFormat="MMM DD, YYYY"
              />

              {/* filter button */}
              <button
                className="mainBtn text-align-center d-flex align-items-center justify-content-center ml-3"
                onClick={props.handleFilter}
              >
                Search
              </button>
            </div>

            {/* Payment Count */}
            <div className="d-flex filterContainer align-items-center filterLabel">
              Total: {props.totalUsers}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersFilter;
