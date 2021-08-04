import { createTripInfo } from '@view/trip-info.js';
import { createTripControlsNavigation } from '@view/trip-controls-navigation.js';
import { createTripControlsFilters } from '@view/trip-controls-filters.js';
import { createTripSort } from '@view/trip-sort.js';
import { createTripsList } from '@view/trips-list.js';
import { creatingTripForm } from '@view/trip-form.js';
import { createEvent } from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';

const POINTS_COUNTS = 20;

const tripPoints = new Array(POINTS_COUNTS).fill().map(generateTripPoint);

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
render(tripEvents, creatingTripForm('new', tripPoints[0]), 'beforeend');
render(tripEvents, createTripsList(), 'beforeend');

const tripList = document.querySelector('.trip-events__list');
render(tripList, creatingTripForm('edit', tripPoints[0]), 'afterbegin');

for (let i = 0; i < POINTS_COUNTS; i++) {
  render(tripList, createEvent(tripPoints[i]), 'beforeend');
}

console.log(tripPoints);


