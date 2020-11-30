function HeaderCalendar(props) {
  const { weekArray } = props;
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

export default HeaderCalendar;