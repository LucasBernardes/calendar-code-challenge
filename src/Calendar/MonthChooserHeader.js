import { Badge } from 'react-bootstrap';

function MonthChooserHeader(props) {
  const { setMonthOffset, currentMonth, monthOffset } = props;
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

export default MonthChooserHeader;  