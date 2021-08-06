import { TYPE_POINT, allOffers , DESTINATION } from '@/mock/trip-point';

const creatingOfferTemplate = (offers) => offers.map((offer, index) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}" checked>
  <label class="event__offer-label" for="event-offer-${index}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('');

const creatingAllOffersTemplate = (offers) => offers.map((offer, index) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}">
  <label class="event__offer-label" for="event-offer-${index}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('');

const creatingEventTypeTemplate = (types) => types.map((type) => `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`).join('');

const creatingDestinationTemplate = (destinations) => destinations.map((destination) => `<option value="${destination}"></option>`).join('');

export const creatingTripForm = (mode, point = {}) => {
  const {
    type = '',
    destination = '',
    price = 0,
    time = null,
    datePoint = null,
    offers = null,
  } = point;
  const date = datePoint.format('DD/MM/YY');

  if (mode === 'edit') {
    return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${creatingEventTypeTemplate(TYPE_POINT)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${creatingDestinationTemplate(DESTINATION)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date} ${time.from}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date} ${time.to}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${price}</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${creatingOfferTemplate(offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.info}</p>
        </section>
      </section>
    </form>
  </li>`;
  }
  if (mode === 'new') {
    return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${creatingEventTypeTemplate(TYPE_POINT, price)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${creatingDestinationTemplate(DESTINATION)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date} ${time.from}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date} ${time.to}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${price}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${creatingAllOffersTemplate(allOffers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.info}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
  </form>`;
  }

};
