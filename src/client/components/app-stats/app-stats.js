import DOMFragment from '../../utils/DOMFragment';
import FetchAPI from '../../utils/fetch';
import './app-stats.css';

export const statsContainerTemplate = (stats) => {
  let template = `
	  <div id="app-stats">
			<span class="${stats.active === 1 ? 'active' : 'inactive'}"></span>
			<h6>DB: ${stats.name.toUpperCase()} - v${stats.server_version}</h6>
			<p>Join the ${stats.users} users currently sharing more than ${stats.recommendations} recommendations!</p>
		</div>
	`;

  document.querySelector('main').appendChild(DOMFragment(template));
};

// 🌍
export const printWelcomeStats = () => {
  FetchAPI(`/api/data/app/stats`, false, {}, 'GET').then((data) => statsContainerTemplate(data.stats));
};
