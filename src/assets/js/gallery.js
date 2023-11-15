const panels = document.querySelectorAll('.panel');

function toggleOpen(evt) {
  evt.target.classList.toggle('open');
};

function closeOpened() {
  const openedPanels = document.querySelectorAll('.open.open-active');

  if(openedPanels) {
    panels.forEach(panel => panel.classList.remove('open', 'open-active'));
  };
};

function toggleActive(evt) {
    evt.target.classList.toggle('open-active');
};

panels.forEach(panel => panel.addEventListener('click', closeOpened));
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));