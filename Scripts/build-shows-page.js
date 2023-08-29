import { htmlToElement } from "./html-to-element.js";

const concerts = [{
    date: "Mon Sept 6 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA"

}, {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA"
}, {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA"
}, {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA"
}, {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA"
}, {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA"
}]

const concertsContainerEl = document.querySelector("#mainContainer");

for (let i = 0; i < concerts.length; i++) {
    const concert = concerts[i];

    const concertItemEl = htmlToElement(`
        <div class="concert__item">
            <div class="concert__item-group"><span class="concert__item-key">Date: </span><span class="concert__item-date">${concert.date}</span></div>
            <div class="concert__item-group"><span class="concert__item-key">Venue: </span><span class="concert__item-value">${concert.venue}</span></div>
            <div class="concert__item-group"><span class="concert__item-key">Location: </span><span class="concert__item-value">${concert.location}</span></div>
            <button class="concert__item-button">BUY TICKETS</button>
        </div>
    `)

    concertsContainerEl.append(concertItemEl);
}