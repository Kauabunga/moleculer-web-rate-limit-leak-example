const { ServiceBroker } = require('moleculer');
const ApiGateway = require('moleculer-web');
const express = require('express');
const request = require('supertest');

describe('Handler closes', () => {
  let broker;
  let service;
  let app;

  const TestApiGateway = {
    name: 'test-gateway-without-rate-limiting',
    settings: {
      server: false,
    },
    mixins: [ApiGateway],
  };

  beforeAll(async () => {
    [broker, service, app] = setup(TestApiGateway);
    return broker.start();
  });

  afterAll(async () => {
    await broker.stop();
  });

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
