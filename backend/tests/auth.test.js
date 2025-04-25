import request from 'supertest';
import app from '../index.js';
describe('Auth API', () => {
  it('Should register and login', async () => {
    const user = { name:'Toto',email:'toto@efrei.fr',password:'secret',role:'student' };
    await request(app).post('/auth/register').send(user).expect(200);
    const res = await request(app).post('/auth/login').send({ email:user.email,password:'secret' });
    expect(res.body.token).toBeDefined();
  });
});