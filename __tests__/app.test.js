const request = require('supertest');

jest.mock('../src/story_model');
const app = require('../src/server');

describe('app:routes', () => {
  afterEach(() => {
    app.server.close();
  });

  test('should respond with a 200 with no query parameters', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(/<title>HN Toplines<\/title>/);
      });
  });

  test('should respond with a 200 with valid query parameters', () => {
    return request(app)
      .get('/?storyCount=1&storyType=best')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(/<div class="results">/);
        expect(response.text).toMatch(/<span class="score">1588<\/span>/);
        expect(response.text).toMatch(/<a href="https:\/\/sample.title.story\/1">Sample story title 1<\/a>/);
      });
  });

  test('should respond with a 200 with invalid query parameters', () => {
    return request(app)
      .get('/?storyCount=5&storyType=all')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(/<div class="alert alert-danger">/);
      });
  });

  test('should respond with a 500 error due to server error', () => {
    return request(app)
      .get('/?storyCount=41&storyType=new')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(response => {
        expect(response.body).toEqual({ error: 'Internal server error' });
      });
  });
});
