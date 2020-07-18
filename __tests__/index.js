const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')


beforeEach(async () => {
    await db.seed.run()
})


afterAll(async () => {
    await db.destroy()
})
describe('user integration tests', () => {
    it('post /api/auth/register', async () => {
        const res = await supertest(server)
                .post('/api/auth/register')
                .send({name: 'Michael', password: '12qw34er'})
        expect(res.statusCode).toBe(201)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBe('Michael')
    })
})

describe('jokes integration tests', () => {
    it('Get /api/jokes', async () => {
        const res = await supertest(server).get('/api/auth/jokes')
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBeDefined()
       
    })
})

