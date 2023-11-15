const cards = document.querySelectorAll(".card");
const cardFront = document.querySelectorAll('.card-front');

const flipCard = (event) => {
  const flipCardContainer = event.currentTarget.querySelector(".flip-card-container");
  flipCardContainer.classList.toggle("flip-card-container--rotated");
  let front = flipCardContainer.getElementsByClassName('card-front')[0];
  front.classList.toggle('opacity-front');
};

const addRotateCard = () => {
  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
};

const removeRotateCard = () => {
  cards.forEach((card) => {
    card.removeEventListener('click', flipCard);
  })
};

const defaultCards = () => {
  const rotatedCards = document.querySelectorAll('.flip-card-container--rotated');
  const cardFront = document.querySelectorAll('.card-front');

  rotatedCards.forEach((card) => {
    card.classList.remove('flip-card-container--rotated');
  });

  cardFront.forEach((card) => {
    card.classList.remove('opacity-front');
  });
};

export { addRotateCard, removeRotateCard, defaultCards };