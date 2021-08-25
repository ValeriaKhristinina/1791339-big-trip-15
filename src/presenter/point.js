import EventView from '@view/event.js';
import TripFormView from '@view/trip-form.js';
import { ModeForm} from '@utils/point.js';
import { render, replace, remove } from '@utils/render.js';

const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(tripListElement, changeData, changeMode) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._tripEditFormComponent = null;
    this._mode = PointMode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._replaceFormToPoint = this._replaceFormToPoint.bind(this);
    this._replacePointToForm = this._replacePointToForm.bind(this);
  }


  init(tripPoint, destinations) {
    this._tripPoint = tripPoint;
    const prevEventComponent = this._eventComponent;
    const prevTripEditFormComponent = this._tripEditFormComponent;

    this._tripEditFormComponent = new TripFormView(ModeForm.EDIT, this._tripPoint, destinations);
    this._eventComponent = new EventView(this._tripPoint);

    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventComponent.setEditClickHandler(this._replacePointToForm);

    this._tripEditFormComponent.setCloseClickHandler(this._replaceFormToPoint);
    this._tripEditFormComponent.setSaveHandler(this._replaceFormToPoint);


    if (prevEventComponent === null || prevTripEditFormComponent === null) {
      render(this._tripListElement, this._eventComponent);
      return;
    }

    if (this._mode === PointMode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === PointMode.EDITING) {
      replace(this._tripEditFormComponent, prevTripEditFormComponent);
    }

    remove(prevEventComponent);
    remove(prevTripEditFormComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._tripEditFormComponent);
  }

  resetView() {
    if(this._mode !== PointMode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._tripEditFormComponent, this._eventComponent);
    this._changeMode();
    this._mode = PointMode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._tripEditFormComponent);
    this._mode = PointMode.DEFAULT;
  }

  _handleFormEditClick() {
    this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._tripPoint,
        {
          isFavorite: !this._tripPoint.isFavorite,
        },
      ),
    );
  }

}
