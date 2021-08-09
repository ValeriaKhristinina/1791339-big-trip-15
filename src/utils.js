import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getFullRout = (points) => {
  const destinationCities = [];
  points.forEach((point) => {
    if (point.destination.name !== destinationCities[destinationCities.length-1]){
      destinationCities.push(point.destination.name);
    }
  });
  return destinationCities;
};

const getTotalRoutePrice = (points) => {
  let totalPrice = 0;
  points.forEach((point) => {
    point.offers.forEach((offer) => {
      totalPrice += offer.price;
    });
    totalPrice += point.price;
  });
  return totalPrice;
};

const getDuration = (start, finish) => {
  const duration = dayjs(finish.diff(start));
  if (finish.diff(start, 'hour') < 1) {
    return duration.format('mm[M]');
  }
  if (finish.diff(start, 'day') <= 1) {
    return duration.format('HH[H] mm[M]');
  }
  if (finish.diff(start, 'day') > 1) {
    return duration.format('DD[D] HH[H] mm[M]');
  }
};

export {getRandomInteger, createElement, renderTemplate, getTotalRoutePrice, getFullRout, getDuration};
