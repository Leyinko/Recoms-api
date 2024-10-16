import { displayLogMessage } from '../components/logs/logs';
import { recommendationTemplate } from '../components/models/recommendation-card/recommendation-card';
import { noDataOutputMessage } from '../components/no-data/no-data';
import {
  newCollectionTemplate,
  userCollectionTemplate,
  userRecommendationsActions,
} from '../components/profile-templates/profiles';
import { navigate } from '../router/router';
import FetchAPI from '../utils/fetch';
import { mustLogInFirst } from './errors/Authentication';

// 🧠
export const Profile = async () => {
  const username = JSON.parse(sessionStorage.getItem('user'))?.username;

  // 🌍
  await FetchAPI(`/api/data/recommendations/collection/${username}`, true, {}, 'GET').then((data) => {
    if (data.message === 'Login to access') return mustLogInFirst();
    // Render Template
    if (data.message === 'Ready to insert collection') {
      newCollectionTemplate();
    } else {
      userCollectionTemplate();
      // 💻 Collection Data Card
      const title = document.createElement('h1');
      title.textContent = data.profile.name;

      const cover = document.createElement('img');
      cover.src = data.profile.cover;

      document.querySelector('#user-collection-card').prepend(title, cover);
      // 💻 Recommendations
      const recommendationsContainer = document.querySelector('#user-recommendations');
      const recommendations = data.profile.recommendations;

      recommendations.length === 0
        ? noDataOutputMessage('h1', 'NO RECOMMENDATIONS', recommendationsContainer)
        : data.profile.recommendations.forEach((recommendation) =>
            recommendationTemplate(recommendation, recommendationsContainer)
          );

      // Actions
      userRecommendationsActions();
    }
  });
};

// 🌍
export const createCollection = async (e) => {
  e.preventDefault();

  const [title, file] = document.querySelectorAll('input');
  const username = JSON.parse(sessionStorage.getItem('user')).username;

  const formData = new FormData();
  formData.append('collection', title.value);
  formData.append('img', file.files[0]);
  formData.append('user', username);

  await FetchAPI('/api/data/collection/create', true, {}, 'POST', formData).then((data) => displayLogMessage(data));
  //
  navigate('/profile');
};

// 🌍
export const sendRecommendation = async (e) => {
  e.preventDefault();

  const [name, file] = Array.from(document.querySelectorAll('input:not(#tags)'));
  const textarea = document.querySelector('textarea');
  const select = document.querySelector('#categories-container p.selected');
  const rating = Number(/(?<=\#).\d*/.exec(Array.from(document.querySelectorAll('.rated')).at(-1).className)[0]);
  const tags = Array.from(document.querySelector('#tags-container').childNodes).map((tag) => tag.textContent);
  const username = JSON.parse(sessionStorage.getItem('user')).username;

  const formData = new FormData();
  const fields = {
    name: name.value,
    img: file.files[0],
    description: textarea.value,
    category: select.textContent,
    rating: rating,
    tags: tags,
    user: username,
  };

  Object.entries(fields).forEach(([key, value]) =>
    key === 'tags' ? tags.forEach((tag) => formData.append('tags[]', tag)) : formData.append(key, value)
  );

  // Actions
  const action = e.target.parentElement.getAttribute('action').match(/^[a-zA-Z]*/)[0];

  if (action === 'create') {
    await FetchAPI('/api/data/recommendation/insert', true, {}, 'POST', formData).then(() => navigate('/profile'));
  } else {
    const original = document.querySelector('[id*="-recommendation:"].selected h1').textContent;
    await FetchAPI(`/api/data/recommendation/${username}/${original}`, true, {}, 'PUT', formData).then(() =>
      navigate('/profile')
    );
  }

  // Close Modal
  document.querySelector('[id*="-recommendation-modal"]').remove();
  document.querySelector('#recom-logo').classList.remove('blur');
};

// 🌍
export const deleteUserRecommendation = () => {
  let card = document.querySelector('[id*="-recommendation:"].selected');

  let name = card.querySelector('h1').textContent;
  let user = card.querySelector('p').textContent.replace('By ', '');
  FetchAPI('/api/data/recommendations/delete/', true, {}, 'DELETE', { card: name, user: user }).then(() =>
    navigate('/profile')
  );
};

// 🌍
export const dropCollection = async () => {
  const username = JSON.parse(sessionStorage.getItem('user')).username;
  await FetchAPI('/api/data/collection/delete', true, {}, 'DELETE', { username: username }).then((data) =>
    displayLogMessage(data)
  );
  //
  navigate('/profile');
};
