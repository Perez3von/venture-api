-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS ventures CASCADE;
DROP TABLE IF EXISTS users CASCADE;

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
    chat json,
    participants json 

);

CREATE TABLE users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
fname TEXT, 
user_email TEXT NOT NULL UNIQUE,
profile_image TEXT
-- venture_ref TEXT NOT NULL REFERENCES ventures(venture_id)
);


INSERT INTO ventures (venture_id, venture_title, venture_name, venture_bio, host_email, host_fname, chat, participants ) VALUES('TOM&POTATOES','POTATOES', 'potatoes','SOME BIO', 'TOM@EMAIL.COM', 'TOM','[{"msg":"i need coffee :)","time":"April 1, 2022 1:06 AM","message":"i need coffee :)","username":"TOM","pillarOne":"Diverge","pillarTwo":"Solution","ventureId":"TOM&POTATOES"}]', '["tom@gmail.com", "sara@gmail.com", "perez.evon@gmail.com"]' );
