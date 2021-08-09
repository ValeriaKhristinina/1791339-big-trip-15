import { createTripRouteTemplate } from '@view/trip-route.js';
import { createTripControlsNavigationTemplate } from '@view/trip-controls-navigation.js';
import { createTripControlsFiltersTemplate } from '@view/trip-controls-filters.js';
import { createTripSortTemplate } from '@view/trip-sort.js';
import { createTripsListTemplate } from '@view/trips-list.js';
import { createTripFormTemplate } from '@view/trip-form.js';
import { createEventTemplate } from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';

const POINTS_COUNT = 20;

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const getFullRout = (points) => {
  const destinationCities = [];
  points.forEach((point) => {
    if (point.destination.name !== destinationCities[destinationCities.length-1]){
      destinationCities.push(point.destination.name);
    }
  });
  return destinationCities;
};

const getTotalRoutePrice = (points) => {
  let totalPrice = 0;
  points.forEach((point) => {
    point.offers.forEach((offer) => {
      totalPrice += offer.price;
    });
    totalPrice += point.price;
  });
  return totalPrice;
};

const cities = getFullRout(tripPoints);
const totalRoutePrice = getTotalRoutePrice(tripPoints);
const startRouteDate = tripPoints[0].dateFrom;
const finishRouteDate = tripPoints[tripPoints.length-1].dateTo;

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

for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripList, createEventTemplate(tripPoints[i]), 'beforeend');
}


