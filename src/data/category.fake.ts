import { faker } from '@faker-js/faker';
import { UUID } from 'crypto';

export const generateCategory = () => {
  return {
    id: faker.string.uuid() as UUID,
    name: faker.commerce.department(),
  };
};

export const generateCategories = (size: number) => {
  const limit = size ?? 10;
  const fakeCategories = [];
  for (let index = 0; index < limit; index++) {
    fakeCategories.push(generateCategory());
  }
  return [...fakeCategories];
};
