export default class GithubApi {
  constructor(
    user, 
    repo, 
    commitsPerPage
    ) {
    this.user = user;
    this.repo = repo;
    this.commitsPerPage = commitsPerPage;
  }

//получение данных с Github Api
  getCommits() {
    return fetch(`https://api.github.com/repos/${this.user}/${this.repo}/commits?&per_page=${this.commitsPerPage}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}




