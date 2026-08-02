import React from "react";
import ReactDatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

interface Props extends Omit<DatePickerProps, "onChange" | "value"> {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  className?: string;
}

export function DatePicker({ value, onChange, placeholderText, className, ...props }: Props) {
  return (
    <div className="custom-datepicker-wrapper">
      {/* @ts-ignore */}
      <ReactDatePicker
        selected={value}
        onChange={(date: any) => onChange(date as Date | null)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText={placeholderText || "Select date and time"}
        className={`brutalist-input ${className || ""}`}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        {...props}
      />
    </div>
  );
}
