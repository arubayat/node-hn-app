let storyModel;

describe('getStories(storyType, storyCount)', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should return stories', () => {
    const storyData = {
      10: {
        id: 10,
        score: 100,
        title: 'Story Title 10',
        url: 'https://story/10'
      },
      20: {
        id: 20,
        score: 200,
        title: 'Story Title 20',
        url: 'https://story/20'
      },
      30: {
        id: 30,
        score: 300,
        title: 'Story Title 30',
        url: 'https://story/30'
      },
      40: {
        id: 40,
        score: 400,
        title: 'Story Title 40',
        url: 'https://story/40'
      },
      50: {
        id: 50,
        score: 500,
        title: 'Story Title 50',
        url: 'https://story/50'
      }
    };

    const expectedStories = Object.values(storyData);

    // mock the calls to the request module
    jest.doMock('got', () => {
      return jest.fn(opts => {
        const pathKey = opts.path
          .split('.')[0]
          .split('/')
          .pop();
        let data = {};
        if (pathKey === 'beststories') {
          data = Object.keys(storyData);
        } else {
          data = storyData[pathKey];
        }
        return Promise.resolve({
          body: JSON.stringify(data)
        });
      });
    });

    storyModel = require('../src/story_model');

    return storyModel.getStories('best', '5').then(stories => {
      expect(stories).toEqual(expect.arrayContaining(expectedStories));
    });
  });

  test('should error when api returns 500 http status code', () => {
    // mock the hn api endpoint and return a 500 error
    jest.doMock('got', () => {
      return jest.fn(() => {
        return Promise.reject('Response code 500 (Internal Server Error)');
      });
    });

    storyModel = require('../src/story_model');

    return storyModel.getStories('best', '5').catch(error => {
      expect(error.toString()).toMatch(/Response code 500/);
    });
  });
});
