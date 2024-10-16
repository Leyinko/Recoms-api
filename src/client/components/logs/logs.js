import './logs.css';

// 💻
export const logsDisplay = () => {
  let section = document.createElement('section');
  section.id = 'logs';

  const loading = document.createElement('div');
  loading.className = 'loading-logo';

  section.appendChild(loading);
  document.querySelector('#app').appendChild(section);
};

// 💻
export function displayLogMessage(data) {
  let logs = document.querySelector('#logs');

  [logs.querySelector('h3'), logs.querySelector('h5')].forEach((element) => element && element.remove());

  const message = document.createElement('h3');
  const status = document.createElement('h5');

  message.textContent = data.message.toUpperCase();
  status.textContent = String(data.status);

  if (logs.childElementCount <= 1) {
    logs.append(message, status);

    setTimeout(() => {
      message.remove(), status.remove();
    }, 1500);
  }
}

//💻
export function showLoading() {
  const loading = document.querySelector('.loading-logo');
  loading.classList.add('loading');
}

export function hideLoading() {
  const loading = document.querySelector('.loading-logo');
  loading.classList.remove('loading');
}
