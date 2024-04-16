"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsers = exports.generateUser = void 0;
const faker_1 = require("@faker-js/faker");
const generateUser = () => {
    let country = faker_1.faker.location.country();
    if (country.length < 5)
        country = country.padStart(5, 'P');
    if (country.length > 20)
        country = country.substring(0, 20);
    let city = faker_1.faker.location.city();
    if (city.length < 6)
        city = country.padStart(6, 'C');
    if (city.length > 20)
        city = country.substring(0, 20);
    return {
        id: faker_1.faker.string.uuid(),
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.number.int({ min: 1000000000, max: 9999999999 }),
        address: faker_1.faker.location.streetAddress({ useFullAddress: true }),
        city: faker_1.faker.location.city(),
        country,
    };
};
exports.generateUser = generateUser;
const generateUsers = (size) => {
    const limit = size ?? 10;
    const fakeUsers = [];
    for (let index = 0; index < limit; index++) {
        fakeUsers.push((0, exports.generateUser)());
    }
    return [...fakeUsers];
};
exports.generateUsers = generateUsers;
//# sourceMappingURL=user.fake.js.map