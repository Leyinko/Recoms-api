import { recommendationTemplate } from '../components/models/recommendation-card/recommendation-card';
import FetchAPI from '../utils/fetch';
import DOMFragment from '../utils/DOMFragment';
import { categoriesSelectionContainer } from '../components/categories-selector/categories-selector';
import '../pages/styles/Explore.css';
import { mustLogInFirst } from './errors/Authentication';
import { noDataOutputMessage } from '../components/no-data/no-data';

// 🧠
export const Explore = () => {
  let template = `
    <main id="explore">
      <div id="recommendations-container"></div>
    </main>
  `;
  document.querySelector('#app').appendChild(DOMFragment(template));

  // Actions
  const main = document.querySelector('#explore');
  categoriesSelectionContainer(main);
  document.querySelector('#categories-container').addEventListener('click', exploreRecommendations);
  // Start with All
  document.querySelector('.select-All').click();
};

// 🌍
const exploreRecommendations = (e) => {
  const recommendationsContainer = document.querySelector('#recommendations-container');
  const categoriesContainer = document.querySelector('#categories-container');

  if (e.target.classList.contains('selected')) {
    let category = e.target.textContent;

    FetchAPI(`/api/data/recommendations/${category}`, true, {}, 'GET').then((data) => {
      if (data.message === 'Login to access') return mustLogInFirst();

      categoriesContainer.classList.add('access');

      const recommendations = data.recommendations;

      recommendationsContainer.innerHTML = '';
      !recommendations
        ? noDataOutputMessage('h1', `NO ${category.toUpperCase()} RECOMS YET`, recommendationsContainer)
        : data.recommendations.forEach((item) => recommendationTemplate(item, recommendationsContainer));
    });
  }
};
