import { createTripRouteTemplate } from '@view/trip-route.js';
import { createTripControlsNavigationTemplate } from '@view/trip-controls-navigation.js';
import { createTripControlsFiltersTemplate } from '@view/trip-controls-filters.js';
import { createTripSortTemplate } from '@view/trip-sort.js';
import { createTripsListTemplate } from '@view/trips-list.js';
import { createTripFormTemplate } from '@view/trip-form.js';
import { createEventTemplate } from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';

const POINTS_COUNTS = 20;

const tripPoints = new Array(POINTS_COUNTS).fill().map(generateTripPoint);

const getRout = (points) => {
  const arrCities = [];
  points.forEach((point) => {
    if (point.destination.name !== arrCities[arrCities.length-1]){
      arrCities.push(point.destination.name);
    }
  });
  return arrCities;
};

const getTotalRoutePrice = (points) => {
  let totalPrice = 0;
  points.forEach((point) => {
    totalPrice += point.price;
  });
  return totalPrice;
};

const cities = getRout(tripPoints);
const totalRoutePrice = getTotalRoutePrice(tripPoints);
const startRouteDate = tripPoints[0].datePoint;
const finishRouteDate = tripPoints[tripPoints.length-1].datePoint;

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMain, createTripRouteTemplate(cities, totalRoutePrice, startRouteDate, finishRouteDate), 'afterbegin');
render(tripControlsNavigation, createTripControlsNavigationTemplate(), 'beforeend');
render(tripControlsFilters, createTripControlsFiltersTemplate(), 'beforeend');
render(tripEvents, createTripSortTemplate(), 'beforeend');
render(tripEvents, createTripFormTemplate('new', tripPoints[0]), 'beforeend');
render(tripEvents, createTripsListTemplate(), 'beforeend');

const tripList = document.querySelector('.trip-events__list');
render(tripList, createTripFormTemplate('edit', tripPoints[0]), 'afterbegin');

for (let i = 0; i < POINTS_COUNTS; i++) {
  render(tripList, createEventTemplate(tripPoints[i]), 'beforeend');
}


