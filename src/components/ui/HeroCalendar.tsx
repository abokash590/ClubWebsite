"use client";

import React, { useState } from "react";
import { Event } from "@/types";
import "./HeroCalendar.css";

interface HeroCalendarProps {
  events: Event[];
}

export function HeroCalendar({ events }: HeroCalendarProps) {
  // The calendar MUST always be up-to-date (show the current month)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDay = today.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Map events to their specific day in the current month
  const eventsByDay: Record<number, Event[]> = {};
  events.forEach((event) => {
    const eDate = new Date(event.date);
    if (eDate.getFullYear() === year && eDate.getMonth() === month) {
      const day = eDate.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(event);
    }
  });

  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Generate blank cells for padding
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`blank-${i}`} className="hc-cell hc-cell--blank"></div>
  ));

  // Generate day cells
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dayEvents = eventsByDay[day];
    const hasEvent = dayEvents && dayEvents.length > 0;
    const isToday = day === currentDay;

    let cellClass = "hc-cell";
    if (isToday) cellClass += " hc-cell--today";
    if (hasEvent) cellClass += " hc-cell--event";

    return (
      <div 
        key={`day-${day}`} 
        className={cellClass}
        onMouseEnter={() => hasEvent && setHoveredEvent(dayEvents[0].title)}
        onMouseLeave={() => setHoveredEvent(null)}
      >
        <span className="hc-date-num">{day}</span>
        {hasEvent && <div className="hc-event-dot"></div>}
      </div>
    );
  });

  return (
    <div className="hero-calendar">
      <div className="hc-header">
        <h3 className="hc-month">{monthNames[month]} {year}</h3>
        <div className="hc-status">
          {hoveredEvent ? (
            <span className="hc-status-text hc-status-text--active">{hoveredEvent}</span>
          ) : (
            <span className="hc-status-text">HOVER OVER HIGHLIGHTED DATES</span>
          )}
        </div>
      </div>
      
      <div className="hc-grid">
        {days.map(d => (
          <div key={d} className="hc-day-label">{d}</div>
        ))}
        {blanks}
        {dayCells}
      </div>
    </div>
  );
}
