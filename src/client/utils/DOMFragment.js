const DOMFragment = (template) => {
  let range = document.createRange();
  let fragment = range.createContextualFragment(template);
  return fragment;
};

export default DOMFragment;
