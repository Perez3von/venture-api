const pool = require('../utils/pool');

module.exports = class Venture{


  constructor(row){

    this.venture = row.venture_title;
  }

  static async create({ ventureID, ventureTitle, firstName, hostEmail }){
    const participants = JSON.stringify([hostEmail]);
    const ventureExist = await this.getVenture(ventureID);

    if(ventureExist){
      return 'venture already exists';
    }
    const { rows } = await pool.query(`

    INSERT INTO ventures 
    (venture_id, venture_title, host_email, host_fname, chat, participants )
    VALUES ($1, $2, $3,$4, $5, $6 )
    RETURNING *
    
    `, [ventureID, ventureTitle, hostEmail, firstName, '[]', participants]);
    //rows returns array of object
    //row[0] just give back the object
    return rows[0];
  }

  //----------------------------------------//

  static async getVenture(ventureID){

    const { rows } = await pool.query(`

    SELECT * FROM ventures WHERE venture_id = $1
    
    
    `, [ventureID]);  
    
    return rows[0]; 
  }

  //----------------------------------------//

  static async sendMessage({ ventureId, message }){
   
    const { rows } = await pool.query(`
    
    UPDATE ventures 
    SET chat = chat::jsonb || $2::jsonb
    WHERE venture_id = $1 
    RETURNING chat
    `, [ventureId, message]);
  
    return rows[0];
  }

  static async addParticipant({ ventureId, email }){

    const { rows } = await pool.query(`
    
    UPDATE ventures 
    SET participants = participants::jsonb || $2::jsonb
    WHERE venture_id = $1 
    RETURNING participants
    `, [ventureId, email]);

    return rows[0];


  }

};
