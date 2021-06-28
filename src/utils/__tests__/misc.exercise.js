import {formatDate} from '../misc'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('July 18, 1980'))).toBe('Jul 80')
})
