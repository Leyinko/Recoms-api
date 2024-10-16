// 💻
export const selectAndEdit = (e, [...icons]) => {
  // Same click
  if (e.target.classList.contains('selected'))
    return e.target.classList.remove('selected'), document.querySelector('#edition-card-menu').remove();

  // Remove previous
  let allSelectable = [
    Array.from(document.querySelectorAll('[id*="-recommendation:"]')),
    Array.from(document.querySelectorAll('[id*="-collection"]')),
  ].flat();
  allSelectable &&
    allSelectable.forEach((selection) => selection && e.target !== selection.classList.remove('selected'));

  // New Selection
  let dashboardEdits = [document.querySelector('#users-edit'), document.querySelector('#collections-edit')];
  dashboardEdits.forEach(
    (panel) => panel && e.target.parentElement.id !== 'dashboard-collections-items' && panel.remove()
  );
  let edit = document.querySelector('#edition-card-menu');
  edit && edit.remove();

  e.target.classList.add('selected');
  editionMenu(e.target, [...icons]);
};

// 💻
const editionMenu = (card, [...icons]) => {
  const editionMenu = document.createElement('div');
  editionMenu.id = 'edition-card-menu';

  icons.forEach((icon) => {
    const img = document.createElement('img');
    Object.assign(img, {
      role: 'button',
      src: `/assets/icons/${icon}.svg`,
      id: `${icon}-button`,
    });

    // Confirmation Container
    if (icon === 'trash') {
      const confirmation = document.createElement('div');
      confirmation.id = 'confirmation-delete';
      editionMenu.appendChild(confirmation);
    }

    editionMenu.appendChild(img);
  });

  card.append(editionMenu);
};
