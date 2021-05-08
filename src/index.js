(() => {
  const wheel = document.querySelector('.wheel__inside-image');
  const wheelBtn = document.querySelector('.wheel__btn');
  const wheelCount = document.querySelectorAll('.hero__wheel-count');
  const popup = document.querySelector('.popup');
  const popupWindows = popup.querySelectorAll('.popup__window');
  const windowCloseButtons = document.querySelectorAll('[data-window-close]');

  const state = {
    spinCount: 2,
    currentWindow: null,
  };

  const settings = {
    popupOpenClass: 'popup--open',
    windowOpenClass: 'popup__window--open',
  };

  function updateWheelCount() {
    wheelCount.forEach((el) => {
      el.textContent = state.spinCount;
    });
  }

  updateWheelCount();

  wheelBtn.addEventListener('click', () => {
    if (state.spinCount <= 0) return;

    const spinBonus1 = 66; // 66deg -> 500$
    const spinBonus2 = 23; // 23deg -> 20FS

    const deg1 = 360 * 4 + spinBonus1; // just random number (4)
    const deg2 = (deg1 - spinBonus1) * 3 + spinBonus2; // just random number (3)
    const currentDeg = state.spinCount > 1 ? deg1 : deg2;

    wheelBtn.style.display = 'none';
    wheel.style.transform = `rotate(${currentDeg}deg)`;
    wheel.classList.add('wheel__inside-image--animated');

    state.spinCount--;
    updateWheelCount();

    wheel.addEventListener('animationend', () => {
      const typeWindow = state.spinCount > 0 ? 'popup' : 'modal';
      const findWindow = [...popupWindows].find((el) => el.dataset.window === typeWindow);

      if (state.spinCount > 0) wheelBtn.style.display = '';
      wheel.classList.remove('wheel__inside-image--animated');

      findWindow && openWindow(findWindow);
    });
  });

  function openWindow(window) {
    popup.classList.add(settings.popupOpenClass);
    window.classList.add(settings.windowOpenClass);
    document.body.style = 'height: 100%; overflow: hidden;';
    state.currentWindow = window;
  }

  function closeWindow() {
    popup.classList.remove(settings.popupOpenClass);
    state.currentWindow.classList.remove(settings.windowOpenClass);
    document.body.removeAttribute('style');
    state.currentWindow = null;
  }

  windowCloseButtons.forEach((el) => {
    el.addEventListener('click', () => {
      if (!state.currentWindow) return;
      closeWindow();
    });
  });
})();
