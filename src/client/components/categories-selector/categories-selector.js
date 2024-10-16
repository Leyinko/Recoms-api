import './categories-selector.css';

// 💻
export function categoriesSelectionContainer(parent) {
  const categories = ['Literature', 'Cinema', 'Music', 'Television', 'Arts', 'Games', 'Travel', 'Culture', 'Education'];

  // Add 'All' to Explore
  !parent.id.includes('modal') && categories.unshift('All');

  const container = document.createElement('div');
  container.id = 'categories-container';

  categories.forEach((category) => {
    const select = document.createElement('p');
    Object.assign(select, {
      textContent: category,
      className: `select-${category}`,
      role: 'button',
    });

    select.addEventListener('click', selectCategory);
    container.appendChild(select);
  });

  parent.prepend(container);

  function selectCategory(e) {
    const elements = Array.from(document.querySelectorAll('#categories-container p'));
    elements.forEach((element) => {
      let isSelected = element === e.target;
      element.classList.toggle('selected', isSelected);
    });
  }
}
