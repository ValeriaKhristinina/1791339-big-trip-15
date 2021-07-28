import { createTripInfo } from './view/trip-info.js';
import { createTripControlsNavigation } from './view/trip-controls-navigation.js';
import { createTripControlsFilters } from './view/trip-controls-filters.js';
import { createTripSort } from './view/trip-sort.js';
import { createTripsList } from './view/trips-list.js';
import { createNewTripForm } from './view/new-trip-form.js';
import { creatingEditTripForm } from './view/edit-trip-form.js';
import { createEvent } from './view/event.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMain, createTripInfo(), 'afterbegin');
render(tripControlsNavigation, createTripControlsNavigation(), 'beforeend');
render(tripControlsFilters, createTripControlsFilters(), 'beforeend');
render(tripEvents, createTripSort(), 'beforeend');
render(tripEvents, createTripsList(), 'beforeend');
render(tripEvents, createNewTripForm(), 'afterbegin');
render(tripEvents, creatingEditTripForm(), 'afterbegin');

const triPListItem = document.querySelector('.trip-events__item');
for (let i = 0; i < 3; i++) {
  render(triPListItem, createEvent(), 'beforeend');
}
