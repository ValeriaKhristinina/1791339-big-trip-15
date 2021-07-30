export const createPageState = (state) => {
  if (state === 'loading') {
    return '<p class="trip-events__msg">Loading...</p>';
  }
  if (state === 'emptyList') {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }

};
