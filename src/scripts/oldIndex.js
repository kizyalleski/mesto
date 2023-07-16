const editingProfilePopup = document.querySelector("#editProfilePopup");
const editingProfileButton = document.querySelector("#editProfileButton");
const editingProfileForm = document.querySelector("#editingProfileForm");
const profileUserName = document.querySelector("#profileUserName");
const profileUserOccupation = document.querySelector("#profileUserOccupation");
const userInfoForm = document.forms.userInfoForm;
const imagePopup = document.querySelector("#imagePopup");
const cardsSection = document.querySelector(".elements");
const elementTemplate = document.querySelector("#elementTemplate");
const image = imagePopup.querySelector(".popup__image");
const imageName = imagePopup.querySelector(".popup__caption");
const popupList = document.querySelectorAll(".popup");

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// функция закрытия попапа при нажатии на кнопку escape
const closePopupEsc = (e) => {
  if (e.key === "Escape" || e.keyCode === 27) {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

// функция подстановки значений в форму
function setUserInfoFormFields(form, name, occupation) {
  const userNameInput = form.elements.userNameInput;
  const userOccupationInput = form.elements.userOccupationInput;
  userNameInput.value = name.textContent;
  userOccupationInput.value = occupation.textContent;
}

// функция удаления текста ошибок
const hideErrors = (inputsAndErrors, config) => {
  const inputs = inputsAndErrors.inputs;
  const errors = inputsAndErrors.errors;
  inputs.forEach((input) => {
    input.classList.remove(config.invalidInputClass);
  });
  errors.forEach((error) => {
    error.textContent = "";
  });
};

// функция получения инпутов и их ошибок
const getInputsAndErrors = (popup) => {
  const inputsAndErrors = {
    inputs: popup.querySelectorAll(".form__input"),
    errors: popup.querySelectorAll(".form__error"),
  };
  return inputsAndErrors;
};

// нажатие кнопки редактировать профиль
editingProfileButton.addEventListener("click", () => {
  setUserInfoFormFields(userInfoForm, profileUserName, profileUserOccupation);
  openPopup(editingProfilePopup);
  hideErrors(getInputsAndErrors(editingProfilePopup), configuration);
});

// закрытие попапа при клике на керстик или оверлей
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

// нажатие кнопки сохранить
editingProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserOccupation.textContent = formUserOccupation.value;
  closePopup(editingProfilePopup);
});

////////////////////////////////

// функуия открытия полной версии изображения
const openImage = (e) => {
  const imageData = {
    url: e.target.getAttribute("src"),
    caption: e.target.getAttribute("alt"),
  };
  image.setAttribute("src", imageData.url);
  image.setAttribute("alt", "Полная версия изображения " + imageData.caption);
  imageName.textContent = imageData.caption;
  openPopup(imagePopup);
};

// функция создания карточки
function createNewCard(card) {
  const element = elementTemplate.content.cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementHeading = element.querySelector(".element__name");
  elementImage.setAttribute("src", card.link);
  elementImage.setAttribute("alt", card.name);
  elementHeading.textContent = card.name;
  // функционал удаления карточки
  const trashButton = element.querySelector(".element__trash");
  trashButton.addEventListener("click", (event) => {
    event.target.closest(".element").remove();
  });
  // функционал нажатия на изображение карточки
  const increaseImageButton = element.querySelector(".element__fullscreen");
  increaseImageButton.addEventListener("click", (event) => {
    openImage(event);
  });
  // функционал лайка
  const likeButton = element.querySelector(".element__like");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("element__like_active");
  });
  return element;
}
// функция добавления карточки на страницу
function renderCard(card) {
  cardsSection.prepend(createNewCard(card));
}
// добавление начальных карточек
cards.forEach(renderCard);

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК
const additionCardPopup = document.querySelector("#addCardPopup");
const additionCardForm = document.querySelector("#addCardForm");
const additionCardButton = document.querySelector("#addCardFormButton");

// функция очистки полей ввода и текста ошибок валидации
const resetInputs = (popup) => {
  const form = popup.querySelector(".form");
  form.reset();
  hideErrors(getInputsAndErrors(popup), configuration);
};

additionCardButton.addEventListener("click", () => {
  openPopup(additionCardPopup);
  resetInputs(additionCardPopup);
});

const formCardName = document.querySelector("#formCardName");
const formCardUrl = document.querySelector("#formCardUrl");

additionCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: formCardName.value,
    link: formCardUrl.value,
  };
  renderCard(newCard);
  closePopup(addCardPopup);
  additionCardForm.reset();
});
