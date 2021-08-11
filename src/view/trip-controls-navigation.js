import { createElement } from '@/utils.js';

const createTripControlsNavigationTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#">Table</a>
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
    </nav>`
);

export default class TripControlsNavigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripControlsNavigationTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate);
    }
  }

  removeElement() {
    this._element = null;
  }
}
