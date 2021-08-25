import {ModeForm, ButtonAction} from '@utils/point.js';
import { TYPE_POINTS, allOffers } from '@/mock/trip-point';
import SmartView from '@view/smart.js';

const BLANK_POINT = {
  type: '',
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  price: 0,
  dateFrom: null,
  dateTo: null,
  offers: [],
};

const createOfferTemplate = (offers) => offers.map((offer, index) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}" ${offer.isChecked? 'checked': ''}>
  <label class="event__offer-label" for="event-offer-${index}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('');

const createEventTypeTemplate = (types, selectedType) => types.map((type) => `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${ selectedType === type ? 'checked': ''}>
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`).join('');

const createDestinationTemplate = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const createImageTemplate = (photos) => photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('');

export const createTripFormTemplate = (mode, data = {}, destinations) => {
  const {
    type,
    destination,
    price,
    dateFromLabel,
    dateToLabel,
    timeFrom,
    timeTo,
    allOffersByType,
    editOffers } = data;

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeTemplate(TYPE_POINTS, type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination !== null ? destination.name : ''}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationTemplate(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromLabel} ${timeFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToLabel} ${timeTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${mode === ModeForm.NEW ? ButtonAction.CANCEL : ButtonAction.DELETE}</button>
      ${mode === ModeForm.EDIT ? `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ''}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOfferTemplate(mode === ModeForm.EDIT ? editOffers : allOffersByType)}
        </div>
      </section>
      ${ destination && (destination.description) ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createImageTemplate(destination.pictures)}
        </div>
      </div>
    </section>` : ''}

    </section>
  </form>`;
};

export default class TripForm extends SmartView {
  constructor(mode, point = BLANK_POINT, destinations) {
    super();
    this._mode = mode;
    this._data = TripForm.parsePointToData(point);
    this._destinations = destinations;
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._formSaveHandler = this._formSaveHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createTripFormTemplate(this._mode, this._data, this._destinations);
  }

  setSaveHandler(callback) {
    this._callback.saveForm = callback;
    this.getElement().addEventListener('submit', this._formSaveHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler) ;
  }

  _formSaveHandler(evt) {
    evt.preventDefault();
    this._callback.saveForm(TripForm.parseDataToTask(this._data));
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _typeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
    });
  }

  _destinationChangeHandler(evt) {
    const newDestination = this._destinations.find((destination) => destination.name === evt.target.value);
    if(newDestination) {
      this.updateData({
        destination:  newDestination,
      });
    }

  }

  static parsePointToData(point) {
    const { type, dateFrom, dateTo, offers } = point;
    const dateFromLabel = dateFrom.format('DD/MM/YY');
    const dateToLabel = dateTo.format('DD/MM/YY');
    const timeFrom = dateFrom.format('HH:mm');
    const timeTo = dateTo.format('HH:mm');

    const offersByType = allOffers.find((offer) => offer.type === type);
    const allOffersByType = offersByType ? offersByType.offers : [];

    const editOffers = offers.map((offer) => ({...offer, isChecked: true}));

    allOffersByType.forEach((generalOffer) => {
      const isExist = editOffers.some((offer)=> offer.title === generalOffer.title && offer.price === generalOffer.price);

      if(!isExist) {
        editOffers.push({
          ...generalOffer,
          isChecked: false,
        });
      }
    });
    return Object.assign(
      {},
      point,
      {
        dateFromLabel,
        dateToLabel,
        timeFrom,
        timeTo,
        allOffersByType,
        editOffers,
      },
    );
  }

  static parseDataToTask(data) {
    data = Object.assign({}, data);

    delete data.dateFromLabel;
    delete data.dateToLabel;
    delete data.timeFrom;
    delete data.timeTo;
    delete data.allOffersByType;
    delete data.editOffers;

    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSaveHandler(this._callback.saveForm);
    this.setCloseClickHandler(this._callback.editClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
  }
}
