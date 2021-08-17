import TripRouteView from '@view/trip-route.js';
import TripControlsNavigationView from '@view/trip-controls-navigation.js';
import TripControlsFiltersView from '@view/trip-controls-filters.js';
import TripSortView from '@view/trip-sort.js';
import TripsListView from '@view/trips-list.js';
import TripFormView from '@view/trip-form.js';
import EventView from '@view/event.js';
import { generateTripPoint } from '@/mock/trip-point';
import { RenderPosition, render } from '@utils/render.js';
import { getTotalRoutePrice, getFullRout, ModeForm} from '@utils/point.js';

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


render(tripMainElement, new TripRouteView(cities, totalRoutePrice, startRouteDate, finishRouteDate), RenderPosition.AFTER_BEGIN);
render(tripControlsNavigationElement, new TripControlsNavigationView(), RenderPosition.BEFORE_END);
render(tripControlsFiltersElement, new TripControlsFiltersView(), RenderPosition.BEFORE_END);
render(tripEventsElement, new TripSortView(), RenderPosition.BEFORE_END);
render(tripEventsElement, new TripsListView(), RenderPosition.BEFORE_END);

const tripListElement = document.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  const tripPoint = tripPoints[i];
  const tripEditFormComponent = new TripFormView(ModeForm.EDIT, tripPoint);
  const eventComponent = new EventView(tripPoint);

  render(tripListElement, eventComponent.getElement(), RenderPosition.BEFORE_END);

  eventComponent.setEditClickHandler(() => {
    tripListElement.replaceChild(tripEditFormComponent.getElement(),eventComponent.getElement());
  });

  const handleFormClose = () => {
    tripListElement.replaceChild(eventComponent.getElement(), tripEditFormComponent.getElement());
  };

  tripEditFormComponent.setCloseClickHandler(handleFormClose);
  tripEditFormComponent.setSaveHandler(handleFormClose);
}
