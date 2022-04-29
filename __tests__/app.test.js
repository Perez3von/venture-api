const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const request = require('supertest');
// const app = require('../lib/app');


describe('venture-chat-be routes', () => {
  beforeAll(() => {
    return setup(pool);
  });
  //------------------------------------------//
  it('do nothing', () => {
    expect(true).toEqual(true);
  });
  // //------------------------------------------//
  // it('create a new venture', async () => {

  //   const res  = await request(app).post('/api/v1/ventures/create').send({

  //     ventureTitle: 'Test Venture Title ONE',
  //     ventureID:'TestVentureIdONE',
  //     hostEmail: 'testEmail@email.com',
  //     firstName:'Frank'
  //   });

  //   expect(res.body).toEqual({

  //     id:expect.any(String),
  //     venture_id:'TestVentureIdONE',
  //     venture_title:'Test Venture Title ONE',
  //     host_email:'testEmail@email.com',
  //     host_fname:'Frank',
  //     host_image:null,
  //     chat:expect.any(Array),
  //     participants:expect.any(Array)
  //   });
  // });


  // //------------------------------------------//

  
  // it('gets a venture by id', async () => {

  //   const res = await request(app).get('/api/v1/ventures/TestVentureIdONE');
  //   expect(res.body).toEqual({

  //     id:expect.any(String),
  //     venture_id:'TestVentureIdONE',
  //     venture_title:'Test Venture Title ONE',
  //     host_email:'testEmail@email.com',
  //     host_fname:'Frank',
  //     host_image:null,
  //     chat:expect.any(Array),
  //     participants:expect.any(Array)


  //   });
  // });
  // //------------------------------------------//

  // it('posts a message to specified venture', async () => {
  //   const message = {
  //     ventureId: 'TestVentureIdONE',
  //     name: 'Gary',
  //     email: 'gary@email.com',
  //     message: 'this venture idea is great',
  //     pillar_one: 'Expand',
  //     pillar_two: 'Setting'
  //   };

  //   const res  = await request(app).post('/api/v1/ventures/message').send({ message:JSON.stringify(message), ventureId:'TestVentureIdONE' });
  
  //   expect(res.body).toEqual({ 
  //     'chat': [{ 
  //       'email': 'gary@email.com',
  //       'message': 'this venture idea is great', 
  //       'name': 'Gary', 
  //       'pillar_one': 'Expand', 
  //       'pillar_two': 'Setting', 
  //       'ventureId': 'TestVentureIdONE' 
  //     }]
  //   });
  // });

  // //------------------------------------------//

  // it('posts another message to specified venture', async () => {
  //   const message = {
  //     ventureId: 'TestVentureIdONE',
  //     name: 'Amy',
  //     email: 'amy@email.com',
  //     message: 'Let me know if its working, ive gotta go soon',
  //     pillar_one: 'Expand',
  //     pillar_two: 'Setting'
  //   };

  //   const res  = await request(app).post('/api/v1/ventures/message').send({ message:JSON.stringify(message), ventureId:'TestVentureIdONE' });
  
  //   expect(res.body).toEqual({ 
  //     'chat': [                                                                                                                                                                       
  //       {
  //         name: 'Gary',
  //         email: 'gary@email.com',
  //         message: 'this venture idea is great',
  //         ventureId: 'TestVentureIdONE',
  //         pillar_one: 'Expand',
  //         pillar_two: 'Setting'
  //       },
  //       {
  //         name: 'Amy',
  //         email: 'amy@email.com',
  //         message: 'Let me know if its working, ive gotta go soon',
  //         ventureId: 'TestVentureIdONE',
  //         pillar_one: 'Expand',
  //         pillar_two: 'Setting'
  //       }
  //     ]
  //   });
  // });

  //------------------------------------------//

  // it('adds a new person', async () => {
  //   const res = await request(app).post('/api/v1/participants/joinchat').send({ ventureId:'TestVentureIdONE', guestEmail:'spongeBob@gmail.com' });

  //   expect(true).toEqual(true);

  // });

  // it('adds a new person', async () => {
  //   const res = await request(app).get('/api/v1/participants//getAllParticipants/TestVentureIdONE');

  //   expect(true).toEqual(true);

  // });

  //   it('adds a new user', async () => {
  //   const res = await request(app).post('/api/v1/ventures/newuser').send({firstName:'EVON', email:'perez.evon@gmail.com'});

  //   expect(true).toEqual(true);

  // });
  // it('adds a new user', async () => {
  //   const res = await request(app).post('/api/v1/ventures/newuser').send({firstName:'Sara', email:'sara@gmail.com'});

  //   expect(true).toEqual(true);

  // });
  // it('adds a new user', async () => {
  //   const res = await request(app).post('/api/v1/ventures/newuser').send({firstName:'TOM', email:'tom@gmail.com'});

  //   expect(true).toEqual(true);

  // });
  // it('adds a new user', async () => {
  //   const res = await request(app).post('/api/v1/ventures/newuser').send({firstName:'TOM', email:'tom@gmail.com'});
  //   // console.log('he exist', res.body)
  //   expect(true).toEqual(true);

  // });


  // it('gets a  user', async () => {
  //   const res = await request(app).post('/api/v1/ventures/user').send({email:'perez.evon@gmail.com'});
  //   console.log('MArio', res.body)
  //   expect(true).toEqual(true);

  // });
  // it('gets all users from array', async () => {
  //   const res = await request(app).post('/api/v1/ventures/allusers').send({ participants:['tom@gmail.com', 'sara@gmail.com', 'perez.evon@gmail.com'] });
  //   console.log('LUIGI', res.body);
  //   expect(true).toEqual(true);

  // });

  afterAll(() => {
    pool.end();
  });
});
