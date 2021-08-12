import TripRouteView from '@view/trip-route.js';
import TripControlsNavigationView from '@view/trip-controls-navigation.js';
import TripControlsFiltersView from '@view/trip-controls-filters.js';
import TripSortView from '@view/trip-sort.js';
import TripsListView from '@view/trips-list.js';
import TripFormView from '@view/trip-form.js';
import EventView from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';
import { render, RenderPosition, getTotalRoutePrice, getFullRout } from '@/utils';

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


render(tripMain, new TripRouteView(cities, totalRoutePrice, startRouteDate, finishRouteDate).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsNavigation, new TripControlsNavigationView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new TripControlsFiltersView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
// render(tripEvents, new TripFormView(MODE.NEW, tripPoints[0]).getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new TripsListView().getElement(), RenderPosition.BEFOREEND);

const tripList = document.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  const tripEditFormComponent = new TripFormView(MODE.EDIT, tripPoints[i]).getElement();
  const eventComponent = new EventView(tripPoints[i]).getElement();

  const rollupBtn = eventComponent.querySelector('.event__rollup-btn');

  render(tripList, eventComponent, RenderPosition.BEFOREEND);

  rollupBtn.addEventListener('click', () => {
    tripList.replaceChild(tripEditFormComponent,eventComponent);
  });

  tripEditFormComponent.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    tripList.replaceChild(eventComponent, tripEditFormComponent);
  });
}
