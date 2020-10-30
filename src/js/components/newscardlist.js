import {COUNTER_PLUS} from "../constants/constants";
import {getFormatedDateForCards} from "../utils/utils";

export default class NewsCardList {
  constructor(
    resultsSection,
    cardsContainer,
    storageData,
    newsCard,
    newsApi,
    errorBlock,
    noResultsBlock,
    newsBlock,
    loaderBlock,
    showMoreButton,
    input,
    errorImg
  ) {
    this.resultsSection = resultsSection;
    this.cardsContainer = cardsContainer;
    this.storageData = storageData;
    this.newsCard = newsCard;
    this.newsApi = newsApi;
    this.errorBlock = errorBlock;
    this.noResultsBlock = noResultsBlock;
    this.newsBlock = newsBlock;
    this.loaderBlock = loaderBlock;
    this.startCounter = 0;
    this.showMoreButton = showMoreButton;
    this.input = input;
    this.errorImg = errorImg;
  }

  // //защита от xss
  // sanitizeHTML(str) {
  //   var temp = document.createElement('div');
  //   temp.textContent = str;
  //   return temp.innerHTML;
  // };

  //добавление карточки новостей в разметку станицы
  _addCard(cardTemplate) {
    this.cardsContainer.insertAdjacentHTML("beforeend", cardTemplate);
  }

  //очиста контейнера с карточками
  clearLastNews() {
    this.cardsContainer.textContent = "";
  }

  //вывод прелоадера
  preloaderOn() {
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.remove("hidden");
  }

  //скрыть уведомление с отсутствием результов
  noResultsOff() {
    this.noResultsBlock.classList.add("hidden");
    this.errorBlock.classList.add("hidden");
    this.resultsSection.classList.remove("hidden");
    this.newsBlock.classList.remove("hidden");
    this.loaderBlock.classList.add("hidden");
  }

  //вывести уведомление с отсутствием результов
  noResultsOn() {
    this.resultsSection.classList.remove("hidden");
    this.noResultsBlock.classList.remove("hidden");
    this.errorBlock.classList.add("hidden");
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.add("hidden");
  }

  //вывести ошибку получения данных с News Api
  errorOn() {
    this.resultsSection.classList.remove("hidden");
    this.errorBlock.classList.remove("hidden");
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.add("hidden");
    this.noResultsBlock.classList.add("hidden");
  }

  //вывести\скрыть кнопку "Показать еще"
  hideAndShowMoreNewsButton(newsArray) {
    const countedCards = this.cardsContainer.childElementCount;
    if (countedCards < newsArray.articles.length) {
      this.showMoreButton.classList.remove("hidden");
    } else {
      this.showMoreButton.classList.add("hidden");
    }
  }

  //обработка ошибки отстутствия изображения для новости
  checkArticleImage(articleImage) {
    if (articleImage === null) {
      articleImage = `${this.errorImg}`;
    }
    return articleImage;
  }
  
  //отрисовка карточек новостей
  renderNews(newsArray) {
    const newsArticles = newsArray.articles;
    for (let i = this.startCounter; i < this.startCounter + COUNTER_PLUS; i++) {
      if (newsArticles[i]) {
        const articalImage = this.checkArticleImage(newsArticles[i].urlToImage);
        const news = this.newsCard.create(
          newsArticles[i].url,
          articalImage,
          getFormatedDateForCards(newsArticles[i].publishedAt),
          newsArticles[i].title,
          newsArticles[i].description,
          newsArticles[i].source.name
        );
        this._addCard(news);
      }         
    }
    this.hideAndShowMoreNewsButton(newsArray);
  }

  //отрисовка дополнительных карточек новостей при нажатии кнопки "Показать еще"
  showMoreNews(newsArray) {
    this.startCounter += COUNTER_PLUS;
    this.renderNews(newsArray);
    
  }

  //получение данных с News Api и запись их в локальное хранилище браузера
  getNews() {
    this.preloaderOn();
    this.startCounter = 0;
    this.newsApi
      .getNews()
      .then((res) => {
        if (+res.totalResults !== 0) {
          this.clearLastNews();
          localStorage.clear();
          this.noResultsOff();
          localStorage.setItem("keyword", `${this.input.value}`);
          localStorage.setItem(`${this.storageData}`, JSON.stringify(res));
          this.renderNews(
            JSON.parse(localStorage.getItem(`${this.storageData}`))
          );
        } else {
          this.noResultsOn();
        }
      })
      .catch((error) => {
        this.errorOn();
        console.log(`Ошибка: ${error.message}`);
      });
  }
}
