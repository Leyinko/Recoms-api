import { printWelcomeStats } from '../components/app-stats/app-stats';
import { Dashboard } from '../pages/Dashboard';
import { PageNotFound } from '../pages/errors/404';
import { Explore } from '../pages/Explore';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';

const routes = [
  {
    path: '/register',
    page: Register,
  },
  {
    path: '/login',
    page: Login,
  },
  {
    path: '/profile',
    page: Profile,
  },
  {
    path: '/explore',
    page: Explore,
  },
  {
    path: '/dashboard',
    page: Dashboard,
  },
];

window.addEventListener('popstate', router);
document.querySelector('#app').addEventListener('click', navigationState);

// 💻
export async function router() {
  // Refresh
  let main = document.querySelector('main');
  main && main.remove();

  // Render
  let path = window.location.pathname;

  // Selection
  activeAnchors(path);
  const { page } = routes.find((route) => route.path === path) || {};

  if (!page) return PageNotFound();
  path === '/login' || path === '/register' ? (page(), printWelcomeStats()) : page();
}

// 💻
function navigationState(e) {
  let href = e.target.getAttribute('href');
  href && (e.preventDefault(), navigate(href));
}

// 💻
const activeAnchors = (path) => {
  // Login Anchor
  const login = document.querySelector('[href="/login"]');
  let isUserConnected = !JSON.parse(sessionStorage.getItem('user'));
  login.classList.toggle('active', isUserConnected);

  // Others
  let anchors = Array.from(document.querySelectorAll('#menu a'));
  anchors.forEach((anchor) => {
    let isActive = anchor.getAttribute('href') === path;
    let isConnect = path === '/login' || path === '/register';

    anchors[0].classList.toggle('on', isConnect);
    anchor.classList.toggle('on', isActive);
  });
};

// 💻
export function navigate(path) {
  window.history.pushState(null, null, window.location.origin + path);
  router();
}
