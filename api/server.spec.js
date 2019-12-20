const request = require(`supertest`);
const db = require(`../database/dbConfig`);
const server = require(`./server`);

describe(`server.js`, () => {
  beforeEach(async () => {
    await db(`users`).truncate();
  });
  describe(`post /api/auth/register`, () => {
    it(`should return added user object`, async () => {
      const user = { username: "bilbo", password: "baggins" };
      const post = await request(server)
        .post(`/api/auth/register`)
        .send(user);
      expect(post.body.saved).toMatchObject({ username: "bilbo" });
    });

    it(`should return a 201 CREATED`, async () => {
      const user = { username: "bilbo", password: "baggins" };
      const post = await request(server)
        .post(`/api/auth/register`)
        .send(user);
      expect(post.status).toBe(201);
    });
  });

  describe(`post /api/auth/login`, () => {
    it(`should return username and token`, async () => {
      const user = { username: "bilbo", password: "baggins" };
      await request(server)
        .post(`/api/auth/register`)
        .send(user);
      const post = await request(server)
        .post(`/api/auth/login`)
        .send(user);
      expect(post.body.message).toContain(user.username);
    });

    it(`should return a 200 OK`, async () => {
      const user = { username: "bilbo", password: "baggins" };
      await request(server)
        .post(`/api/auth/register`)
        .send(user);
      const post = await request(server)
        .post(`/api/auth/login`)
        .send(user);
      expect(post.status).toBe(200);
    });
  });
});
