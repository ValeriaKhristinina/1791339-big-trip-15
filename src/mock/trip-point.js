import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const TYPE_POINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATION = ['amsterdam', 'hoofddorp', 'den haague', 'rotterdam', 'urtrecht', 'maastricht', 'uitgeest'];
const DESTINATION_INFO = [
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
  type: TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)],
  destination: {
    name: DESTINATION[getRandomInteger(0, DESTINATION.length - 1)],
    info: DESTINATION_INFO[getRandomInteger(0, DESTINATION.length - 1)],
  },
  photos: [`http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`],
  datePoint: dayjs(),
  time: {
    from: dayjs().format('HH:MM'),
    to: dayjs().format('HH:MM'),
    duration: 32,
  },
  price: getRandomInteger(10, 300),
  offers: new Array(getRandomInteger(0, 3)).fill().map(createOffer),
  isFavorite: Boolean(getRandomInteger()),
});

export {generateTripPoint, TYPE_POINT, allOffers, DESTINATION};
