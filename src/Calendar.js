import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from './Alert';
import moment from 'moment';
import Modal from './Modal';
import './styles.css';
import { colors } from './static';

function Calendar() {
  const events = useSelector(state => state.data);
  const selectedDate = useSelector(state => state.selectedDate);
  const [addNewEventVisible, setAddNewEventVisible] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(moment().add(0, 'months'))
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();
  
  // const [lastMonth, setLastMonth] = useState(Array.from({length: moment().add(monthOffset - 1,'months').daysInMonth()}, (x, i) => moment().add(monthOffset - 1,'months').startOf('month').add(i, 'days')))
  const [nextMonth, setNextMonth] = useState(Array.from({length: moment().add(monthOffset + 1,'months').daysInMonth()}, (x, i) => moment().add(monthOffset + 1,'months').startOf('month').add(i, 'days')))
  const [currentMonthDates, setCurrentMonthDates] = useState(Array.from({length: moment().add(monthOffset,'months').daysInMonth()}, (x, i) => moment().add(monthOffset,'months').startOf('month').add(i, 'days')))
  // const lastMonth = moment().add(monthOffset - 1, 'months');
  // const nextMonth = moment().add(monthOffset + 1, 'months');
  // const currentMonthDates = new Array(currentMonth.daysInMonth()).fill(null).map((x, i) => currentMonth.startOf('month').add(i, 'days'));
  const weekArray = moment.weekdays()


  useEffect(() => {
    if (!addNewEventVisible) {
      dispatch({
        type: 'SELECTED_DATE',
        data: '',
      })
    }
  },[addNewEventVisible])

  useEffect(() => {
    console.log(events)
  },[events])

  useEffect(() => {
    console.log(selectedDate)
  },[selectedDate])
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
    const { date } = props;
    const currentDate = date.format('DD/MM/YYYY');
    return (
      <div className="calendar-event-wrapper">
        {
          events && events[currentDate] && events[currentDate].map((event, index) => {
            console.log(event)
            return (
              <div key={event.hour} className="calendar-event-item" onClick={(e) => handleEventClick(e, props.date.format('DD/MM/YYYY'), index)}>
                <span className="event-circle" style={{ backgroundColor: colors[event.radioValue].color }}></span>
                <span className="event-title">
                  {event.title && event.title}
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

  const handleDateClick = (date) => {
    console.log('chamei date')
    dispatch({
      type: 'SELECTED_DATE',
      data: { date },
    })
    console.log(date)
    setSelectedIndex(date)
    setAddNewEventVisible(true)
  }

  const handleEventClick = (e, date, index) => {
    console.log('chamei event')
    e.stopPropagation();
    dispatch({
      type: 'SELECTED_EVENT',
      data: {...events[date][index], index, date},
    })

    setAddNewEventVisible(true) 
  }

  return (
    <>
      <MonthChooserHeader />
      <HeaderCalendar />
      {/* <Alert /> */}
      <Modal
        setAddNewEventVisible={setAddNewEventVisible}
        addNewEventVisible={addNewEventVisible}
      />
      
      <div className="calendar-wrapper">
        {
          currentMonthDates.map((date, index) => {
            return (
              <div onClick={() => handleDateClick(date.format('DD/MM/YYYY'), index)} className="calendar-item-wrapper" key={date.format('L')}>
              {/* <div className="calendar-item-wrapper" key={date.format('L')}> */}
                <div className={`${(date.day() === 0 || date.day() === 6) ? 'weekend' : 'calendar-item'}`}>
                  <div className="event-date-number">
                    {date.date()}
                  </div>
                  <RenderEvents date={date}/>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
}

export default Calendar;
