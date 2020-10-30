import {getCurrentDate, getWeekAgoDate} from "../utils/utils"

export default class NewsApi {
  constructor(
    input,
    newsToken
    ) {
    this.input = input;
    this.newsToken = newsToken;
  }
  
//получение данных с News Api
  getNews() {
    return fetch('https://nomoreparties.co/news/v2/everything?' +
    `q=${this.input.value}&` +
    `from=${getCurrentDate()}&` +
    `to=${getWeekAgoDate()}&` +
    'pageSize=100&' +
    'sortBy=popularity&' +
    'language=ru&' +
    `apiKey=${this.newsToken}`
    )
      .then((res) => 
        res.ok ? res.json() :  Promise.reject(`Ошибка: ${res.status}`)
      )
      .then(res => res)
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}
