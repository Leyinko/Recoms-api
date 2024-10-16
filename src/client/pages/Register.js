import fileInput, { giveAccessFormFields } from '../utils/inputs.js';
import FetchAPI from '../utils/fetch.js';
import { navigate } from '../router/router.js';
import DOMFragment from '../utils/DOMFragment.js';
import '../pages/styles/Register.css';

// 🧠
export const Register = () => {
  let template = `
	<main id="register_container">
    <h1>Signup</h1>
		<form action="register">
			<label for="username"></label>
			<input type="text" id="username" placeholder="Username" required>
			<label for="password"></label>
			<input type="password" id="password" placeholder="Password (8)" minLength="8" required>
			<label for"user-picture">Picture
			<input type="file" id="user-picture">
			</label>
			<div id="picture-preview-container"></div>
			<button id="register" type="submit">Register</button>
		</form>
	</main>
`;
  document.querySelector('#app').appendChild(DOMFragment(template));
  fileInput('#user-picture');

  // Actions
  giveAccessFormFields('#register', document.querySelectorAll('input'));
  document.querySelector('#register').addEventListener('click', registerUser);
};

// 🌍
function registerUser(e) {
  e.preventDefault();

  const [username, password, file] = document.querySelectorAll('input');

  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('img', file.files[0]);

  FetchAPI('/api/users/register', false, {}, 'POST', formData).then(
    (data) => data.status === 201 && setTimeout(() => navigate('/login'), 1000)
  );
}
