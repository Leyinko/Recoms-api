import FetchAPI from '../utils/fetch';
import { profileContainer } from '../components/nav/navigation';
import { navigate } from '../router/router';
import DOMFragment from '../utils/DOMFragment';
import { giveAccessFormFields } from '../utils/inputs';
import '../pages/styles/Login.css';

// 🧠
export const Login = () => {
  let template = `
	<main id="login_container">
    <h1>Sign in</h1>
    <span>or </span><a href="/register">create an account </a>
		<form action="login">
			<label for="username"></label>
			<input type="text" id="username" placeholder="Username" required>
			<label for="password"></label>
			<input type="password" id="password" placeholder="Password" required>
			<button id="login" type="submit">Login</button>
			</form>
	</main>
`;
  document.querySelector('#app').appendChild(DOMFragment(template));

  // Actions
  giveAccessFormFields('#login', document.querySelectorAll('input'));
  document.querySelector('#login').addEventListener('click', loginUser);
};

// 🌍
function loginUser(e) {
  e.preventDefault();

  const data = {
    username: username.value,
    password: password.value,
  };

  FetchAPI('/api/users/login', false, {}, 'POST', data).then((data) => {
    if (data.status === 200) {
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          token: data.token,
          username: data.user.username,
          img: data.user.img,
        })
      );
      // Connected
      profileContainer(), navigate('/profile');
    }
  });
}
