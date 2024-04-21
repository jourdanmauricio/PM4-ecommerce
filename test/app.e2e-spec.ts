import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let server = null;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    server = await app.init();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('App', () => {
    it('/ (GET health)', async () => {
      return await request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect('Server running correctly');
    });
  });
});
