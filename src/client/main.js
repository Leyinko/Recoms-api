import { displayLogMessage } from './components/logs/logs';
import { Navigation } from './components/nav/navigation';
import './style.css';
import './santi-sponsive.css';

// 🧠 Recom-API Auto-Launch 🐛

(() => {
  // Logo Background
  const logo = document.createElement('img');
  Object.assign(logo, {
    src: '/assets/icons/recom-api.svg',
    id: 'recom-logo',
  });

  document.querySelector('body').appendChild(logo);

  // Router & Nav
  Navigation();
  // Login Page
  window.location.pathname.length === 1 && window.history.pushState(null, null, window.location.origin + '/login');

  // Welcome Message
  window.location.pathname.includes('login') &&
    displayLogMessage({
      message: 'Welcome to Recom-API',
      status: 200,
    });

  // Keyboard Config
  window.addEventListener('keydown', (e) => {
    let recomModalButton = document.querySelector('#new-recommendation');
    e.key === 'Tab' && e.preventDefault();
    e.key === 'Enter' && !document.querySelector('#tag-button') && e.preventDefault();
    e.key === 'Escape' && recomModalButton && recomModalButton.click();
  });
})();
