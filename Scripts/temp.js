const nameInputEl = document.querySelector("#userNameInput");
const commentInputEl = document.querySelector("#userCommentInput");
const buttonEl = document.querySelector("#button");
const commentMainContainerEl = document.querySelector("#commentMainContainer");

const getNewElement = (tagName, className, innerText) => {
  const newEl = document.createElement(tagName);
  newEl.classList.add(className);

  if (innerText) {
    newEl.innerText = innerText;
  }

  return newEl;
};

const handleSubmit = () => {
  const nameContent = nameInputEl.value;
  const commentContent = commentInputEl.value;

  const newCommentEl = getNewElement(
    "div",
    "comment__item-content",
    commentContent
  );
  const newDateEl = getNewElement("div", "comment__item-date", "8/25/2023");
  const newNameEl = getNewElement("div", "comment__item-heading", nameContent);

  const newPhotoEl = getNewElement("div", "comment__item-photo");
  const newNameAndDate = getNewElement("div", "comment__item-nameandtimestamp");

  newNameAndDate.append(newNameEl);
  newNameAndDate.append(newDateEl);

  const newCommentTextAreaEl = getNewElement("div", "comment__textarea");
  newCommentTextAreaEl.append(newNameAndDate);
  newCommentTextAreaEl.append(newCommentEl);

  const newCommentItemEl = getNewElement("div", "comment__item");
  newCommentItemEl.append(newPhotoEl);
  newCommentItemEl.append(newCommentTextAreaEl);

  commentMainContainerEl.prepend(newCommentItemEl);

  nameInputEl.value = "";
  commentInputEl.value = "Add New Comment";
};

buttonEl.addEventListener("click", handleSubmit);
