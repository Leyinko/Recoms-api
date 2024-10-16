import {
  dashboardDeleteActions,
  dashboardDeleteUserRecommendation,
  dashboardUpdateUserRole,
  dashboardUserCollectionRecommendations,
  resetAppSeed,
} from '../../../pages/Dashboard';
import { animateElementForConfirmation } from '../../../utils/confirmation-animations';
import DOMFragment from '../../../utils/DOMFragment';
import { noDataOutputMessage } from '../../no-data/no-data';
import { selectAndEdit } from '../../select-and-edit/selected-and-edit';
import './dashboard.card.css';

// 💻
const dashboardDataTemplate = (collection, item) => {
  let usersTemplate = `
    <div id="${item.username}-s-users-collection" data-role="${item.role}" data-created="${item.createdAt}" data-access="${item.tokenVersion}">
			<img src="${item.img}">
		</div>
  `;

  let collectionsTemplate = `
  	<div id="${item?.owner?.username}-s-collection" data-name="${item.collection}" data-created="${item.createdAt}">
			<img src="${item.img}">
		</div>
  `;

  document
    .querySelector(`#${collection}-container`)
    .appendChild(DOMFragment(collection === 'collections' ? collectionsTemplate : usersTemplate));
};

// 💻
export const dashboardData = (data) => {
  const entries = Object.entries(data);
  entries.forEach(([key, value]) => {
    //
    let container = document.querySelector(`#${key}-container`);
    const title = document.createElement('h1');
    title.textContent = key.toUpperCase();

    container.appendChild(title);

    value.length === 1
      ? noDataOutputMessage('h3', 'NO DATA', container)
      : value.forEach((item) => {
          let localSelf = JSON.parse(sessionStorage.getItem('user')).username;
          let DBSelf = item?.owner?.username || item.username;
          item && DBSelf !== localSelf && dashboardDataTemplate(key, item);
        });
  });

  // Actions
  dashboardActions();
};

// 💻
export const dashboardEditionPanel = () => {
  const dashboard = document.querySelector('#dashboard-edition-panel');
  let template = ` 
      <h1>CONTROL PANEL</h1>
      <div id="seed-reset">
        <button id="seed-all"><img src="/assets/icons/seed.svg"></button>
        <p>Reset application by triggering the initial seed configuration.</p>
      </div>`;
  dashboard.appendChild(DOMFragment(template));
  dashboard.style.display = 'flex';

  // Actions
  resetAppSeed();
};

// 💻
const dashboardActions = () => {
  const dashboardCards = document.querySelectorAll('[id*="-container"] div');
  dashboardCards.forEach((card) =>
    card.addEventListener('click', (e) => {
      let regexp = /^[a-z]*(?=-)/;
      let parent = e.target.parentElement.id.match(regexp)[0];
      // Edition Menu
      if (e.target.parentElement.id.endsWith('-container')) {
        // Select & Edit
        parent === 'users' ? selectAndEdit(e, ['trash', 'edit']) : selectAndEdit(e, ['trash', 'info']);
        // Buttons Handler
        const [trash, edit, info] = [
          document.querySelector('#trash-button'),
          document.querySelector('#edit-button'),
          document.querySelector('#info-button'),
        ];
        if (trash) {
          let menu = edit || info;
          menu && menu.addEventListener('click', (e) => dashboardControlPanel(e, parent));

          const confirmation = document.querySelector('#confirmation-delete');
          animateElementForConfirmation(2000, trash, confirmation, '#646cff', dashboardDeleteActions(parent));
        }
      }
    })
  );
};

// 💻
export const dashboardControlPanel = (e, parent) => {
  if (!document.querySelector(`#${parent}-edit`)) {
    //
    let selection = e.target.closest('[id*="-collection"]');

    const editionContainer = document.createElement('div');
    editionContainer.id = `${parent}-edit`;

    // Item Information
    const extra = document.createElement('div');
    extra.id = 'item-information';
    editionContainer.appendChild(extra);

    const user = document.createElement('h3');
    user.textContent = selection.id.match(/^[a-zA-Z]*(?=-)/)[0];
    extra.appendChild(user);

    let dataset = [selection.dataset.created.match(/^\d.*(?=T)/)[0], selection.dataset.access];
    dataset.forEach((data, index) => {
      const element = document.createElement('p');
      element.textContent =
        index === 0 ? `Creation date: ${data}` : !data ? `${selection.dataset.name}` : `${data} connections`;
      extra.appendChild(element);
    });

    // Control Panel
    let panel = document.querySelector('#dashboard-edition-panel');
    panel.appendChild(editionContainer);

    if (parent === 'collections') {
      collectionsEditionAction(user.textContent, editionContainer); // 💻🌍
    } else {
      usersEditionPanel(editionContainer); // 💻
      usersEditionAction(selection); // 🌍
    }
  } else {
    !document.querySelector(`#${parent}-edit`).remove();
  }
};

// Collections ---> 💻
export const collectionsEditionAction = async (user, editionContainer) => {
  const container = document.createElement('div');
  container.id = `dashboard-collections-items`;
  editionContainer.appendChild(container);

  // 🌍
  await dashboardUserCollectionRecommendations(user, container);

  let recommendations = document.querySelectorAll('#collections-edit [id*="-recommendation:"]');
  recommendations.forEach((card) =>
    card.addEventListener('click', (e) => {
      if (e.target.parentElement.id.endsWith('-collections-items')) {
        //
        selectAndEdit(e, ['trash']);

        let remove = document.querySelector('#trash-button');
        if (remove) {
          const confirmation = document.querySelector('#confirmation-delete');
          // 🌍
          animateElementForConfirmation(2000, e.target, confirmation, '#646cff', dashboardDeleteUserRecommendation);
        }
      }
    })
  );
};

// Users ---> 💻
export const usersEditionPanel = (editionContainer) => {
  // Roles
  const selector = document.createElement('div');
  selector.id = 'role-selection';

  editionContainer.appendChild(selector);

  const title = document.createElement('h5');
  title.textContent = 'ASSIGN ROLE';
  selector.appendChild(title);

  const roles = ['user', 'admin'];
  roles.forEach((role) => {
    const span = document.createElement('span');
    Object.assign(span, {
      role: 'button',
      textContent: role,
      className: `${role}-selection`,
    });
    selector.appendChild(span);
  });

  // Confirmation
  const confirmation = document.createElement('img');
  Object.assign(confirmation, {
    id: 'user-edit-confirmation',
    role: 'button',
    src: '/assets/icons/confirm.svg',
  });
  selector.appendChild(confirmation);
};

// 💻
const usersEditionAction = (selection) => {
  // Actual Fetched User Role
  let actualUserRole = selection.dataset.role;
  document.querySelector(`[class="${actualUserRole}-selection"]`).classList.add('selected');
  // Select
  const roles = document.querySelectorAll('[class*="-selection"]');
  roles.forEach((role) =>
    role.addEventListener(
      'click',
      (e) => (roles.forEach((role) => role.classList.remove('selected')), e.target.classList.add('selected'))
    )
  );
  // Action
  let submit = document.querySelector('#user-edit-confirmation');
  submit.addEventListener('click', () => {
    const username = document.querySelector('#users-edit h3');
    let newRole = document.querySelector('[class*="-selection"].selected').textContent;
    actualUserRole !== newRole && dashboardUpdateUserRole(username.textContent, newRole);
  });
};
