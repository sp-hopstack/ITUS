import request from 'supertest';
import app from '../../src/app';
import health from '../../src/healthcheck';

jest.mock('../../src/healthcheck');

describe('GET /health', () => {
  it('responds with json', async () => {
    health.mockReturnValue({ status: 'OK' });

    await request(app)
      .get('/health')
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'OK');
      });
  });

  it('responds with non 200 status', async () => {
    health.mockImplementation(() => {
      throw new Error('Mock error');
    });

    await request(app)
      .get('/health')
      .expect((response) => {
        expect(response.status).not.toBe(200);
      });
  });
});
