import moment, { DurationInputArg1, unitOfTime } from "moment";

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
}
