import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './styles.css';
import { fireEvent } from '@testing-library/react';

function Calendar() {
  const [monthOffset, setMonthOffset] = useState(1)
  const currentMonth = moment().add(monthOffset, 'months');
  const lastMonth = moment().add(monthOffset - 1, 'months');
  const nextMonth = moment().add(monthOffset + 1, 'months');
  // const currentMonthDates = new Array(currentMonth.daysInMonth()).fill(null).map((x, i) => currentMonth.startOf('month').add(i, 'days'));
  let currentMonthDates = Array.from({length: moment().daysInMonth()}, (x, i) => moment().startOf('month').add(i, 'days'));
  const weekArray = moment.weekdays()

  const getDaysByMonth = (month) => {
    console.log('month', month)
    const daysInMonth = moment(month).daysInMonth();
    return Array.from({length: daysInMonth}, (v, k) => k + 1)
  };

  console.log('mudou currentMonthDates', currentMonthDates[0].day())
  const date = currentMonthDates[0].day();
  if(date > 0) {
    for (var i = 0; i < date; i++) {
      currentMonthDates.unshift(moment().add(i + 1, 'months'))
    }
  }
  while(currentMonthDates.length < 35) {
    currentMonthDates.push(moment())
  }
  console.log(currentMonthDates)

  

  const events = [
    {
      name: 'Consulta médico',
      hour: '13:00',
    },
    {
      name: 'Lavar carro',
      hour: '17:00',
    },
    {
      name: 'Cachorro Petshop',
      hour: '12:00',
    },
    {
      name: 'Entregar Trabalho',
      hour: '17:20',
    },
    {
      name: 'Consulta médico',
      hour: '13:10',
    },
    // {
    //   name: 'Lavar carro',
    //   hour: '17:00',
    // },
    // {
    //   name: 'Cachorro Petshop',
    //   hour: '12:00',
    // },
    // {
    //   name: 'Entregar Trabalho',
    //   hour: '17:00',
    // }
  ];

  const RenderEvents = () => {
    return (
      <div className="calendar-event-wrapper">
        {
          events.map((event) => {
            return (
              <div key={event.hour} className="calendar-event-item">
                <span className="event-circle"></span>
                <span className="event-title">
                  {event.name && event.name}
                </span>
                <span className="event-hour">{event.hour && event.hour}</span>
              </div>
            );
          })
        }
      </div>
    );
  }

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
              <div key={weekdayItem} className="calendar-week-header" style={{ paddingLeft: 1 }}>
                {weekdayItem}
              </div>
            );
          })
        }
      </div>
    );
  }
  console.log(currentMonthDates)
  return (
    <>
      <MonthChooserHeader />
      <HeaderCalendar />
      <div className="calendar-wrapper">
        {
          currentMonthDates.map((date) => {
            console.log(date)
            return (
              <div className="calendar-item-wrapper" key={date.format('L')}>
                <div className={`${(date.day() === 0 || date.day() === 6) ? 'weekend' : 'calendar-item'}`}>
                  <div className="event-date-number">
                    {date.date()}
                  </div>
                  <RenderEvents />
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
