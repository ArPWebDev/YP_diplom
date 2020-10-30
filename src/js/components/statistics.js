import {
  getCurrentMonth, 
  getFormatedDate,
  getFormatedCurrentday,
  getdayDateformat
} from "../utils/utils"

export default class Statistics {
  constructor(
    storageData,
    keyWord,
    perWeek,
    mentions,
    graphMonth,
    graphDates,
    graphBars
    ) {
      this.storageData = storageData
      this.keyWord = keyWord;
      this.perWeek = perWeek;
      this.mentions = mentions;
      this.graphMonth = graphMonth;
      this.graphDates =graphDates;
      this.graphBars = graphBars;
    }

//поиск количества упоминаний ключевого слова в заголовках
  searchMentions() {
    const data = JSON.parse(localStorage.getItem(this.storageData));
    const keyWord = localStorage.getItem("keyword");
    let counter = 0;
    const regexp = new RegExp(`${keyWord}`, `gi`);
    data.articles.map(item => item.title).forEach(element => {
      if (element.match(regexp)) {
        counter += 1;
      };
    });
    return counter;
  }

//отрисовка данных о количестве новостей за неделю и количестве упоминаний в заголовках
  setKeywordStatistic() {
    const data = JSON.parse(localStorage.getItem(this.storageData));
    this.keyWord.textContent = localStorage.getItem("keyword");
    this.perWeek.textContent = data.totalResults;
    this.mentions.textContent = this.searchMentions();
  }

//добавление текущего месяца в столбец "Дата" графика
  setCurrentMonth() {
    this.graphMonth.textContent = "Дата "+"("+getCurrentMonth()+")";
  }
 
//получение массива из форматированных дат дней недели
  getGraphWeekArray() {
    const formatWeekArray = [];
    for (let i = 1; i <= 6; i++) {
      formatWeekArray.unshift(getFormatedDate(i));
    }
    formatWeekArray.push(getFormatedCurrentday());
    return formatWeekArray
  }

//добавление значений дат в столбец "Дата" графика
  setWeekGraphDates() {
    const weekArray = this.getGraphWeekArray();
    for (let i = 0; i < weekArray.length; i++) {
      this.graphDates.children[i].textContent = weekArray[i];
    }
  }

//получение массива из новостей, сортированных по дням недели
  getSortedNewsArraysPerDays() {
    const newsArticles = JSON.parse(localStorage.getItem(this.storageData)).articles;
    const sortedNewsArray = [];
    const currentDayAgoArray = [];
    const oneDaysAgoArray = [];
    const twoDaysAgoArray = [];
    const threeDaysAgoArray = [];
    const fourDaysAgoArray = [];
    const fiveDaysAgoArray = [];
    const sixDaysAgoArray = [];
    sortedNewsArray.push(
      currentDayAgoArray, 
      oneDaysAgoArray, 
      twoDaysAgoArray, 
      threeDaysAgoArray, 
      fourDaysAgoArray, 
      fiveDaysAgoArray, 
      sixDaysAgoArray
    );
    const currentWeekArray = this.getGraphWeekArray();
    for (let i = 0; i < newsArticles.length; i++) {
      if (currentWeekArray[0] === getdayDateformat(newsArticles[i].publishedAt) ) {currentDayAgoArray.push(newsArticles[i])};
      if (currentWeekArray[1] === getdayDateformat(newsArticles[i].publishedAt) ) {oneDaysAgoArray.push(newsArticles[i])};
      if (currentWeekArray[2] === getdayDateformat(newsArticles[i].publishedAt) ) {twoDaysAgoArray.push(newsArticles[i])};
      if (currentWeekArray[3] === getdayDateformat(newsArticles[i].publishedAt) ) {threeDaysAgoArray.push(newsArticles[i])};
      if (currentWeekArray[4] === getdayDateformat(newsArticles[i].publishedAt) ) {fourDaysAgoArray.push(newsArticles[i])};
      if (currentWeekArray[5] === getdayDateformat(newsArticles[i].publishedAt) ) {fiveDaysAgoArray.push(newsArticles[i])};
      if (currentWeekArray[6] === getdayDateformat(newsArticles[i].publishedAt) ) {sixDaysAgoArray.push(newsArticles[i])};
    }
    return sortedNewsArray;
  }

//подсчет количества упоминаний ключевого слова в заголовках и описании новостей
  getMentionsPerDay() {
    const keyWord = localStorage.getItem("keyword");
    const mentionsArray = [];
    const regexp = new RegExp(`${keyWord}`, `gi`);
    const weekArray = this.getSortedNewsArraysPerDays();
    for (let i = 0; i <= 6; i++) {
      let counter = 0;
      weekArray[i].map(item => item.title).forEach(element => {
        if (element !== null) {
          if (element.match(regexp)) {
            counter += 1;
          }
        }
      });
      weekArray[i].map(item => item.description).forEach(element => {
        if (element !== null) {
          if (element.match(regexp)) {
            counter += 1;
          }
        } 
      });
      mentionsArray.push(counter);
    }
    return mentionsArray;
  }

//заполнение графика данными количества упоминаний по дням
  renderGraph() {
    const mentionsArray = this.getMentionsPerDay();
    for (let i = 0; i < mentionsArray.length; i++) {
      this.graphBars.children[i].textContent = mentionsArray[i];
      if (mentionsArray[i] !== 0) {
        const widthPC = 11.3*mentionsArray[i];
        const widthTablet = 5.5*mentionsArray[i];
        const widthMobile = 1.86*mentionsArray[i];
        this.graphBars.children[i].style.width = `${widthPC}px`;
        if (window.matchMedia("screen and (min-width: 768px) and (max-width: 1250px)").matches) {
          this.graphBars.children[i].style.width = `${widthTablet}px`;
        }
        if (window.matchMedia("screen and (min-width: 320px) and (max-width: 767px)").matches) {
          this.graphBars.children[i].style.width = `${widthMobile}px`;
        }
      }
    }
  }

//вывод данных на странице
  renderStatistics() {
    this.setKeywordStatistic();
    this.setCurrentMonth();
    this.setWeekGraphDates();
    this.renderGraph(); 
  }
}