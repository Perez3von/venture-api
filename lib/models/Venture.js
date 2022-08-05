const pool = require('../utils/pool');

module.exports = class Venture{


  constructor(row){

    this.venture = row.venture_title;
  }

  static async create({ ventureID, ventureTitle, firstName, 
    hostEmail, ventureName, ventureBio, hostAudio, lastUpdated, creationDate }){
    // const participants = JSON.stringify([hostEmail]);
    // const ventureExist = await this.getVenture(ventureID);
    // const userExist = await this.getUser(hostEmail);
    // if(userExist.fname !== firstName){
    //   return new Error('User alredy exist, user first name and email do not match');
    // }
    // if(ventureExist){
    //   return new Error ('venture already exists');
    // }
    
    // await this.addUser(firstName, hostEmail);
    // const { rows } = await pool.query(`

    // INSERT INTO ventures 
    // (venture_id, venture_title, venture_name, venture_bio, host_email, host_fname, host_audio, chat, participants )
    // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )
    // RETURNING *
    
    // `, [ventureID, ventureTitle, ventureName, ventureBio, hostEmail, firstName, hostAudio, '[]', participants]);
    // //rows returns array of object
    // //row[0] just give back the object
    // return rows[0];
    const participants = JSON.stringify([hostEmail]);
    const userExist = await this.getUser(hostEmail);
    if(userExist !== undefined && userExist.fname !== firstName){
      throw new Error('user email and name already exist');
    }
    try{
     
      await this.addUser(firstName, hostEmail);
      await this.getVenture(ventureID);
    
      const { rows } = await pool.query(`

    INSERT INTO ventures 
    (venture_id, venture_title, venture_name, venture_bio, host_email, host_fname, host_audio, chat, participants, last_updated, creation_date, active )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )
    RETURNING *
    
    `,  [ventureID, ventureTitle, ventureName, ventureBio, hostEmail, firstName, hostAudio, '[]', participants, lastUpdated, creationDate, true]);
      //rows returns array of object
      //row[0] just give back the object
      return rows[0];
    }
    catch(error){
      throw new Error(error);
    }
  }

  //----------------------------------------//

  static async getVenture(ventureID){
    
    // const id_parsed = ventureID.split('-');
    // const title = id_parsed[0];
    // const host_name = id_parsed[1];
    // const { rows } = await pool.query(`

    // SELECT * FROM ventures WHERE venture_title = $1 AND host_fname = $2
    
    // `, [title, host_name]);  

    // return rows[0]; 
  
    const { rows } = await pool.query(`

    SELECT * FROM ventures WHERE venture_id = $1
    
    `, [ventureID]);  

    return rows[0];
  }

  //----------------------------------------//

  static async sendMessage(body){
    const message = body;
    const ventureId = body.ventureId;
    // const id_parsed = ventureId.split('-');
    // const title = id_parsed[0];
    // const host_name = id_parsed[1];
    const { rows } = await pool.query(`
    
    UPDATE ventures 
    SET chat = chat::jsonb || $2::jsonb
    WHERE venture_id = $1 
    RETURNING chat
    `, [ventureId, message]);
  
    return rows[0];
  }


  static async getMessages(id){
    
    // const id_parsed = id.split('-');
    // const title = id_parsed[0];
    // const host_name = id_parsed[1];
    // const { rows } = await pool.query(`
    // SELECT chat FROM ventures WHERE venture_title = $1 AND host_fname = $2
    // `, [title, host_name]);
    const venture = await this.getVenture(id);
    if(venture.chat === undefined){
      return null;
    }
    return venture.chat;
  }


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

  static async getAllVentures(userEmail){

    try {
      const { rows } = await pool.query(`
    SELECT * 
    FROM ventures 
    WHERE participants::jsonb ? $1
    `, [userEmail]);


      const guests = await Promise.all(await rows.map(async (venture) => {   
        // console.log(venture.participants);  
        const { rows } = await pool.query(`
        SELECT fname FROM users WHERE user_email = ANY($1)

        `, [venture.participants]);
        return { ...venture, guests:rows };
      }
      ));
      // console.log(guests);
      return guests;

    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  static async getArchives(userEmail){
    const { rows } = await pool.query(`
    SELECT * FROM archives WHERE user_email = $1`, [userEmail]);
    return rows ?? [];
  }


  static async getArchive(ventureId, userEmail){
    try {console.log('GETARchvie', ventureId, userEmail);
      const { rows } = await pool.query(`
      SELECT * FROM archives
      WHERE user_email = $1 AND venture_id = $2
      `, [userEmail, ventureId]);
      
      return rows[0];
      
    } catch (error) {
      console.log(error);
      return null;
      
    }
  }

  static async addArchive(ventureId, userEmail){

    try {
      
      const { rows } = await pool.query(`

      INSERT INTO archives (user_email, venture_id, archived)
      VALUES($1, $2, $3)
      RETURNING *
    
    `, [userEmail, ventureId, true]);
      console.log(rows[0]);
      return rows[0];
      
    } catch (error) {
      console.log(error);
    }
   
  }

  static async updateArchive(ventureId, userEmail){
    const archiveExist =  await pool.query(`
    SELECT * FROM archives
    WHERE user_email = $1 AND venture_id = $2
    `, [userEmail, ventureId]);
    console.log(archiveExist);
    if(archiveExist.rows.length > 0){
      console.log('in update');
      const { rows } = await pool.query(`
        UPDATE archives 
        SET archived = NOT archived
        WHERE venture_id = $1 AND user_email = $2 
        RETURNING *`
      , [ventureId, userEmail]);
      return rows[0];
      
    }
    else{
      const { rows } = await pool.query(`

      INSERT INTO archives (user_email, venture_id, archived)
      VALUES($1, $2, $3)
      RETURNING *
    
    `, [userEmail, ventureId, true]);
      console.log(rows[0]);
      return rows[0];
    }
   
  }
  static async lastUpdated(ventureId, lastUpdated){
    try {
      await pool.query(`
      UPDATE ventures SET last_updated = $2 WHERE venture_id = $1
    `, [ventureId, lastUpdated]);
    } catch (error) {
      console.log(error);
    }
  }

  static async completeVenture(ventureId, userEmail){

    await pool.query(`
      UPDATE ventures SET active = FALSE WHERE venture_id = $1 AND host_email =$2
    `, [ventureId, userEmail]);
    const venture = await this.getVenture(ventureId);
    return venture; //[list of emails]
  }
  

  static async deleteVenture(ventureId, userEmail){
    //delete audio from cloud
    const { rows } = await pool.query(`
    DELETE FROM ventures WHERE venture_id = $1 AND host_email = $2
    RETURNING *
    `, [ventureId, userEmail]);
    console.log(rows[0]);
    return rows[0];
  }

};
