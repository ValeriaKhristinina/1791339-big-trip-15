import AbstractView from '@view/abstract.js';
import { getDuration } from '@utils/point.js';

const createListOffersTemplate = (offers) => offers.map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');

const createEventTemplate = (point) => {

  const {dateFrom, dateTo, type, destination, price, offers, isFavorite} = point;

  const dateFromLabel = dateFrom !== null
    ? dateFrom.format('MMM D')
    : '';

  const timeFrom = dateFrom.format('HH:mm');
  const timeTo = dateTo.format('HH:mm');

  const duration = getDuration(dateFrom, dateTo);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFromLabel}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination ? destination.name : ''}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.toISOString()}">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.toISOString()}">${timeTo}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createListOffersTemplate(offers)}
      </ul>

      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Event extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler) ;
  }

  setFavoriteClickHandler (callback) {
    this._callback.isFavoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteButtonClickHandler);
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteButtonClickHandler (evt) {
    evt.preventDefault();
    this._callback.isFavoriteClick();
  }
}
