//шаблон карточки для коммита
export default class CommitCard {
  create(date, urlToImage, name, mail, message, urlToCommit) {
    const template = `
      <div class="commits__cell">
        <a href="${urlToCommit}" class="link commit__url" target="_blank">
        <div class="commit">
            <p class="commit__date">${date}</p>
           <div class="commit__profile">
                <img src="${urlToImage}" alt="аватар автора коммита" class="commit__photo"/>
               <div class="commit__info">
                   <p class="commit__name">${name}</p>
                   <p class="commit__email">${mail}</p>
               </div>
           </div>
            <p class="commit__text">${message}</p>
        </div>
        </a>
      </div>
    `;
    return template;
  }
}
