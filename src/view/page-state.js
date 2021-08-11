import {createElement} from '@/utils.js';

const createPageState = (state) => {
  if (state === 'loading') {
    return '<p class="trip-events__msg">Loading...</p>';
  }
  if (state === 'emptyList') {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }

};

export default class PageState {
  constructor(state) {
    this._state = state;
    this._element = null;
  }

  getTemplate() {
    return createPageState(this._state);
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
