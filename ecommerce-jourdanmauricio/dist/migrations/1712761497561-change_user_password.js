"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserPassword1712761497561 = void 0;
class ChangeUserPassword1712761497561 {
    constructor() {
        this.name = 'ChangeUserPassword1712761497561';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(150) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(20) NOT NULL`);
    }
}
exports.ChangeUserPassword1712761497561 = ChangeUserPassword1712761497561;
//# sourceMappingURL=1712761497561-change_user_password.js.map