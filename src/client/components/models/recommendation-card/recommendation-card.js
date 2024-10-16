import DOMFragment from '../../../utils/DOMFragment';
import './recommendation-card.css';

// 💻
export const recommendationTemplate = (item, parent) => {
  let template = `
		<div id="${item.user.username}s-recommendation: ${item.name}">
			<h1>${item.name.toUpperCase()}</h1>
			<h2>${item.category}</h2>
			<img src="${item.img}">
			<h3>${item.description}</h3>
			<div id="rating">${printRatingElements(item, 'rating')}</div>
			<div id="${item.user.username}s-${item.name}-tags">${printRatingElements(item, 'tags')}</div>
			<p>By ${item.user.username}</p>
		</div>
	`;
  parent.appendChild(DOMFragment(template));
};

//💻
const printRatingElements = (item, element) => {
  let outerHTML = '';

  // Rating "Stars"
  if (element === 'rating') {
    let rates = 5;
    let rating = item.rating;

    while (rates > 0) {
      const star = document.createElement('img');
      star.src = '/assets/icons/star.svg';

      if (rating > 0) {
        star.className = 'rated';
        rating--;
      }

      outerHTML += star.outerHTML;
      rates--;
    }
  } else {
    // Tags
    item.tags.forEach((text) => {
      const tag = document.createElement('span');
      tag.textContent = `${text}`;
      outerHTML += tag.outerHTML;
    });
  }

  return outerHTML;
};
