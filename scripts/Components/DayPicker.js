import React, { useState, useEffect } from "react";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";

const formatDate = (date) => {
  // formats a JS date to 'yyyy-mm-dd'
  var d = new Date(date),
    month = "" + (d.getMonth()),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

function extractDate(dob, type) {
    const value = dob?.split('-') || ['', '', ''];
    if (type === 'D')
        return value[2];
    else if (type === 'M')
        return value[1];
    else if (type === 'Y')
        return value[0];
}

export default function DatePicker({dob, setDob}) {

  const day = extractDate(dob, 'D');
  const month = extractDate(dob, 'M');
  const year = extractDate(dob, 'Y');

  const onChangeValue = (value, type) => {
    if (type === 'D')
        setDob(year + "-" + month + "-" + value);
    else if (type === 'M')
        setDob(year + "-" + parseInt(value)  + "-" + day);
    else if (type === 'Y')
        setDob(value + "-" + month + "-" + day);
  }


  return (
    <div style={{display: "flex",
        flexDirection:'row'}}>
      <YearPicker
        defaultValue={"select year"}
        reverse // default is ASCENDING
        required={true} // default is false
        value={year} // mandatory
        onChange={(year) => {
          // mandatory
          onChangeValue(year, 'Y');
        }}
        id={"year"}
        name={"year"}
        classes={"classes"}
        optionClasses={"option classes"}
      />
      <MonthPicker
        defaultValue={"select month"}
        numeric // to get months as numbers
        short // default is full name
        caps // default is Titlecase
        endYearGiven // mandatory if end={} is given in YearPicker
        year={year} // mandatory
        required={true} // default is false
        value={month} // mandatory
        onChange={(month) => {
          // mandatory
            onChangeValue(month, 'M')
        }}
        id={"month"}
        name={"month"}
        classes={"classes"}
        optionClasses={"option classes"}
      />
      <DayPicker
        defaultValue={"select day"}
        year={year} // mandatory
        month={month} // mandatory
        endYearGiven // mandatory if end={} is given in YearPicker
        required={true} // default is false
        value={day} // mandatory
        onChange={(day) => {
          // mandatory
          onChangeValue(day, 'D')
        }}
        id={"day"}
        name={"day"}
        classes={"classes"}
        optionClasses={"option classes"}
      />
    </div>
  );
}
