import './no-data.css';

export const noDataOutputMessage = (element, message, parent) => {
  const item = document.createElement(`${element}`);
  item.id = 'no-data-message';
  item.textContent = message;
  parent.appendChild(item);
};
