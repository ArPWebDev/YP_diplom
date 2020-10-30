//получение текущей даты в формате "год-месяц-число"
export function getCurrentDate() {
  const date = new Date();
  const currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return currentDate;
}

//получение даты 6-дневной давности
export function getWeekAgoDate() {
  const weekAgo = new Date(new Date() - 6 * 24 * 3600 * 1000);
  const weekAgoFormatDate =
    weekAgo.getFullYear() +
    "-" +
    (weekAgo.getMonth() + 1) +
    "-" +
    weekAgo.getDate();
  return weekAgoFormatDate;
}

//получения текущего месяца 
export function getCurrentMonth() {
  const month = new Date();
  const options = {
    month: "long",
  };
  return month.toLocaleString("ru", options);
}

//получени даты текущего дня в формате "число, день_недели"
export function getFormatedCurrentday() {
  const formatedCurrentDay = new Date();
  const formatedDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][formatedCurrentDay.getDay()];
  const formatedDate = formatedCurrentDay.getDate();
  const dayAndDate = formatedDate+", "+formatedDay
  return dayAndDate;
}

//универсальное форматирование в вид "число, день_недели"
export function getFormatedDate(day) {
  const findDay= ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(
    new Date() - day * 24 * 3600 * 1000
    ).getDay()]
  const findDate = new Date(
    new Date() - day * 24 * 3600 * 1000
    ).getDate()
  const dayAndDate = findDate+", "+findDay
  return dayAndDate
}

//получение дня недели в сокращенном формате
export function getdayDateformat(day) {
  const findDay= ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(day).getDay()]
  const findDate = new Date(day).getDate()
  const dayAndDate = findDate+", "+findDay
  return dayAndDate
}

//получение даты в формате "день_недели месяц, год"
export function getFormatedDateForCards(day) {
  const date = new Date(day);
  const year = date.getFullYear();
  const month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ][date.getMonth()];
  const dayOfMonth = date.getDate();
  const formatedDate = dayOfMonth + " " + month+", " + year;
  return formatedDate;
}
