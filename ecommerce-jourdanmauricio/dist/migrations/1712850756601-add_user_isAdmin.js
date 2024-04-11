"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserIsAdmin1712850756601 = void 0;
class AddUserIsAdmin1712850756601 {
    constructor() {
        this.name = 'AddUserIsAdmin1712850756601';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
    }
}
exports.AddUserIsAdmin1712850756601 = AddUserIsAdmin1712850756601;
//# sourceMappingURL=1712850756601-add_user_isAdmin.js.map