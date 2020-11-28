/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const assert = require('assert');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const mock = new MockAdapter(axios);
const hostname = 'youtube.com';

const {
  checkEquivalence,
  checkEquality,
  checkSubset,
  checkDisjoint,
  checkComplete,
  checkDifference,
} = require('../helpers');

describe('YouTube API', async () => {
  it('Equivalence Relation', async () => {
    const result1 = [{ id: 1, name: 'video1' }, { id: 2, name: 'video2' }];
    const result2 = [{ id: 2, name: 'video2' }, { id: 1, name: 'video1' }];

    mock.onGet(`${hostname}/api/videos?query1`).reply(200, result1);

    mock.onGet(`${hostname}/api/videos?query2`).reply(200, result2);

    const response1 = await axios.get(`${hostname}/api/videos?query1`);
    const response2 = await axios.get(`${hostname}/api/videos?query2`);

    const result = checkEquivalence(response1, response2);
    assert.equal(result, true);
  });
  it('Equality relation', async () => {
    const result1 = [{ id: 1, name: 'video1' }, { id: 2, name: 'video2' }];

    mock.onGet(`${hostname}/api/videos`).reply(200, result1);

    const response1 = await axios.get(`${hostname}/api/videos`).then((res) => res.data);
    const response2 = await axios.get(`${hostname}/api/videos`).then((res) => res.data);

    const result = checkEquality(response1, response2);
    assert.equal(result, true);
  });
  it('Subset Relation', async () => {
    const result1 = [{ id: 1, name: 'video1' }, { id: 2, name: 'video2' }];
    const result2 = [{ id: 2, name: 'video2' }];

    mock.onGet(`${hostname}/api/videos?query1`).reply(200, result1);

    mock.onGet(`${hostname}/api/videos?query2`).reply(200, result2);

    const response1 = await axios.get(`${hostname}/api/videos?query1`).then((res) => res.data);
    const response2 = await axios.get(`${hostname}/api/videos?query2`).then((res) => res.data);

    const result = checkSubset(response1, response2);
    assert.equal(result, true);
  });
  it('Disjoint Relation', async () => {
    const result1 = [{ id: 1, name: 'video1' }];
    const result2 = [{ id: 2, name: 'video2' }];

    mock.onGet(`${hostname}/api/videos?videoDimension=2d`).reply(200, result1);

    mock.onGet(`${hostname}/api/videos?videoDimension=3d`).reply(200, result2);

    const response1 = await axios.get(`${hostname}/api/videos?videoDimension=2d`).then((res) => res.data);
    const response2 = await axios.get(`${hostname}/api/videos?videoDimension=3d`).then((res) => res.data);

    const result = checkDisjoint(response1, response2);
    assert.equal(result, true);
  });
  it('Complete Relation', async () => {
    const result1 = [{ id: 1, name: 'video1' }];
    const result2 = [{ id: 2, name: 'video2' }];
    const result3 = [{ id: 1, name: 'video1' }, { id: 2, name: 'video2' }];

    mock.onGet(`${hostname}/api/videos?duration=short`).reply(200, result1);

    mock.onGet(`${hostname}/api/videos?duration=long`).reply(200, result2);

    mock.onGet(`${hostname}/api/videos`).reply(200, result3);

    const response1 = await axios.get(`${hostname}/api/videos?duration=short`).then((res) => res.data);
    const response2 = await axios.get(`${hostname}/api/videos?duration=long`).then((res) => res.data);
    const response3 = await axios.get(`${hostname}/api/videos`).then((res) => res.data);

    const result = checkComplete(response1, response2, response3);
    assert.equal(result, true);
  });

  it('Difference Relation', async () => {
    const result1 = { id: 1, name: 'video1' };

    mock.onPut(`${hostname}/api/videos/1`).reply(200, { id: 1, name: 'video1.1' });

    const response1 = await axios.put(`${hostname}/api/videos/1`, { id: 1, name: 'video1.1' }).then((res) => res.data);

    const result = checkDifference(result1, response1);
    assert.equal(result, true);
  });
});
