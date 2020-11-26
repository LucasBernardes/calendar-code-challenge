import React, { useState } from 'react';
import moment from 'moment';
import './styles.css';

function Calendar() {
  const [monthOffset, setMonthOffset] = useState(0)
  const currentMonth = moment().add(monthOffset, 'months');
  const currentMonthDates = new Array(currentMonth.daysInMonth()).fill(null).map((x, i) => currentMonth.startOf('month').add(i, 'days'));
  const weekArray = moment.weekdays()
  
  const MonthChooserHeader = () => {
    return (
      <div className="calendar-chooser-header">
        <div onClick={() => setMonthOffset(monthOffset - 1)}>
          {' < '}
        </div>
        {currentMonth.format("MMMM, YYYY")}
        <div onClick={() => setMonthOffset(monthOffset + 1)}>
          {' > '}
        </div>
      </div>
    );
    
  }

  const HeaderCalendar = () => {
    return (
      <div className="calendar-week-header">
        {
          weekArray.map((weekdayItem) => {
            return (
              <div key={weekdayItem} className="calendar-week-header">
                {weekdayItem}
              </div>
            );
          })
        }
      </div>
    );
  }

  return (
    <>
      <MonthChooserHeader />
      <HeaderCalendar />
      <div className="calendar-wrapper">
        
        {
          currentMonthDates.map((date) => {
            console.log(date.day())
            return (
              <div className="calendar-item-wrapper" key={date.date()}>
                <div className={`${(date.day() === 0 || date.day() === 6) ? 'weekend' : 'calendar-item'}`}>
                  {date.date()}
                </div>
                
                {/* <>
                </> */}
              </div>
            );
          })
        }
      </div>
    </>
  );
}

export default Calendar;
