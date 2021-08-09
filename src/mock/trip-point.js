import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const TYPE_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['amsterdam', 'hoofddorp', 'den haague', 'rotterdam', 'urtrecht', 'maastricht', 'uitgeest'];
const DESTINATIONS_INFO = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const OFFERS_TYPE = ['Order Uber', 'Add luggage', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city'];

const createOffer = () => ({
  title: OFFERS_TYPE[getRandomInteger(0, OFFERS_TYPE.length - 1)],
  price: getRandomInteger(20, 80),
});

const allOffers = OFFERS_TYPE.map((offer) => ({
  title: offer,
  price: getRandomInteger(20, 80),
}));

const generateTripPoint = () => ({
  type: TYPE_POINTS[getRandomInteger(0, TYPE_POINTS.length - 1)],
  destination: {
    name: DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
    info: DESTINATIONS_INFO[getRandomInteger(0, DESTINATIONS_INFO.length - 1)],
  },
  photos: [`http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`, `http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`, `http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`],
  dateFrom: dayjs().add(getRandomInteger(0,3), 'day'),
  dateTo: dayjs().add(getRandomInteger(3,6), 'day').add(getRandomInteger(0, 12), 'hour').add(getRandomInteger(0, 60), 'minute'),
  price: getRandomInteger(10, 300),
  offers: new Array(getRandomInteger(0, 3)).fill().map(createOffer),
  isFavorite: Boolean(getRandomInteger()),
});

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

export {generateTripPoint, TYPE_POINTS, allOffers, DESTINATIONS, getDuration};
