import moment, { DurationInputArg1, unitOfTime } from "moment";

export type DurationUnit = unitOfTime.DurationConstructor;

export default class DateUtils {
  static formatDate(date: Date | undefined, format: string) {
    if (!date) {
      return "";
    }
    return moment(date).format(format);
  }

  static formatDateString(date: string, format: string) {
    if (!date) {
      return "";
    }
    return DateUtils.formatDate(new Date(date), format);
  }

  static add(
    date: Date,
    amount: DurationInputArg1,
    value: unitOfTime.DurationConstructor
  ) {
    return moment(date).add(amount, value).toDate();
  }

  static isFutureDate(date: string | Date) {
    return moment(date).isAfter(moment());
  }

  static compareDates(day1: string | Date, day2: string | Date) {
    return moment(day1).isSame(moment(day2), "day");
  }

  static difference(date1: Date, date2: Date, value: DurationUnit, abs = true) {
    const ans = moment(date1).diff(moment(date2), value);
    return abs ? Math.abs(ans) : ans;
  }
}
