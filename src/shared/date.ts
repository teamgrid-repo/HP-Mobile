import { format } from "date-fns";

export const DEFAULT_DATE_FORMAT = "MMM dd, yyyy";
export const DEFAULT_DATE_TIME_FORMAT = "MMM dd, yyyy hh:mm";
export const DEFAULT_ION_DATE_FORMAT = "yyyy-MM-dd";
export const DEFAULT_DAY_FORMAT = "MMM dd";
export const DEFAULT_TIME_FORMAT = "hh:mm a";

export const getDateFormat = (date: string | Date, formatStr: string = DEFAULT_DATE_FORMAT) => {
  return format(new Date(date), formatStr);
};
