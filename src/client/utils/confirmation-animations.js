// 💻
export const animateElementForConfirmation = (time, button, element, hex, callback) => {
  let loading = 0;
  let intervalID;

  // Events
  button.addEventListener(
    'mousedown',
    (e) =>
      (intervalID = setInterval(() => {
        confirmationAnimation(hex, callback);
      }, 10))
  );

  button.addEventListener('mouseup', clearConfirmation);
  button.addEventListener('mouseleave', clearConfirmation);

  // Functions
  function clearConfirmation() {
    loading = 0;
    element.style.background = ``;
    clearInterval(intervalID);
  }

  const confirmationAnimation = (color, action) => {
    if (loading < 100) {
      loading += (100 * 10) / time;
      element.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${loading}%, #5050503d ${loading}%, #5050503d 100%)`;
    } else {
      clearInterval(intervalID);
      action();
    }
  };
};
