import AbstractView from '@view/abstract.js';

const createTripsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);


export default class TripsList extends AbstractView {
  getTemplate() {
    return createTripsListTemplate();
  }
}
