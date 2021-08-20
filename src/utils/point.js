import dayjs from 'dayjs';

export const POINTS_COUNT = 20;

export const ModeForm = {
  NEW: 'new',
  EDIT: 'edit',
};

export const ButtonAction = {
  DELETE: 'Delete',
  CANCEL: 'Cancel',
};

export const getFullRout = (points) => {
  const destinationCities = [];
  points.forEach((point) => {
    if (point.destination.name !== destinationCities[destinationCities.length-1]){
      destinationCities.push(point.destination.name);
    }
  });
  return destinationCities;
};

export const getTotalRoutePrice = (points) => {
  let totalPrice = 0;
  points.forEach((point) => {
    point.offers.forEach((offer) => {
      totalPrice += offer.price;
    });
    totalPrice += point.price;
  });
  return totalPrice;
};

export const getDuration = (start, finish) => {
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
