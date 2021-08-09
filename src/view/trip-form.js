import { TYPE_POINTS, allOffers , DESTINATIONS } from '@/mock/trip-point';

const createOfferTemplate = (offers, isChecked) => offers.map((offer, index) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}" ${isChecked? 'checked': ''}>
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

const createDestinationTemplate = (destinations) => destinations.map((destination) => `<option value="${destination}"></option>`).join('');

const createImageTemplate = (photos) => photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('');

export const createTripFormTemplate = (mode, point = {}) => {
  const {
    type = '',
    destination,
    price = 0,
    dateFrom = null,
    dateTo = null,
    offers = null,
    photos = null,
  } = point;
  const dateFromLabel = dateFrom.format('DD/MM/YY');
  const dateToLabel = dateTo.format('DD/MM/YY');
  const timeFrom = dateFrom.format('HH:mm');
  const timeTo = dateTo.format('HH:mm');

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
          ${createDestinationTemplate(DESTINATIONS)}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${mode === 'new' ? 'Cancel' : 'Delete'}</button>
      ${mode === 'edit' ? `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ''}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOfferTemplate(allOffers, mode === 'edit')}
        </div>
      </section>
      ${ destination && (destination.info) ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.info}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createImageTemplate(photos)}
        </div>
      </div>
    </section>` : ''}

    </section>
  </form>`;

};
