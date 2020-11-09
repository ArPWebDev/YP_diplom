import sliderSettings from "../../blocks/commits/__slider/slidersettings";
import {getFormatedDateForCards} from "../utils/utils"

export default class CommitCardList {
  constructor(
    commitContainer,
    sliderContainer,
    githubApi,
    commitCard,
    sliderSection,
    error
  ) {
    this.commitContainer =commitContainer;
    this.sliderContainer = sliderContainer;
    this.githubApi = githubApi;
    this.commitCard =commitCard;
    this.sliderSection = sliderSection
    this.error = error;
  }

//добавление коммита в разметку слайдера
  addCommits(commitTemplate) {
    this.sliderContainer.insertAdjacentHTML("afterbegin", commitTemplate);
  }

//вывод ошибки при отсутствии соединения с github api
  errorOn() {
    this.error.classList.remove("hidden");
    this.commitContainer.style.height  = "466px";
  }

  //получение коммитов с Github Api и их добавление в разметку страницы 
  getCommits() {
    this.githubApi.getCommits()
    .then((res) => {
      for (let array of res) {
        const commitTemplate = this.commitCard.create(
          getFormatedDateForCards(array.commit.committer.date),
          array.author.avatar_url,
          array.commit.committer.name, 
          array.commit.committer.email, 
          array.commit.message,
          array.html_url
          );
        this.addCommits(commitTemplate);
      }
      sliderSettings();
    })
    .catch((error) => {
      this.errorOn();
      console.log(`Ошибка: ${error.message}`);
    })
  }
}
