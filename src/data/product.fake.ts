import { faker } from '@faker-js/faker';
import { generateCategory } from './category.fake';

export const generateProduct = () => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 100 })),
    stock: faker.number.int({ min: 2, max: 99999 }),
    imgUrl: faker.image.url(),
    categoryId: generateCategory().id,
  };
};

export const generateProducts = (size: number) => {
  const limit = size ?? 10;
  const fakeProducts = [];
  for (let index = 0; index < limit; index++) {
    fakeProducts.push(generateProduct());
  }
  return [...fakeProducts];
};
