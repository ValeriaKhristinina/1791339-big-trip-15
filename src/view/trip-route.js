export const createTripRoute = (cities, totalPrice, startDate, finishDate) => {
  const stringCities = cities.join(' &mdash; ');
  startDate = startDate.format('MMM D');
  finishDate = finishDate.format('MMM D');

  return`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${stringCities}</h1>

      <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${finishDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
};
