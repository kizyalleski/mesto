// Массив объектов с наполнением начальных карточек
const cards = [
  {
    url: "./images/tbilisi.jpg",
    heading: "Тбилиси",
  },
  {
    url: "./images/yerevan.jpg",
    heading: "Ереван",
  },
  {
    url: "./images/istanbul.jpg",
    heading: "Стамбул",
  },
  {
    url: "./images/kazakhstan.jpg",
    heading: "Казахстан",
  },
  {
    url: "./images/uzbekistan.jpg",
    heading: "Узбекистан",
  },
  {
    url: "./images/montenegro.jpg",
    heading: "Черногория",
  },
];

const cardsSection = document.querySelector('.elements');
const elementTemplate = document.querySelector("#elementTemplate");

function createNewCard(card) {
  const element = elementTemplate.content.cloneNode(true);
  const elementUrl = element.querySelector(".element__image");
  const elementAlt = element.querySelector(".element__image");
  const elementHeading = element.querySelector(".element__name");
  elementUrl.setAttribute("src", card.url);
  elementAlt.setAttribute("alt", card.heading);
  elementHeading.textContent = card.heading;
  cardsSection.prepend(element);
}
cards.forEach(createNewCard);
