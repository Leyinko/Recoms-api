import DOMFragment from '../../utils/DOMFragment';
import '../styles/Errors.css';

export const accessDenied = () => {
  // Refresh
  document.querySelector('#dashboard').innerHTML = '';

  let template = `
	<main id="access-denied">
		<img src="/assets/pages/Admin.png">
	</main>
	`;
  document.querySelector('#dashboard').appendChild(DOMFragment(template));
};
