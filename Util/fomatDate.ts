export function getDayOfWeek(dt_txt: string): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dt_txt);

  const dayOfWeek = daysOfWeek[date.getDay()];

  return dayOfWeek;
}

export function getFormattedDate(dt_txt: string): string {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
  });
  const date = new Date(dt_txt);
  const formattedDate = dateFormatter.format(date);

  return formattedDate;
}

export function getFormattedTime(dt_txt: string): string {
  const date = new Date(dt_txt);
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return timeFormatter.format(date);
}

export default { getDayOfWeek, getFormattedDate, getFormattedTime };
