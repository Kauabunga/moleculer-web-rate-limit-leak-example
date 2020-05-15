const { ServiceBroker } = require('moleculer');
const ApiGateway = require('moleculer-web');
const express = require('express');
const request = require('supertest');

const MemoryStore = require('./memory-store');

describe('Handler stays open', () => {
  let broker;
  let service;
  let app;

  const TestApiGateway = {
    name: 'test-gateway-with-custom-rate-limiting',
    settings: {
      server: false,
      rateLimit: {
        StoreFactory: MemoryStore,

        window: 60 * 1000,
        limit: 250,
        headers: true,
        key: (req) => {
          return (
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress
          );
        },
      },
    },
    mixins: [ApiGateway],
  };

  beforeAll(async () => {
    [broker, service, app] = setup(TestApiGateway);
    return broker.start();
  });

  afterAll(async () => broker.stop());

  it('It should 404 happily :)', async () => {
    await request(app).get('/').expect(404);
  });
});

function setup(ApiGatewayService) {
  const broker = new ServiceBroker();

  const service = broker.createService(ApiGatewayService);

  const app = express();
  app.use(service.express());

  return [broker, service, app];
}
