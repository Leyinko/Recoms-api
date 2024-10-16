import DOMFragment from '../../utils/DOMFragment';
import '../styles/Errors.css';

export const mustLogInFirst = () => {
  let main = document.querySelector('main');
  main && main.remove();

  let template = `
	<main id="authentication">
		<img src="/assets/pages/Authentication.png">
	</main>
	`;
  document.querySelector('#app').appendChild(DOMFragment(template));
};
