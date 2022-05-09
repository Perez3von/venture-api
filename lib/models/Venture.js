const pool = require('../utils/pool');

module.exports = class Venture{


  constructor(row){

    this.venture = row.venture_title;
  }

  static async create({ ventureID, ventureTitle, firstName, hostEmail, ventureName, ventureBio, hostAudio }){
    const participants = JSON.stringify([hostEmail]);
    const ventureExist = await this.getVenture(ventureID);
    await this.addUser(firstName, hostEmail);

    if(ventureExist){
      return 'venture already exists';
    }
    const { rows } = await pool.query(`

    INSERT INTO ventures 
    (venture_id, venture_title, venture_name, venture_bio, host_email, host_fname, host_audio, chat, participants )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )
    RETURNING *
    
    `, [ventureID, ventureTitle, ventureName, ventureBio, hostEmail, firstName, hostAudio, '[]', participants]);
    //rows returns array of object
    //row[0] just give back the object
    return rows[0];
  }

  //----------------------------------------//

  static async getVenture(ventureID){
    
    const id_parsed = ventureID.split('-');
    const title = id_parsed[0];
    const host_name = id_parsed[1];
    // console.log(title, host_name);
    const { rows } = await pool.query(`

    SELECT * FROM ventures WHERE venture_title = $1 AND host_fname = $2
    
    `, [title, host_name]);  
    // console.log(rows[0]);
    return rows[0]; 
  }

  //----------------------------------------//

  static async sendMessage(body){
    const message = body;
    const ventureId = body.ventureId;
    const id_parsed = ventureId.split('-');
    const title = id_parsed[0];
    const host_name = id_parsed[1];
    // console.log(ventureId)
    const { rows } = await pool.query(`
    
    UPDATE ventures 
    SET chat = chat::jsonb || $3::jsonb
    WHERE venture_title = $1 AND host_fname = $2
    RETURNING chat
    `, [title, host_name, message]);
  
    return rows[0];
  }


  static async getMessages(id){
    
    const id_parsed = id.split('-');
    const title = id_parsed[0];
    const host_name = id_parsed[1];
    // console.log(title)
    // console.log(host_name)
    const { rows } = await pool.query(`
    SELECT chat FROM ventures WHERE venture_title = $1 AND host_fname = $2
    `, [title, host_name]);
    if(rows[0] === undefined){
      return null;
    }
    return rows[0];
  }

  //   static async sendMessage({ ventureId, message }){
   
  //   const { rows } = await pool.query(`
    
  //   UPDATE ventures 
  //   SET chat = chat::jsonb || $2::jsonb
  //   WHERE venture_id = $1 
  //   RETURNING chat
  //   `, [ventureId, message]);
  
  //   return rows[0];
  // }
  
  // static async addParticipant({ ventureId, email, name }){
  //   console.log("addPar", ventureId, email, name);
  //   const id_parsed = ventureId.split('-');
  //   const title = id_parsed[0];
  //   const host_name = id_parsed[1];
  //   const { rows } = await pool.query(`
    
  //   UPDATE ventures 
  //   SET participants = participants::jsonb || $3::jsonb
  //   WHERE venture_title = $1 AND host_fname = $2
  //   RETURNING participants
  //   `, [title, host_name, email]);

  //   await this.addUser(name, email);
    
  //   return rows[0];
  // }

  static async getUsersProfile(usersArray){

    
    const { rows } = await pool.query(`
    
    SELECT * FROM users WHERE user_email = ANY($1)
    `, [usersArray]);
    // console.log('getUsersProfile', rows);
    return rows;
  

  }



  static async getUser(email){

    const { rows } = await pool.query(`

      SELECT * FROM users WHERE user_email = $1
    
    `, [email]);

    return rows[0];


  }

  static async addUser(firstName, email){
    const fName = firstName.toLowerCase();
    const exist = await this.getUser(email);

    if(exist === null || exist === undefined){
      const { rows } = await pool.query(`
        INSERT INTO users (fname, user_email)
        VALUES($1, $2)
        RETURNING *
      `, [fName, email]);

      return rows[0];
    }
    else{
      return exist;
    }

  }

};
