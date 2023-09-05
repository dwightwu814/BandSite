// Ignore: technical detail
import { htmlToElement } from "./utils/html-to-element.js";

// Targets of operation
const commentsContainer = document.querySelector("#commentMainContainer");
const nameInputEl = document.querySelector("#userNameInput");
const commentInputEl = document.querySelector("#userCommentInput");
const buttonEl = document.querySelector("#button");

let apiKey;

// Ignore: defining a constant
const urlRoot = "https://project-1-api.herokuapp.com/";

// Find the api key, and make `apiKey` have a value
const getApiKey = async () => {
  try {
    const response = await axios.get(`${urlRoot}register`);
    const data = response.data;
    const apiKey = data.api_key;
    console.log(apiKey);
    return apiKey;
  } catch (error) {
    // What happens if the connection fails
    console.log(error);
  }
};

// Find comments, and output them
const getComments = async () => {
  const url = `${urlRoot}comments?api_key=${apiKey}`;
  const response = await axios.get(url);
  const comments = response.data;
  return comments;
};

// Take one piece of comment, and add to HTML
const displayOneComment = (name, commentText, dateString) => {
  const comment = htmlToElement(`
        <div class="comment__item" id="commentContainer">
          <div class="comment__item-photo"></div>

          <div class="comment__textarea">
            <div class="comment__item-nameandtimestamp">
              <div class="comment__item-heading">${name}</div>

              <div class="comment__item-date">${dateString}</div>
            </div>

            <div class="comment__item-content">
                ${commentText}
            </div>
          </div>
        </div>
    `);
  commentsContainer.prepend(comment);
  return;
};

// Take all comments, and add to HTML
const displayComments = (comments) => {
  commentsContainer.innerHTML = "";
  for (let i = 0; i < Math.min(comments.length, 10); i++) {
    const comment = comments[i];
    const date = new Date(comment.timestamp);
    const dateString = date.toLocaleDateString("en-US");
    displayOneComment(comment.name, comment.comment, dateString);
  }
};

const clearInputs = () => {
  nameInputEl.value = "";
  commentInputEl.value = "";
};
// All the things that happen when the page loads
const onPageLoad = async () => {
  apiKey = await getApiKey();
  const comments = await getComments();
  displayComments(comments);
  return;
};

const onSubmit = async () => {
  const name = nameInputEl.value;
  const comment = commentInputEl.value;
  const input = {
    name: name,
    comment: comment,
  };

  const url = `${urlRoot}comments?api_key=${apiKey}`;

  try {
    const response = await axios.post(url, input, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const comments = await getComments();
      displayComments(comments);
      clearInputs();
    }
  } catch (error) {
    console.log(error);
  }
};

onPageLoad();

buttonEl.addEventListener("click", onSubmit);
