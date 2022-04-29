
const pool = require('../utils/pool');
const Venture = require('../models/Venture');

module.exports = class Participants{

  constructor(row){
    this.first_name = row.fname;
    this.user_email = row.user_email;
    this.profile_image = row.profile_image;
  }



  static async getChatThreadParticipants(id){
    const id_parsed = id.split('-');
    const title = id_parsed[0];
    const host_name = id_parsed[1];
    const { rows } = await pool.query(`
    
        SELECT * FROM ventures WHERE venture_title = $1 AND host_fname = $2
    `, [title, host_name]);

    // console.log('rows', rows);

    // return rows;

    // const host  = await pool.query(`
    //     SELECT * FROM ventures WHERE venture_id = $1
    // `, [ventureId]);
    // // console.log('hwer', host.rows);
    // // return host.rows;

    // const hostInfo = {
    //   id:host.rows[0].id,
    //   fname : host.rows[0].host_fname,
    //   user_email : host.rows[0].host_email,
    //   profile_image :  host.rows[0].host_image,
    //   venture_title : host.rows[0].venture_title,
    //   host_audio: host.rows[0].host_audio
    // };
      
    // const allParticipants = [hostInfo, ...rows];
    // console.log(rows[0])
    const participants = rows[0].participants;
    const allParticipants = await Venture.getUsersProfile(participants);
    // console.log(allParticipants);
    return allParticipants;
  }
  



  static async updateParticipientPhoto(userEmail, imageURL){
    const host = await pool.query(
      'SELECT * FROM ventures WHERE host_email = ($1)',
      [userEmail]
    );

    if(host.rows[0]){

      const host = await pool.query(
        `UPDATE ventures 
         SET host_image = ($2) WHERE host_email = ($1)
         RETURNING *`,
        [userEmail, imageURL]);

      const hostInfo = {
        id:host.rows[0].id,
        fname : host.rows[0].host_fname,
        user_email : host.rows[0].host_email,
        profile_image :  host.rows[0].host_image,
        venture_title : host.rows[0].venture_title,
        host_audio: host.rows[0].host_audio
      };
      return hostInfo;

    } else {

      const { rows } = await pool.query(
        `UPDATE users 
         SET profile_image = ($2) WHERE user_email = ($1)
         RETURNING *`,
        [userEmail, imageURL]);

      if(rows[0]){
        return new Participants(rows[0]);
      } else{

        return 'No users found';
      }

    }

  }

  // static async addParticipant(v_id, guest_email){

  //   const { rows } = await pool.query(`
  //   UPDATE ventures 
  //   SET participants = participants::jsonb || $2::jsonb
  //   WHERE venture_id = $1 
  //   RETURNING participants
  //   `, [v_id, guest_email]);

  //   console.log(rows[0]);

  //   return rows[0];
  // }

  static async addParticipant(v_id, guest_email, name){
    const email = JSON.stringify(guest_email);
    // console.log("addPar", v_id, email, name);
    const id_parsed = v_id.split('-');
    const title = id_parsed[0];
    const host_name = id_parsed[1];
    const { rows } = await pool.query(`
    
    UPDATE ventures 
    SET participants = participants::jsonb || $3::jsonb
    WHERE venture_title = $1 AND host_fname = $2
    RETURNING participants
    `, [title, host_name, email]);

    await Venture.addUser(name, guest_email);

    // console.log(rows[0]);

    return rows[0];
  }



};

