/* eslint-disable no-undef */
describe('Blogs API', () => {
  it('GET /posts', async () => {
    const res = await agent.get('/posts');
    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.length.should.be.above(10);
  });

  it('GET /posts/{id}', async () => {
    const expectedId = 1;
    const res = await agent.get(`/posts/${expectedId}`);
    res.should.have.status(200);
    res.body.id.should.be.eql(expectedId);
  });

  it('POST /posts', async () => {
    const blog = {
      userId: 1,
      title: 'my awesome post',
      body: 'this is my awesome post!',
    };
    const res = await agent.post('/posts').send(blog);
    res.should.have.status(201);
    res.body.should.be.a('object');
  });

  it('PUT /posts/{id}', async () => {
    const expectedTitle = 'my awesome updated post';
    const expectedBody = 'this is my awesome updated post!';
    const blog = {
      userId: 1,
      title: expectedTitle,
      body: expectedBody,
    };
    const res = await agent.put('/posts/1').send(blog);
    res.should.have.status(200);
    res.body.title.should.be.eql(expectedTitle);
    res.body.body.should.be.eql(expectedBody);
  });

  it('DEL /posts/{id}', async () => {
    const res = await agent.del('/posts/1');
    res.should.have.status(200);
    // eslint-disable-next-line no-unused-expressions
    res.body.should.be.empty;
  });
});
