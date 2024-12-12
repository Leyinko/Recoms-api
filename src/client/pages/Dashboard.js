import FetchAPI from '../utils/fetch';
import DOMFragment from '../utils/DOMFragment';
import { dashboardData, dashboardEditionPanel } from '../components/models/dashboard-card/dashboard.card';
import { accessDenied } from './errors/AdminOnly';
import { mustLogInFirst } from './errors/Authentication';
import { navigate } from '../router/router';
import { animateElementForConfirmation } from '../utils/confirmation-animations';
import { displayLogMessage } from '../components/logs/logs';
import { recommendationTemplate } from '../components/models/recommendation-card/recommendation-card';
import { noDataOutputMessage } from '../components/no-data/no-data';
import '../pages/styles/Dashboard.css';
import { profileNavAccess } from '../components/nav/navigation';

// 🧠
export const Dashboard = async () => {
  let template = `
  <main id="dashboard">
    <div id="users-container"></div>
    <div id="dashboard-edition-panel"></div>
    <div id="collections-container"></div>
  </main>
`;
  document.querySelector('#app').appendChild(DOMFragment(template));

  // 🌍
  await FetchAPI('/api/data/collections', true, {}, 'GET').then((data) => {
    if (data.message === 'Login to access') return mustLogInFirst();
    if (data.message === 'Permission Denied') return accessDenied();

    if (data) {
      // Render Data
      dashboardData({ collections: data.collections, users: data.users });
      // Dashboard Edition Panel
      dashboardEditionPanel();
    }
  });
};

// 🌍
export const dashboardDeleteUserRecommendation = () => {
  const [username, item] = [
    document.querySelector('[id*="-recommendation:"].selected p').textContent.replace('By ', ''),
    document.querySelector('[id*="-recommendation:"].selected h1').textContent,
  ];

  FetchAPI('/api/data/recommendations/delete/', true, {}, 'DELETE', { card: item, user: username }).then(
    (data) => (navigate('/dashboard'), displayLogMessage(data))
  );
};

// 🌍
export const dashboardUserCollectionRecommendations = async (username, container) => {
  await FetchAPI(`/api/data/recommendations/collection/${username}`, true, {}, 'GET').then((data) => {
    const recommendations = data.profile.recommendations;

    !recommendations.length
      ? noDataOutputMessage('h1', `NO DATA`, container)
      : recommendations.forEach((recommendation) => recommendationTemplate(recommendation, container)),
      displayLogMessage({
        message: `${username}'s recommendations`,
        status: 200,
      });
  });
};

// 🌍
export const dashboardUpdateUserRole = (user, role) => {
  FetchAPI('/api/users/update', true, {}, 'PUT', { user: user, role: role }).then(
    (data) => (navigate('/dashboard'), displayLogMessage(data))
  );
};

// 🌍
export const dashboardDeleteActions = (collection) => {
  const username = document.querySelector(`#${collection}-container div.selected`).id.match(/^[a-zA-Z0-9]*(?=-)/)[0];

  if (collection === 'collections') {
    // 🌍
    return function dashboardDeleteUserCollection() {
      FetchAPI('/api/data/collection/delete', true, {}, 'DELETE', { username: username }).then(
        (data) => (displayLogMessage(data), navigate('/dashboard'))
      );
    };
  } else {
    // 🌍
    return function dashboardDeleteUser() {
      FetchAPI(`/api/users/delete/${username}`, true, {}, 'DELETE').then(
        (data) => (displayLogMessage(data), navigate('/dashboard'))
      );
    };
  }
};

// 🌍
export const resetAppSeed = () => {
  const username = JSON.parse(sessionStorage.getItem('user')).username;
  const button = document.querySelector('#seed-all');

  animateElementForConfirmation(3000, button, button, '#646cff', launchSeedScript);

  function launchSeedScript() {
    FetchAPI('/api/data/reset', true, {}, 'POST', { user: username }).then(
      (data) =>
        data.status === 200 &&
        setTimeout(() => {
          sessionStorage.removeItem('user');
          profileNavAccess();
          navigate('/login');
        }, 1000)
    );
  }
};
