import { sendRecommendation } from '../../pages/Profile';
import DOMFragment from '../../utils/DOMFragment';
import fileInput, { giveAccessFormFields } from '../../utils/inputs';
import { categoriesSelectionContainer } from '../categories-selector/categories-selector';
import './recommendation-modal.css';

// 🧠
export const recommendationModalTemplate = (use) => {
  let template = `
	<div id="${use}-recommendation-modal">
    <h1>${use.toUpperCase()}</h1>
		<form action="${use}-recommendation">
			<label for="category"></label>
      <div id="title-cover-rate">
				<label for="title">
				<input type="text" id="title" maxLength="25" placeholder="Title"required>
        </label>
				<label for"recommendation-picture">
				<input type="file" id="recommendation-picture">Cover
				</label>
				<div id="picture-preview-container"></div>
  			<label for="rating"></label>
      </div>
      <div id="tags-description">
        <label for="tags">
        <input type="text" id="tags" maxLength="14" placeholder="Tags">
        <button id="tag-button" type="submit">#</button>
      </label>
        <label for="description">
        <textarea id="description" name="description" rows="4" cols="50" maxLength="250" placeholder="Description"></textarea>
        </label>
        <div id="tags-container"></div>
      </div>
			<button id="send-${use}-recommendation" type="submit">${use === 'create' ? 'Create' : 'Update'} Recommendation</button>
		</form>
	</div>
	`;
  document.querySelector('#app').appendChild(DOMFragment(template));
  fileInput('#recommendation-picture');

  // Actions
  userDynamicRatingsHandlers();
  giveAccessFormFields('[id*="send-"]', document.querySelector('[id*="-recommendation-modal"').children);
  document.querySelector('[id*="send-"]').addEventListener('click', sendRecommendation);
};

// 💻
const userDynamicRatingsHandlers = () => {
  // Categories
  let modal = document.querySelector('[id*="-recommendation-modal"]');
  categoriesSelectionContainer(modal);
  // Rating
  selectRating();
  // Tags
  document.querySelector('#tag-button').addEventListener('click', selectTags);
};

// 💻
const selectRating = () => {
  const container = document.createElement('div');
  container.id = 'star-container';

  let stars = 0;
  while (stars < 5) {
    const star = document.createElement('img');
    star.className = `star-rate-#${stars + 1}`;
    star.src = '/assets/icons/star.svg';

    star.addEventListener('click', selectRate);

    container.appendChild(star);
    stars++;
  }

  const label = document.querySelector('[for="rating"]');
  label.append(container);

  function selectRate(e) {
    let stars = Array.from(document.querySelectorAll('[class^="star-rate-#"]'));
    let selectedRate = /(?<=\#)\d*/.exec(e.target.className)[0];

    stars.forEach((star, index) => {
      star.classList.remove('rated');
      if (index < selectedRate) star.classList.add('rated');
    });
  }
};

// 💻
const selectTags = (e) => {
  e.preventDefault();

  const tagsContainer = document.querySelector('#tags-container');
  if (tagsContainer.childElementCount < 5) {
    const input = document.querySelector('#tags');

    const tag = document.createElement('span');
    tag.textContent = `#${input.value}`;

    tag.addEventListener('click', (e) => e.target.remove());

    tag.textContent.length >= 2 && tagsContainer.appendChild(tag);
    input.value = '';
  }
};
