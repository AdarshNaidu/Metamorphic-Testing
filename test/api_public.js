/* eslint-disable no-undef */
const assert = require('assert');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const mock = new MockAdapter(axios);
const hostname = 'undefined';

describe('Get counters', () => {
  it('gets unread counters', async () => {
    const roomId = 27;
    const unreads = 5;

    mock.onGet(`${hostname}/api/v1/groups.counters?roomId=${roomId}`).reply(200, {
      unreads,
    });

    const result = unreads;
    // console.log(mock.history.get[0].url);
    assert.equal(result, unreads);
  });
  it('gets unread mentions', async () => {
    const roomId = 27;
    const mentions = 5;

    mock.onGet(`${hostname}/api/v1/groups.counters?roomId=${roomId}`).reply(200, {
      mentions,
    });

    const result = mentions;
    // console.log(mock.history.get[0].url);
    assert.equal(result, mentions);
  });
});
