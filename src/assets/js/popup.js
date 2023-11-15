const popupOverlay = document.querySelector(".popup-overlay");
const popupContainer = document.querySelector(".popup-container");
const closePopupButton = document.getElementById("close-popup");

function openPopup() {
  popupOverlay.style.display = "flex";
  setTimeout(() => {
    popupContainer.style.opacity = "1";
    popupContainer.style.transform = "scale(1)";
  }, 100);
}

function closePopup() {
  popupContainer.style.opacity = "0";
  popupContainer.style.transform = "scale(0.8)";
  setTimeout(() => {
    popupOverlay.style.display = "none";
  }, 300);
}

closePopupButton.addEventListener("click", closePopup);

export { openPopup };
