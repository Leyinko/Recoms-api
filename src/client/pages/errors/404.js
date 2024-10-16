import DOMFragment from '../../utils/DOMFragment';
import '../styles/Errors.css';

export const PageNotFound = () => {
  let template = `
	<main id="page-not-found">
		<img src="/assets/pages/404.png">
	</main>
	`;
  document.querySelector('#app').appendChild(DOMFragment(template));
};
