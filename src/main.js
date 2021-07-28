import { createTripInfo } from './view/trip-info.js';
import { createTripControlsNavigation } from './view/trip-controls-navigation.js';
import { createTripControlsFilters } from './view/trip-controls-filters.js';
import { createTripSort } from './view/trip-sort.js';
import { createEventsList } from './view/events-list.js'

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
render(tripEvents, createEventsList(), 'beforeend');
