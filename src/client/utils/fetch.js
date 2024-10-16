import { displayLogMessage, hideLoading, showLoading } from '../components/logs/logs';

const API_URL = import.meta.env.VITE_API_URL;

const FetchAPI = async (route, needAuth, headers, method = 'GET', body) => {
  let token = JSON.parse(sessionStorage.getItem('user'))?.token;

  let config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  // Contains Media
  if (body instanceof FormData) {
    config.body = body;
    config.headers && delete config.headers;
  }

  // Need Authorization Login
  if (needAuth) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    // Start
    showLoading();
    const response = await fetch(`${API_URL}${route}`, config);
    const data = await response.json();
    // Display Message Logs
    let restrictionsRoutesLogs = ['/users/verify-token', '/app/stats', '/collections'];
    let isRestricted = restrictionsRoutesLogs.some((restriction) => route.includes(restriction));
    !isRestricted && displayLogMessage(data);
    // End
    hideLoading();
    return data;
  } catch (error) {
    throw new Error('Fetch API Error', error);
  }
};

export default FetchAPI;
