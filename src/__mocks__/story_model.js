function getStories(storyType, storyCount) {
  if (storyType === 'new' && storyCount === '41') {
    return Promise.reject('Internal server error');
  }

  const stories = [
    {
      by: 'CrankyBear',
      descendants: 491,
      id: 21003773,
      kids: [],
      score: 1588,
      time: 1568801478,
      title: 'Sample story title 1',
      type: 'story',
      url: 'https://sample.title.story/1'
    },
    {
      by: 'maxdeviant',
      descendants: 2167,
      id: 20990583,
      kids: [],
      score: 1728,
      time: 1568686550,
      title: 'Sample story title 2',
      type: 'story',
      url: 'https://sample.title.story/2'
    },
    {
      by: 'andygcook',
      descendants: 347,
      id: 20995200,
      kids: [],
      score: 846,
      time: 1568729124,
      title: 'Sample story title 3',
      type: 'story',
      url: 'https://sample.title.story/3'
    },
    {
      by: 'hhs',
      descendants: 492,
      id: 21002745,
      kids: [],
      score: 670,
      time: 1568787003,
      title: 'Sample story title 4',
      type: 'story',
      url: 'https://sample.title.story/4'
    },
    {
      by: 'ph0rque',
      descendants: 460,
      id: 21015964,
      kids: [],
      score: 600,
      time: 1568899903,
      title: 'Sample story title 5',
      type: 'story',
      url: 'https://sample.title.story/5'
    }
  ];

  const dataset = storyType === 'best' ? stories : [];
  return Promise.resolve(dataset.slice(0, storyCount));
}

module.exports = {
  getStories
};
