/* eslint-disable no-undef */
global.chai = require('chai');

global.should = chai.should();
chai.use(require('chai-http'));

global.env = process.env.NODE_ENV;
global.server = 'https://jsonplaceholder.typicode.com';
global.agent = chai.request.agent(server);
