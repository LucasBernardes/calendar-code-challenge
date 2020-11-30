import { validateNewEvent } from './Calendar/CreatEvent';


test('1 - teste create event', () => {
  const event = {
    title: 'Test',
    city: 'London',
    date: '02/01/2020',
    hour: '20:00',
  }
  const result = validateNewEvent(event)
  expect(result).toBe(true);
});

test('2 - teste create event', () => {
  const event = {
    title: 'Test',
    city: 'London',
    date: '02/01/2020',
    hour: '20:0x',
  }
  const result = validateNewEvent(event)
  expect(result).toBe(false);
});

test('3 - teste create event', () => {
  const event = {
    title: 'Test But now with more than 30 chars per title',
    city: 'London',
    date: '02/01/2020',
    hour: '20:00',
  }
  const result = validateNewEvent(event)
  expect(result).toBe(false);
});



