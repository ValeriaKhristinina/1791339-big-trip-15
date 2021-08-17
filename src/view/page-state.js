import AbstractView from '@view/abstract.js';

const ModePage = {
  LOADING: 'loading',
  EMPTY_LIST: 'emptyList',
};

const createPageStateTemplate = (state) => {
  if (state === ModePage.LOADING) {
    return '<p class="trip-events__msg">Loading...</p>';
  }
  if (state === ModePage.EMPTY_LIST) {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }

};

export default class PageState extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  getTemplate() {
    return createPageStateTemplate(this._state);
  }
}
