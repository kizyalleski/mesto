// Массив объектов с наполнением начальных карточек
const cards = [
  {
    name: "Тбилиси",
    link: "./images/tbilisi.jpg",
  },
  {
    name: "Ереван",
    link: "./images/yerevan.jpg",
  },
  {
    name: "Стамбул",
    link: "./images/istanbul.jpg",
  },
  {
    name: "Казахстан",
    link: "./images/kazakhstan.jpg",
  },
  {
    name: "Узбекистан",
    link: "./images/uzbekistan.jpg",
  },
  {
    name: "Черногория",
    link: "./images/montenegro.jpg",
  },
];

/////////////////////////////

import Card from "./Card.js";

cards.forEach( item => {
  const card = new Card(item, '#elementTemplate');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});
