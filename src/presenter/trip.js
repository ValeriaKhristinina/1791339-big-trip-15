import TripRouteView from '@view/trip-route.js';
import TripControlsNavigationView from '@view/trip-controls-navigation.js';
import TripControlsFiltersView from '@view/trip-controls-filters.js';
import TripSortView from '@view/trip-sort.js';
import TripsListView from '@view/trips-list.js';

import { updateItem } from '@utils/common.js';
import { RenderPosition, render } from '@utils/render.js';

import PointPresenter from './point.js';

const POINTS_COUNT = 20;

export default class Trip {
  constructor(tripMainElement, tripControlsNavigationElement, tripControlsFiltersElement, tripEventsElement) {
    this._renderedPointsCount = POINTS_COUNT;
    this._pointPresenter = new Map();

    this._tripMainElement = tripMainElement;
    this._tripControlsNavigationElement = tripControlsNavigationElement;
    this._tripControlsFiltersElement = tripControlsFiltersElement;
    this._tripEventsElement = tripEventsElement;

    this._tripControlsNavigationComponent = new TripControlsNavigationView();
    this._tripControlsFiltersComponent = new TripControlsFiltersView();
    this._tripSortViewComponent = new TripSortView();
    this._tripListViewComponent = new TripsListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModePointChange = this._handleModePointChange.bind(this);
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

  _handleModePointChange(){
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updateTask) {
    this._tripPoints = updateItem(this._tripPoints, updateTask );
    this._pointPresenter.get(updateTask.id).init(updateTask );
  }

  _renderTripPoints() {
    for (let i = 0; i < this._renderedPointsCount; i++) {
      const tripPoint = this._tripPoints[i];
      this._renderTripPoint(tripPoint);
    }
  }

  _renderTripPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._tripListViewComponent.getElement(),this._handlePointChange, this._handleModePointChange);
    pointPresenter.init(tripPoint);

    this._pointPresenter.set(tripPoint.id, pointPresenter);

  }

  //method for future sorting
  _clearTripPointsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }
}
