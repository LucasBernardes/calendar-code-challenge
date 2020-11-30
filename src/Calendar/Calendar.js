import React, { useState, useEffect } from 'react';
import HeaderCalendar from './HeaderCalendar';
import MonthChooserHeader from './MonthChooserHeader';
import { useDispatch } from 'react-redux';
import CalendarWeapper from './CalendarWrapper';
import moment from 'moment';
import Modal from './Modal';
import './../styles.css';


function Calendar() {
  const dispatch = useDispatch();
  const [addNewEventVisible, setAddNewEventVisible] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(moment().add(0, 'months'))
  const [lastMonth, setLastMonth] = useState(Array.from({ length: moment().add(monthOffset - 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset - 1, 'months').startOf('month').add(i, 'days')))
  const [nextMonth, setNextMonth] = useState(Array.from({ length: moment().add(monthOffset + 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset + 1, 'months').startOf('month').add(i, 'days')))
  const [currentMonthDates, setCurrentMonthDates] = useState(Array.from({ length: moment().add(monthOffset, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset, 'months').startOf('month').add(i, 'days')))
  const weekArray = moment.weekdays()

  useEffect(() => {
    setCurrentMonthDates(Array.from({ length: moment().add(monthOffset, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset, 'months').startOf('month').add(i, 'days')))
    setNextMonth(Array.from({ length: moment().add(monthOffset + 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset + 1, 'months').startOf('month').add(i, 'days')))
    setLastMonth(Array.from({ length: moment().add(monthOffset - 1, 'months').daysInMonth() }, (x, i) => moment().add(monthOffset - 1, 'months').startOf('month').add(i, 'days')))
    setCurrentMonth(moment().add(monthOffset, 'months'))
  }, [monthOffset])

  useEffect(() => {
    let auxMonth = [...currentMonthDates];
    const date = auxMonth[0].day();
    if (date > 0) {
      auxMonth = [...lastMonth.slice(-date), ...currentMonthDates]
    }
    if (auxMonth.length < 35) {
      auxMonth = [...auxMonth, ...nextMonth.slice(0, 35 - auxMonth.length)]
    } else if (auxMonth.length > 35) {
      auxMonth = [...auxMonth, ...nextMonth.slice(0, 42 - auxMonth.length)]
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

  return (
    <>
      <MonthChooserHeader setMonthOffset={setMonthOffset} currentMonth={currentMonth} monthOffset={monthOffset} />
      <HeaderCalendar weekArray={weekArray} />
      <Modal
        setAddNewEventVisible={setAddNewEventVisible}
        addNewEventVisible={addNewEventVisible}
      />
      <CalendarWeapper setAddNewEventVisible={setAddNewEventVisible} currentMonthDates={currentMonthDates} currentMonth={currentMonth} />
    </>
  );
}

export default Calendar;
