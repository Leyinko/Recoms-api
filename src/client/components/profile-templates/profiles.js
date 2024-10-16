import { createCollection, deleteUserRecommendation, dropCollection } from '../../pages/Profile';
import { animateElementForConfirmation } from '../../utils/confirmation-animations';
import DOMFragment from '../../utils/DOMFragment';
import fileInput, { fileFromUrl, giveAccessFormFields, insertFileIntoInput } from '../../utils/inputs';
import { recommendationModalTemplate } from '../recommendation-modal/recommendation-modal';
import { selectAndEdit } from '../select-and-edit/selected-and-edit';

import './profiles.css';

// 🧠 ---> New Collection
export const newCollectionTemplate = () => {
  let template = `
		<main id="profile">
      <h1 class="new-collection-title">CREATE COLLECTION</h1>
			<form action="create-collection">
     		<label for="name-collection"></label>
				<input type="text" id="name-collection" placeholder="Title" required>
      	<label for"collection-picture">
				<input type="file" id="collection-picture">Cover
				</label>
				<div id="picture-preview-container"></div>
      	<button id="create-collection">Create</button>
    	</form>
      <p class="instructions">Create a collection with a title and cover image, then add recommendations to share with all RECOMS-API users.<br> You can explore and modify recommendations, but note that your title and cover image are permanent. Delete and recreate your collection anytime.</p>
		</main>
	`;
  document.querySelector('#app').appendChild(DOMFragment(template));
  fileInput('#collection-picture');

  // Actions
  giveAccessFormFields('#create-collection', document.querySelectorAll('input'));
  document.querySelector('#create-collection').addEventListener('click', createCollection);
};

// 🧠 ---> User Collection
export const userCollectionTemplate = () => {
  let template = `
	<main id="profile">
  	<div id="user-recommendations"></div>
    <img id="new-recommendation" role="button" src="/assets/icons/add.svg"/>
    <div id="user-collection-card">
      <button id="drop-collection">Drop Collection</button>
    </div>
	</main>
	`;
  document.querySelector('#app').appendChild(DOMFragment(template));

  // Actions
  document.querySelector('#new-recommendation').addEventListener('click', () => recommendationModal('create'));
  document.querySelector('#drop-collection').addEventListener('click', dropCollectionConfirmation);
};

// 💻
export const userRecommendationsActions = () => {
  const recommendations = Array.from(document.querySelectorAll('#user-recommendations div[id*="recommendation"]'));

  // Recommendation Selection
  recommendations.forEach((card) =>
    card.addEventListener('click', (e) => {
      // Select
      selectAndEdit(e, ['edit', 'trash']);
      // Buttons Editions Handler
      const [edit, remove] = [document.querySelector('#edit-button'), document.querySelector('#trash-button')];
      if (edit && remove) {
        edit.addEventListener(
          'click',
          (e) => (e.stopPropagation(), recommendationModal('update'), fillDataToUpdateInModal())
        );
        // Delete Confirmation
        const confirmation = document.querySelector('#confirmation-delete');
        animateElementForConfirmation(2000, remove, confirmation, '#646cff', deleteUserRecommendation);
      }
    })
  );
};

// 💻
const fillDataToUpdateInModal = async () => {
  let selected = document.querySelector('[id*="-recommendation:"].selected');
  let fields = {
    name: selected.querySelector('h1').textContent,
    img: selected.querySelector('img').src,
    description: selected.querySelector('h3').textContent,
    category: selected.querySelector('h2').textContent,
    rating: Array.from(selected.querySelectorAll('#rating img.rated')).length,
    tags: Array.from(selected.querySelectorAll('[id$="-tags"] span')).map((tag) => tag.textContent),
    user: selected.querySelector('p').textContent.replace('By ', ''),
  };

  // 💻 Fill Update Modal ->
  // Category
  Array.from(document.querySelectorAll('#categories-container p'))
    .find((item) => item.textContent === fields.category)
    .click();
  // Title
  document.querySelector('#title').value = fields.name
    .split(' ')
    .map((word) => (word = word.at(0) + word.slice(1).toLowerCase()))
    .join(' ');
  // Img
  const file = await fileFromUrl(fields.img, `${fields.name}-card.jpg`);
  insertFileIntoInput([file], '#recommendation-picture');
  // Rating
  Array.from(document.querySelectorAll('#star-container img'))
    .find((item) => item.className.match(`${fields.rating}`))
    .click();
  // Description
  document.querySelector('#description').value = fields.description;
  // Tags
  insertFileIntoInput([fields.tags], '#tags');
};

// 💻
const recommendationModal = (use) => {
  const modal = document.querySelector('[id*="-recommendation-modal"]');

  !modal ? recommendationModalTemplate(use) : modal.remove();

  document.querySelector('#new-recommendation').classList.toggle('active', !modal);

  // Background Blur
  const elementsToBlur = [
    Array.from(document.querySelectorAll('[id*="-recommendation:"]')),
    document.querySelector('#edition-card-menu'),
    document.querySelector('#previous'),
    document.querySelector('#next'),
    document.querySelector('#recom-logo'),
    document.querySelector('#user-recommendations'),
  ].flat();

  elementsToBlur.forEach((element) => element && element.classList.toggle('blur', !modal));
};

// 💻
const dropCollectionConfirmation = async () => {
  if (!document.querySelector('#drop-confirmation')) {
    // Closes new Recommendation
    document.querySelector('#create-recommendation-modal') && document.querySelector('#new-recommendation').click();

    const confirmation = document.createElement('button');
    confirmation.id = 'drop-confirmation';
    confirmation.textContent = 'DELETE';

    document.querySelector('main').append(confirmation);

    // Confirmation
    animateElementForConfirmation(3000, confirmation, confirmation, '#1a1a1a', dropCollection);
  } else {
    document.querySelector('#drop-confirmation').remove();
  }
};
