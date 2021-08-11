import { createElement } from '@/utils';

const createTripRouteTemplate = (cities, totalPrice, startDate, finishDate) => {
  const citiesLable = cities.join(' &mdash; ');
  startDate = startDate.format('MMM D');
  finishDate = finishDate.format('MMM D');

  return`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${citiesLable}</h1>

      <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${finishDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
};

export default class TripRoute {
  constructor(cities, totalPrice, startDate, finishDate) {
    this._cities = cities;
    this._totalPrice = totalPrice;
    this._startDate = startDate;
    this._finishDate = finishDate;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteTemplate(this._cities, this._totalPrice, this._startDate, this._finishDate);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
