-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS ventures CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS archives CASCADE;

CREATE TABLE ventures (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    venture_id TEXT NOT NULL UNIQUE,
    venture_title TEXT NOT NULL,
    venture_name TEXT NOT NULL,
    venture_bio TEXT NOT NULL,
    host_email TEXT NOT NULL,
    host_fname TEXT NOT NULL,
    host_image TEXT, 
    host_audio TEXT,
    last_updated TIMESTAMP,
    creation_date TIMESTAMP,
    chat json,
    participants json,
    active BOOLEAN 

);

CREATE TABLE users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
fname TEXT NOT NULL, 
user_email TEXT NOT NULL UNIQUE,
profile_image TEXT
);

CREATE TABLE archives(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_email TEXT REFERENCES users(user_email) ON DELETE CASCADE,
venture_id TEXT REFERENCES ventures(venture_id) ON DELETE CASCADE,
archived BOOLEAN
);


INSERT INTO ventures (venture_id, venture_title, venture_name, venture_bio, host_email, host_fname, chat, participants ) VALUES('TOM&POTATOES','Potatoes', 'potatoes','SOME BIO', 'tom@email.com', 'Tom','[{"msg":"i need coffee :)","time":"April 1, 2022 1:06 AM","message":"i need coffee :)","username":"TOM","pillarOne":"Diverge","pillarTwo":"Solution","ventureId":"TOM&POTATOES"}]', '["tom@gmail.com", "sara@gmail.com", "perez.evon@gmail.com"]' );
INSERT INTO users (fname, user_email ) VALUES('Tom', 'tom@gmail.com');
INSERT INTO ventures (venture_id, venture_title, venture_name, venture_bio, host_email, host_fname, chat, participants ) VALUES('BOB&POTATOES','Potatoes', 'potatoes','SOME BIO', 'bob@email.com', 'Tom','[{"msg":"i need coffee :)","time":"April 1, 2022 1:06 AM","message":"i need coffee :)","username":"BOB","pillarOne":"Diverge","pillarTwo":"Solution","ventureId":"TOM&POTATOES"}]', '["bob@gmail.com", "sara@gmail.com", "perez.evon@gmail.com"]' );
INSERT INTO archives (user_email, venture_id, archived) VALUES('tom@gmail.com','TOM&POTATOES', TRUE);

UPDATE archives SET archived = FALSE WHERE venture_id = 'TOM&POTATOES';
UPDATE ventures SET last_updated = '2022-09-19 1:13PM' WHERE venture_id = 'TOM&POTATOES';