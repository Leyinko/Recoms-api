// 💻
// Image Reader
const fileInput = (query) => {
  let previewContainer = document.querySelector('#picture-preview-container');
  let input = document.querySelector(query);

  input.addEventListener('change', () => {
    if (input.files.length > 0) {
      previewContainer.innerHTML = '';

      // Image Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'preview-img';

        // Change
        img.addEventListener('click', () => input.click());

        previewContainer.appendChild(img);
      };

      reader.readAsDataURL(input.files[0]);

      // Remove
      input.closest('label').style.display = 'none';
    } else {
      input.closest('label').style.display = 'flex';
      document.querySelector('.preview-img').remove();
    }
  });
};

// URL to File to FileReader
export async function fileFromUrl(url, filename) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

// Input Dispatch Event
export async function insertFileIntoInput([...data], inputElementID) {
  const input = document.querySelector(`${inputElementID}`);
  const dataTransfer = new DataTransfer();

  const fileEvent = new Event('change', { bubbles: true });
  const tagButton = document.querySelector('#tag-button');

  data.forEach((item) => {
    // Recommendation Update IMG
    if (/jpg|jpeg|png|gif|webp|bmp/.test(item.type)) {
      dataTransfer.items.add(item);
      input.files = dataTransfer.files;
      input.dispatchEvent(fileEvent);
    } else {
      // Recommendation Update Tags
      item.forEach((tag) => {
        input.value = tag.replace('#', '');
        tagButton.click();
      });
    }
  });
}

// Check Fields
export const giveAccessFormFields = (access, [...fields]) => {
  const button = document.querySelector(`${access}`);

  // Recommendation Modal
  if (fields.at(-1).nodeName === 'FORM') {
    let modal = document.querySelector('[id*="-recommendation-modal"');
    fields = [
      modal.querySelector('#categories-container'),
      modal.querySelector('#title'),
      modal.querySelector('#recommendation-picture'),
      modal.querySelector('#star-container'),
      modal.querySelector('#description'),
      modal.querySelector('#tags-container'),
    ];
  }

  const checkInputs = () => {
    let content = [];
    Array.from(fields).forEach((input) => {
      // Login, Register & Create Collection Forms
      if (input.type === 'text') content.push(input.value);
      if (input.type === 'password') content.push(input.value.length >= 8 && input.value);
      if (input.type === 'file') content.push(input.files[0]);

      // Recommendations Form
      if (input.nodeName === 'DIV') {
        if (input.id === 'categories-container') {
          content.push(input.querySelector('p.selected'));
        } else if (input.id === 'star-container') {
          content.push(input.querySelector('img.rated'));
        } else {
          content.push(input.querySelector('span'));
        }
      } else {
        content.push(input.value);
      }
    });

    // Result
    let formValid = content.every((item) => item);
    button.classList.toggle('active', formValid);
  };

  // Listeners
  fields.forEach((field) => {
    field.nodeName === 'INPUT' || field.nodeName === 'TEXTAREA'
      ? field.addEventListener('input', checkInputs)
      : field.addEventListener('click', checkInputs);
    field.addEventListener('focus', (e) => e.target.setAttribute('placeholder', ''));
  });

  const tags = document.querySelector('label[for="tags"]');
  tags &&
    (tags.addEventListener('click', checkInputs),
    tags.childNodes[1].addEventListener('focus', (e) => e.target.setAttribute('placeholder', '')));
};

export default fileInput;
