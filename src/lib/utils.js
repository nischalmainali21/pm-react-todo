import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatMillisecondsToDate(milliseconds) {
  const date = new Date(milliseconds);

  const now = new Date();

  // Get the current date (without time)
  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // Get the difference in days between the input date and the current date
  const diffInDays = Math.floor((date - currentDate) / (1000 * 60 * 60 * 24));

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);

  // Convert hours to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  let dayPart;
  if (diffInDays === -1) {
    dayPart = "Yesterday";
  } else if (diffInDays === 0) {
    dayPart = "Today";
  } else if (diffInDays === 1) {
    dayPart = "Tomorrow";
  } else {
    dayPart = `${day}/${month}/${year}`;
  }

  // Construct the formatted date string
  const formattedDate = `${dayPart}, ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}

//for date-fns
export function getDateString(date) {
  let result;
  if (isToday(date)) {
    result = "Today";
  } else if (isTomorrow(date)) {
    result = "Tomorrow";
  } else if (isYesterday(date)) {
    result = "Yesterday";
  } else {
    result = format(date, "P");
  }
  return result;
}
