import TripRouteView from '@view/trip-route.js';
import TripControlsNavigationView from '@view/trip-controls-navigation.js';
import TripControlsFiltersView from '@view/trip-controls-filters.js';
import TripSortView from '@view/trip-sort.js';
import TripsListView from '@view/trips-list.js';

import { RenderPosition, render } from '@utils/render.js';

import PointPresenter from './point.js';

const POINTS_COUNT = 20;

export default class Trip {
  constructor(tripMainElement, tripControlsNavigationElement, tripControlsFiltersElement, tripEventsElement) {
    this._renderedPointsCount = POINTS_COUNT;
    this._tripControlsNavigationComponent = new TripControlsNavigationView();
    this._tripControlsFiltersComponent = new TripControlsFiltersView();
    this._tripSortComponent = new TripSortView();
    this._TripsListComponent = new TripsListView();

    this._tripMainElement = tripMainElement;
    this._tripControlsNavigationElement = tripControlsNavigationElement;
    this._tripControlsFiltersElement = tripControlsFiltersElement;
    this._tripEventsElement = tripEventsElement;

    this._tripControlsNavigationComponent = new TripControlsNavigationView();
    this._tripControlsFiltersComponent = new TripControlsFiltersView();
    this._tripSortViewComponent = new TripSortView();
    this._tripListViewComponent = new TripsListView();


  }

  init(tripPoints, cities, totalRoutePrice, startRouteDate, finishRouteDate) {
    this._tripPoints = tripPoints;
    this._tripRouteComponent = new TripRouteView(cities, totalRoutePrice, startRouteDate, finishRouteDate);

    render(this._tripMainElement, this._tripRouteComponent, RenderPosition.AFTER_BEGIN);
    render(this._tripControlsNavigationElement, this._tripControlsNavigationComponent);
    render(this._tripControlsFiltersElement, this._tripControlsFiltersComponent);
    render(this._tripEventsElement, this._tripSortViewComponent);
    render(this._tripEventsElement, this._tripListViewComponent);


    this._renderTripPoints();
  }


  _renderTripPoints() {
    for (let i = 0; i < this._renderedPointsCount; i++) {
      const tripPoint = this._tripPoints[i];
      this._renderTripPoint(tripPoint);
    }
  }

  _renderTripPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._tripListViewComponent.getElement());
    pointPresenter.init(tripPoint);
  }
}
