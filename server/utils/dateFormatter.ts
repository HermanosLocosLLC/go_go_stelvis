export class DateFormatter {
  static dateToTimestamp(date: Date) {
    return date.toISOString().split('T').join(' ').split('.')[0];
  }
}
