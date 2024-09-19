import axios from 'axios';

const CARDS = document.querySelector('.events-list');

async function getEvents() {
    try {
        const response = await axios.get("https://eventsregistrationbackend.onrender.com/events/");
        return response.data.data;

    } catch (error) {
        console.log(error);
    }
};

let eventsList = [];

function markUpEvents() {
    getEvents()
        .then((res) => {
            eventsList = res;
            return eventsList;
        })
        .then((events) => {
            const result = events.map((event) =>
                `<li class="events-list-item">
                    <h3>${event.title}</h3>
                    <p>${event.event_date}</p>
                    <h4>${event.organizer}</h4>
                    <p>${event.description}</p>
                    <div class="buttons">
                      <button class="registerBtn btn" type="button">Register</button>
                      <button class="viewBtn btn" type="button">View</button>
                    </div>
                </li>`)
                .join('');
            return CARDS.insertAdjacentHTML('afterbegin', result);
        })
        .catch((error) => {
            CARDS.innerHTML = `<h3>Not found</h3>`;
        });
};

markUpEvents();