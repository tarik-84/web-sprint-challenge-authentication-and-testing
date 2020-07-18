const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig');



beforeAll(async () => {
    await db('users').truncate();
})


afterAll(async () => {
    await db.destroy()
})


describe('end point tests', () => {
    describe('POST /register and POST /login', () => {
        
            //test1
        it('POST /auth/register - should return status 201', async () => {
                await supertest(server)
                    .post('/api/auth/register')
                    .send({ username: "tarik najim", password: "password" })
                    .then(res => {
                        expect(res.status).toBe(201);
                        expect(res.type).toMatch("application/json");
                    })
            })
            //test2
        it('POST /auth/login - should return token', async () => {
                await supertest(server)
                .post('/api/auth/login')
                .send({ username: 'tarik najim', password: 'password' })
                .then(res => {
                    expect(res.cookie).toBe(token);
                })
            })
            // test3
        it(' POST /auth/login - res.type should match json"', () => {
                return supertest(server)
                    .post('/api/auth/login')
                    .send({ username: "testjoe", password: "testjoe123" })
                    .then(res => {
                        expect(res.type).toMatch("application/json");
                    })
            })
            //test4
        it(' GET /jokes/ - res.type should match json', () => {
                return supertest(server)
                    .get('/api/jokes/')
                    .then(res => {
                        expect(res.type).toMatch(/json/i);
                        expect(res.body).toBeDefined();
                    })
            })
    })    
}) 

    