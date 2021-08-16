import TripRouteView from '@view/trip-route.js';
import TripControlsNavigationView from '@view/trip-controls-navigation.js';
import TripControlsFiltersView from '@view/trip-controls-filters.js';
import TripSortView from '@view/trip-sort.js';
import TripsListView from '@view/trips-list.js';
import TripFormView from '@view/trip-form.js';
import EventView from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';
import { renderElement, RenderPosition, getTotalRoutePrice, getFullRout, ModeForm } from '@/utils';

const POINTS_COUNT = 20;


const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);
tripPoints.sort((firstElement, secondElement)=> firstElement.dateFrom - secondElement.dateFrom);

const cities = getFullRout(tripPoints);
const totalRoutePrice = getTotalRoutePrice(tripPoints);
const startRouteDate = tripPoints[0].dateFrom;
const finishRouteDate = tripPoints[tripPoints.length-1].dateTo;

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');


renderElement(tripMainElement, new TripRouteView(cities, totalRoutePrice, startRouteDate, finishRouteDate).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripControlsNavigationElement, new TripControlsNavigationView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripControlsFiltersElement, new TripControlsFiltersView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsElement, new TripsListView().getElement(), RenderPosition.BEFORE_END);

const tripListElement = document.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  const tripPoint = tripPoints[i];
  const tripEditFormComponent = new TripFormView(ModeForm.EDIT, tripPoint);
  const eventComponent = new EventView(tripPoint);

  eventComponent.setEditClickHandler(() => {
    tripListElement.replaceChild(tripEditFormComponent.getElement(),eventComponent.getElement());
  });


  renderElement(tripListElement, eventComponent.getElement(), RenderPosition.BEFORE_END);

  const closeForm = () => {
    tripListElement.replaceChild(eventComponent.getElement(), tripEditFormComponent.getElement());
  };

  tripEditFormComponent.setCloseClickHandler(closeForm);

  tripEditFormComponent.setFormSubmitHandler(closeForm);


}
