import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import Modal from './Modal';
import './styles.css';

function Calendar() {
  const events = useSelector(state => state.data);
  const [addNewEventVisible, setAddNewEventVisible] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(moment().add(0, 'months'))
  const [selectedIndex, setSelectedIndex] = useState(null);
  // const [lastMonth, setLastMonth] = useState(Array.from({length: moment().add(monthOffset - 1,'months').daysInMonth()}, (x, i) => moment().add(monthOffset - 1,'months').startOf('month').add(i, 'days')))
  const [nextMonth, setNextMonth] = useState(Array.from({length: moment().add(monthOffset + 1,'months').daysInMonth()}, (x, i) => moment().add(monthOffset + 1,'months').startOf('month').add(i, 'days')))
  const [currentMonthDates, setCurrentMonthDates] = useState(Array.from({length: moment().add(monthOffset,'months').daysInMonth()}, (x, i) => moment().add(monthOffset,'months').startOf('month').add(i, 'days')))
  // const lastMonth = moment().add(monthOffset - 1, 'months');
  // const nextMonth = moment().add(monthOffset + 1, 'months');
  // const currentMonthDates = new Array(currentMonth.daysInMonth()).fill(null).map((x, i) => currentMonth.startOf('month').add(i, 'days'));
  const weekArray = moment.weekdays()

  useEffect(() => {
    console.log(events)
  },[events])
  // useEffect(() => {
  //   currentMonthDates = [];
  // },[monthOffset])

  // const getDaysByMonth = (month) => {
  //   console.log('month', month)
  //   const daysInMonth = moment(month).daysInMonth();
  //   return Array.from({length: daysInMonth}, (v, k) => k + 1)
  // };

  useEffect(() => {
    // setCurrentMonth(moment().add(monthOffset, 'months'));
    // setNextMonth(Array.from({length: moment().add(monthOffset + 1,'months').daysInMonth()}, (x, i) => moment().add(monthOffset + 1,'months').startOf('month').add(i, 'days')));
    // setCurrentMonthDates(Array.from({length: moment().add(monthOffset,'months').daysInMonth()}, (x, i) => moment().add(monthOffset,'months').startOf('month').add(i, 'days')));
  },[monthOffset])

  
  
  useEffect(() => {
    // console.log('mudou currentMonthDates', currentMonthDates[0].day())
    // const date = currentMonthDates[0].day();
    // if(date > 0) {
    //   for (var i = 0; i < date; i++) {
    //     currentMonthDates.unshift(currentMonthDates[0].add(i - 1, 'days'))
    //   }
    // }
    // let auxArray = []
    // if(currentMonthDates.length +  auxArray.length < 35) {
    //   console.log(currentMonthDates.length)
    //   setCurrentMonthDates(currentMonthDates.concat(nextMonth.slice(0, 35 - currentMonthDates.length)));
    // }
    
    //setCurrentMonthDates(currentMonthDates.concat(auxArray))
    //console.log(auxArray)
  },[])

  const RenderEvents = (props) => {
    const currentDate = props.date.format('DD/MM/YYYY');
    console.log(currentDate)
    return (
      <div className="calendar-event-wrapper">
        {console.log(events)}
        {
          
          events[currentDate] && events[currentDate].map((event) => {
            return (
              <div key={event.hour} className="calendar-event-item">
                <span className="event-circle"></span>
                <span className="event-title">
                  {event.name && event.name}
                  {/* Nome do evento */}
                </span>
                {/* <span className="event-hour">{event.hour && event.hour}</span> */}
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
  // console.log(currentMonthDates)
  const handleDateClick = (index) => {
    setSelectedIndex(index)
    setAddNewEventVisible(true)
  }
  return (
    <>
      <MonthChooserHeader />
      <HeaderCalendar />
      <Modal
        setAddNewEventVisible={setAddNewEventVisible}
        addNewEventVisible={addNewEventVisible}
        selectedElement={events[setSelectedIndex] && events[setSelectedIndex]}
      />
      <div className="calendar-wrapper">
        {
          currentMonthDates.map((date, index) => {
            // console.log(date)
            // console.log(date.format('L'))
            return (
              <div onClick={() => handleDateClick(date.format('DD/MM/YYYY'))} className="calendar-item-wrapper" key={date.format('L')}>
                <div className={`${(date.day() === 0 || date.day() === 6) ? 'weekend' : 'calendar-item'}`}>
                  <div className="event-date-number">
                    {date.date()}
                  </div>
                  <RenderEvents date={date}/>
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
