"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.development' });
exports.CloudinaryConfig = {
    provide: 'cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            api_key: process.env.CLOUDINARY_API_KEY,
        });
    },
};
//# sourceMappingURL=cloudinary.js.map