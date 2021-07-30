import { createTripInfo } from '@view/trip-info.js';
import { createTripControlsNavigation } from '@view/trip-controls-navigation.js';
import { createTripControlsFilters } from '@view/trip-controls-filters.js';
import { createTripSort } from '@view/trip-sort.js';
import { createTripsList } from '@view/trips-list.js';
import { creatingTripForm } from '@view/trip-form.js';
import { createEvent } from '@view/event.js';

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
render(tripEvents, creatingTripForm('new'), 'beforeend');
render(tripEvents, createTripsList(), 'beforeend');

const tripList = document.querySelector('.trip-events__list');
render(tripList, creatingTripForm('edit'), 'afterbegin');

for (let i = 0; i < 3; i++) {
  render(tripList, createEvent(), 'beforeend');
}


