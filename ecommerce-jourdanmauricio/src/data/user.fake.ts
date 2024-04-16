import { faker } from '@faker-js/faker';

export const generateUser = () => {
  let country = faker.location.country();
  if (country.length < 5) country = country.padStart(5, 'P');
  if (country.length > 20) country = country.substring(0, 20);

  let city = faker.location.city();
  if (city.length < 6) city = country.padStart(6, 'C');
  if (city.length > 20) city = country.substring(0, 20);

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
    address: faker.location.streetAddress({ useFullAddress: true }),
    city: faker.location.city(),
    country,
  };
};

export const generateUsers = (size: number) => {
  const limit = size ?? 10;
  const fakeUsers = [];
  for (let index = 0; index < limit; index++) {
    fakeUsers.push(generateUser());
  }
  return [...fakeUsers];
};
