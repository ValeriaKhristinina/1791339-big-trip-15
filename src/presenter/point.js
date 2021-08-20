import EventView from '@view/event.js';
import TripFormView from '@view/trip-form.js';
import { ModeForm} from '@utils/point.js';
import { render } from '@utils/render.js';

export default class Point {
  constructor(tripListElement) {
    this._tripListElement = tripListElement;
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleFormSave = this._handleFormSave.bind(this);
  }

  _handleFormClose ()  {
    this._tripListElement.replaceChild(this._eventComponent.getElement(), this._tripEditFormComponent.getElement());
  }

  _handleFormSave ()  {
    /// some code for sending to server
    this._handleFormClose();
  }

  init(tripPoint) {
    this._tripEditFormComponent = new TripFormView(ModeForm.EDIT, tripPoint);
    this._eventComponent = new EventView(tripPoint);

    render(this._tripListElement, this._eventComponent);

    this._eventComponent.setEditClickHandler(() => {
      this._tripListElement.replaceChild(this._tripEditFormComponent.getElement(), this._eventComponent.getElement());
    });

    this._eventComponent.setFavoriteClickHamdler(() => {
      const favoriteButton = this._eventComponent.getElement().querySelector('.event__favorite-btn');

      if (!tripPoint.isFavorite) {
        tripPoint.isFavorite = true;
        favoriteButton.classList.add('event__favorite-btn--active');

      } else {
        tripPoint.isFavorite = false;
        favoriteButton.classList.remove('event__favorite-btn--active');
      }
    });


    this._tripEditFormComponent.setCloseClickHandler(this._handleFormClose);
    this._tripEditFormComponent.setSaveHandler(this._handleFormSave);

  }

}
