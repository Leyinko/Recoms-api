import { navigate, router } from '../../router/router';
import DOMFragment from '../../utils/DOMFragment';
import { displayLogMessage, logsDisplay } from '../logs/logs';
import './navigation.css';

// 🧠
export const Navigation = () => {
  let template = `
	<nav id="menu">
		<a class="active" href="/login">Connect</a>
		<a href="/profile">Profile</a>
		<a href="/explore">Explore</a>
		<a href="/dashboard">Dashboard</a>
	</nav>
	`;
  document.querySelector('#app').appendChild(DOMFragment(template));

  // Actions
  profileContainer(), logsDisplay();
  //
  window.addEventListener('storage', profileNavAccess);
  window.addEventListener('load', router);
  document.querySelector('#menu').addEventListener('click', closeRecommendationModal);
};

// 💻
function closeRecommendationModal() {
  let button = document.querySelector('#new-recommendation');
  let modal = document.querySelector('[id*="-recommendation-modal"');
  button && modal && button.click();
}

// 💻
export function profileContainer() {
  let profileContainer = document.createElement('aside');
  profileContainer.id = 'status-container';

  let picture = document.createElement('img');
  profileContainer.appendChild(picture);

  profileContainer.addEventListener('click', logOut);

  document.querySelector('#menu').insertAdjacentElement('afterbegin', profileContainer);

  profileNavAccess();
}

// 💻
export async function profileNavAccess() {
  let user = JSON.parse(sessionStorage.getItem('user'));

  // Status
  let container = document.querySelector('#status-container');
  let img = document.querySelector('#status-container img');
  if (img) img.src = user ? user.img : null;
  container && container.classList.toggle('active', user);

  // Anchors Access
  document.querySelectorAll('#menu a:not(:first-of-type)').forEach((nav) => nav.classList.toggle('active', user));
}

// 💻
function logOut(e) {
  const profile = document.querySelector('#status-container');
  const username = JSON.parse(sessionStorage.getItem('user'))?.username;

  if (!document.querySelector('.disconnect')) {
    const disconnect = document.createElement('div');
    disconnect.className = 'disconnect';

    e.target.insertAdjacentElement('afterend', disconnect);
    profile && profile.classList.add('on');

    disconnect.addEventListener('click', () => {
      // Disconnect
      sessionStorage.removeItem('user');
      profileNavAccess();
      profile.remove();

      displayLogMessage({
        message: `${username} disconnected`,
        status: 200,
      });
      //
      navigate('/login');
    });
  } else {
    document.querySelector('.disconnect').remove();
    profile.classList.remove('on');
  }
}
