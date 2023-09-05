import { htmlToElement } from "./html-to-element.js";
const urlRoot = "https://project-1-api.herokuapp.com/";

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
const apiKey = await getApiKey();

const showDatesResponse = await axios.get(
  `${urlRoot}showdates?api_key=${apiKey}`
);
const showDates = showDatesResponse.data;

const populateShows = (showDates) => {
  const concertsContainerEl = document.querySelector("#mainContainer");
  for (let i = 0; i < showDates.length; i++) {
    const concert = showDates[i];

    const date = new Date(concert.date); // `date` here is a Date object, UTC
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "America/New_York",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const dateString = dateFormatter.format(date);

    const concertItemEl = htmlToElement(`
        <div class="concert__item">
            <div class="concert__item-group"><span class="concert__item-key">Date: </span><span class="concert__item-date">${dateString}</span></div>
            <div class="concert__item-group"><span class="concert__item-key">Venue: </span><span class="concert__item-value">${concert.place}</span></div>
            <div class="concert__item-group"><span class="concert__item-key">Location: </span><span class="concert__item-value">${concert.location}</span></div>
            <button class="concert__item-button">BUY TICKETS</button>
        </div>
    `);

    concertsContainerEl.append(concertItemEl);
  }
};

populateShows(showDates);
