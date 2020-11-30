import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, OverlayTrigger, Button, Badge } from 'react-bootstrap';
import Alert from './../Alert';
import moment from 'moment';
import Modal from '../Modal';
import './../styles.css';
import { colors } from '../static';

function Calendar() {
  const events = useSelector(state => state.data);
  const [addNewEventVisible, setAddNewEventVisible] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(moment().add(0, 'months'))
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();
  const [lastMonth, setLastMonth] = useState(Array.from({ length: moment().add(monthOffset - 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset - 1, 'months').startOf('month').add(i, 'days')))
  const [nextMonth, setNextMonth] = useState(Array.from({ length: moment().add(monthOffset + 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset + 1, 'months').startOf('month').add(i, 'days')))
  const [currentMonthDates, setCurrentMonthDates] = useState(Array.from({ length: moment().add(monthOffset, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset, 'months').startOf('month').add(i, 'days')))
  const weekArray = moment.weekdays()

  useEffect(() => {
    console.log(monthOffset)
    setCurrentMonthDates(Array.from({ length: moment().add(monthOffset, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset, 'months').startOf('month').add(i, 'days')))
    setNextMonth(Array.from({ length: moment().add(monthOffset + 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset + 1, 'months').startOf('month').add(i, 'days')))
    setLastMonth(Array.from({ length: moment().add(monthOffset - 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset - 1, 'months').startOf('month').add(i, 'days')))
    setCurrentMonth(moment().add(monthOffset, 'months'))
    console.log(currentMonthDates)
  }, [monthOffset])

  useEffect(() => {
    console.log(currentMonthDates)
    let auxMonth = [...currentMonthDates];
    const date = auxMonth[0].day();
    if (date > 0) {
      console.log(date)
      auxMonth = [...lastMonth.slice(-date), ...currentMonthDates]
      console.log(auxMonth.lenght)
    }
    if (auxMonth.length < 35) {
      auxMonth = [...auxMonth, ...nextMonth.slice(0, 35 - auxMonth.length)]
    }
    setCurrentMonthDates(auxMonth)
  }, [lastMonth])

  useEffect(() => {
    if (!addNewEventVisible) {
      dispatch({
        type: 'SELECTED_DATE',
        data: '',
      })
    }
  }, [addNewEventVisible])

  const RenderEvents = (date) => {
    const currentDate = date.format('DD/MM/YYYY');
    return (
      <div className="calendar-event-wrapper">
        {
          events && events[currentDate] && events[currentDate].map((event, index) => {
            return (
              <div key={event.hour} className="calendar-event-item" onClick={(e) => handleEventClick(e, date.format('DD/MM/YYYY'), index)}>
                <span className="event-circle" style={{ backgroundColor: colors[event.radioValue].color }}></span>
                <span className="event-title">
                  {event.title && event.title}

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
      <div variant="primary" size="sm" className="calendar-chooser-header">
        <h6>
          <Badge className='month-button' variant="danger" onClick={() => setMonthOffset(monthOffset - 1)}>{'<'}</Badge>{' '}
          <Badge variant="light">{currentMonth.format("MMMM, YYYY")}</Badge>{' '}
          <Badge className='month-button' variant="danger" onClick={() => setMonthOffset(monthOffset + 1)}>{'>'}</Badge>
        </h6>
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
    dispatch({
      type: 'SELECTED_DATE',
      data: { date },
    })
    setSelectedIndex(date)
    setAddNewEventVisible(true)
  }

  const handleRemoveAllClick = (e, date) => {
    const removed = { ...events }
    removed[date] = [];
    e.stopPropagation();
    dispatch({
      type: 'REMOVE_EVENT',
      data: { ...removed },
    })
  }

  const handleEventClick = (e, date, index) => {
    e.stopPropagation();
    dispatch({
      type: 'SELECTED_EVENT',
      data: { ...events[date][index], index, date },
    })
    setAddNewEventVisible(true)
  }

  return (
    <>
      <MonthChooserHeader />
      <HeaderCalendar />
      <Modal
        setAddNewEventVisible={setAddNewEventVisible}
        addNewEventVisible={addNewEventVisible}
      />

      <div className="calendar-wrapper">
        {
          currentMonthDates.map((date, index) => {
            const formatedDate = date.format('DD/MM/YYYY');
            return (
              <div onClick={() => handleDateClick(date.format('DD/MM/YYYY'), index)} className="calendar-item-wrapper" key={date.format('L')}>
                <div className={`${(date.day() === 0 || date.day() === 6) ? 'weekend' : 'calendar-item'}`}>
                  <div className="event-date-number">
                    {date.date()}
                    {events[formatedDate] && events[formatedDate].length > 0 && (
                      <OverlayTrigger
                        key="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Remove all events
                          </Tooltip>
                        }
                      >
                        <Button onClick={(e) => handleRemoveAllClick(e, formatedDate)} variant="secondary" style={{ float: 'right', padding: 0, width: 15, marginTop: 2, fontSize: 10 }} >x</Button>
                      </OverlayTrigger>
                    )}
                  </div>
                  {RenderEvents(date)}
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
