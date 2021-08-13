import TripRouteView from '@view/trip-route.js';
import TripControlsNavigationView from '@view/trip-controls-navigation.js';
import TripControlsFiltersView from '@view/trip-controls-filters.js';
import TripSortView from '@view/trip-sort.js';
import TripsListView from '@view/trips-list.js';
import TripFormView from '@view/trip-form.js';
import EventView from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';
import { render, RenderPosition, getTotalRoutePrice, getFullRout, ModeForm } from '@/utils';

const POINTS_COUNT = 20;


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


render(tripMain, new TripRouteView(cities, totalRoutePrice, startRouteDate, finishRouteDate).getElement(), RenderPosition.AFTER_BEGIN);
render(tripControlsNavigation, new TripControlsNavigationView().getElement(), RenderPosition.BEFORE_END);
render(tripControlsFilters, new TripControlsFiltersView().getElement(), RenderPosition.BEFORE_END);
render(tripEvents, new TripSortView().getElement(), RenderPosition.BEFORE_END);
render(tripEvents, new TripsListView().getElement(), RenderPosition.BEFORE_END);

const tripList = document.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  const tripPoint = tripPoints[i];
  const tripEditFormComponent = new TripFormView(ModeForm.EDIT, tripPoint).getElement();
  const eventComponent = new EventView(tripPoint).getElement();

  const rollupButton = eventComponent.querySelector('.event__rollup-btn');
  const rolldownButton = tripEditFormComponent.querySelector('.event__rollup-btn');

  render(tripList, eventComponent, RenderPosition.BEFORE_END);

  rollupButton.addEventListener('click', () => {
    tripList.replaceChild(tripEditFormComponent,eventComponent);
  });

  rolldownButton.addEventListener('click', () => {
    tripList.replaceChild(eventComponent, tripEditFormComponent);
  });

  tripEditFormComponent.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    tripList.replaceChild(eventComponent, tripEditFormComponent);
  });
}
