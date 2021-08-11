import { createElement } from '@/utils.js';
const createTripsListTemplate = () => (
  `<ul class="trip-events__list">

  </ul>`
);


export default class TripsList {
  constructor() {
    this._element =null;
  }

  getTemplate() {
    return createTripsListTemplate();
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
