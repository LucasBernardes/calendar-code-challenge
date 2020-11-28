import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from './Modal';
import './styles.css';

function Calendar() {
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
        selectedElement={events[selectedIndex]}
      />
      <div className="calendar-wrapper">
        {
          currentMonthDates.map((date, index) => {
            // console.log(date)
            // console.log(date.format('L'))
            return (
              <div onClick={() => handleDateClick(index)} className="calendar-item-wrapper" key={date.format('L')}>
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
