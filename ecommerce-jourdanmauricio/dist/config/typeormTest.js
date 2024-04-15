"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env.test' });
const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
};
exports.default = (0, config_1.registerAs)('typeormTest', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeormTest.js.map