"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1713221398258 = void 0;
class Initial1713221398258 {
    constructor() {
        this.name = 'Initial1713221398258';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL DEFAULT 'https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_id" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_3ff3367344edec5de2355a562e" UNIQUE ("order_id"), CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, "phone" bigint, "country" character varying(50), "address" text, "city" character varying(50), "is_admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details_products" ("order_details_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_3862faaeb6f4b71b4473edcf152" PRIMARY KEY ("order_details_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1926953a351a481eb20231429b" ON "order_details_products" ("order_details_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fac3bbf92765b25be9eaafb28a" ON "order_details_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_3ff3367344edec5de2355a562ee" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_1926953a351a481eb20231429b7" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_1926953a351a481eb20231429b7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_3ff3367344edec5de2355a562ee"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fac3bbf92765b25be9eaafb28a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1926953a351a481eb20231429b"`);
        await queryRunner.query(`DROP TABLE "order_details_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.Initial1713221398258 = Initial1713221398258;
//# sourceMappingURL=1713221398258-initial.js.map