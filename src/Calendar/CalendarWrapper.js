import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from './static.js';

function CalendarWrapper(props) {
  const { setAddNewEventVisible, currentMonthDates, currentMonth } = props;
  const dispatch = useDispatch();
  const events = useSelector(state => state.data);

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

  const handleDateClick = (date) => {
    dispatch({
      type: 'SELECTED_DATE',
      data: { date },
    })
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
    <div className="calendar-wrapper">
      {
        currentMonthDates.map((date, index) => {
          const formatedDate = date.format('DD/MM/YYYY');
          return (
            <div
              onClick={() => handleDateClick(date.format('DD/MM/YYYY'), index)}
              className={`calendar-item-wrapper ${currentMonthDates.length > 35 && 'exception-month-42-lines'}`}
              key={date.format('L')}
            >
              <div className={`${(date.day() === 0 || date.day() === 6) || date.format('MMM') !== currentMonth.format("MMM") ? 'weekend' : 'calendar-item'}`}>
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
                      <Button onClick={(e) => handleRemoveAllClick(e, formatedDate)} variant="danger" style={{ float: 'right', padding: 0, width: 15, marginTop: 2, fontSize: 10 }} >x</Button>
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
  )
}

export default CalendarWrapper;