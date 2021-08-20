import { generateTripPoint } from '@/mock/trip-point';
import { getTotalRoutePrice, getFullRout, POINTS_COUNT } from '@utils/point.js';
import TripPresenter from '@presenter/trip.js';

const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);
tripPoints.sort((firstElement, secondElement)=> firstElement.dateFrom - secondElement.dateFrom);

const cities = getFullRout(tripPoints);
const totalRoutePrice = getTotalRoutePrice(tripPoints);
const startRouteDate = tripPoints[0].dateFrom;
const finishRouteDate = tripPoints[tripPoints.length-1].dateTo;

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.page-main .trip-events');

const tripPresenter = new TripPresenter(tripMainElement, tripControlsNavigationElement,tripControlsFiltersElement, tripEventsElement);

tripPresenter.init(tripPoints, cities, totalRoutePrice, startRouteDate, finishRouteDate);
