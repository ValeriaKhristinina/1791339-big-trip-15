import { createTripRouteTemplate } from '@view/trip-route.js';
import { createTripControlsNavigationTemplate } from '@view/trip-controls-navigation.js';
import { createTripControlsFiltersTemplate } from '@view/trip-controls-filters.js';
import { createTripSortTemplate } from '@view/trip-sort.js';
import { createTripsListTemplate } from '@view/trips-list.js';
import { createTripFormTemplate } from '@view/trip-form.js';
import { createEventTemplate } from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';
import { renderTemplate, getTotalRoutePrice, getFullRout } from '@/utils';

const POINTS_COUNT = 20;

const MODE = {
  NEW: 'new',
  EDIT: 'edit',
};

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);
tripPoints.sort((firstElement, secondElement)=> firstElement.dateFrom - secondElement.dateFrom);

const cities = getFullRout(tripPoints);
const totalRoutePrice = getTotalRoutePrice(tripPoints);
const startRouteDate = tripPoints[0].dateFrom;
const finishRouteDate = tripPoints[tripPoints.length-1].dateTo;

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');


renderTemplate(tripMain, createTripRouteTemplate(cities, totalRoutePrice, startRouteDate, finishRouteDate), 'afterbegin');
renderTemplate(tripControlsNavigation, createTripControlsNavigationTemplate(), 'beforeend');
renderTemplate(tripControlsFilters, createTripControlsFiltersTemplate(), 'beforeend');
renderTemplate(tripEvents, createTripSortTemplate(), 'beforeend');
renderTemplate(tripEvents, createTripFormTemplate(MODE.NEW, tripPoints[0]), 'beforeend');
renderTemplate(tripEvents, createTripsListTemplate(), 'beforeend');

const tripList = document.querySelector('.trip-events__list');
renderTemplate(tripList, createTripFormTemplate(MODE.EDIT, tripPoints[0]), 'afterbegin');

for (let i = 0; i < POINTS_COUNT; i++) {
  renderTemplate(tripList, createEventTemplate(tripPoints[i]), 'beforeend');
}


